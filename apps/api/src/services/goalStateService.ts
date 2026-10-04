import { pool } from "../db.js";

export async function getGoalStates() {
  const result = await pool.query(
    `
    SELECT
      id,
      goal_id,
      state,
      created_at,
      updated_at
    FROM goal_states
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}
