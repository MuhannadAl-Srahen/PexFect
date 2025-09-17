import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export interface ResourceControlsProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ResourceControls({
  searchTerm,
  onSearchChange,
}: ResourceControlsProps) {
  return (
    <div className='space-y-4 mb-3'>
      {/* Search */}
      <div className='flex items-center justify-between flex-wrap lg:flex-row gap-4'>
        <div className='relative w-full max-w-lg'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search Resources...'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className='pl-11 !h-12 bg-card shadow-sm'
          />
        </div>
      </div>
    </div>
  )
}
