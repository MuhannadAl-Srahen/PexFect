import { Skeleton } from './skeleton'
import { PageLayout } from '@/layouts/PageLayout'
import { PageHeader } from '@/layouts/PageHeader'

export function ProfileSkeleton() {
  return (
    <PageLayout maxWidth='6xl'>
      {/* Page Header */}
      <PageHeader
        title='Profile Dashboard'
        description='Track your progress, manage saved challenges, and view your learning journey'
      />

      <div className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Profile Card Skeleton */}
          <div className='lg:col-span-4 lg:sticky lg:top-6 lg:self-start'>
            <div className='rounded-xl border bg-card p-6 shadow-sm space-y-6'>
              {/* Avatar */}
              <div className='flex flex-col items-center space-y-4'>
                <Skeleton className='h-24 w-24 rounded-full' />
                <div className='space-y-2 w-full'>
                  <Skeleton className='h-6 w-3/4 mx-auto' />
                  <Skeleton className='h-4 w-1/2 mx-auto' />
                </div>
              </div>

              {/* Stats */}
              <div className='space-y-4 pt-4 border-t'>
                <div className='space-y-3'>
                  <Skeleton className='h-5 w-full' />
                  <Skeleton className='h-5 w-full' />
                  <Skeleton className='h-5 w-full' />
                </div>
              </div>

              {/* Badges */}
              <div className='space-y-3 pt-4 border-t'>
                <Skeleton className='h-5 w-24' />
                <div className='flex gap-2 flex-wrap'>
                  <Skeleton className='h-10 w-10 rounded-lg' />
                  <Skeleton className='h-10 w-10 rounded-lg' />
                  <Skeleton className='h-10 w-10 rounded-lg' />
                  <Skeleton className='h-10 w-10 rounded-lg' />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className='lg:col-span-8'>
            {/* Tab Navigation Skeleton */}
            <div className='w-full mb-6'>
              <div className='relative inline-flex items-center w-full rounded-xl bg-muted/50 p-1 shadow-sm border border-border/30'>
                <Skeleton className='h-12 flex-1 mx-1' />
                <Skeleton className='h-12 flex-1 mx-1' />
                <Skeleton className='h-12 flex-1 mx-1' />
              </div>
            </div>

            {/* Content Cards */}
            <div className='space-y-4'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='rounded-xl border bg-card p-6 shadow-sm'
                >
                  <div className='space-y-4'>
                    <div className='flex items-start justify-between'>
                      <div className='space-y-2 flex-1'>
                        <Skeleton className='h-6 w-3/4' />
                        <Skeleton className='h-4 w-1/2' />
                      </div>
                      <Skeleton className='h-8 w-20' />
                    </div>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-5/6' />
                    <div className='flex gap-2 pt-2'>
                      <Skeleton className='h-6 w-16 rounded-full' />
                      <Skeleton className='h-6 w-16 rounded-full' />
                      <Skeleton className='h-6 w-16 rounded-full' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
