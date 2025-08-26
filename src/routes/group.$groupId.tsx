import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'

import db from '@/db'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { EditGroupButton } from '@/components/group/edit-group-btn'
import { LoaderCircle } from 'lucide-react'
import { DeleteGroupButton } from '@/components/group/delete-group-btn'

export const Route = createFileRoute('/group/$groupId')({
  component: Group,
})

function Group() {
  const { groupId: groupIdRaw } = Route.useParams()
  const groupId = parseInt(groupIdRaw)
  const group = useLiveQuery(() => db.groups.get(groupId))
  return (
    <div className='w-full h-full px-8 py-16 sm:px-16 sm:py-8 flex justify-center'>
      <Card className='w-full'>
        {group ?
          <>
            <CardHeader>
              <CardTitle className='text-2xl overflow-ellipsis overflow-x-hidden'>
                {group.name}
              </CardTitle>
              <CardAction className='flex gap-3 align-middle'>
                <EditGroupButton group={group} />
                <DeleteGroupButton group={group} />
              </CardAction>
              <CardDescription>
                Created {group.created.toLocaleString()}
              </CardDescription>
              <CardDescription className='max-h-16 overflow-y-auto col-span-full'>
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='overflow-y-auto'>
              {JSON.stringify(group)}
            </CardContent>
          </> :
          <LoaderCircle className='animate-spin m-auto size-24' />
        }
      </Card>
    </div>
  )
}
