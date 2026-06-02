# Frontend — Inventory & Order Management SPA

React 18 + Vite + JavaScript (ES2022, no TypeScript) + Redux Toolkit + React Hook Form + Zod + shadcn/ui + Tailwind + MSW.

## Prerequisites

- Node 20 or newer
- npm 10 or newer

## Setup

```bash
npm ci
cp .env.example .env
```

`.env` only needs `VITE_API_BASE_URL`. In dev, MSW intercepts requests in the browser, so this rarely matters.

## Run

```bash
npm run dev
```

- App: `http://localhost:5173`
- MSW is enabled automatically in dev (`src/main.jsx` bootstraps it before React mounts).
- Seeded login: `admin@example.com` / `admin123` (MSW mock; the real backend uses `SEED_ADMIN_*`).

## Tests

```bash
npm test          # vitest run
npm run test:watch
```

MSW also runs against tests via `src/test/setup.js`.

## Lint / format

```bash
npm run lint
npm run fmt
```

## Build

```bash
npm run build
npm run preview
```

Build is plain Vite build (no TypeScript compile step). The Docker image serves the dist through nginx.

## shadcn

Add components only via composition, never edit `src/components/ui/*`:

```bash
npx shadcn@latest add <component>
```

## Layout

```
src/
  components/
    layout/       AppShell, NotFoundPage
    ui/           shadcn-generated (do not edit)
  features/
    auth/         worked-example slice (login, route guard, RTK)
    customers/    pages + table + form + slice + thunks
    dashboard/    summary cards + low-stock table
    orders/       list / create / detail + cancel dialog
    products/     pages + table + form + slice + thunks
    shared/       cross-feature types, api-error, formatters
  lib/            apiClient, auth-storage, cn, debounce
  mocks/          MSW server + handlers + seeded db
  store/          configureStore + typed hooks
  test/           vitest setup + (factories — add as needed)
```

## Docker

To run alongside the backend, Postgres and Redis use `docker compose up` from the project root.
