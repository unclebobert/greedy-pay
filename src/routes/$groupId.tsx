import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'

import { LoaderCircle } from 'lucide-react'

import { GroupView } from '@/components/groups/group-view'
import db from '@/db'

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
        <GroupView group={group} /> :
        <LoaderCircle className='animate-spin m-auto size-24' />
      }
    </div>
  )
}
