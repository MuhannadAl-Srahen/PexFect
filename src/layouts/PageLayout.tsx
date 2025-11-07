import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl' | '7xl' | 'full'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

const paddingClasses = {
  sm: 'py-6',
  md: 'py-8',
  lg: 'py-12',
  xl: 'py-16',
}

export const PageLayout = ({
  children,
  className,
  maxWidth = '7xl',
  padding = 'lg',
}: PageLayoutProps) => {
  return (
    <div className={cn('bg-background min-h-screen mt-18', className)}>
      <div className='container mx-auto px-4'>
        <div
          className={cn(
            'mx-auto',
            maxWidthClasses[maxWidth],
            paddingClasses[padding]
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
