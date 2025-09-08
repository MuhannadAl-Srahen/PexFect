import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { Rocket } from 'lucide-react'

export function CIASection() {
  return (
    <section className='bg-background py-16 sm:py-24 lg:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl'>
            Ready to Start Your Journey?
          </h2>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Join PexFect today and transform your frontend skills with
            personalized challenges and intelligent feedback.
          </p>
        </div>
        <div className='flex justify-center mt-12 sm:mt-20'>
          <Button
            asChild
            size='lg'
            className='bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300'
          >
            <Link to='/signup'>
              Sign Up for Free
              <Rocket className='inline-block ml-1' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
