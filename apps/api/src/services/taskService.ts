import { pool } from "../db.js";

export async function getTasks() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      title,
      description,
      status,
      priority,
      due_at,
      created_at,
      updated_at
    FROM tasks
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

export async function createTask(
  goalId: string,
  title: string,
  description: string | undefined
) {
  const result = await pool.query(
    `
    INSERT INTO tasks (goal_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING
      id,
      goal_id,
      title,
      description,
      status,
      priority,
      due_at,
      created_at,
      updated_at
    `,
    [goalId, title, description]
  );

  return result.rows[0];
}
