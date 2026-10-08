import { afterAll, describe, expect, it } from "vitest";
import { pool } from "../src/db";

describe("Test databse connection", () => {
  it("should connect to the test database", async () => {
    const result = await pool.query("SELECT current_database()");

    expect(result.rows[0].current_database).toBe("openeye_test");
  });

  afterAll(async () => {
    await pool.end();
  });
});
