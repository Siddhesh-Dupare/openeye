import { defineConfig } from "vitest/config";
import "dotenv/config";

export default defineConfig({
  test: {
    env: {
      DB_HOST: "localhost",
      DB_PORT: "5432",
      DB_USER: "openeye",
      DB_PASSWORD: "openeye_dev_password",
      DB_NAME: "openeye_test"
    }
  }
});
