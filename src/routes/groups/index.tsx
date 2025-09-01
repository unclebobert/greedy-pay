import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'

import db from '@/db'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { NewGroupButton } from '@/components/groups/new-group-btn'
import { GroupList } from '@/components/groups/group-list'

export const Route = createFileRoute('/groups/')({
  component: Groups,
})

function Groups() {
  const groups = useLiveQuery(() => db.groups.toArray()) || []
  return (
    <>
      <div className='w-full h-full px-8 py-16 sm:py-8 flex justify-center'>
        <Card className='w-full max-w-lg'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              Groups
            </CardTitle>
            <CardAction>
              <NewGroupButton />
            </CardAction>
          </CardHeader>
          <CardContent className='overflow-y-auto'>
            <GroupList groups={groups} />
          </CardContent>
        </Card>
      </div>
    </>
  )
  // return (
  //   <div className='w-full h-full px-8 py-16 sm:py-8 flex justify-center'>
  //     <AppLogo className='size-8' />
  //     <Card className='w-full max-w-lg'>
  //       <CardHeader>
  //         <CardTitle className='text-2xl'>
  //           Groups
  //         </CardTitle>
  //         <CardAction>
  //           <NewGroupButton />
  //         </CardAction>
  //       </CardHeader>
  //       <CardContent className='overflow-y-auto'>
  //         <GroupList groups={groups} />
  //       </CardContent>
  //     </Card>
  //   </div>
  // )
}
