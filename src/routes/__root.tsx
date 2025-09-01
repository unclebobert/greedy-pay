import { AppSidebar, AppSidebarOpen } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <AppSidebarOpen />
        <Outlet />
      </SidebarProvider>
    </div>
  ),
})
