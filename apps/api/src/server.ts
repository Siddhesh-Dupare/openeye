import Fastify from "fastify";
import { pool } from "./db";

const server = Fastify({
  logger: true,
});

server.get("/health", async () => {

  const result = await pool.query("SELECT NOW()");

  return {
    status: "ok",
    service: "open-eye api",
    database: result.rows[0].now,
  }
});

const start = async () => {
  try {
    await server.listen({
      port: 3001,
      host: "127.0.0.1",
    });
  } catch (error) {
    server.log.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
