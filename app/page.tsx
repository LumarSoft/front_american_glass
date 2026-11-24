import { BrandName } from '@/src/components/brand-name'

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-b from-background to-muted/60 px-6 text-center">
      <BrandName className="text-4xl sm:text-5xl" />
      <div className="h-px w-16 bg-primary/60" />
      <p className="text-sm font-medium tracking-[0.3em] text-primary uppercase">Próximamente</p>
      <p className="max-w-md text-muted-foreground">
        Estamos preparando nuestro nuevo sitio. Muy pronto vas a encontrar acá toda la información.
      </p>
    </main>
  )
}
