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
import { Textarea } from '../ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'
import db from '@/db'

export function NewGroupButton() {
  const [name, setName] = useState('New Group')
  const [desc, setDesc] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className='hover:text-muted-foreground cursor-pointer my-1' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4'>
          <div className='grid gap-3'>
            <Label htmlFor='group-name'>Name</Label>
            <Input id='group-name' name='name' defaultValue='New Group'
              value={name} onChange={e => setName(e.target.value)}
              maxLength={20}
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='group-description'>Description</Label>
            <Textarea id='group-description' name='description'
              placeholder='Description of new group'
              value={desc} onChange={e => setDesc(e.target.value)}  
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button variant='success' onClick={_ => {
            if (!name) {
              toast.error('Please choose a name for the new group')
              return
            }
            db.groups.add({
              name,
              description: desc || '',
              created: new Date(),
              members: [],
              items: []
            })
          }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}