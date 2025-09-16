import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  searchTerm?: string
  onClearSearch: () => void
}

export function EmptyState({ searchTerm, onClearSearch }: EmptyStateProps) {
  return (
    <div className='text-center py-16'>
      <div className='max-w-md mx-auto'>
        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4'>
          <Search className='h-8 w-8 text-muted-foreground' />
        </div>
        <h3 className='text-2xl font-semibold text-foreground mb-2'>
          No resources found
        </h3>
        <p className='text-muted-foreground mb-6'>
          {searchTerm
            ? `No results found for "${searchTerm}". Try different keywords or clear your search.`
            : 'Try adjusting your search keywords'}
        </p>
        <Button variant='outline' onClick={onClearSearch} className='mt-2'>
          Clear Search
        </Button>
      </div>
    </div>
  )
}
