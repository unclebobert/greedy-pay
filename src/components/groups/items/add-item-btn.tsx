import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { type Group } from '@/db'
import { cn } from '@/lib/utils'
import { ItemDataDialog } from './item-data-dialog'

export function AddItemButton({
  className,
  group
}: React.ComponentProps<'svg'> & { group: Group }) {
  return (
    <ItemDataDialog title={'Add New Item'} group={group} item={{ name: '', owees: {} }}>
      <Plus className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')}
        onClick={e => {
          if (group.members.length === 0) {
            toast.error('Cannot create an item when there are no members in the group')
            e.stopPropagation()
            e.preventDefault()
          }
        }}
      />
    </ItemDataDialog>
  )
}