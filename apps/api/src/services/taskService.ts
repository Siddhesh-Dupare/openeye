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

type UpdateTaskParams = {
  title?: string;
  description?: string | null;
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  priority?: "low" | "medium" | "high";
  dueAt?: string | null;
}

export async function updateTask(
  taskId: string,
  data: UpdateTaskParams,
) {
  const fields: string[] = [];
  const values: unknown[] = [taskId];

  if (data.title !== undefined) {
    fields.push(`title = $${values.length + 1}`);
    values.push(data.title);
  }

  if (data.description !== undefined) {
    fields.push(`description = $${values.length + 1}`);
    values.push(data.description);
  }

  if (data.status !== undefined) {
    fields.push(`status = $${values.length + 1}`);
    values.push(data.status);
  }

  if (data.priority !== undefined) {
    fields.push(`priority = $${values.length + 1}`);
    values.push(data.priority);
  }

  if (data.dueAt !== undefined) {
    fields.push(`due_at = $${values.length + 1}`);
    values.push(data.dueAt);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push(`updated_at = NOW()`);

  const result = await pool.query(
    `
    UPDATE tasks
    SET
      ${fields.join(",\n      ")}
    WHERE id = $1
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
    values,
  );

  return result.rows[0];
}
