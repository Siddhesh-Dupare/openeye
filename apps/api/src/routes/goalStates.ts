import { FastifyInstance } from "fastify";
import { pool } from "../db.js";

export async function goalStateRoutes(server: FastifyInstance) {
  server.get("/goal_states", async () => {
    const result = await pool.query(`
      SELECT * FROM goal_states
      `);

    return {
      goal_states: result.rows
    };
  });
}
