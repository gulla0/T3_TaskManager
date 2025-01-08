import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  // Fetch all tasks for a specific wallet
  getAll: publicProcedure
    .input(z.object({ walletAddress: z.string().optional() })) // Accept walletAddress
    .query(async ({ ctx, input }) => {
      if (!input.walletAddress) return [];
      return await ctx.db.task.findMany({
        where: { walletAddress: input.walletAddress }, // Filter by walletAddress
        orderBy: { createdAt: "desc" },
      });
    }),

  // Add a new task for a wallet
  add: publicProcedure
    .input(z.object({ name: z.string().min(1), walletAddress: z.string() })) // Require walletAddress
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.create({
        data: {
          name: input.name,
          walletAddress: input.walletAddress, // Associate task with wallet
        },
      });
    }),

  // Toggle task completion
  toggle: publicProcedure
    .input(z.object({ id: z.string() })) // Task ID is required
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findUnique({ where: { id: input.id } });
      if (!task) throw new Error("Task not found");

      return await ctx.db.task.update({
        where: { id: input.id },
        data: { completed: !task.completed },
      });
    }),

  // Delete a task
  delete: publicProcedure
    .input(z.object({ id: z.string() })) // Task ID is required
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.task.delete({
        where: { id: input.id },
      });
    }),
});
