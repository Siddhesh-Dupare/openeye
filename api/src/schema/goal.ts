import { z } from "zod";

export const goal = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string().nonempty(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const goalSchema = z.array(goal);
