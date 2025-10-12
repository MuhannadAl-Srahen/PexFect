import { ResourceCard } from './ResourceCards'
import { EmptyState } from '@/layouts'
import type { ResourceItem } from '@/types'
import { ResourceCardSkeleton } from '@/components/ui/resource-skeleton'

export interface ResourceGridProps {
  items: ResourceItem[]
  loading?: boolean
  searchTerm?: string
  onClearSearch?: () => void
  onRefresh?: () => void
}

export function ResourceGrid({
  items,
  loading = false,
  searchTerm,
  onClearSearch,
  onRefresh,
}: ResourceGridProps) {
  // Show skeleton loading state
  if (loading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {Array.from({ length: 6 }).map((_, index) => (
          <ResourceCardSkeleton key={index} />
        ))}
      </div>
    )
  }
  
  // Show EmptyState when no items are found and there's a search term
  if (items.length === 0 && searchTerm && searchTerm.trim() !== '') {
    return (
      <EmptyState
        title='No resources found'
        searchTerm={searchTerm}
        buttonText='Clear Search'
        onAction={onClearSearch || (() => {})}
      />
    )
  }

  // Show message when no items available
  if (items.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-lg text-muted-foreground mb-2'>
          No resources available
        </p>
        <p className='text-sm text-muted-foreground'>
          Check back later for new resources
        </p>
        {onRefresh ? (
          <div className='mt-4'>
            <button
              className='btn btn-sm'
              onClick={() => onRefresh && onRefresh()}
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {items.map((resource, index) => (
        <ResourceCard key={index} resource={resource} />
      ))}
    </div>
  )
}
