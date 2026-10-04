import Fastify from "fastify";

import { userRoutes } from "./routes/users.js";
import { goalRoutes } from "./routes/goals.js";
import { taskRoutes } from "./routes/tasks.js";
import { evidenceRoutes } from "./routes/evidences.js";
import { goalStateRoutes } from "./routes/goalStates.js";

const server = Fastify({
  logger: true,
});

await server.register(userRoutes);
await server.register(goalRoutes);
await server.register(taskRoutes);
await server.register(evidenceRoutes);
await server.register(goalStateRoutes);

const start = async () => {
  try {
    await server.listen({
      port: 3001,
      host: "127.0.0.1",
    });
  } catch (error) {
    server.log.error(error, "Failed to start server");
    process.exit(1);
  }
};

start();
