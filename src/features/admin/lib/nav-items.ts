import { House, MessagesSquare, type LucideIcon } from 'lucide-react'

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Inicio', icon: House },
  { href: '/admin/conversaciones', label: 'Conversaciones', icon: MessagesSquare },
]

export function getNavTitle(pathname: string): string {
  return NAV_ITEMS.find(item => item.href === pathname)?.label ?? 'Panel'
}
