import { Skeleton } from './skeleton'

export const ChallengeDetailSkeleton = () => {
  return (
    <div className='w-full max-w-6xl mx-auto px-4'>
      {/* Back Button Skeleton */}
      <Skeleton className='h-10 w-32 mb-4 md:mb-6' />

      {/* Hero Section Skeleton */}
      <div className='mb-6 md:mb-8'>
        {/* Badge and Title */}
        <div className='space-y-4 mb-6'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-10 w-3/4 md:w-1/2' />
          <Skeleton className='h-6 w-full md:w-2/3' />
        </div>

        {/* Stats Row */}
        <div className='flex gap-4 flex-wrap'>
          <Skeleton className='h-8 w-20' />
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-28' />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className='grid grid-cols-4 gap-2 mb-6 md:mb-8'>
        <Skeleton className='h-10 md:h-12' />
        <Skeleton className='h-10 md:h-12' />
        <Skeleton className='h-10 md:h-12' />
        <Skeleton className='h-10 md:h-12' />
      </div>

      {/* Content Skeleton */}
      <div className='space-y-4'>
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='h-24 w-full' />
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-32 w-full' />
        <Skeleton className='h-6 w-1/3' />
        <Skeleton className='h-40 w-full' />
      </div>
    </div>
  )
}
