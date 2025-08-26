import { Trash } from 'lucide-react'
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
import { DialogDescription } from '@radix-ui/react-dialog'

export function DeleteGroupButton({ group }: { group: Group }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash className='hover:text-muted-foreground cursor-pointer my-[0.2rem]' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete <em>{group.name}</em>?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will permanently erase all data associated with this group.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={_ => {
              db.groups.delete(group.id)
              toast.success('Group successfully deleted')
            }}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}