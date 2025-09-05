import { Settings } from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { ResetButton } from './reset-button'

export function SettingsButton({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Settings {...props}
          className={cn(
            className,
            'size-8 hover:text-muted-foreground cursor-pointer'
          )}
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader className='min-w-0 overflow-x-clip'>
          <DialogTitle className='text-2xl'>Settings</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <ResetButton />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}