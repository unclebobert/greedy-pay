import { Button } from '@/components/ui/button'
import db from '@/db'
import { createFileRoute } from '@tanstack/react-router'
import { useLiveQuery } from 'dexie-react-hooks'

export const Route = createFileRoute('/group/$groupId')({
  component: Group,
})

function Group() {
  const { groupId: groupIdRaw } = Route.useParams()
  const groupId = parseInt(groupIdRaw)
  const group = useLiveQuery(() => db.groups.get(groupId))
  return (
    <div>
      <Button onClick={() => db.groups.delete(groupId)}>Delete Group</Button>
      {JSON.stringify(group)}
    </div>
  )
}
