import { FastifyInstance } from "fastify";
import { goalSchema } from "../schemas/goal.js";
import { z } from "zod";
import { getGoals, createGoal } from "../services/goalService.js";

export async function goalRoutes(server: FastifyInstance) {
  server.get("/goals", async () => {
    const goals = await getGoals();

    return {
      goals,
    };
  });

  server.post("/goals", async (request, reply) => {
    const parsed = goalSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      })
    }

    const result = await createGoal(
      parsed.data.user_id,
      parsed.data.title,
      parsed.data.description,
    );

    return reply.code(201).send(result.rows[0]);
  });
}
