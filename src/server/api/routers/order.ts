import { asc, eq } from "drizzle-orm";
import { promises } from "fs";
import path from "path";
import { z } from "zod";
import { OrderMaterial } from "~/lib/const";
import { calculateOrderPrice } from "~/lib/utils";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { orderItems, orders } from "~/server/db/schema";

// const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_EXTENSIONS = [".iges", ".step"];

export const orderRouter = createTRPCRouter({
  // Create a new order
  create: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            fileName: z.string(),
            fileBase64: z.string(),
            material: z.nativeEnum(OrderMaterial),
            quantity: z.number(),
            validated: z.boolean(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Validate that all items are validated
      if (!input.items.every((item) => item.validated)) {
        throw new Error("All items must be validated");
      }

      // Validate that the user has uploaded 2 files
      if (input.items.length !== 2) {
        throw new Error("You must upload exactly 2 files");
      }

      // Validate that the files have an ACCEPTED_EXTENSIONS
      if (
        !input.items.every((item) =>
          ACCEPTED_EXTENSIONS.includes(path.extname(item.fileName)),
        )
      ) {
        throw new Error("Invalid file extension");
      }

      // Store files in the server
      const items = await Promise.all(
        input.items.map(async (item) => {
          // Create a new file from base64 in /public/uploads
          const storedFileName = `${Date.now()}-${item.fileName}`;
          const storedFilePath = path.join("public", "uploads", storedFileName);

          // Development save file to disk
          await promises.writeFile(
            path.join(process.cwd(), storedFilePath),
            item.fileBase64.replace(/^data:.*;base64,/, ""),
            "base64",
          );

          // Return item with the file URL
          return {
            fileName: item.fileName,
            fileUrl: "/" + storedFilePath,
            material: item.material,
            quantity: item.quantity,
          };
        }),
      );

      // Do everything in a transaction
      return await ctx.db.transaction(async (tx) => {
        // Create a new order
        const order = await tx
          .insert(orders)
          .values({
            price: calculateOrderPrice(items),
            createdById: ctx.session.user.id,
          })
          .returning();

        // Validate that the order was created with an ID
        const orderId = order[0]?.id;
        if (!orderId) {
          throw new Error("Failed to create order");
        }

        // Create order items for each file
        await tx.insert(orderItems).values(
          items.map((item) => ({
            orderId: orderId,
            fileName: item.fileName,
            fileUrl: item.fileUrl,
            quantity: item.quantity,
            material: item.material,
          })),
        );

        return order[0];
      });
    }),
});
