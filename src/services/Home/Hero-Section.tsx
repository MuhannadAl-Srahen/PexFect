import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'
import { Sparkles, Play } from 'lucide-react'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'

export function HeroSection() {

  return (
    <>
      <BackgroundRippleEffect />
      <section className="relative min-h-screen px-5 transition-all duration-300 overflow-hidden">
        <div className="flex flex-col items-center justify-start min-h-screen text-center relative z-10 pt-16 sm:pt-16 lg:pt-10">
          <StaggerContainer>
            {/* Badge */}
            
            <StaggerItem animation='slideUp'>
              <div className='flex justify-center mb-8'>
              <Badge
                variant='secondary'
                className='bg-primary/10 text-primary border-primary/60 px-2 py-2 sm:px-4 sm:py-1 text-md sm:text-md font-medium rounded-full hover:bg-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
              >
                <Sparkles className='inline-block mr-1 !w-4 !h-4' />
                AI-Powered Learning Journey
              </Badge>
            </div>
          </StaggerItem>
          

          {/* Main heading */}
          <StaggerItem animation='slideUp'>
            <h1 className='text-4xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto px-4'>
              Master Frontend Development with{' '}
              <span className='relative bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent lg:text-6xl'>
                AI-Powered
              </span>{' '}
              Practice
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem animation='slideUp'>
            <p className='text-base sm:text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-4'>
              Practice real-world coding challenges, follow structured roadmaps,
              and get instant AI feedback that guides you every step of the way
            </p>
          </StaggerItem>

          {/* CTA Buttons */}
          <StaggerItem animation='scale'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center px-7 mt-12 sm:mt-16'>
              <Button
                asChild
                size='lg'
                className='w-full sm:w-auto bg-primary px-7 sm:px-8 py-7 text-lg font-semibold rounded-3xl shadow-lg hover:shadow-2xl 
                hover:scale-[1.04] transition-all duration-300'
              >
                <Link to='/signup'>Get Started</Link>
              </Button>
              <Button
                asChild
                size='lg'
                variant='default'
                className='w-full sm:w-auto bg-secondary hover:bg-secondary/90 hover:text-primary/80  text-foreground px-7 sm:px-7 py-6 text-lg font-semibold rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-300'
              >
                <Link to='/roadmap'>
                  <Play className='inline-block mr-1 !w-5 !h-5' />
                  View Roadmap
                </Link>
              </Button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
    <BackgroundRippleEffect />
    </>
  )
}

export default HeroSection

