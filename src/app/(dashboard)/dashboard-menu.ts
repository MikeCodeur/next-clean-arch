import {roleHierarchy} from '@/services/authentification/auth-service'
import {RoleEnum} from '@/services/authentification/type'

//2. 🚀 Menu Dynamique - Configuration
export interface MenuItem {
  label: string
  href: string
}
export const dashboardMenu: Record<RoleEnum, MenuItem[]> = {
  [RoleEnum.GUEST]: [{label: 'Home', href: '/'}],
  [RoleEnum.USER]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Bank', href: '/bank'},
  ],
  [RoleEnum.ADMIN]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Admin', href: '/shop-admin/1'},
  ],
  [RoleEnum.REDACTOR]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Redactor', href: '/redactor'},
  ],
  [RoleEnum.MODERATOR]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Admin', href: '/shop-admin/1'},
  ],
  [RoleEnum.MANAGER]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Quick Add', href: '/shop-admin/quick'},
  ],
  [RoleEnum.SUPER_ADMIN]: [
    {label: 'Home', href: '/'},
    {label: 'Dashboard', href: '/dashboard'},
    {label: 'Admin', href: '/shop-admin/1'},
  ],
}

export function getMenuByRole(userRole: RoleEnum): MenuItem[] {
  // Définir la hiérarchie des rôles

  const roleIndex = roleHierarchy.indexOf(userRole)

  if (roleIndex === -1) return []

  // Accumuler tous les menus accessibles
  const allMenus = roleHierarchy
    .slice(0, roleIndex + 1)
    .flatMap((role) => dashboardMenu[role])

  // Supprimer les doublons en fonction de `href`
  const uniqueMenus = [
    ...new Map(allMenus.map((menu) => [menu.href, menu])).values(),
  ]

  return uniqueMenus
}
