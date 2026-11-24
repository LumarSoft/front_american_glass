# Git

## Commit format (Conventional Commits)

- `feat:` new feature
- `fix:` bug fix
- `chore:` tooling, dependencies, config
- `refactor:` code change with no behavior change
- `docs:` documentation only
- `style:` formatting (should be rare — Prettier handles this automatically)
- `test:` adding or fixing tests

Examples:

- `feat: add conversation list view with filters`
- `fix: correct date format in contact form`
- `refactor: extract useContactSearch hook from ContactList`

## Branches

- One branch per task, created from an up-to-date `master`: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`
- Never commit directly to `master`: open a PR and get it reviewed by a teammate

## Rules

- No commented-out code in any commit
- No `console.log` in any commit
- One PR = one responsibility — do not mix a new feature with a refactor
- PR title must follow the same Conventional Commits format
