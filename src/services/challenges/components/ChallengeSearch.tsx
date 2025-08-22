import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ChallengeSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ChallengeSearch({
  searchTerm,
  onSearchChange,
}: ChallengeSearchProps) {
  return (
    <div className='relative w-full max-w-lg'>
      <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
      <Input
        placeholder='Search challenges...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='pl-11 !h-12 bg-card shadow-sm'
      />
    </div>
  )
}
