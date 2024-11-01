import { IconHome, IconBalance, IconSettings, IconLogout } from "@/icons/index"

export const items = [
  {url: '/inicio', texto: 'inicio', icon: <IconHome />},
  {url: '/balance', texto: 'balance', icon: <IconBalance />},
  {url: '/configuracion', texto: 'Configuración', icon: <IconSettings />},
]

export const itemLogout = [
  {url: '/', texto: 'Cerrar sesión', icon: <IconLogout />}
]