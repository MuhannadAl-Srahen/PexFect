import { BookOpen, ExternalLink, FileText, Video, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

interface ResourceItem {
  id: string
  title: string
  category: string
  description: string
  url?: string
  thumbnail?: string
  author?: string
  difficulty?: string
}

interface RecommendedResourcesProps {
  resources: ResourceItem[]
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
    categoryLower.includes('design')
  ) {
    return Wrench
  }
  return FileText
}

const getBadgeColors = (category: string) => {
  const categoryLower = category.toLowerCase()
  
  if (categoryLower.includes('tutorial')) {
    return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
  }
  if (categoryLower.includes('documentation')) {
    return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
  if (categoryLower.includes('video')) {
    return 'bg-red-100 text-red-800 hover:bg-red-100'
  }
  if (categoryLower.includes('tool')) {
    return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
  }
  return 'bg-green-100 text-green-800 hover:bg-green-100'
}

export function RecommendedResources({ resources }: RecommendedResourcesProps) {
  return (
    <Card className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center'>
          <BookOpen className='w-5 h-5 text-primary mr-2' />
          <h3 className='text-xl font-bold text-foreground'>Recommended Learning Resources</h3>
        </div>
        <Button variant='outline' size='sm' asChild>
          <Link to='/resources'>
            View All Resources
            <ExternalLink className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      </div>
      
      <div className='space-y-4'>
        {resources.map((resource) => {
          const CategoryIcon = getCategoryIcon(resource.category)
          
          return (
            <Card key={resource.id} className='p-4 hover:shadow-md transition-shadow duration-200'>
              <CardContent className='p-0'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3 flex-1'>
                    <div className='p-2 bg-muted rounded-lg'>
                      <CategoryIcon className='w-4 h-4 text-muted-foreground' />
                    </div>
                    
                    <div className='flex-1'>
                      <div className='flex items-center space-x-2 mb-1'>
                        <h4 className='font-semibold text-foreground'>{resource.title}</h4>
                        <Badge variant='secondary' className={getBadgeColors(resource.category)}>
                          {resource.category}
                        </Badge>
                        {resource.difficulty && (
                          <Badge variant='outline' className='text-xs'>
                            {resource.difficulty}
                          </Badge>
                        )}
                      </div>
                      
                      <p className='text-sm text-muted-foreground mb-2'>{resource.description}</p>
                      
                      {resource.author && (
                        <p className='text-xs text-muted-foreground'>by {resource.author}</p>
                      )}
                    </div>
                  </div>
                  
                  {resource.url && (
                    <Button variant='ghost' size='sm' asChild>
                      <a 
                        href={resource.url} 
                        target='_blank' 
                        rel='noopener noreferrer'
                        title={`Open ${resource.title} in new tab`}
                      >
                        <ExternalLink className='w-4 h-4' />
                        <span className='sr-only'>Open {resource.title} in new tab</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}