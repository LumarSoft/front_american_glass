<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Reglas de trabajo

1. Trabajar en una rama propia creada desde `master` actualizado, nunca directo sobre `master`.
2. Hacer los cambios y ejecutar las verificaciones (`pnpm lint`, `pnpm build`). Si el cambio es visual, revisarlo en el
   navegador.
3. Commitear, pushear la rama y abrir un PR a `master`. Confirmar que el push terminó correctamente.
4. Mergear solo con el PR revisado y las verificaciones en verde.
5. Pushear o mergear no autoriza desplegar: desplegar solo si el usuario lo pide explícitamente.
