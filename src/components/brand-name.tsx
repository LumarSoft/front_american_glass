import { cn } from '@/src/lib/utils'

// Text wordmark until the client hands over its logo.
export function BrandName({ className }: { className?: string }) {
  return (
    <span className={cn('font-display font-semibold tracking-tight text-foreground', className)}>American Glass</span>
  )
}
