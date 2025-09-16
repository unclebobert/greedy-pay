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
import db, { type Group } from '@/db'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export function DeleteMemberButton({
  className,
  group,
  member
}: React.ComponentProps<'svg'> & { group: Group, member: string }) {
  const deletable = group.items.every(item => {
    // if person needs to be paid, not deletable
    if (Object.keys(item.owees).includes(member)) return false
    // else if the item is being split equally amongst all, can delete
    // since it will redistribute
    if (!item.owers) return true
    // else if the item is being split equally among some, can delete only if
    // person is not included 
    if (item.owers instanceof Array) return !item.owers.includes(member)
    // else if item is a being manually split, can delete only if person is not
    // included
    return !Object.keys(item.owers).includes(member)
  })
  return (
    <Dialog>
      {deletable ?
        <DialogTrigger asChild>
          <Trash2 className={cn(className, 'my-1 hover:text-muted-foreground cursor-pointer')}/>
        </DialogTrigger> :
        <Tooltip>
          <TooltipTrigger asChild>
            <Trash2 className={cn(className, 'my-1 text-muted-foreground')}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {member} cannot be deleted as they are still <br />
              explicitly participating in the splitting of an item
            </p>
          </TooltipContent>
        </Tooltip>
      }
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Delete Member <em>{member}</em></DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={_ => {
              const otherMembers = group.members.filter(n => n !== member)
              db.groups.update(group.id, {
                members: [...otherMembers].sort()
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