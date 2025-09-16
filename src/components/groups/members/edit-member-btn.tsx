import { Edit3 } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from 'sonner'
import db, { type Group } from '@/db'
import { cn } from '@/lib/utils'

export function EditMemberButton({
  className,
  group,
  member
}: React.ComponentProps<'svg'> & { group: Group, member: string }) {
  const [name, setName] = useState(member)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit3 className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Edit Member <em>{member}</em></DialogTitle>
        </DialogHeader>
        <div className='grid gap-2'>
          <Label htmlFor='member-name'>Name</Label>
          <Input id='member-name' name='name'
            value={name} onChange={e => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' onClick={_ => setName(member)}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='success' onClick={_ => {
              if (!name) {
                toast.error('Name cannot be blank')
                return
              }
              const otherMembers = group.members.filter(n => n !== member)
              if (otherMembers.includes(name)) {
                toast.error('The group already contains somebody with that name')
                return
              }
              db.groups.update(group.id, {
                members: [...otherMembers, name].sort()
              })
              toast.success(`Successfully saved changes`)
            }}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}