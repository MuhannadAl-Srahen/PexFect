import { Target, Code, BarChart3 } from 'lucide-react'
import '../../../types/profile.css'
import { useProfile } from '@/services/profile/hooks/useProfile'
import { useChallenges } from '@/services/challenges/hooks/useChallenges'

export function ProfileProgress() {
  const { data: profile } = useProfile(undefined)
  const { data: allChallenges = [] } = useChallenges()

  // Build totals per difficulty
  const totalsByDifficulty = allChallenges.reduce(
    (acc, c) => {
      acc[c.difficulty] = (acc[c.difficulty] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const pathIds: Array<'beginner' | 'intermediate' | 'advanced'> = [
    'beginner',
    'intermediate',
    'advanced',
  ]

  const learningPathStats = pathIds.map((id) => {
    const difficultyLabel = id === 'beginner' ? 'Beginner' : id === 'intermediate' ? 'Intermediate' : 'Advanced'
    const completed = profile?.learningPaths?.[id]?.completedChallenges?.length ?? 0
    const total = totalsByDifficulty[difficultyLabel] ?? 0
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
    return { id, name: `${difficultyLabel} Path`, completed, total, percentage }
  })

  // Technology breakdown: count total challenges per tag and completed per tag
  const techTotals: Record<string, { total: number; completed: number }> = {}
  const challengeById = new Map(allChallenges.map((c) => [c.id, c]))

  for (const ch of allChallenges) {
    if (!ch.tags) continue
    for (const tag of ch.tags) {
      techTotals[tag] = techTotals[tag] || { total: 0, completed: 0 }
      techTotals[tag].total += 1
    }
  }

  // Collect completed challenge ids from profile across all paths
  const completedSet = new Set<string>()
  if (profile?.learningPaths) {
    for (const lp of Object.values(profile.learningPaths)) {
      for (const cid of lp.completedChallenges || []) completedSet.add(cid)
    }
  }

  for (const cid of completedSet) {
    const ch = challengeById.get(cid)
    if (!ch || !ch.tags) continue
    for (const tag of ch.tags) {
      techTotals[tag] = techTotals[tag] || { total: 0, completed: 0 }
      techTotals[tag].completed += 1
    }
  }

  const techEntries = Object.keys(techTotals)
    .map((name) => ({ name, ...techTotals[name] }))
    .sort((a, b) => b.total - a.total)

  // Difficulty section (aggregate across difficulties)
  const difficultyStats = ['Beginner', 'Intermediate', 'Advanced'].map((level) => {
    const completed = Array.from(completedSet).filter((cid) => {
      const ch = challengeById.get(cid)
      return ch?.difficulty === level
    }).length
    const total = totalsByDifficulty[level] ?? 0
    const avgScore = 0 // no score data available here; kept as 0
    return { level, completed, total, avgScore }
  })

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
          {learningPathStats.map((path) => (
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
            {techEntries.slice(0, 8).map((tech) => {
              // Sanitize technology name into a safe CSS class key, e.g. "Tailwind CSS" -> "tailwind-css"
              const safeName = tech.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              return (
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
                      className={`h-full rounded-full profile-progress-${safeName} profile-progress-default transition-all duration-500 ease-out shadow-md border-2 border-white/20 dark:border-white/30`}
                      style={{
                        width: `${(tech.total > 0 ? (tech.completed / tech.total) * 100 : 0).toFixed(1)}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
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
            {difficultyStats.map((diff) => (
              <div
                key={diff.level}
                className='space-y-2 transition-all duration-300 hover:bg-muted/50 rounded-lg p-3 cursor-pointer group'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-3 h-3 rounded-full profile-indicator-${diff.level.toLowerCase()} transition-transform group-hover:scale-110`}
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
                    className={`h-full rounded-full profile-progress-${diff.level.toLowerCase()} transition-all duration-500 ease-out shadow-md border-2 border-white/20 dark:border-white/30`}
                    style={{
                      width: `${diff.total > 0 ? (diff.completed / diff.total) * 100 : 0}%`,
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
