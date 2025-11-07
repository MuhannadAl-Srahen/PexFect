import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll progress
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    // Call once to set initial state
    toggleVisibility()

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const start = window.scrollY
    const duration = 1300 // 1.3 seconds for slower scroll
    const startTime = performance.now()

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, start * (1 - ease))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Calculate stroke dash offset for circular progress
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-50 group',
        'w-12 h-12 rounded-full',
        'bg-primary text-primary-foreground',
        'shadow-lg hover:shadow-xl',
        'transition-all duration-300 ease-out',
        'hover:scale-110 active:scale-95',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      aria-label='Scroll to top'
    >
      {/* Circular Progress Ring */}
      <svg
        className='absolute inset-0 w-full h-full -rotate-90'
        viewBox='0 0 48 48'
      >
        {/* Background circle */}
        <circle
          cx='24'
          cy='24'
          r={radius}
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
          className='text-primary-foreground/20'
        />
        {/* Progress circle */}
        <circle
          cx='24'
          cy='24'
          r={radius}
          stroke='currentColor'
          strokeWidth='3'
          fill='none'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          className='text-primary-foreground transition-all duration-150 ease-out'
        />
      </svg>

      {/* Arrow Icon */}
      <div className='relative flex items-center justify-center w-full h-full'>
        <ArrowUp className='w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1' />
      </div>
    </button>
  )
}
