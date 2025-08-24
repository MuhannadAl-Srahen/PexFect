import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'

{
  /* Featured Challenges Section */
}

const ChallengesSection = () => {
  return (
    <div className='bg-secondary text-secondary-foreground'>
      <section className='py-20 px-4 bg-background scroll-trigger'>
        <div className='container mx-auto'>
          <div className='text-center mb-16 scroll-scale'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 section-title'>
              Featured Challenges
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto fade-up'>
              Dive into real-world projects and sharp your skills
            </p>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12'>
          {/* Challenge Card 1 */}
          <div className='challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl'>
            <Link to='/challenges' className='block group'>
              <div className='bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300'>
                <div className='aspect-video bg-gray-100 relative'>
                  <div className='absolute top-3 left-3'>
                    <span className='bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium'>
                      CSS
                    </span>
                  </div>
                  <div className='flex items-center justify-center h-full text-gray-400'></div>
                </div>
                <div className='p-6'>
                  <h3 className='font-semibold text-lg mb-2'>
                    Responsive Navigation Bar
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Create a mobile-friendly navigation component with dropdown
                    menus.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <span>⭐</span>
                        4.9/5
                      </span>
                      <span className='flex items-center gap-1'>
                        <span>⏱️</span>
                        30 min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Challenge Card 2 */}
          <div className='challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl'>
            <Link to='/challenges' className='block group'>
              <div className='bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300'>
                <div className='aspect-video bg-gray-100 relative'>
                  <div className='absolute top-3 left-3'>
                    <span className='bg-green-500 text-white text-xs px-2 py-1 rounded font-medium'>
                      Beginner
                    </span>
                  </div>
                  <div className='flex items-center justify-center h-full text-gray-400'></div>
                </div>
                <div className='p-6'>
                  <h3 className='font-semibold text-lg mb-2'>
                    Interactive Dashboard
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Build a responsive dashboard with charts and data
                    visualization components.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <span>⭐</span>
                        4.8/5
                      </span>
                      <span className='flex items-center gap-1'>
                        <span>⏱️</span>
                        45 min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Challenge Card 3 */}
          <div className='challenge-card card-animate opacity-0 transform translate-y-8 transition-all duration-500 hover:scale-105 hover:shadow-xl'>
            <Link to='/challenges' className='block group'>
              <div className='bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300'>
                <div className='aspect-video bg-gray-100 relative'>
                  <div className='absolute top-3 left-3'>
                    <span className='bg-green-500 text-white text-xs px-2 py-1 rounded font-medium'>
                      Beginner
                    </span>
                  </div>
                  <div className='flex items-center justify-center h-full text-gray-400'></div>
                </div>
                <div className='p-6'>
                  <h3 className='font-semibold text-lg mb-2'>
                    Interactive Dashboard
                  </h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    Build a responsive dashboard with charts and data
                    visualization components.
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <span>⭐</span>
                        4.8/5
                      </span>
                      <span className='flex items-center gap-1'>
                        <span>⏱️</span>
                        45 min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* View All Challenges Button */}
          <div className='text-center'>
            <Link
              to='/challenges'
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 microsoft-hover'
            >
              View All Challenges
              <MoveRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChallengesSection
