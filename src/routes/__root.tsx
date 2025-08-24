import { ThemeButton } from '@/components/theme-button'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen'>
      <Outlet />
      <ThemeButton />
    </div>
  ),
})
