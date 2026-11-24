'use client'

import { Button } from '@/src/components/ui/button'

export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Algo salió mal</h1>
      <p className="max-w-sm text-muted-foreground">Ocurrió un error inesperado. Probá de nuevo en unos segundos.</p>
      <Button onClick={() => retry()}>Reintentar</Button>
    </main>
  )
}
