import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'

export function ThemeButton() {
  const { theme, setTheme } = useTheme()
  const light = theme === 'light'
  return (
    <div onClick={_ => setTheme(light ? 'dark' : 'light')}
      className='absolute right-4 top-4 size-8 cursor-pointer hover:text-muted-foreground'
    >
      <Sun className='absolute w-full h-full transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-180' />
      <Moon className='absolute w-full h-full transition-all scale-0 rotate-180 dark:scale-100 dark:rotate-0' />
    </div>
  )
}