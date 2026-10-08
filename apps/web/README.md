# OpenEye

The OpenEye web application is a Next.js frontend for the OpenEye AI workspace. It provides the application shell, responsive sidebar navigation, welcome experience, and chat composer UI.

## Technology stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) with strict type checking
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) component patterns
- [Base UI](https://base-ui.com/) primitives
- [Lucide React](https://lucide.dev/) icons
- [ESLint](https://eslint.org/) with the Next.js configuration

## Prerequisites

Install the following before setting up the project:

- Node.js 20.9 or newer
- npm 10 or newer
- Git

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

From the repository root, move into the frontend application:

```bash
cd apps/web
```

Install the locked dependency versions:

```bash
npm ci
```

## Run the development server

Start the frontend in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Next.js will refresh the page automatically as files are edited.

## Available scripts

Run these commands from `apps/web`:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run lint` | Runs ESLint |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Serves the production build locally |

To verify a production build:

```bash
npm run lint
npm run build
npm run start
```

## Project structure

```text
apps/web/
├── app/
│   ├── globals.css       # Global styles and Tailwind theme tokens
│   ├── layout.tsx        # Root layout, fonts, and sidebar provider
│   └── page.tsx          # Main welcome screen route
├── components/
│   ├── chat/             # Chat and welcome experience components
│   ├── sidebar/          # Application sidebar components
│   └── ui/               # Reusable shadcn/ui components
├── public/               # Static assets
├── package.json          # Scripts and dependencies
├── postcss.config.mjs    # Tailwind CSS PostCSS configuration
└── tsconfig.json         # TypeScript configuration and path aliases
```

The `@/*` import alias points to the `apps/web` directory. For example:

```tsx
import { Button } from "@/components/ui/button";
```

## Styling and components

Global design tokens are defined in `app/globals.css`. Reusable UI primitives live in `components/ui`, while product-specific components should live in a relevant feature folder such as `components/chat` or `components/sidebar`.

Prefer the existing shadcn/ui components and Tailwind utility classes when adding new UI. Keep components typed with TypeScript and use Lucide icons for interface actions.

## Environment variables

The current frontend does not require environment variables for the default local experience. If a future integration adds environment-specific configuration, create a local `.env.local` file and document each required variable here. Do not commit secrets or `.env.local` files.

## Production deployment

Build and run the application with:

```bash
npm ci
npm run build
npm run start
```

The frontend can be deployed to any platform that supports a Node.js Next.js application. For Vercel deployments, set the project root to `apps/web` when configuring the repository.

## Troubleshooting

- If dependencies are out of sync, remove `node_modules` and run `npm ci` again.
- If port `3000` is already in use, start Next.js on another port:

  ```bash
  npm run dev -- --port 3001
  ```

- If linting or builds fail, confirm that you are running commands from `apps/web` and using a supported Node.js version.
