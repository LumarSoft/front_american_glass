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

## Rules

- No commented-out code in any commit
- No `console.log` in any commit
- One PR = one responsibility — do not mix a new feature with a refactor
- PR title must follow the same Conventional Commits format
