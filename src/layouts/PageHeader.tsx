import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  centered?: boolean
}

export const PageHeader = ({
  title,
  description,
  children,
  className,
  centered = true,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 mb-12',
        centered && 'text-center',
        className
      )}
    >
      <div className={cn('flex flex-col gap-2', centered && 'items-center')}>
        <h1 className='text-4xl font-bold text-primary tracking-tight'>
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              'text-xl text-muted-foreground leading-relaxed',
              centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
            )}
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}
