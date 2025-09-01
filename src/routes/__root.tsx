import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </div>
  ),
})
