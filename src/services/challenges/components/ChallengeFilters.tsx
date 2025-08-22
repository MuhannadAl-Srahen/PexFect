import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ChallengeFiltersProps {
  selectedDifficulty: string
  selectedLanguage: string
  onDifficultyChange: (value: string) => void
  onLanguageChange: (value: string) => void
}

export function ChallengeFilters({
  selectedDifficulty,
  selectedLanguage,
  onDifficultyChange,
  onLanguageChange,
}: ChallengeFiltersProps) {
  const tailwindClasses = 'w-44 !h-12 bg-card border-border shadow-sm'

  return (
    <div className='flex gap-2'>
      <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
        <SelectTrigger className={tailwindClasses}>
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
        <SelectTrigger className={tailwindClasses}>
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
  )
}
