import { BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResourceCard } from '@/services/Resources'
import { useResources } from '@/services/Resources/hooks/useResources'
import type { ResourceItem as MainResourceItem } from '@/types/index'

export function RecommendedResources() {
  // Fetch real video resources from the resources page
  const { data: videoResources = [] } = useResources('video')
  const { data: documentationResources = [] } = useResources('documentation')
  
  // Use real video from resources page
  const videoResource = videoResources[0] || null
  
  // Use real documentation from resources page  
  const documentResources = documentationResources.slice(0, 1)

  return (
    <Card className='p-6'>
      <CardHeader className='px-0 pt-0'>
        <div className='flex items-center gap-2'>
          <BookOpen className='w-5 h-5 text-primary' />
          <CardTitle className='text-xl font-bold'>Recommended Learning Resources</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className='px-0 space-y-6'>
        {/* Video Section */}
        {videoResource && (
          <div className='flex justify-center'>
            <div className='w-full max-w-sm lg:max-w-xs'>
              {/* Use real video resource directly since it's already MainResourceItem */}
              <ResourceCard resource={videoResource as MainResourceItem} />
            </div>
          </div>
        )}

        {/* Document Resource */}
        {documentResources.length > 0 && (
          <div className='flex justify-center'>
            <div className='max-w-sm'>
              <ResourceCard resource={documentResources[0] as MainResourceItem} />
            </div>
          </div>
        )}

        {/* Fallback if no resources */}
        {!videoResource && documentResources.length === 0 && (
          <div className='text-center py-8 text-muted-foreground'>
            <BookOpen className='w-12 h-12 mx-auto mb-3 opacity-50' />
            <p>No recommended resources available at this time.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}