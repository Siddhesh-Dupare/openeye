# Open Eye

Open Eye is a full-stack application with a Next.js frontend and a separate
Fastify API backed by Neon Postgres.

## Project structure

```text
open-eye/
├── app/              # Next.js frontend
├── api/              # Fastify backend and database code
│   ├── lib/db/       # Drizzle schema and database client
│   ├── src/routes/   # HTTP routes
│   ├── src/services/ # Application/database services
│   ├── tests/        # Vitest tests
│   └── drizzle/      # Generated Drizzle migrations
└── .gitignore
```

## Tech stack

### Frontend (`app/`)

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- ESLint

### Backend (`api/`)

- Node.js
- Fastify
- TypeScript
- Zod for validation
- Vitest for testing

### Database

- Neon Postgres
- Drizzle ORM
- Drizzle Kit for schema and migration management
- `@neondatabase/serverless` for database access

## Prerequisites

- Node.js 20 or newer
- npm
- A Neon project and database

## Setup

Clone the repository and install dependencies separately for the frontend and
backend:

```bash
git clone <repository-url>
cd openeye

cd api
npm install

cd ../app
npm install
```

Create `api/.env` with your Neon connection strings:

```env
# Pooled URL for application queries
DATABASE_URL=postgresql://...

# Direct, non-pooled URL for Drizzle schema operations
DATABASE_URL_UNPOOLED=postgresql://...
```

Do not commit `api/.env`, `.neon`, or database credentials.

## Database workflow

Drizzle configuration and schema files belong in `api/`.

Generate a migration after changing the schema:

```bash
cd api
npx drizzle-kit generate
```

Review the generated SQL in `api/drizzle/`, then apply the schema to the
configured database:

```bash
npx drizzle-kit push
```

Use the direct `DATABASE_URL_UNPOOLED` connection for schema operations. Keep
the pooled `DATABASE_URL` for normal application traffic.

## Running the project

Start the API:

```bash
cd api
npm run dev
```

The API runs on `http://localhost:3000` by default. Set `PORT` in the
environment to use another port.

Start the Next.js app in a second terminal:

```bash
cd app
npm run dev
```

The frontend also defaults to `http://localhost:3000`. If both services run
locally at the same time, configure one of them to use a different port.

## Testing and quality checks

Run the API tests:

```bash
cd api
npm test
```

Run API tests in watch mode:

```bash
npm run test:watch
```

Run the frontend linter:

```bash
cd app
npm run lint
```

API route tests use mocked services for fast, deterministic checks. Use an
isolated Neon branch or test database for integration tests that verify real
CRUD operations and database constraints. Do not run automated destructive
tests against production data.

## API endpoints

The current API includes:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health-style welcome response |
| `GET` | `/users` | Return users |
| `GET` | `/goals` | Return goals |

## Git notes

The `app/` directory contains its own Git repository. Frontend changes should
be committed from `app/`, while backend and root-level changes should be
committed from the parent repository.
