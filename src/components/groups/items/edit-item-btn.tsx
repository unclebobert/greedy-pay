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
import db, { type Group, type Item } from '@/db'
import { cn } from '@/lib/utils'
import { OweesList } from './owees-list'

export function EditItemButton({
  className,
  group,
  item
}: React.ComponentProps<'svg'> & { group: Group, item: Item }) {
  const [name, setName] = useState(item.name)
  const [owees, setOwees] = useState(item.owees)
  const [owers, setOwers] = useState(item.owers)

  return (
    <Dialog>
      <DialogTrigger asChild onClick={_ => {
        setOwees(item.owees)
        setOwers(item.owers)
      }}>
        <Edit3 className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Edit Item <em>{item.name}</em></DialogTitle>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='item-name'>Name</Label>
            <Input id='item-name' name='name' value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='creditors'>Creditors</Label>
            <OweesList group={group} owees={owees} setOwees={setOwees} />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='creditors'>Debtors</Label>
            <Input id='creditors' name='name' defaultValue='New Item'
              value={name} onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button variant='success' onClick={_ => {
            if (!name) {
              toast.error('Please give the item a name')
              return
            }
            if (name !== item.name && group.items.some(item => item.name === name)) {
              // If name !== item.name, indicates that name in input is
              // different from original name of item
              toast.error('The group already contains an item with the same name')
              return
            }
            const parsedOwees = Object.fromEntries(
              Object.entries(owees).filter(([_, amount]) => amount > 0)
            )
            db.groups.update(group.id, {
              items: [
                ...group.items.filter(i => i.name !== item.name),
                { name, owees: parsedOwees, owers }
              ]
            })
            toast.success(`Successfully saved all changes`)
          }}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}