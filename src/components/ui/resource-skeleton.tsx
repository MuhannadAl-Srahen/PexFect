import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ResourceCardSkeleton() {
  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm shadow-sm p-0 gap-0 animate-in fade-in-0 duration-300'>
      {/* Thumbnail/Image Skeleton */}
      <div className='relative aspect-video overflow-hidden bg-muted/40'>
        <Skeleton className='h-full w-full' />
        
        {/* Play Button Skeleton (for videos) */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <Skeleton className='h-16 w-16 rounded-full' />
        </div>
        
        {/* Duration Badge Skeleton */}
        <div className='absolute bottom-3 right-3'>
          <Skeleton className='h-6 w-16 rounded-md' />
        </div>
      </div>

      {/* Content Section */}
      <CardContent className='flex flex-1 flex-col gap-3 p-5'>
        {/* Category Badge Skeleton */}
        <Skeleton className='h-5 w-24 rounded-full' />
        
        {/* Title Skeleton */}
        <Skeleton className='h-6 w-4/5' />
        
        {/* Description Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-11/12' />
        </div>

        {/* Author/Meta Info Skeleton */}
        <div className='mt-auto flex items-center gap-3 pt-3'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <div className='flex-1 space-y-1.5'>
            <Skeleton className='h-3 w-24' />
            <Skeleton className='h-3 w-16' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ResourceListSkeleton() {
  return (
    <Card className='flex gap-5 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 shadow-sm'>
      {/* Thumbnail Skeleton */}
      <div className='relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg'>
        <Skeleton className='h-full w-full' />
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col gap-3'>
        {/* Category Badge Skeleton */}
        <Skeleton className='h-5 w-24 rounded-full' />
        
        {/* Title Skeleton */}
        <Skeleton className='h-6 w-3/5' />
        
        {/* Description Skeleton */}
        <div className='space-y-1.5'>
          <Skeleton className='h-3 w-full' />
          <Skeleton className='h-3 w-4/5' />
        </div>

        {/* Author Info Skeleton */}
        <div className='mt-auto flex items-center gap-2'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-3 w-20' />
        </div>
      </div>
    </Card>
  )
}
