# American Glass · Frontend

Sitio público y panel de administración de American Glass, hecho con Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 y shadcn/ui.

El backend está en un repo aparte, `api_american_glass` (NestJS + Prisma + MySQL), que también incluye el bot de WhatsApp.

## Requisitos

- Node.js 22
- pnpm
- El backend corriendo en `http://localhost:3001` para poder ingresar al panel

## Primeros pasos

```bash
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:3001
pnpm install
pnpm dev                     # http://localhost:3000
```

## Scripts

| Comando      | Qué hace                     |
| ------------ | ---------------------------- |
| `pnpm dev`   | Servidor de desarrollo       |
| `pnpm build` | Build de producción          |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint`  | ESLint                       |

Prettier corre solo en cada commit (Husky + lint-staged).

## Rutas

- `/` — landing pública (por ahora, "Próximamente").
- `/admin/login` — ingreso al panel con email y contraseña.
- `/admin` — panel protegido: Inicio y Conversaciones (la bandeja de WhatsApp, todavía sin hacer).

Las convenciones del proyecto están en `CLAUDE.md` y en `docs/rules/`.
