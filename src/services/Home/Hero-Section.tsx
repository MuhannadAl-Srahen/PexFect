import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Sparkles, Play } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'

export function HeroSection() {
  return (
    <section className='relative min-h-screen bg-background px-6'>
      <Spotlight />
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl'></div>
      </div>

      <div className='relative mx-auto z-10'>
        <StaggerContainer
          className='text-center py-10 lg:py-15'
          staggerDelay={0.2}
        >
          {/* Badge */}
          <StaggerItem animation='slideUp'>
            <div className='flex justify-center mb-8'>
              <Badge
                variant='secondary'
                className='bg-primary/10 text-primary border-primary/20 px-3 py-2 sm:px-4 sm:py-2 text-lg sm:text-lg font-medium rounded-full hover:bg-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
              >
                <Sparkles className='inline-block mr-1 !w-5 !h-5' />
                AI-Powered Learning Journey
              </Badge>
            </div>
          </StaggerItem>

          {/* Main heading */}
          <StaggerItem animation='slideUp'>
            <h1 className='text-4xl sm:text-4xl md:text-4xl lg:text-7xl font-bold text-foreground mb-6 leading-tight max-w-7xl mx-auto px-4'>
              Master Frontend Development with{' '}
              <span className='relative bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent lg:text-7xl'>
                AI-Powered
              </span>{' '}
              Practice
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem animation='slideUp'>
            <p className='text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-4'>
              Practice real-world coding challenges, follow structured roadmaps,
              and get instant AI feedback that guides you every step of the way
            </p>
          </StaggerItem>

          {/* CTA Buttons */}
          <StaggerItem animation='scale'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center px-4'>
              <Button
                asChild
                size='lg'
                className='w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground px-7 sm:px-8 py-7 text-xl font-semibold rounded-3xl shadow-lg hover:shadow-2xl 
                hover:scale-[1.04] transition-all duration-300'
              >
                <Link to='/signup'>Get Started</Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='outline'
                className='w-full sm:w-auto border-2 border-border text-foreground hover:bg-accent/30 px-7 sm:px-8 py-7 text-xl font-semibold rounded-3xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
              >
                <Link to='/roadmap'>
                  <Play className='inline-block mr-1 !w-6 !h-6' />
                  View Roadmap
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

)
}

export default HeroSection
