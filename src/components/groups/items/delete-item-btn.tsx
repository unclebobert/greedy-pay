import { Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import db, { type Group, type Item } from '@/db'
import { cn } from '@/lib/utils'

export function DeleteItemButton({
  className,
  group,
  item
}: React.ComponentProps<'svg'> & { group: Group, item: Item }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-11/12 flex flex-col'>
        <DialogHeader>
          <DialogTitle>Delete Item <em>{item.name}</em></DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={_ => {
              db.groups.update(group.id, {
                items: group.items.filter(n => n.name !== item.name)
              })
              toast.success(`Successfully saved changes`)
            }}>
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}