import { z } from "zod";

export const taskSchema = z.object({
  goal_id: z.uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const updateTaskSchema = taskSchema
  .pick({
    title: true
  })
  .partial()
  .extend({
    description: z
      .string()
      .nullable()
      .optional(),

    status: z
      .enum(['pending', 'in_progress', 'completed', 'cancelled'])
      .optional(),

    priority: z
      .enum(['low', 'medium', 'high'])
      .optional(),

    dueAt: z
      .iso.datetime()
      .nullable()
      .optional()
  });
