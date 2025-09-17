import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  searchTerm?: string
  message?: string
  buttonText?: string
  onAction: () => void
}

export function EmptyState({
  title = 'No results found',
  searchTerm,
  message,
  buttonText = 'Clear Search',
  onAction,
}: EmptyStateProps) {
  const defaultMessage = searchTerm
    ? `No results found for "${searchTerm}". Try different keywords or clear your search.`
    : 'Try adjusting your search keywords'

  return (
    <div className='text-center py-16'>
      <div className='max-w-md mx-auto'>
        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
          <Search className='h-8 w-8 text-muted-foreground' />
        </div>
        <h3 className='text-2xl font-semibold text-foreground mb-2'>{title}</h3>
        <p className='text-muted-foreground mb-6'>
          {message || defaultMessage}
        </p>
        <Button variant='outline' onClick={onAction} className='mt-2'>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
