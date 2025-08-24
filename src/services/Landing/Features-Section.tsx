import { Link } from '@tanstack/react-router'
import { Swords, Map, Brain, BookKey } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/* Features Section */
const FeaturesSection = () => {
  return (
      <section className=' bg-background py-5 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8  flex items-center'>
                <div className='container mx-auto w-full '>

          <div className='text-center mb-4 sm:mb-6 lg:mb-8 '>
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-montserrat mb-3 sm:mb-4 section-tits'>
              Everything you need to succeed
          </h2>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto fade-up px-2 sm:px-4 lg:px-0 leading-relaxed'>
            PexFect combines real-world challenges, structured learning paths,
            and AI-powered feedback so you can become a confident developer.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-4xl lg:max-w-5xl mx-auto '>
          {/* Interactive Challenges */}
          <Link to='/challenges' className='block group'>
            <Card className='transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-y-2 active:scale-95 max-w-md mx-auto h-full '>
              <CardHeader className='pb-1 sm:pb-2 text-center'>
                <CardTitle className='flex flex-col items-center gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300'>
                    <Swords size={18} className='text-orange-600 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
                  </div>
                  <span className='text-base sm:text-lg lg:text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300'>
                    Interactive Challenges
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-sm sm:text-base transform group-hover:translate-x-1 transition-transform duration-300'>
                  Practice with real-world coding problems across different
                  difficulty levels and programming languages.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Structured Roadmap */}
          <Link to='/roadmap' className='block group'>
            <Card className='transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-y-2 active:scale-95 max-w-md mx-auto h-full'>
              <CardHeader className='pb-1 sm:pb-2 text-center'>
                <CardTitle className='flex flex-col items-center gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300'>
                    <Map size={18} className='text-blue-600 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
                  </div>
                  <span className='text-base sm:text-lg lg:text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300'>
                    Structured Roadmap
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-sm sm:text-base transform group-hover:translate-x-1 transition-transform duration-300'>
                  Follow a clear learning path from HTML/CSS basics to advanced
                  full-stack development.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* AI-Powered Feedback */}
          <Link to='/progress' className='block group'>
            <Card className='transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-y-2 active:scale-95 max-w-md mx-auto h-full'>
              <CardHeader className='pb-1 sm:pb-2 text-center'>
                <CardTitle className='flex flex-col items-center gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300'>
                    <Brain size={18} className='text-purple-600 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
                  </div>
                  <span className='text-base sm:text-lg lg:text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300'>
                    AI-Powered Feedback
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-sm sm:text-base transform group-hover:translate-x-1 transition-transform duration-300'>
                  Get instant, personalized feedback on your code with actionable
                  suggestions for improvement.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          {/* Curated Resources */}
          <Link to='/resources' className='block group'>
            <Card className='transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:border-primary hover:scale-105 hover:-translate-y-2 active:scale-95 max-w-md mx-auto h-full'>
              <CardHeader className='pb-1 sm:pb-2 text-center'>
                <CardTitle className='flex flex-col items-center gap-2 sm:gap-3'>
                  <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300'>
                    <BookKey size={18} className='text-green-600 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
                  </div>
                  <span className='text-base sm:text-lg lg:text-xl font-semibold text-card-foreground transform group-hover:scale-105 transition-transform duration-300'>
                    Curated Resources
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-sm sm:text-base transform group-hover:translate-x-1 transition-transform duration-300'>
                  Access hand-picked tutorials, documentation, and videos to
                  accelerate your learning journey.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
        </div>
    </section>
  )
}

export default FeaturesSection
