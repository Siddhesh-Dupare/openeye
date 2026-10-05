import { pool } from "../db.js";

type CreateStateEventParams = {
  goalId: string;
  eventType: string;
  description?: string;
  data?: Record<string, unknown>;
};

export async function getStateEvents() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      event_type,
      description,
      data,
      created_at
    FROM state_events
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

export async function createStateEvent(
  params: CreateStateEventParams
) {
  const result = await pool.query(
    `
    INSERT INTO state_events (goal_id, event_type, description, data)
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      goal_id,
      event_type,
      description,
      data,
      created_at
    `,
    [params.goalId, params.eventType, params.description, params.data ?? {}]
  );

  return result.rows[0];
}
