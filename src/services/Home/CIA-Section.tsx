import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Rocket  } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll'

export function CIASection() {
  return (
    <section className='relative bg-background py-16 sm:py-24 lg:py-32 overflow-hidden'>
      <div className='mx-auto max-w-6xl px-6 lg:px-8'>
        <AnimateOnScroll animation='slideUp'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-4xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-6xl'>
              Ready to Start Your Journey?
            </h2>
            <p className='mt-6 text-xl leading-8 text-muted-foreground'>
              Join PexFect today and transform your frontend skills with
              personalized challenges and intelligent feedback
            </p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation='scale' delay={0.3}>
          <div className='flex justify-center mt-12 sm:mt-20'>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/80 text-primary-foreground px-10 py-7 text-xl font-semibold rounded-3xl shadow-xl hover:shadow-xl hover:scale-[1.06] transition-all duration-300'
            >
              <Link to='/signup'>
                Sign Up for Free
                <Rocket className='inline-block ml-1 !w-7 !h-7' />
              </Link>
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
