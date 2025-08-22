import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className='text-center py-16'>
      <div className='max-w-md mx-auto'>
        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
          <Search className='h-8 w-8 text-muted-foreground' />
        </div>
        <h3 className='text-2xl font-semibold text-foreground mb-2'>
          No challenges found
        </h3>
        <p className='text-muted-foreground mb-6'>
          Try adjusting your search or filter criteria
        </p>
        <Button
          variant='outline'
          onClick={onClearFilters}
          className='px-6 py-4'
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
