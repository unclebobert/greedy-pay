import { createFileRoute } from '@tanstack/react-router'

import { NewGroupButton } from '@/components/groups/new-group-btn'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='w-full min-h-full flex flex-col justify-center items-center gap-8'>
      <h1 className='text-3xl font-semibold'>
        Create a new group to split bills better
      </h1>
      <NewGroupButton className='size-16' />
    </div>
  )
}
