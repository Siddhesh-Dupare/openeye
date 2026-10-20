import { FastifyInstance } from "fastify";
import { getUsers } from "../services/userService";
import { userSchema } from "../schema/user";

export default function userRoute(server: FastifyInstance) {
  server.get("/users", async () => {
    const users = await getUsers();

    const result = userSchema.safeParse(users);

    if (!result.success) {
      server.log.error(result.error);
      throw new Error("Invalid user data returned from database");
    }

    return result.data;
  });
}
