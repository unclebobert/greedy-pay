import { Edit3 } from 'lucide-react'
import { type Group, type Item } from '@/db'
import { cn } from '@/lib/utils'
import { ItemDataDialog } from './item-data-dialog'

export function EditItemButton({
  className,
  group,
  item
}: React.ComponentProps<'svg'> & { group: Group, item: Item }) {
  return (
    <ItemDataDialog title={<>Edit Item <em>{item.name}</em></>} group={group} item={item}>
      <Edit3 className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')} />
    </ItemDataDialog>
  )
}