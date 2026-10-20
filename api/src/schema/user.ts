import { z } from "zod";

export const user = z.object({
  id: z.number(),
  name: z.string().min(2),
  createAt: z.date(),
});

export const userSchema = z.array(user);
