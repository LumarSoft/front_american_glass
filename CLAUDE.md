# CLAUDE.md

Guidance for Claude Code and for the team (Lumarsoft) working on this repository. Keep it current: when a decision,
a convention or a "where to change what" changes, update this file in the same PR.

## Project context

**Client:** American Glass. They came to us after seeing the WhatsApp bot we built for John Pellegrini (JPMG), and they
need **one** WhatsApp bot plus a panel to follow its conversations.

**Repositories** (both private, in the LumarSoft org, default branch `master`):

| Repo                              | What it is                                             | Local port |
| --------------------------------- | ------------------------------------------------------ | ---------- |
| `api_american_glass`              | NestJS API + the WhatsApp bot as a module (`src/bot/`) | 3001       |
| `front_american_glass` (this one) | Next.js app: public site + admin panel                 | 3000       |

The bot has no repo of its own (unlike John's `BOT_JPMG`): it lives inside the API. Everything the panel shows about
chats comes from the API.

**John's repos are the reference** for stack and conventions (`LumarSoft/front_John`, `LumarSoft/api_john`). When in
doubt about how a screen or pattern was solved there, look there first, then adapt: do not copy insurance-specific
screens or John's branding.

**Status (keep this list current):**

- Done: placeholder public site, `/admin/login`, protected panel shell (Inicio, Conversaciones as placeholders).
- Pending: WhatsApp inbox in Conversaciones (needs its API endpoints), the real public site, American Glass' branding
  (palette in `app/globals.css`, logo, favicon), production hosting.

## Running it locally

Requirements: Node 22, pnpm, and the API running on `http://localhost:3001` (see `api_american_glass/README.md`: it
needs MySQL, `prisma migrate dev` and `prisma db seed` for the first panel user).

```bash
pnpm install
cp .env.example .env.local    # NEXT_PUBLIC_API_URL=http://localhost:3001
pnpm dev                      # http://localhost:3000 → /admin/login
```

The public site works without the API; the panel login needs it.

## Team workflow

- **Branches:** one branch per task from an up-to-date `master` (`feat/inbox-list`, `fix/login-error-message`). Open a
  PR into `master`; at least one teammate reviews it. `master` must always build.
- **Commits and PR titles:** Conventional Commits in English (`feat: add conversation list`). One PR = one
  responsibility. See `docs/rules/git.md`.
- **Before pushing:** `pnpm lint && pnpm build`. Prettier runs on commit (Husky + lint-staged).
- **API contract:** the backend's `docs/endpoints.md` is the source of truth. A screen that needs a new endpoint goes
  with a PR in `api_american_glass`; link both PRs. Request/response types live in `src/types/api/`.
- **Secrets:** this is a browser app: anything in a `NEXT_PUBLIC_*` variable is public. Never put API keys or tokens
  there. Local values go in `.env.local` (gitignored); new variables go into `.env.example` with a comment.
- **UI changes** are checked in the browser (light and dark theme, and a phone-width screen) before opening the PR;
  attach a screenshot to the PR.
- **Production:** merging or pushing does not authorize a deploy. See `AGENTS.md`.
- **Personal notes for Claude** go in `CLAUDE.local.md` (gitignored), not here.

## Working with Claude Code

- Start non-trivial tasks by asking for a plan (plan mode) and review it before any code is written.
- Give it the context it cannot guess: which screen, which endpoint, the expected behavior, and what "done" is.
- Ask it to run the checks above and to open the page in the browser before declaring a UI task done; read its diff
  before committing.
- This is Next.js 16: its APIs differ from what models learned (see "Next.js 16 breaking changes" and `AGENTS.md`).
  When something looks off, have it read `node_modules/next/dist/docs/` instead of guessing.
- When it gets a convention wrong twice, write the rule down here or in `docs/rules/`.
- It must not deploy or push to `master` directly unless you asked for exactly that.

## Commands

```bash
pnpm dev          # Dev server (Turbopack, http://localhost:3000)
pnpm build        # Production build (also type-checks)
pnpm start        # Serve the production build
pnpm lint         # ESLint
```

Use **pnpm** only (the lockfile is `pnpm-lock.yaml`).

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

Adding a panel screen: page in `app/admin/(panel)/<route>/page.tsx` (thin: it renders a feature component), the
component and its hooks in `src/features/admin/`, the API calls in `src/services/`, the query keys in
`src/lib/query-keys.ts`, and the menu entry in `src/features/admin/lib/nav-items.ts`.

## Admin authentication

- `POST /auth/login` `{ email, password }` → `{ accessToken, user: { id, email, name } }` (401 on bad credentials).
- `GET /auth/me` with `Authorization: Bearer <token>` → `{ id, email, name }`.
- The token is stored in the `admin_token` cookie (`src/lib/admin-token.ts`) so `proxy.ts` can guard `/admin/*`
  (everything except `/admin/login`) before rendering. The proxy check is optimistic (presence + JWT `exp`); the API
  validates the token on every call.
- `AuthProvider` (`src/features/admin/context/auth-context.tsx`) exposes the token, `login` and `logout`; it clears the
  TanStack Query cache on every session change and ends the session when the API answers 401 to the current token.
- Pass the token explicitly to service functions (`authService.me(token)`); services use `apiRequest` from
  `src/lib/api-client.ts`.

## Code conventions

- Functional components only, no class components
- Custom hooks for logic extraction — no business logic inside components
- `src/services/` makes every API call; components never call `fetch` directly
- No prop drilling beyond 2 levels — use context or TanStack Query
- Files: `kebab-case`. Components: `PascalCase`. Functions/variables: `camelCase`
- Always type with TypeScript; `any` is forbidden
- Code, comments and identifiers in English; user-facing UI text in Spanish (rioplatense: "Iniciá sesión", "Ingresá")

## Formatting

Prettier is enforced on every commit via Husky + lint-staged (`.prettierrc`: single quotes, no semicolons,
`printWidth` 120, `arrowParens: avoid`). Never fix formatting by hand: let Prettier do it.

## Next.js 16 breaking changes

- **Async Request APIs** — `cookies()`, `headers()`, `params`, `searchParams` are Promises. Always `await` them.
- **`middleware` → `proxy`** — The file is `proxy.ts`, its export is `proxy`.
- **Turbopack is default** — no flag needed. Use `--webpack` to opt out.
- **Parallel route slots** — All `@slot` directories require explicit `default.js`.
- **`next lint` removed** — use `eslint` directly.
- **`error.tsx`** — receives `retry()` (stable since 16.3) to re-fetch and re-render the segment.

## Tailwind CSS v4

Use `@import "tailwindcss"`. Theme tokens go inside `@theme inline { ... }` in CSS. Colors come from the shadcn tokens in
`app/globals.css` (`background`, `foreground`, `primary`, `muted`, `border`…) with a `.dark` variant: no hex values or
`bg-white`/`text-black` in components.

## ESLint

Flat config only (`eslint.config.mjs`). No `.eslintrc.*` files.

## Development rules

@AGENTS.md
@docs/rules/code-style.md
@docs/rules/components.md
@docs/rules/state-management.md
@docs/rules/data-fetching.md
@docs/rules/error-handling.md
@docs/rules/performance.md
@docs/rules/git.md
