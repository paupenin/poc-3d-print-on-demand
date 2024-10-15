import { and, asc, eq } from "drizzle-orm";
import path from "path";
import { z } from "zod";
import { OrderMaterial, orderPaymentPending, OrderStatus } from "~/lib/const";
import { calculateOrderPrice } from "~/lib/utils";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { orderItems, orders } from "~/server/db/schema";
import { storeFile } from "~/server/storage/file";

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
          // Store file
          const fileUrl = await storeFile(
            `${Date.now()}-${item.fileName}`,
            item.fileBase64,
            "uploads/order-items",
          );

          // Return item with the file URL
          return {
            fileName: item.fileName,
            fileUrl: fileUrl,
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
  // Get orders for the current user
  getOrders: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.orders.findMany({
      where: eq(orders.createdById, ctx.session.user.id),
      orderBy: asc(orders.createdAt),
      with: { createdBy: true },
    });
  }),
  // Get order by ID for the current user
  getOrder: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.query.orders.findFirst({
        where: and(
          eq(orders.id, input.orderId),
          eq(orders.createdById, ctx.session.user.id),
        ),
        with: { items: true, createdBy: true },
      });

      return order ?? null;
    }),
  // Process payment for an order
  processPayment: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
        number: z.string().length(16),
        expiration: z.string().length(5), // MM/YY
        cvv: z.string().length(3),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get the order
      const order = await ctx.db.query.orders.findFirst({
        where: and(
          eq(orders.id, input.orderId),
          eq(orders.createdById, ctx.session.user.id),
        ),
      });

      // Validate that the order exists
      if (!order) {
        throw new Error("Order not found");
      }

      // Validate that the order is in the correct status
      if (!orderPaymentPending(order.status)) {
        throw new Error("Order is not pending payment");
      }

      // Process the payment
      // This is a fake payment processor
      // In a real-world scenario, you would use a payment gateway
      // and handle the payment asynchronously.
      // Beep boop, payment successful 🤖

      // Update the order with the payment receipt
      return await ctx.db
        .update(orders)
        .set({
          status: OrderStatus.PaymentSucceeded,
        })
        .where(eq(orders.id, order.id));
    }),
  // Upload proof of payment
  uploadProofOfPayment: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
        file: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get the order
      const order = await ctx.db.query.orders.findFirst({
        where: and(
          eq(orders.id, input.orderId),
          eq(orders.createdById, ctx.session.user.id),
        ),
      });

      // Validate that the order exists
      if (!order) {
        throw new Error("Order not found");
      }

      // Validate that the order is in the correct status
      if (!orderPaymentPending(order.status)) {
        throw new Error("Order is not pending payment");
      }

      // Store payment file
      const fileUrl = await storeFile(
        `${Date.now()}-${order.id}-payment.pdf`,
        input.file,
        "uploads/payments",
      );

      // Update the order with the payment receipt
      return await ctx.db
        .update(orders)
        .set({
          status: OrderStatus.PaymentProcessing,
          paymentReceiptUrl: fileUrl,
        })
        .where(eq(orders.id, order.id));
    }),
});
