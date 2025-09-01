import { Upload } from 'lucide-react'
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
import type { Group } from '@/db'
import { DialogDescription } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'
import { toast } from 'sonner'
import db from '@/db'

export function ImportGroupButton({ className }: React.ComponentProps<'svg'>) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Upload className={cn(className, 'hover:text-muted-foreground cursor-pointer')} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='min-w-0'>
          <DialogTitle>Import Group Data</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Import group data from a file
          <Input type='file' className='mt-2 pt-1.5 cursor-pointer text-sm'
            ref={fileRef}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='success' onClick={async _ => {
              const raw = await fileRef.current?.files?.item(0)?.text()
              if (!raw) {
                toast.error('No file selected')
                return
              }
              const data = JSON.parse(raw)
              db.groups.add({ ...data, created: new Date(), id: undefined })
            }}>Import</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}