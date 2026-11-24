'use client'

import { LayoutDashboard } from 'lucide-react'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useCurrentUser } from '../hooks/use-current-user'
import { PanelPlaceholder } from './panel-placeholder'

export function AdminHome() {
  const { data: user, isLoading } = useCurrentUser()

  return (
    <div className="flex flex-col gap-6 p-6">
      {isLoading ? (
        <Skeleton className="h-8 w-48" />
      ) : (
        <h1 className="font-display text-2xl font-semibold tracking-tight">Hola{user ? `, ${user.name}` : ''}</h1>
      )}
      <PanelPlaceholder
        icon={LayoutDashboard}
        title="Todavía no hay nada para mostrar"
        description="Acá vas a ver el resumen de la actividad cuando esté listo."
      />
    </div>
  )
}
