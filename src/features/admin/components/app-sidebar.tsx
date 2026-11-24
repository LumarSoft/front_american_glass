'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { BrandName } from '@/src/components/brand-name'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar'
import { Skeleton } from '@/src/components/ui/skeleton'
import { useAuth } from '../context/auth-context'
import { useCurrentUser } from '../hooks/use-current-user'
import { NAV_ITEMS } from '../lib/nav-items'

export function AppSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const { data: user, isLoading } = useCurrentUser()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="px-4 py-4">
        <BrandName className="text-lg" />
        <span className="text-xs text-muted-foreground">Panel de administración</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(item => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-0.5 px-2 py-1.5">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </>
          ) : (
            <>
              <span className="truncate text-sm font-medium">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            </>
          )}
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
