import { z } from "zod";

export const taskSchema = z.object({
  goal_id: z.uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});
