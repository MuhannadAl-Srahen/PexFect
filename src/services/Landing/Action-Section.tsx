import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'

const ActionSection = () => {
  return (
    <section className='py-20 px-4 bg-muted/30 '>
      <div className='container mx-auto'>
        <div className='text-center max-w-4xl mx-auto '>
          <h2 className='text-3xl md:text-4xl font-bold mb-6 '>
            Ready to Start Your Journey?
          </h2>
          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto fade-up'>
            Join PexFect today and transform your frontend skills with
            personalized challenges and intelligent feedback.
          </p>

          {/* Sign Up Button */}
          <div className=' transform  transition-all duration-500'>
            <Link
              to='/signup'
              className='inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 microsoft-hover text-lg font-semibold rotating-shadow-animation'
            >
              Sign Up for Free
              <MoveRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActionSection
