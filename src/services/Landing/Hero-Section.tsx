import { Link } from '@tanstack/react-router'
import { Sparkles, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* Hero Section */
const HeroSection = () => {
  return (
    <section className=' bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 flex items-center pt-3 sm:pt-3 lg:pt-4 min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] justify-center'>
      <div className=' mx-auto text-center max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full'>
        <div className='hero-line-3 text-sm sm:text-base lg:text-lg mb-2 sm:mb-8'>
          <Button className='mx-auto text-center bg-transparent bg-gradient-to-r from-blue-600 via-blue-600/50 to-blue-500 [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center] focus-visible:ring-blue-500/20 dark:from-blue-400 dark:via-blue-400/60 dark:to-blue-400 dark:focus-visible:ring-blue-400/40 flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2 text-xs sm:text-sm'>
            <Sparkles size={16} className='sm:w-4 sm:h-4' />
            AI-Powered Learning Journey
          </Button>
        </div>

        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-1.5 sm:mb-2 md:mb-3 leading-tight break-words'>
          Master Frontend Development with{' '}
          <br className='hidden md:block lg:hidden xl:block' />
          <span className=' text-blue-500 hero-line-3 blue-Glow whitespace-nowrap'>
            AI-Powered
          </span>{' '}
          Practice
        </h1>

        <p className=' text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl px-2 sm:px-4 md:px-8 lg:px-0 mb-6 sm:mb-8 md:mb-10 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed'>
          Practice real-world coding challenges, follow structured roadmap,
          and get instant AI feedback that guides you every step of the way.
        </p>

<div className="flex flex-col sm:flex-row sm:gap-2 md:gap-3 items-center justify-center max-w-md sm:max-w-none mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 gap-6">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto hover:scale-105 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl min-h-[40px] sm:min-h-[40px] gap-4">
              <Link to='/signup' className='font-semibold'>
                Get Started
              </Link>
            </Button>

          <Button asChild variant="secondary" size="lg" className="hover:scale-105 w-full sm:w-auto border border-black-2 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl min-h-[40px] sm:min-h-[40px]">
            <Link to='/roadmap' className='flex items-center font-semibold'>
              <Play size={22} className='mr-2 sm:mr-3' />
              View Roadmap
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
