# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project

American Glass — public website and admin panel (the panel will host the WhatsApp inbox).
This repo is the **frontend** (`front_american_glass`). The backend lives in a separate repo (`api_american_glass`) built with NestJS + Prisma + MySQL; it also contains the WhatsApp bot as a module.

The client's business details are not defined yet: the public site is a placeholder and the brand palette in `app/globals.css` is a neutral one with a placeholder blue accent.

## Commands

```bash
pnpm dev          # Start dev server (Turbopack, http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint directly
```

Use **pnpm** only (the lockfile is `pnpm-lock.yaml`).

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_API_URL` — base URL of the backend (`http://localhost:3001` in development).

## Stack

- **Framework**: Next.js 16 App Router (React 19)
- **Styling**: Tailwind CSS v4 + shadcn/ui (`components.json`, style `radix-nova`)
- **Language**: TypeScript (strict mode)
- **API communication**: native `fetch` to the NestJS backend through `src/lib/api-client.ts`
- **State management**: TanStack Query for server state, useState/useReducer for local state
- **Theme**: next-themes (`class` attribute, light/dark/system); toasts with sonner; icons with lucide-react

## Architecture

```
app/
  page.tsx                  # public landing (placeholder)
  admin/
    login/                  # /admin/login
    (panel)/                # protected panel: /admin, /admin/conversaciones
src/
  components/               # shared components (ui/ = shadcn and other generic UI)
  features/<domain>/        # domain modules: components/, hooks/, context/, lib/
  hooks/                    # shared hooks
  services/                 # API calls (one file per domain), components never fetch directly
  lib/                      # api-client, query keys, utils
  types/api/                # request/response types of the API
proxy.ts                    # route guard for /admin/* (Next 16 "middleware")
```

Path alias `@/*` resolves to the repo root, so imports look like `@/src/components/ui/button`.

## Admin authentication

- `POST /auth/login` `{ email, password }` → `{ accessToken, user: { id, email, name } }` (401 on bad credentials).
- `GET /auth/me` with `Authorization: Bearer <token>` → `{ id, email, name }`.
- The token is stored in the `admin_token` cookie (`src/lib/admin-token.ts`) so `proxy.ts` can guard `/admin/*` (everything except `/admin/login`) before rendering. The proxy check is optimistic (presence + JWT `exp`); the API validates the token on every call.
- `AuthProvider` (`src/features/admin/context/auth-context.tsx`) exposes the token, `login` and `logout`; it clears the TanStack Query cache on every session change and ends the session when the API answers 401 to the current token.
- Pass the token explicitly to service functions (`authService.me(token)`); services use `apiRequest` from `src/lib/api-client.ts`.

## Code conventions

- Functional components only, no class components
- Custom hooks for logic extraction — no business logic inside components
- `src/services/` makes every API call; components never call `fetch` directly
- No prop drilling beyond 2 levels — use context or TanStack Query
- Files: `kebab-case`. Components: `PascalCase`. Functions/variables: `camelCase`
- Always type with TypeScript; `any` is forbidden
- Code, comments and identifiers in English; user-facing UI text in Spanish (rioplatense: "Iniciá sesión", "Ingresá")

## Formatting

Prettier is enforced on every commit via Husky + lint-staged. Config in `.prettierrc`:

```json
{
  "singleQuote": true,
  "arrowParens": "avoid",
  "printWidth": 120,
  "semi": false,
  "endOfLine": "lf"
}
```

Never modify formatting manually — always let Prettier handle it.

## Next.js 16 Breaking Changes

- **Async Request APIs** — `cookies()`, `headers()`, `params`, `searchParams` are Promises. Always `await` them.
- **`middleware` → `proxy`** — The file is `proxy.ts`, its export is `proxy`.
- **Turbopack is default** — no flag needed. Use `--webpack` to opt out.
- **Parallel route slots** — All `@slot` directories require explicit `default.js`.
- **`next lint` removed** — use `eslint` directly.
- **`error.tsx`** — receives `retry()` (stable since 16.3) to re-fetch and re-render the segment.

## Tailwind CSS v4

Use `@import "tailwindcss"`. Theme tokens go inside `@theme inline { ... }` in CSS. Colors come from the shadcn tokens in `app/globals.css` (`background`, `foreground`, `primary`, `muted`, `border`…) with a `.dark` variant: no hex values or `bg-white`/`text-black` in components.

## ESLint

Flat config only (`eslint.config.mjs`). No `.eslintrc.*` files.

## Development rules

@docs/rules/code-style.md
@docs/rules/components.md
@docs/rules/state-management.md
@docs/rules/data-fetching.md
@docs/rules/error-handling.md
@docs/rules/performance.md
@docs/rules/git.md
