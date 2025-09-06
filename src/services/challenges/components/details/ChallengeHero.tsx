import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Clock,
  Users,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { DIFFICULTY_COLORS, type DifficultyLevel } from '../../constants'
import type { Challenge } from '@/types/challenge'

interface ChallengeHeroProps {
  challenge: Challenge
}

const getDifficultyVariant = (difficulty: string) => {
  return (
    DIFFICULTY_COLORS[difficulty as DifficultyLevel] ||
    DIFFICULTY_COLORS.Beginner
  )
}

export function ChallengeHero({ challenge }: ChallengeHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % challenge.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + challenge.images.length) % challenge.images.length
    )
  }

  return (
    <div className='bg-card rounded-lg border overflow-hidden mb-6 md:mb-8 group'>
      <div className='aspect-[4/3] sm:aspect-video relative'>
        <img
          src={challenge.images[currentImageIndex].url || '/placeholder.svg'}
          alt={challenge.images[currentImageIndex].alt}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {/* Desktop Overlay Gradient - only on md+ */}
        <div className='hidden md:block absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />

        {/* Navigation */}
        {challenge.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110'
            >
              <ChevronLeft className='h-4 w-4 sm:h-5 sm:w-5' />
            </button>
            <button
              onClick={nextImage}
              className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110'
            >
              <ChevronRight className='h-4 w-4 sm:h-5 sm:w-5' />
            </button>

            <div className='absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20 opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-opacity duration-300'>
              {challenge.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all hover:scale-125 ${
                    index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Desktop Content Overlay - only visible on md+ */}
        <div className='hidden md:flex absolute inset-0 flex-col justify-end p-6 z-10'>
          <div className='flex items-end justify-between'>
            <div className='space-y-4 text-white'>
              <Badge
                className={`${getDifficultyVariant(
                  challenge.difficulty
                )} px-4 py-2 text-base font-semibold w-fit shadow-lg transition-all duration-300 group-hover:scale-105`}
              >
                {challenge.difficulty}
              </Badge>

              <h1 className='text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl'>
                {challenge.title}
              </h1>

              <div className='flex items-center gap-8 text-lg text-white/95 opacity-80 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='flex items-center gap-2 hover:scale-105 transition-transform'>
                  <Clock className='h-5 w-5' />
                  <span className='font-medium'>{challenge.estimatedTime}</span>
                </div>
                <div className='flex items-center gap-2 hover:scale-105 transition-transform'>
                  <Users className='h-5 w-5' />
                  <span className='font-medium'>
                    {challenge.completions.toLocaleString()}
                  </span>
                </div>
                <div className='flex items-center gap-2 hover:scale-105 transition-transform'>
                  <Star className='h-5 w-5 fill-current text-yellow-400' />
                  <span className='font-medium'>{challenge.rating}</span>
                </div>
              </div>
            </div>

            <a
              href={challenge.livePreviewUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group-hover:shadow-2xl'
            >
              <Eye className='h-5 w-5' />
              <span>Live Preview</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Content Section - only visible on sm and below */}
      <div className='md:hidden p-3 space-y-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='space-y-2 flex-1'>
            <Badge
              className={`${getDifficultyVariant(
                challenge.difficulty
              )} px-2 py-1 text-xs font-semibold w-fit`}
            >
              {challenge.difficulty}
            </Badge>

            <h1 className='text-lg font-bold text-foreground leading-tight'>
              {challenge.title}
            </h1>
          </div>

          <a
            href={challenge.livePreviewUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium text-sm transition-colors flex-shrink-0'
          >
            <Eye className='h-4 w-4' />
            <span>Preview</span>
          </a>
        </div>

        <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
          <div className='flex items-center gap-1'>
            <Clock className='h-3 w-3' />
            <span>{challenge.estimatedTime}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Users className='h-3 w-3' />
            <span>{challenge.completions.toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Star className='h-3 w-3 fill-current text-yellow-500' />
            <span>{challenge.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
