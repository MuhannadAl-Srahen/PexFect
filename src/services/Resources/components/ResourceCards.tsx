import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {  Video, Wrench, FileText, FileCode2 } from 'lucide-react'
import { getBadgeColors } from '../utils/badgeColors'

interface Resource {
  title: string
  description: string
  url: string
  category: string
  color: string
  free?: boolean
  icon?: string
}

// Function to get appropriate button icon based on category
const getButtonIcon = (category: string) => {
  const categoryLower = category.toLowerCase()
  
  if (categoryLower.includes('video') || categoryLower.includes('youtube')) {
    return Video
  }
  if (categoryLower.includes('tool') || categoryLower.includes('editor') || categoryLower.includes('debug') || categoryLower.includes('hosting')) {
    return Wrench
  }
  if (categoryLower.includes('documentation') || categoryLower.includes('reference')) {
    return FileText
  }
  if (categoryLower.includes('tutorial') || categoryLower.includes('learning') || categoryLower.includes('css') || categoryLower.includes('javascript') || categoryLower.includes('react') || categoryLower.includes('frontend')) {
    return FileCode2
  }
  
  return Video
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const badgeColors = getBadgeColors(resource.category)
  const ButtonIcon = getButtonIcon(resource.category)
  
  return (
    <Card className={`flex justify-center group h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
      {/* Header Section with Gradient */}
      <div
        className={`relative h-32 bg-gradient-to-r ${resource.color} overflow-hidden  `}
      >
        <div className='absolute inset-0 bg-black/10'></div>
        
        {/* Background Icon */}
        {resource.icon && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-6xl opacity-20 select-none pointer-events-none transform transition-transform duration-300 group-hover:scale-110'>
              {resource.icon}
            </span>
          </div>
        )}

        
      </div>

      <CardContent className='flex flex-col flex-grow p-4'>
        {/* Title */}
        <CardTitle className='text-xl font-semibold group-hover:text-primary transition-colors line-clamp-1 mb-2'>
          {resource.title}
        </CardTitle>
        
        {/* Category Badge */}
        <div className='mb-3'>
          <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColors}`}>
            {resource.category}
          </Badge>
        </div>

        {/* Description */}
        <CardDescription className='text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow'>
          {resource.description}
        </CardDescription>

        {/* Button */}
        <div className='flex justify-center'>
          <Button
            asChild
            className='w-52 flex items-center justify-center bg-primary hover:bg-primary/90 group-hover:bg-primary/90 transition-all duration-300 group-hover:shadow-md'
          >
            <a href={resource.url} target='_blank' rel='noopener noreferrer' className="flex items-center gap-1">
              <ButtonIcon className='mr-1 h-4 w-4' />
              Visit Resource
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
