import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

server.get("/", async (request, response) => {
  response.code(200).send({
    message: "Hello",
  });
});

const PORT = 3000;

const start = async () => {
  try {
    await server.listen({ port: PORT });
  } catch (err) {
    server.log.error(err, `Failed to start server at PORT ${PORT}`);
    process.exit(1);
  }
};

start();
