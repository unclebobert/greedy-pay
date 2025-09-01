import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'

import db from '@/db'
import { EditGroupButton } from '@/components/groups/edit-group-btn'
import { LoaderCircle } from 'lucide-react'
import { DeleteGroupButton } from '@/components/groups/delete-group-btn'

export const Route = createFileRoute('/$groupId')({
  component: Group,
})

function Group() {
  const { groupId: groupIdRaw } = Route.useParams()
  const groupId = parseInt(groupIdRaw)
  const group = useLiveQuery(() => db.groups.get(groupId), [groupId])
  return (
    <div className='w-full h-full px-16 py-12'>
      {group ?
        <>
          <div className='flex mb-2 gap-2 items-end'>
            <h1 className='text-3xl font-semibold'>
              {group.name}
            </h1>
            <EditGroupButton group={group} className='size-6 ml-4' />
            <DeleteGroupButton group={group} className='size-6' />
          </div>
          <h2>Created {group.created.toLocaleString()}</h2>
          <h3 className='text-sm text-muted-foreground'>{group.description}</h3>
        </> :
        <LoaderCircle className='animate-spin m-auto size-24' />
      }
    </div>
  )
}
