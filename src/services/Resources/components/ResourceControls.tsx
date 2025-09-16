import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

export interface ResourceControlsProps {
  searchTerm: string
  selectedDifficulty: string
  selectedLanguage: string
  onSearchChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
}

export function ResourceControls({
  searchTerm,
  selectedDifficulty,
  selectedLanguage,
  onSearchChange,
  onDifficultyChange,
  onLanguageChange,
}: ResourceControlsProps) {
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
    </div>
  )
}
