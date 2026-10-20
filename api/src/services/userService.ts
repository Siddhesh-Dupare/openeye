export function getUsers() {
  const users = pool.query(
    `
    SELECT
      id,
      name,
      created_at
    FROM users
    ORDER BY created_at DESC
    `,
  );

  return users;
}
