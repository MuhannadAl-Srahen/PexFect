import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { setTheme } = useTheme()

  function withNoTransitions<T extends unknown[]>(fn: (...args: T) => void) {
    return (...args: T) => {
      const root = document.documentElement
      // Attach a class that disables transitions globally
      root.classList.add('disable-theme-transitions')
      // Force a reflow so the class takes effect immediately
      void root.offsetHeight
      try {
        fn(...args)
      } finally {
        // Let the DOM update, then remove the class on next tick
        requestAnimationFrame(() => {
          root.classList.remove('disable-theme-transitions')
        })
      }
    }
  }

  const setThemeNoTransition = withNoTransitions(setTheme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' aria-label='Toggle theme'>
          <Sun className='h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setThemeNoTransition('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeNoTransition('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeNoTransition('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
