import { Button } from '@/components/ui/button'

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

export function ViewModeToggle({
  viewMode,
  onViewModeChange,
}: ViewModeToggleProps) {
  return (
    <div className='flex gap-2 mb-6'>
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        onClick={() => onViewModeChange('grid')}
        className='text-sm font-medium px-3 py-2'
      >
        Grid View
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        onClick={() => onViewModeChange('list')}
        className='text-sm font-medium px-3 py-2'
      >
        List View
      </Button>
    </div>
  )
}
