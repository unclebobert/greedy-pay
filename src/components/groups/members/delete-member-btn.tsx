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
  const reasons: string[] = []
  for (const item of group.items) {
    if (Object.keys(item.owees).includes(member)) {
      reasons.push(`Is owed money for item "${item.name}"`)
    }
    // else if the item is being split equally amongst all, can delete
    // since it will redistribute
    if (!item.owers) continue
    // else if item is a being manually split,
    // can delete only if person is not included
    if (
      (item.owers instanceof Array && item.owers.includes(member)) ||
      !(item.owers instanceof Array) && Object.keys(item.owers).includes(member)
    ) {
      reasons.push(`Is explicitly listed as an debtor for item "${item.name}"`)
    }
  }
  return (
    <Dialog>
      {reasons.length === 0 ?
        <DialogTrigger asChild>
          <Trash2 className={cn(className, 'my-1 hover:text-muted-foreground cursor-pointer')}/>
        </DialogTrigger> :
        <Tooltip>
          <TooltipTrigger asChild>
            <Trash2 className={cn(className, 'my-1 text-muted-foreground')}/>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {member} cannot be deleted for the following reasons:
              <ul className='list-disc list-inside mt-2'>
                {reasons.map((r, i) => <li key={`reason_${i}`}>{r}</li>)}
              </ul>
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