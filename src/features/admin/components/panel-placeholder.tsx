import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/src/components/ui/card'

interface PanelPlaceholderProps {
  icon: LucideIcon
  title: string
  description: string
}

// Empty state for panel sections that are not built yet.
export function PanelPlaceholder({ icon: Icon, title, description }: PanelPlaceholderProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <h2 className="font-display text-base font-medium">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
