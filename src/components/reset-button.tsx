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
import db from '@/db'
import { DialogDescription } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'

export function ResetButton({ className, ...props }: React.ComponentProps<'svg'>) {
  const nav = useNavigate()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 {...props}
          className={cn(
            className,
            'size-8 text-red-600/80 hover:text-red-600/60 cursor-pointer'
          )}
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='min-w-0 overflow-x-clip'>
          <DialogTitle>Reset All Data</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you really sure? This will irreversibly delete ALL groups.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={_ => {
              db.delete({ disableAutoOpen: false })
              toast.success('All data has been cleared')
              nav({ to: '/', reloadDocument: true })
            }}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}