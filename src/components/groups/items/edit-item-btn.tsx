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
import { cn, formatCurrency } from '@/lib/utils'
import { OweesList } from './owees-list'
import { OwersList } from './owers-list'

export function EditItemButton({
  className,
  group,
  item
}: React.ComponentProps<'svg'> & { group: Group, item: Item }) {
  const [name, setName] = useState(item.name)
  const [owees, setOwees] = useState(item.owees)
  const [owers, setOwers] = useState(item.owers)
  const remainingCentsToSplit = owers && !(owers instanceof Array) ?
    (
      Object.values(owees).reduce((a, b) => a + b, 0) -
      Object.values(owers).reduce((a, b) => a + b, 0)
    ) :
    0

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit3 className={cn(className, 'hover:text-muted-foreground cursor-pointer my-1')} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-11/12 flex flex-col'>
        <DialogHeader>
          <DialogTitle>Edit Item <em>{item.name}</em></DialogTitle>
        </DialogHeader>
        <div className='overflow-auto p-2'>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label className='font-semibold' htmlFor='item-name'>Name</Label>
              <Input id='item-name' name='name' value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <hr />
            <div className='grid gap-2'>
              <Label className='font-semibold'>Creditors</Label>
              <OweesList group={group} owees={owees} setOwees={setOwees} />
            </div>
            <hr />
            <div className='grid gap-2'>
              <Label className='font-semibold'>Debtors</Label>
              <OwersList group={group} owers={owers} setOwers={setOwers}
                remainingToSplit={remainingCentsToSplit}
              />
            </div>
          </div>
          <DialogFooter className='mt-2'>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button variant='success' onClick={_ => {
              if (!name) {
                toast.error('The item must have a name')
                return
              }
              if (name !== item.name && group.items.some(item => item.name === name)) {
                // If name !== item.name, indicates that name in input is
                // different from original name of item
                toast.error('The group already contains an item with the same name')
                return
              }
              if (remainingCentsToSplit !== 0) {
                // Variable is set to 0 if not manual splitting
                toast.error(`
                  There is still
                  ${formatCurrency(remainingCentsToSplit)}
                  unaccounted for
                `)
                return
              }
              const parsedOwees = Object.fromEntries(
                Object.entries(owees).filter(([_, amount]) => amount > 0)
              )
              db.groups.update(group.id, {
                items: [
                  ...group.items.map(i => {
                    if (i.name !== item.name) return i
                    return { name, owees: parsedOwees, owers }
                  }),
                ],
              })
              toast.success(`Successfully saved all changes`)
            }}>Save Changes</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}