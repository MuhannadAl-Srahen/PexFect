import { Skeleton } from './skeleton'
import { PageHeader } from '@/layouts/PageHeader'

export function RoadmapSkeleton() {
  return (
    <div className='w-full flex flex-col items-center'>
      <PageHeader
        title='Your Frontend Journey'
        description='Choose your path and master frontend development through carefully crafted challenges that build real skills'
      />

      {/* Learning Paths Grid Skeleton */}
      <div className='w-full max-w-7xl mx-auto mb-16 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='group relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]'
            >
              <div className='p-8 space-y-6'>
                {/* Icon */}
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-16 w-16 rounded-2xl' />
                  <Skeleton className='h-6 w-16 rounded-full' />
                </div>

                {/* Title and Description */}
                <div className='space-y-3'>
                  <Skeleton className='h-8 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-5/6' />
                </div>

                {/* Stats */}
                <div className='flex items-center gap-4 pt-4'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className='space-y-2 pt-2'>
                  <div className='flex justify-between items-center'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-12' />
                  </div>
                  <Skeleton className='h-2 w-full rounded-full' />
                </div>

                {/* Button */}
                <Skeleton className='h-11 w-full rounded-xl' />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Follow Section Skeleton */}
      <section className='w-full mt-16 md:mt-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12 md:mb-16'>
            <Skeleton className='h-10 w-96 mx-auto mb-4' />
            <Skeleton className='h-6 w-3/4 max-w-3xl mx-auto' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='bg-card rounded-3xl border border-border/50 p-6 md:p-8 shadow-sm flex flex-col items-center text-center h-full'
              >
                <Skeleton className='h-20 w-20 rounded-2xl mb-6' />
                <Skeleton className='h-7 w-3/4 mb-4' />
                <Skeleton className='h-4 w-full mb-2' />
                <Skeleton className='h-4 w-5/6' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function PathDetailsSkeleton() {
  return (
    <div className='w-full flex flex-col items-center'>
      {/* Hero Section Skeleton */}
      <div className='w-full bg-gradient-to-br from-primary/5 via-background to-primary/5 border-b border-border/50 mb-12'>
        <div className='max-w-7xl mx-auto px-4 py-12 md:py-16'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-8'>
            {/* Icon */}
            <Skeleton className='h-24 w-24 rounded-3xl flex-shrink-0' />

            {/* Content */}
            <div className='flex-1 space-y-4 w-full'>
              <Skeleton className='h-10 w-3/4' />
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-5 w-5/6' />

              {/* Stats */}
              <div className='flex flex-wrap gap-6 pt-4'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-6 w-32' />
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className='mt-8 pt-8 border-t border-border/50'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-3'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-3 w-full rounded-full' />
                <Skeleton className='h-4 w-48' />
              </div>
              <div className='flex justify-end items-center'>
                <Skeleton className='h-12 w-40 rounded-xl' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge List Skeleton */}
      <div className='w-full flex flex-col items-center mt-2'>
        <div className='flex flex-col gap-0 w-full max-w-5xl mx-auto px-4'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='relative'>
              {/* Timeline line */}
              {i !== 4 && (
                <div className='absolute left-[2.375rem] top-[5rem] w-0.5 h-full bg-border/30 -z-10' />
              )}

              <div className='flex gap-6 pb-8'>
                {/* Timeline dot */}
                <div className='flex flex-col items-center pt-6'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                </div>

                {/* Card */}
                <div className='flex-1 pt-6'>
                  <div className='rounded-2xl border border-border/50 bg-card p-6 shadow-sm'>
                    <div className='space-y-4'>
                      <div className='flex items-start justify-between'>
                        <div className='space-y-2 flex-1'>
                          <Skeleton className='h-7 w-3/4' />
                          <Skeleton className='h-4 w-1/3' />
                        </div>
                        <Skeleton className='h-8 w-20' />
                      </div>
                      <Skeleton className='h-4 w-full' />
                      <Skeleton className='h-4 w-5/6' />
                      <div className='flex gap-2 pt-2'>
                        <Skeleton className='h-6 w-16 rounded-full' />
                        <Skeleton className='h-6 w-16 rounded-full' />
                        <Skeleton className='h-6 w-20 rounded-full' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
