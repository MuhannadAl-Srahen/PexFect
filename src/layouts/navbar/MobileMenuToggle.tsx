import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuToggleProps {
  isMobileMenuOpen: boolean
  onToggle: () => void
}

export const MobileMenuToggle = ({
  isMobileMenuOpen,
  onToggle,
}: MobileMenuToggleProps) => {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='md:hidden h-9 w-9 rounded-lg hover:bg-muted/30 transition-all duration-300'
      onClick={onToggle}
    >
      <div className='relative'>
        <Menu
          className={cn(
            'h-5 w-5 transition-all duration-300 ease-out',
            isMobileMenuOpen
              ? 'opacity-0 rotate-180 scale-75'
              : 'opacity-100 rotate-0 scale-100'
          )}
        />
        <X
          className={cn(
            'h-5 w-5 absolute inset-0 transition-all duration-300 ease-out',
            isMobileMenuOpen
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-180 scale-75'
          )}
        />
      </div>
    </Button>
  )
}
