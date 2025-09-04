import { Plus } from 'lucide-react'
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

export function AddItemButton({
  className,
  group
}: React.ComponentProps<'svg'> & { group: Group }) {
  const [name, setName] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')}
          onClick={e => {
            if (group.members.length === 0) {
              toast.error('Cannot create an item when there are no members in the group')
              e.stopPropagation()
              e.preventDefault()
            }
          }}
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <div className='grid gap-2'>
          <Label htmlFor='item-name'>Name</Label>
          <Input id='item-name' name='name' defaultValue='New Item'
            value={name} onChange={e => setName(e.target.value)}
          />
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
            if (group.items.some(item => item.name === name)) {
              toast.error('The group already contains an item with the same name')
              return
            }
            // By default, the new item will split equally
            const newItems = [...group.items, { name, owees: {} }]
            db.groups.update(group.id, { items: newItems })
            toast.success(`Successfully added item '${name}'`)
          }}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}