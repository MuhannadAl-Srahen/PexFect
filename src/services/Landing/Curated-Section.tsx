
import { Link } from '@tanstack/react-router'

const CuratedSection = () => {
  return (
    <section className='py-16 px-4 bg-background dark:bg-background'>
      <div className='container mx-auto max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-foreground mb-4'>
            How It Works
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            Simple steps to elevate your frontend skills and build an impressive
            portfolio.
          </p>
        </div>

        {/* Timeline */}
        <div className='relative max-w-4xl mx-auto'>
          {/* Central Vertical Blue Line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary h-full'></div>

          {/* Step 1 - Choose a Challenge */}
          <div className='relative mb-16'>
            {/* Horizontal blue line to card */}
            <div className='absolute left-1/2 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-primary -translate-x-full'></div>
            {/* Blue circle on central line */}
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg'></div>

            <div className='flex items-center'>
              <div className='w-full md:w-5/12'>
                <Link to='/challenges' className='block group'>
                  <div className='bg-card border-4 border-primary rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer'>
                    <div className='flex items-center justify-start mb-6'>
                      <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl group-hover:scale-110 transition-transform duration-300'>
                        1
                      </div>
                    </div>
                    <h3 className='text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300'>
                      Choose a Challenge
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Select from a variety of real-world frontend projects tailored to your skill level.
                    </p>
                  </div>
                </Link>
              </div>
              <div className='hidden md:block w-2/12'></div>
              <div className='hidden md:block w-5/12'></div>
            </div>
          </div>

          {/* Step 2 - Build & Submit */}
          <div className='relative mb-16'>
            {/* Horizontal blue line to card */}
            <div className='absolute right-1/2 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-primary translate-x-full'></div>
            {/* Blue circle on central line */}
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg'></div>

            <div className='flex items-center'>
              <div className='hidden md:block w-5/12'></div>
              <div className='hidden md:block w-2/12'></div>
              <div className='w-full md:w-5/12'>
                <Link to='/profile' className='block group'>
                  <div className='bg-card border-4 border-primary rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer'>
                    <div className='flex items-center justify-start mb-6'>
                      <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl group-hover:scale-110 transition-transform duration-300'>
                        2
                      </div>
                    </div>
                    <h3 className='text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300'>
                      Build & Submit
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Develop your solution using your preferred tools and submit your GitHub repo and live site.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Step 3 - Get AI Feedback */}
          <div className='relative'>
            {/* Horizontal blue line to card */}
            <div className='absolute left-1/2 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-primary -translate-x-full'></div>
            {/* Blue circle on central line */}
            <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg'></div>

            <div className='flex items-center'>
              <div className='w-full md:w-5/12'>
                <Link to='/profile' className='block group'>
                  <div className='bg-card border-4 border-primary rounded-3xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer'>
                    <div className='flex items-center justify-start mb-6'>
                      <div className='w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl group-hover:scale-110 transition-transform duration-300'>
                        3
                      </div>
                    </div>
                    <h3 className='text-xl font-semibold text-card-foreground mb-4 group-hover:text-primary transition-colors duration-300'>
                      Get AI Feedback
                    </h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      Receive instant, detailed AI-powered review on your code, design, and responsiveness.
                    </p>
                  </div>
                </Link>
              </div>
              <div className='hidden md:block w-2/12'></div>
              <div className='hidden md:block w-5/12'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CuratedSection
