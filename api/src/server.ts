import Fastify from "fastify";
import userRoute from "./routes/userRoute";
import goalRoute from "./routes/goalRoute";

export function buildServer() {
  const server = Fastify({ logger: true });

  server.get("/", async () => ({
    message: "Hello",
  }));
  server.register(userRoute);
  server.register(goalRoute);

  return server;
}

export async function startServer(port = Number(process.env.PORT) || 3000) {
  const server = buildServer();

  try {
    await server.listen({ port });
    return server;
  } catch (error) {
    await server.close();
    throw error;
  }
}
