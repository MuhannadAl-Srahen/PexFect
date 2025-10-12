import { Target, Code, BarChart3 } from 'lucide-react'
import '../../../types/profile.css'

const mockProgressData = {
  learningPaths: [
    {
      id: 'beginner',
      name: 'Beginner Path',
      completed: 8,
      total: 8,
      percentage: 100,
    },
    {
      id: 'intermediate',
      name: 'Intermediate Path',
      completed: 6,
      total: 10,
      percentage: 60,
    },
    {
      id: 'advanced',
      name: 'Advanced Path',
      completed: 0,
      total: 8,
      percentage: 0,
    },
  ],

  technologies: [
    { name: 'HTML', completed: 8, total: 10, color: 'html' },
    { name: 'CSS', completed: 7, total: 12, color: 'css' },
    { name: 'JavaScript', completed: 6, total: 15, color: 'javascript' },
    { name: 'React', completed: 3, total: 8, color: 'react' },
    { name: 'TypeScript', completed: 2, total: 6, color: 'typescript' },
    { name: 'Node.js', completed: 1, total: 4, color: 'nodejs' },
  ],

  difficulty: [
    {
      level: 'Beginner',
      completed: 12,
      total: 15,
      avgScore: 88,
      color: 'beginner',
    },
    {
      level: 'Intermediate',
      completed: 5,
      total: 8,
      avgScore: 75,
      color: 'intermediate',
    },
    {
      level: 'Advanced',
      completed: 1,
      total: 4,
      avgScore: 65,
      color: 'advanced',
    },
  ],
}

export function ProfileProgress() {
  return (
    <div className='space-y-6'>
      {/* Learning Path Progress */}
      <div className='bg-card border border-border rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='mb-6'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Target className='w-5 h-5 text-primary' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-foreground'>
                Learning Path Progress
              </h3>
              <p className='text-sm text-muted-foreground'>
                Your progress across different learning paths
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {mockProgressData.learningPaths.map((path) => (
            <div
              key={path.id}
              className={`p-4 rounded-lg border profile-card-${path.id} transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
            >
              <div className='text-center'>
                <div
                  className={`text-3xl font-bold profile-text-${path.id} mb-1`}
                >
                  {path.percentage}%
                </div>
                <div className={`font-medium profile-text-${path.id} mb-1`}>
                  {path.name}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {path.completed}/{path.total} Completed
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* By Technology */}
        <div className='bg-card border border-border rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='mb-6'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <Code className='w-5 h-5 text-primary' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  By Technology
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Challenges completed in each technology
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            {mockProgressData.technologies.map((tech) => (
              <div
                key={tech.name}
                className='space-y-2 transition-all duration-300 hover:bg-muted/50 rounded-lg p-3 cursor-pointer group'
              >
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-medium group-hover:text-primary transition-colors'>
                    {tech.name}
                  </span>
                  <span className='text-muted-foreground'>
                    {tech.completed}/{tech.total}
                  </span>
                </div>
                <div className='w-full bg-muted border-2 border-border rounded-full h-3 overflow-hidden shadow-inner'>
                  <div
                    className={`h-full rounded-full profile-progress-${tech.color} transition-all duration-500 ease-out shadow-md border-2 border-white/20 dark:border-white/30`}
                    style={{
                      width: `${(tech.completed / tech.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Difficulty */}
        <div className='bg-card border border-border rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='mb-6'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='p-2 bg-primary/10 rounded-lg'>
                <BarChart3 className='w-5 h-5 text-primary' />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-foreground'>
                  By Difficulty
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Performance across difficulty levels
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            {mockProgressData.difficulty.map((diff) => (
              <div
                key={diff.level}
                className='space-y-2 transition-all duration-300 hover:bg-muted/50 rounded-lg p-3 cursor-pointer group'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-3 h-3 rounded-full profile-indicator-${diff.color} transition-transform group-hover:scale-110`}
                    />
                    <span className='font-medium text-sm group-hover:text-primary transition-colors'>
                      {diff.level}
                    </span>
                  </div>
                  <div className='text-right'>
                    <div className='text-sm font-medium'>
                      {diff.completed}/{diff.total}
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      avg. {diff.avgScore}%
                    </div>
                  </div>
                </div>
                <div className='w-full bg-muted border-2 border-border rounded-full h-3 overflow-hidden shadow-inner'>
                  <div
                    className={`h-full rounded-full profile-progress-${diff.color} transition-all duration-500 ease-out shadow-md border-2 border-white/20 dark:border-white/30`}
                    style={{
                      width: `${(diff.completed / diff.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
