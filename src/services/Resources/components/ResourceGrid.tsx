import { ResourceCard } from './ResourceCards'
import { EmptyState } from './EmptyState'

interface ResourceItem {
  title: string
  description: string
  category: string
  url: string
  rating?: number
  free?: boolean
  image?: string
  color?: string
  users?: string
  by?: string
}

export interface ResourceGridProps {
  items: ResourceItem[]
  searchTerm?: string
  onClearSearch?: () => void
}

export function ResourceGrid({
  items,
  searchTerm,
  onClearSearch,
}: ResourceGridProps) {
  // Show EmptyState when no items are found and there's a search term
  if (items.length === 0 && searchTerm && searchTerm.trim() !== '') {
    return (
      <EmptyState
        searchTerm={searchTerm}
        onClearSearch={onClearSearch || (() => {})}
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
