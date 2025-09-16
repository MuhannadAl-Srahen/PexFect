import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Video, Wrench, Play, User } from 'lucide-react'
import { getBadgeColors } from '../utils/badgeColors'

interface Resource {
  title: string
  description: string
  url: string
  category: string
  color?: string
  free?: boolean
  icon?: string
  by?: string
  thumbnail?: string
  duration?: string
}

// Function to get appropriate icon based on category type
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase()

  if (categoryLower.includes('video') || categoryLower.includes('youtube')) {
    return Video
  }
  if (
    categoryLower.includes('tool') ||
    categoryLower.includes('editor') ||
    categoryLower.includes('debug') ||
    categoryLower.includes('hosting') ||
    categoryLower.includes('design') ||
    categoryLower.includes('version control') ||
    categoryLower.includes('git') ||
    categoryLower.includes('performance') ||
    categoryLower.includes('deployment') ||
    categoryLower.includes('collaboration')
  ) {
    return Wrench
  }
  return FileText
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const CategoryIcon = getCategoryIcon(resource.category)

  // Check if this is a video resource
  const isVideo = getCategoryIcon(resource.category) === Video

  if (isVideo) {
    return (
      <a
        href={resource.url}
        target='_blank'
        rel='noopener noreferrer'
        className='block bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-lg hover:-translate-y-1 border border-border group'
      >
        <div className='aspect-video bg-muted relative overflow-hidden'>
          {resource.thumbnail ? (
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='w-full h-full bg-blue-50/70  flex items-center justify-center'></div>
          )}
          <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='w-10 h-10 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'>
              <Play className='h-5 w-5 md:h-7 md:w-7 text-primary-foreground ml-0.5 md:ml-1' />
            </div>
          </div>
          {resource.duration && (
            <div className='absolute bottom-2 md:bottom-3 right-2 md:right-3 bg-primary/80 text-white text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-medium'>
              {resource.duration}
            </div>
          )}
        </div>
        <div className='p-3 md:p-4'>
          <div className='flex items-center gap-2 mb-1 md:mb-7'>
            <Video className='!w-5 !h-5 text-primary md:ml-1' />
            <h4 className='font-semibold text-foreground line-clamp-1 text-sm md:text-base group-hover:text-primary transition-colors'>
              {resource.title}
            </h4>
          </div>
          <p className='text-xs md:text-sm text-muted-foreground mb-2 md:mb-4 line-clamp-2'>
            {resource.description}
          </p>

          {/* Multiple Category Badges for Video */}
          <div className='flex flex-wrap gap-1.5 mb-3'>
            {resource.category.split(',').map((cat, index) => (
              <Badge
                key={index}
                className={`text-xs px-2 py-0.5 border ${getBadgeColors(cat.trim())}`}
              >
                {cat.trim()}
              </Badge>
            ))}
          </div>

          {resource.by && (
            <div className='flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground mt-auto'>
              <User className='h-4 w-4 md:h-4 md:w-4 text-primary' />
              <span className='font-medium'>by {resource.by}</span>
            </div>
          )}
        </div>
      </a>
    )
  }

  // Regular card for documentation and tools
  return (
    <a
      href={resource.url}
      target='_blank'
      rel='noopener noreferrer'
      className='block h-full group'
    >
      <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] py-0 gap-0'>
        {/* Content Section */}
        <CardContent className='flex flex-col flex-1 px-6 py-5'>
          {/* Title with Icon */}
          <div className='flex items-center gap-2 mb-7'>
            <CategoryIcon className='h-5 w-5 text-primary flex-shrink-0' />
            <CardTitle className='line-clamp-1 text-lg font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors'>
              {resource.title}
            </CardTitle>
          </div>

          {/* Description */}
          <CardDescription className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
            {resource.description}
          </CardDescription>

          {/* Multiple Category Badges */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {resource.category.split(',').map((cat, index) => (
              <Badge
                key={index}
                className={`text-xs px-2 py-0.5 border ${getBadgeColors(cat.trim())}`}
              >
                {cat.trim()}
              </Badge>
            ))}
          </div>

          {/* Author Attribution */}
          {resource.by && (
            <div className='flex items-center gap-1.5 mt-auto text-sm text-muted-foreground'>
              <User className='h-4 w-4 text-primary' />
              <span className='font-medium'>by {resource.by}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </a>
  )
}
