import { FastifyInstance } from "fastify";
import { taskSchema } from "../schemas/task.js";
import { pool } from "../db.js";
import { z } from "zod";

export async function taskRoutes(server: FastifyInstance) {
  server.get("/tasks", async () => {
    const result = await pool.query(`
      SELECT * FROM tasks
      `);

    return {
      tasks: result.rows
    };
  });

  server.post("/tasks", async (request, reply) => {
    const parsed = taskSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      })
    }

    const result = await pool.query(`
      INSERT INTO tasks (goal_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING id, goal_id, title, description, status, priority, due_at, created_at, updated_at`,
      [parsed.data.goal_id, parsed.data.title, parsed.data.description]);

    return reply.code(201).send(result.rows[0]);
  });
}
