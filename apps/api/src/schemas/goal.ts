import { z } from "zod";

export const goalSchema = z.object({
  user_id: z.uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});
