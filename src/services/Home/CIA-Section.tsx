import { Link } from '@tanstack/react-router'
import { Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-on-scroll'
import { useTheme } from 'next-themes'

export function CIASection() {
  const { resolvedTheme } = useTheme()
  
  // Determine which image to use based on theme
  const signupImage = resolvedTheme === 'dark' 
    ? "src/assets/images/signupdark.jpg"
    : "src/assets/images/signup.jpg"

  return (
    <section className='relative py-16 sm:py-24 lg:py-32 overflow-hidden'>
      <StaggerContainer staggerDelay={0.2}>
        {/* Main container with light blended edges */}
        <div className='relative mx-auto max-w-6xl px-6 lg:px-8 group'>
        <div className='relative bg-gradient-to-b from-sky-100 to-primary rounded-3xl shadow-2xl overflow-hidden'>
          {/* Light edge overlays that blend with background */}
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-white/30 via-transparent to-white/30'></div>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 via-transparent to-white/10'></div>
          <div className='absolute inset-x-0 top-0 h-24 rounded-t-3xl bg-gradient-to-b from-white/40 via-white/20 to-transparent'></div>
          <div className='absolute inset-x-0 bottom-0 h-24 rounded-b-3xl bg-gradient-to-t from-white/25 via-white/10 to-transparent'></div>
          <div className='absolute inset-y-0 left-0 w-24 rounded-l-3xl bg-gradient-to-r from-white/30 via-white/15 to-transparent'></div>
          <div className='absolute inset-y-0 right-0 w-24 rounded-r-3xl bg-gradient-to-l from-white/30 via-white/15 to-transparent'></div>
          {/* Content */}
          <div className='relative px-8 sm:px-12 lg:px-16 pt-16 pb-20'>
            <StaggerItem animation='slideUp'>
              <div className='mx-auto max-w-2xl text-center mb-12 '>
                <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
                  Ready to start your journey?
                </h2>
                 <p className='mt-8 text-base sm:text-base md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed px-6 '>
                Join PexFect today and transform your frontend skills with personalized challenges and AI-powered feedback
            </p>
              <div className='flex justify-center mt-8'>
                <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300 peer">
                  <Link to="/signup">
                    Sign Up for free
                    <Rocket className='inline-block ml-1 !w-5 !h-5' />
                  </Link>
                </Button>
              </div>
            </div>
            </StaggerItem>

            <StaggerItem animation='scale'>
            {/*  hover effects */}
            <div className='relative mx-auto max-w-4xl'>
              <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 group-hover:rotate-0 transition-transform duration-500 dark:bg-background'>
                
                {/* Sign up image with bottom shadow  */}
                <div className='relative z-20 p-4'>
                    <img 
                      src={signupImage}
                      alt="Sign up preview"
                      className='w-full h-96 object-contain bg-gray-50 dark:bg-background shadow-lg  duration-300 ease-in-out'
                      key={resolvedTheme} 
                    />
                </div>
              </div>
            </div>
            </StaggerItem>
          </div>
        </div>
      </div>
      </StaggerContainer>
    </section>
  )
}