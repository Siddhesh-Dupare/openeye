import { FastifyInstance } from "fastify";
import { goalSchema } from "../schemas/goal.js";
import { pool } from "../db.js";
import { z } from "zod";

export async function goalRoutes(server: FastifyInstance) {
  server.get("/goals", async () => {
    const result = await pool.query(`
      SELECT * FROM goals
      `);

    return {
      goals: result.rows,
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

    const result = await pool.query(`
      INSERT INTO goals (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, title, description, status, created_at, updated_at`,
      [parsed.data.user_id, parsed.data.title, parsed.data.description]);

    return reply.code(201).send(result.rows[0]);
  });
}
