import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Grid3x3, List } from 'lucide-react'

export interface ChallengeControlsProps {
  searchTerm: string
  selectedDifficulty: string
  selectedLanguage: string
  onSearchChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  filteredCount: number
  totalCount: number
}

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
        <div className='flex items-center'>
          <div className='relative inline-flex items-center rounded-xl bg-muted/50 p-1 shadow-sm border border-border/30'>
            {/* Animated sliding background */}
            <div
              className={`absolute top-1 bottom-1 bg-primary rounded-lg shadow-md transition-all duration-300 ease-out ${
                viewMode === 'grid'
                  ? 'left-1 right-[calc(50%+2px)]'
                  : 'right-1 left-[calc(50%+2px)]'
              }`}
            />

            <button
              onClick={() => onViewModeChange('grid')}
              className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                viewMode === 'grid'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Grid3x3
                className={`h-4 w-4 transition-all duration-300 ${
                  viewMode === 'grid' ? 'scale-110' : 'scale-100'
                }`}
              />
              <span>Grid</span>
            </button>

            <button
              onClick={() => onViewModeChange('list')}
              className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${
                viewMode === 'list'
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <List
                className={`h-4 w-4 transition-all duration-300 ${
                  viewMode === 'list' ? 'scale-110' : 'scale-100'
                }`}
              />
              <span>List</span>
            </button>
          </div>
        </div>
        <p className='text-muted-foreground ml-1'>
          Showing {filteredCount} of {totalCount} challenges
        </p>
      </div>
    </div>
  )
}
