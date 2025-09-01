import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AppLogo } from './ui/app-logo';
import { ThemeButton } from './theme-button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { NewGroupButton } from '@/components/groups/list/new-group-btn';
import { GroupList } from '@/components/groups/list/group-list';
import { useLiveQuery } from 'dexie-react-hooks';
import db from '@/db';
import { ImportGroupButton } from './groups/list/import-group-btn';

export function AppSidebar() {
  const nav = useNavigate()
  const groups = useLiveQuery(() => db.groups.toArray()) || []
  const { groupId } = useParams({ strict: false })
  return (
    <Sidebar>
      <SidebarHeader className='pt-2'>
        <ArrowLeft className='cursor-pointer hover:text-muted-foreground'
          onClick={() => {
            nav({ from: window.location.pathname as any, to: '..' })
          }}
        />
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <div className='mx-2'>
          <div className='flex mt-4'>
            <h1 className='text-3xl font-semibold ml-2'>
              Groups
            </h1>
            <div className='flex items-center gap-2 ml-6'>
              <NewGroupButton className='size-8' />
              <ImportGroupButton className='size-6' />
            </div>
          </div>
          <GroupList groups={groups} selected={parseInt(groupId || '-1')} />
        </div>
      </SidebarContent>
      <hr />
      <SidebarFooter className='pb-2'>
        <div className='flex gap-2'>
          <ThemeButton />
          <AppLogo className='ml-auto size-8' />
        </div>
      </SidebarFooter>
      <AppSidebarClose />
    </Sidebar>
  )
}

export function AppSidebarOpen() {
  const { open, isMobile, openMobile } = useSidebar()
  if ((isMobile && openMobile) || (!isMobile && open)) return <></>
  return <SidebarTrigger
    className='absolute top-[calc(50%-1rem)] size-12 w-6 rounded-l-none'
  />
}

function AppSidebarClose() {
  const { open, isMobile } = useSidebar()
  if (isMobile || !open) return <></>
  return (
    <SidebarTrigger className={`
      absolute top-[calc(50%-1rem)] size-12 w-6 rounded-l-none
      z-20 transition-all ease-linear translate-x-[0.5px]
      group-data-[side=left]:-right-6 group-data-[side=right]:left-0
    `} />
  )
}
