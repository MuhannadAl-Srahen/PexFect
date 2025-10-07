import { learningPaths } from '../data'
import LearningPathCard from './LearningPathCard'
import { PageHeader } from '@/layouts/PageHeader'
import { Target, Code2, BadgeCheck } from 'lucide-react'

interface WhyFollowCardProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  desc: string
}

const WhyFollowCard: React.FC<WhyFollowCardProps> = ({
  icon,
  iconBg,
  title,
  desc,
}) => (
  <div className='bg-card rounded-3xl border border-border/50 p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-primary/20 flex flex-col items-center text-center h-full'>
    <div
      className={`rounded-2xl p-5 md:p-6 mb-4 md:mb-6 flex items-center justify-center ${iconBg} transition-all duration-300 hover:scale-105 shadow-lg`}
    >
      {icon}
    </div>
    <h3 className='font-bold text-xl md:text-2xl mb-3 md:mb-4 text-foreground'>
      {title}
    </h3>
    <p className='text-muted-foreground text-sm md:text-base leading-relaxed flex-1'>
      {desc}
    </p>
  </div>
)
const WhyFollowSection = () => (
  <section className='w-full mt-16 md:mt-20 px-4'>
    <div className='max-w-7xl mx-auto'>
      <div className='text-center mb-12 md:mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground'>
          Why Follow Our Roadmap?
        </h2>
        <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto'>
          Unlock your potential with a proven, step-by-step learning journey
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
        <WhyFollowCard
          icon={<Target className='w-12 h-12 md:w-14 md:h-14 text-primary' />}
          iconBg='bg-primary/10'
          title='Progressive Learning'
          desc='Guided step-by-step challenges that build skills, reinforce concepts, and track progress with practical milestones.'
        />
        <WhyFollowCard
          icon={<Code2 className='w-12 h-12 md:w-14 md:h-14 text-primary' />}
          iconBg='bg-primary/10'
          title='Real Projects'
          desc='Build real projects for your portfolio, practice teamwork, deploy features, and demonstrate production-ready skills.'
        />
        <WhyFollowCard
          icon={
        <BadgeCheck className='w-12 h-12 md:w-14 md:h-14 text-primary' />
          }
          iconBg='bg-primary/10'
          title='AI Feedback'
          desc='Get instant AI feedback on code, design, testing, and accessibility to improve quality and readability.'
        />
      </div>
    </div>
  </section>
)

const RoadmapOverview = () => {
  return (
    <div className='w-full flex flex-col items-center'>
      <PageHeader
        title='Your Frontend Journey'
        description='Choose your path and master frontend development through carefully crafted challenges that build real skills'
      />

      {/* Learning Paths Grid */}
      <div className='w-full max-w-7xl mx-auto mb-16 px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {learningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      </div>

      <WhyFollowSection />
    </div>
  )
}

export default RoadmapOverview
