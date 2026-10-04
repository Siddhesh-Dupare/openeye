
import { FastifyInstance } from "fastify";
import { pool } from "../db.js";
import { userSchema } from "../schemas/user.js";
import { z } from "zod";

export async function userRoutes(server: FastifyInstance) {
  server.get("/users", async () => {
    const result = await pool.query(`
      SELECT id, name, created_at
      FROM users
      ORDER BY created_at DESC
      `);

    return {
      users: result.rows,
    };
  });

  server.post("/users", async (request, reply) => {
    const parsed = userSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "Invalid request",
        details: z.treeifyError(parsed.error),
      })
    }

    const result = await pool.query(`
      INSERT INTO users (name)
      VALUES ($1)
      RETURNING id, name, created_at
      `, [parsed.data.name]);

    return reply.code(201).send(result.rows[0]);
  });
}
