import { AppSidebar, AppSidebarOpen } from '@/components/sidebar/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <AppSidebarOpen />
        <div className={cn(
          'w-full',
          'md:peer-data-[state=expanded]:max-w-[calc(100%-var(--sidebar-width))]'
        )}>
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  ),
})
