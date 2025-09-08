import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import type { ChallengeControlsProps } from '@/types'
export function ChallengeControls({
  searchTerm,
  selectedDifficulty,
  selectedLanguage,
  onSearchChange,
  onDifficultyChange,
  onLanguageChange,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount,
}: ChallengeControlsProps) {
  return (
    <div className='space-y-4 mb-3'>
      {/* Search and Filters */}
      <div className='flex items-center justify-between flex-wrap lg:flex-row gap-4'>
        {/* Search */}
        <div className='relative w-full max-w-lg'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search challenges...'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className='pl-11 !h-12 bg-card shadow-sm'
          />
        </div>

        {/* Filters */}
        <div className='flex gap-2'>
          <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className='!h-12 w-36 bg-card border-b border-shadow-sm'>
              <SelectValue placeholder='All Difficulties' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Difficulties</SelectItem>
              <SelectItem value='Beginner'>Beginner</SelectItem>
              <SelectItem value='Intermediate'>Intermediate</SelectItem>
              <SelectItem value='Advanced'>Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className='!h-12 w-36 bg-card border-b border-shadow-sm'>
              <SelectValue placeholder='All Languages' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Languages</SelectItem>
              <SelectItem value='HTML'>HTML</SelectItem>
              <SelectItem value='CSS'>CSS</SelectItem>
              <SelectItem value='JavaScript'>JavaScript</SelectItem>
              <SelectItem value='React'>React</SelectItem>
              <SelectItem value='TypeScript'>TypeScript</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Mode Toggle and Count */}

      <div className='flex flex-col gap-6 flex-wrap'>
        <div className='flex gap-2'>
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
        <p className='text-muted-foreground ml-1'>
          Showing {filteredCount} of {totalCount} challenges
        </p>
      </div>
    </div>
  )
}
