import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ChallengeCardSkeleton() {
  return (
    <Card className='flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-md py-0 gap-0'>
      {/* Image Skeleton */}
      <div className='relative aspect-[16/9] overflow-hidden rounded-t-xl'>
        <Skeleton className='h-full w-full' />
        
        {/* Difficulty Badge Skeleton */}
        <div className='absolute top-4 left-4'>
          <Skeleton className='h-5 w-20 rounded-full' />
        </div>
        
        {/* Heart Button Skeleton */}
        <div className='absolute top-4 right-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>
      </div>

      {/* Content Section */}
      <CardContent className='flex flex-1 flex-col gap-3 p-5'>
        {/* Title Skeleton */}
        <Skeleton className='h-6 w-3/4' />
        
        {/* Description Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
        </div>

        {/* Tags Skeleton */}
        <div className='flex flex-wrap gap-2 mt-2'>
          <Skeleton className='h-6 w-16 rounded-full' />
          <Skeleton className='h-6 w-20 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
        </div>

        {/* Footer with Stats */}
        <div className='mt-auto flex items-center justify-between pt-4 border-t border-border/50'>
          <div className='flex items-center gap-4'>
            {/* Clock Skeleton */}
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-3 w-12' />
            </div>
            
            {/* Users Skeleton */}
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-3 w-8' />
            </div>
          </div>
          
          {/* Button Skeleton */}
          <Skeleton className='h-9 w-20 rounded-md' />
        </div>
      </CardContent>
    </Card>
  )
}

export function ChallengeListSkeleton() {
  return (
    <div className='flex gap-6 rounded-xl border border-border/50 bg-card p-6 shadow-sm'>
      {/* Image Skeleton */}
      <div className='relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-lg'>
        <Skeleton className='h-full w-full' />
        
        {/* Difficulty Badge Skeleton */}
        <div className='absolute top-3 left-3'>
          <Skeleton className='h-5 w-20 rounded-full' />
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col gap-3'>
        {/* Header with Title and Heart */}
        <div className='flex items-start justify-between'>
          <Skeleton className='h-7 w-1/2' />
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>

        {/* Description Skeleton */}
        <div className='space-y-2'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-11/12' />
          <Skeleton className='h-4 w-4/5' />
        </div>

        {/* Tags Skeleton */}
        <div className='flex flex-wrap gap-2'>
          <Skeleton className='h-6 w-16 rounded-full' />
          <Skeleton className='h-6 w-20 rounded-full' />
          <Skeleton className='h-6 w-14 rounded-full' />
          <Skeleton className='h-6 w-18 rounded-full' />
        </div>

        {/* Footer with Stats and Button */}
        <div className='mt-auto flex items-center justify-between pt-3'>
          <div className='flex items-center gap-6'>
            {/* Clock Skeleton */}
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-3 w-12' />
            </div>
            
            {/* Users Skeleton */}
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-3 w-8' />
            </div>
          </div>
          
          {/* Button Skeleton */}
          <Skeleton className='h-10 w-24 rounded-md' />
        </div>
      </div>
    </div>
  )
}
