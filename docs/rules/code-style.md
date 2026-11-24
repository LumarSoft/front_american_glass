# Code style

## Naming conventions

- Files and folders: `kebab-case` (e.g. `conversation-list.tsx`, `use-current-user.ts`)
- React components: `PascalCase` (e.g. `ConversationList`, `LoginForm`)
- Functions, variables, hooks: `camelCase` (e.g. `fetchConversations`, `isLoading`, `useCurrentUser`)
- Constants: `UPPER_SNAKE_CASE` (e.g. `MAX_RETRY_COUNT`)
- Types and interfaces: `PascalCase`, prefix interfaces with `I` only if it adds clarity
- Everything (names, comments, variables) must be written in English

## TypeScript

- Strict mode always on
- Never use `any` — use `unknown` and narrow, or define the proper type
- Always type function parameters and return values explicitly
- Type API requests and responses in `src/types/`

## Logic

- Keep logic as simple as possible — if a function needs a comment to be understood, simplify it
- No duplicated logic — extract to a shared util or hook before copy-pasting
- Single responsibility: one function, one thing
- No commented-out code in commits
