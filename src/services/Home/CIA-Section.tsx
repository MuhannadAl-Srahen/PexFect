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

  // Desktop images
  const signupImage =
    resolvedTheme === 'dark'
      ? 'src/assets/images/signupdark.jpg'
      : 'src/assets/images/signup.jpg'

  // Mobile images
  const signupMobileImage =
    resolvedTheme === 'dark'
      ? 'src/assets/images/signupdarkmobile.jpg'
      : 'src/assets/images/signupmobile.jpg'

  return (
    <div className='relative min-h-screen'>
      {/* Background layers */}
      <div className='absolute inset-0 bg-background'></div>
      <div className='absolute inset-0 bg-gradient-to-b from-primary/3 via-primary/15 to-background opacity-50'></div>
      <div className='absolute inset-0 bg-gradient-to-b from-primary/2 via-primary/3 to-background'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-primary/2 via-primary/5 to-background opacity-50'></div>

      <section className='relative min-h-screen py-16 sm:py-24 lg:py-32 overflow-hidden'>
        {/* Container with staggered animations */}
        <StaggerContainer staggerDelay={0.2}>
          <div className='relative mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative px-8 sm:px-12 lg:px-16 pt-16 pb-20 z-10'>
              {/* Heading and subtitle */}
              <StaggerItem animation='slideUp'>
                <div className='mx-auto max-w-2xl text-center mb-12'>
                  <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
                    Ready to start your journey?
                  </h2>
                  <p className='mt-8 text-base sm:text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed px-6'>
                    Join PexFect today and transform your frontend skills with
                    personalized challenges and AI-powered feedback
                  </p>

                  {/* Call-to-action button */}
                  <div className='flex justify-center mt-8'>
                    <Button
                      asChild
                      className='bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-2xl shadow-xl hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
                    >
                      <Link to='/signup'>
                        Sign Up for free
                        <Rocket className='inline-block ml-1 !w-5 !h-5' />
                      </Link>
                    </Button>
                  </div>
                </div>
              </StaggerItem>

              {/* Desktop image with hover  */}
              <StaggerItem animation='scale'>
                <div className='relative mx-auto max-w-4xl mt-20 hidden sm:block'>
                  <div className='relative border-[8px] border-gray-800  bg-black  rounded-3xl shadow-2xl overflow-hidden transform rotate-1 transition-transform duration-500 hover:rotate-0'>
                    <div className='relative z-20 p-3 pt-4 bg-black rounded-3xl overflow-hidden'>
                      <img
                        src={signupImage}
                        alt='Sign up desktop preview'
                        className='w-full h-[400px] object-cover duration-300 ease-in-out'
                        key={resolvedTheme}
                      />
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Mobile image with hover */}
              <StaggerItem animation='scale'>
                <div className='relative mx-auto max-w-xs mt-12 block sm:hidden'>
                  <div className='relative border-[6px] border-gray-800  bg-black rounded-[2.5rem] shadow-2xl overflow-hidden transform rotate-1 transition-transform duration-500 hover:rotate-0'>
                    <div className='relative z-20 p-1 bg-black rounded-[2rem] overflow-hidden'>
                      <img
                        src={signupMobileImage}
                        alt='Sign up mobile preview'
                        className='w-full h-[460px] object-cover rounded-[2rem] duration-300 ease-in-out'
                        key={resolvedTheme}
                      />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </div>
          </div>
        </StaggerContainer>
      </section>
    </div>
  )
}

export default CIASection
