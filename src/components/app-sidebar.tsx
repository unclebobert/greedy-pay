import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { AppLogo } from './ui/app-logo';
import { ThemeButton } from './theme-button';
import { ArrowLeft } from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='pt-4'>
        <ArrowLeft className='cursor-pointer hover:text-muted-foreground'
          onClick={() => {
            history.back()
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        aaa
      </SidebarContent>
      <SidebarFooter className='pb-4'>
        <div className='flex gap-2'>
          <ThemeButton />
          <AppLogo className='ml-auto size-8' />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}