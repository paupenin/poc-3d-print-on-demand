import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { userAddress, users } from "~/server/db/schema";

export const profileRouter = createTRPCRouter({
  // Get current user profile
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id),
      with: { address: true },
    });
  }),
  // Create or update user address
  saveAddress: protectedProcedure
    .input(
      z.object({
        company: z.string().min(1).max(255),
        street: z.string().min(1).max(255),
        city: z.string().min(1).max(255),
        state: z.string().min(1).max(255),
        country: z.string().min(1).max(255),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if the user already has an address
      const existingAddress = await ctx.db.query.userAddress.findFirst({
        where: eq(userAddress.userId, ctx.session.user.id),
      });

      if (existingAddress) {
        // Update the existing address
        await ctx.db
          .update(userAddress)
          .set(input)
          .where(eq(userAddress.userId, ctx.session.user.id));
      } else {
        // Create a new address
        await ctx.db.insert(userAddress).values({
          userId: ctx.session.user.id,
          ...input,
        });
      }
    }),
});
