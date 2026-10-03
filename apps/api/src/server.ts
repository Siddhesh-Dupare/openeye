import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/health", async () => {
  return {
    status: "ok",
    service: "open-eye api",
  }
});

const start = async () => {
  try {
    await server.listen({
      port: 3001,
      host: "127.0.0.1",
    });
  } catch (error: unknown) {
    server.log.error("Failed to start server", error);
    process.exit(1);
  }
};

start();
