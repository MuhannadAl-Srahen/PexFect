import { Button } from '@/components/ui/button'
import { MoonStarIcon, SunIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  theme: string | undefined
  toggleTheme: () => void
  className?: string
  variant?: 'desktop' | 'mobile'
}

export const ThemeToggle = ({
  theme,
  toggleTheme,
  className,
  variant = 'desktop',
}: ThemeToggleProps) => {
  if (variant === 'mobile') {
    return (
      <Button
        variant='ghost'
        size='default'
        onClick={toggleTheme}
        className={cn(
          'flex items-center justify-center w-11 h-11 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group',
          className
        )}
        aria-label='Toggle theme'
      >
        {theme === 'dark' ? (
          <MoonStarIcon className='text-blue-500 transition-all duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110' />
        ) : (
          <SunIcon className='text-amber-500 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:scale-110' />
        )}
      </Button>
    )
  }

  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className={cn(
        'hidden md:flex h-11 w-11 rounded-full hover:bg-transparent transition-all duration-300 group',
        className
      )}
      aria-label='Toggle theme'
    >
      <div className='relative overflow-hidden'>
        <SunIcon
          className={cn(
            'transition-all duration-500 ease-out',
            theme === 'dark'
              ? 'rotate-180 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-amber-500 group-hover:rotate-12 group-hover:scale-110'
          )}
        />
        <MoonStarIcon
          className={cn(
            ' absolute inset-0 transition-all duration-500 ease-out',
            theme === 'dark'
              ? 'rotate-0 scale-100 opacity-100 text-blue-400 group-hover:-rotate-12 group-hover:scale-110'
              : '-rotate-180 scale-0 opacity-0'
          )}
        />
      </div>
    </Button>
  )
}
