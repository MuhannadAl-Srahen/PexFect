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
    <div className='bg-card rounded-lg shadow-sm border overflow-hidden mb-6 md:mb-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
      <div className='aspect-[4/3] sm:aspect-video relative group'>
        <img
          src={challenge.images[currentImageIndex].url || '/placeholder.svg'}
          alt={challenge.images[currentImageIndex].alt}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {challenge.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className='absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100'
            >
              <ChevronLeft className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6' />
            </button>
            <button
              onClick={nextImage}
              className='absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-1.5 sm:p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100'
            >
              <ChevronRight className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6' />
            </button>

            {/* Image indicators */}
            <div className='absolute bottom-1 sm:bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 md:space-x-3'>
              {challenge.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentImageIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Current image label */}
            <div className='absolute top-1 sm:top-2 md:top-4 right-1 sm:right-2 md:right-4 bg-white/90 text-gray-800 px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded sm:rounded-md md:rounded-lg text-xs sm:text-xs md:text-sm font-medium shadow-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100'>
              <span className='hidden sm:inline'>
                {challenge.images[currentImageIndex].label} View (
                {currentImageIndex + 1}/{challenge.images.length})
              </span>
              <span className='sm:hidden'>
                {currentImageIndex + 1}/{challenge.images.length}
              </span>
            </div>
          </>
        )}

        <div className='absolute inset-0 bg-black/20 flex items-end'>
          <div className='p-2 sm:p-3 md:p-6 text-white flex-1'>
            <Badge
              className={`${getDifficultyVariant(challenge.difficulty)} px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs border-0 font-semibold shadow-sm mb-1 sm:mb-2 md:mb-3 transition-all duration-300 hover:scale-105`}
            >
              {challenge.difficulty}
            </Badge>
            <h1 className='text-lg sm:text-xl md:text-3xl font-bold mb-1 sm:mb-2 transition-all duration-300 hover:text-primary leading-tight'>
              {challenge.title}
            </h1>
            <div className='flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-xs md:text-sm'>
              <div className='flex items-center transition-all duration-300 hover:scale-105'>
                <Clock className='h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1' />
                <span className='hidden sm:inline'>
                  {challenge.estimatedTime}
                </span>
                <span className='sm:hidden'>
                  {challenge.estimatedTime.split(' ')[0]}h
                </span>
              </div>
              <div className='flex items-center transition-all duration-300 hover:scale-105'>
                <Users className='h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1' />
                <span className='hidden sm:inline'>
                  {challenge.completions.toLocaleString()} completed
                </span>
                <span className='sm:hidden'>
                  {Math.round(challenge.completions / 1000)}k
                </span>
              </div>
              <div className='flex items-center transition-all duration-300 hover:scale-105'>
                <Star className='h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 fill-current' />
                {challenge.rating}
              </div>
            </div>
          </div>

          <div className='p-2 sm:p-3 md:p-6'>
            <a
              href={challenge.livePreviewUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded sm:rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs sm:text-xs md:text-sm'
            >
              <Eye className='h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 sm:mr-1 md:mr-2' />
              <span className='hidden sm:inline'>Live Preview</span>
              <span className='sm:hidden'>Preview</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
