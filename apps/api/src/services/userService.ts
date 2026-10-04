import { pool } from "../db.js";

export async function getUsers() {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      created_at
    FROM users
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

export async function createUser(
  name: string
) {
  const result = await pool.query(
    `
    INSERT INTO users (name)
    VALUES ($1)
    RETURNING
      id,
      name,
      created_at
    `,
    [name]
  );

  return result.rows[0];
}
