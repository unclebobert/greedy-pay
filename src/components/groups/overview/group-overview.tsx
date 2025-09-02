import { EditGroupButton } from '@/components/groups/overview/edit-group-btn'
import { DeleteGroupButton } from '@/components/groups/overview/delete-group-btn'
import { ExportGroupButton } from '@/components/groups/overview/export-group-btn';

import type { Group } from '@/db';

export function GroupOverview({ group }: { group: Group }) {
  return (
    <>
      <div className='flex mb-2 gap-2 items-end'>
        <h1 className='text-3xl font-semibold'>
          {group.name}
        </h1>
        <EditGroupButton group={group} className='size-6 ml-4' />
        <DeleteGroupButton group={group} className='size-6' />
        <ExportGroupButton group={group} className='size-6' />
      </div>
      <div>Created {group.created.toLocaleString()}</div>
      <div className='text-sm text-muted-foreground'>{group.description}</div>
    </>
  )
}