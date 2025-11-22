import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import '@/types/profile.css'

interface Submission {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  technologies: string[]
  date: string
  score: number
}

interface UserStats {
  completed_challenges: number
  average_score: number
  current_streak: number
}

interface RecentActivityItem {
  submission_id: string
  challenge_id: string
  submitted_at: string
}

const ITEMS_PER_PAGE = 3

export function RecentActivityTab() {
  const [currentPage, setCurrentPage] = useState(1)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<UserStats>({
    completed_challenges: 0,
    average_score: 0,
    current_streak: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgressData()
  }, [])

  const fetchUserProgressData = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setSubmissions([])
        return
      }

      console.log('[RecentActivityTab] Fetching data for user:', user.id)

      // Fetch user_progress table for stats and recent_activity
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('completed_challenges, average_score, current_streak, recent_activity')
        .eq('profile_id', user.id)
        .single()

      if (progressError) {
        console.error('[RecentActivityTab] Error fetching user_progress:', progressError)
        // Continue with empty stats
      } else if (progressData) {
        // Cast progressData to proper type
        const progress = progressData as {
          completed_challenges: number
          average_score: number
          current_streak: number
          recent_activity: unknown
        }

        // Update stats
        setStats({
          completed_challenges: progress.completed_challenges || 0,
          average_score: progress.average_score || 0,
          current_streak: progress.current_streak || 0
        })

        console.log('[RecentActivityTab] Stats:', {
          completed: progress.completed_challenges,
          avgScore: progress.average_score,
          streak: progress.current_streak
        })

        // Process recent_activity array
        const recentActivity = progress.recent_activity as RecentActivityItem[] | null
        
        if (recentActivity && Array.isArray(recentActivity) && recentActivity.length > 0) {
          console.log('[RecentActivityTab] Found', recentActivity.length, 'recent activities')
          
          // Get submission IDs and challenge IDs
          const submissionIds = recentActivity.map(item => item.submission_id)
          const challengeIds = [...new Set(recentActivity.map(item => item.challenge_id))]

          // Fetch submissions with feedback
          const { data: submissionsData, error: submissionsError } = await supabase
            .from('challenge_submissions')
            .select('id, challenge_title, challenge_feedback (overall_score)')
            .in('id', submissionIds)

          if (submissionsError) {
            console.error('[RecentActivityTab] Error fetching submissions:', submissionsError)
          }

          // Fetch challenges
          const { data: challengesData, error: challengesError } = await supabase
            .from('challenges')
            .select('id, difficulty, category')
            .in('id', challengeIds)

          if (challengesError) {
            console.error('[RecentActivityTab] Error fetching challenges:', challengesError)
          }

          // Create lookup maps
          interface SubmissionData {
            id: string
            challenge_title: string
            challenge_feedback?: Array<{ overall_score: number }>
          }

          interface ChallengeData {
            id: string
            difficulty: string
            category: string
          }

          const submissionMap = new Map(
            (submissionsData || []).map((s: SubmissionData) => [
              s.id,
              {
                challenge_title: s.challenge_title,
                overall_score: s.challenge_feedback?.[0]?.overall_score || 0
              }
            ])
          )

          const challengeMap = new Map(
            (challengesData || []).map((c: ChallengeData) => [
              c.id,
              {
                difficulty: c.difficulty,
                category: c.category
              }
            ])
          )

          // Transform to UI format
          const transformedSubmissions: Submission[] = recentActivity
            .map((activity) => {
              const submission = submissionMap.get(activity.submission_id)
              const challenge = challengeMap.get(activity.challenge_id)

              if (!submission) return null

              const difficulty = challenge?.difficulty || 'Beginner'
              const category = challenge?.category || 'General'
              
              // Calculate relative time
              const submittedDate = new Date(activity.submitted_at)
              const now = new Date()
              const diffTime = Math.abs(now.getTime() - submittedDate.getTime())
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
              const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
              const diffMinutes = Math.floor(diffTime / (1000 * 60))
              
              let relativeTime = ''
              if (diffDays > 0) {
                relativeTime = diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
              } else if (diffHours > 0) {
                relativeTime = diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`
              } else {
                relativeTime = diffMinutes === 0 ? 'Just now' : diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`
              }

              return {
                id: activity.submission_id,
                name: submission.challenge_title,
                level: (difficulty.charAt(0).toUpperCase() + difficulty.slice(1)) as 'Beginner' | 'Intermediate' | 'Advanced',
                technologies: [category],
                date: relativeTime,
                score: Math.round(submission.overall_score)
              }
            })
            .filter((item): item is Submission => item !== null)

          console.log('[RecentActivityTab] Transformed', transformedSubmissions.length, 'submissions')
          setSubmissions(transformedSubmissions)
        } else {
          console.log('[RecentActivityTab] No recent_activity found')
          setSubmissions([])
        }
      }
    } catch (error) {
      console.error('[RecentActivityTab] Error in fetchUserProgressData:', error)
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentSubmissions = submissions.slice(startIndex, endIndex)
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE)

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className='space-y-6'>
      {/* Quick Stats */}
      <div>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <CheckCircle className='w-5 h-5 text-primary' />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>
              Quick Stats
            </h3>
            <p className='text-sm text-muted-foreground'>
              Your recent activity overview
            </p>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2 sm:gap-3 md:gap-4'>
          {/* Completed Card */}
          <Card className='profile-card-blue relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer'>
            <div className='relative p-3 sm:p-4 md:p-5 text-center'>
              <div className='profile-icon-blue w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center'>
                <div className='w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 rounded-full bg-background flex items-center justify-center'>
                  <div className='profile-icon-blue w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full'></div>
                </div>
              </div>
              <div className='profile-text-blue text-lg sm:text-xl md:text-2xl font-bold'>
                {stats.completed_challenges}
              </div>
              <div className='profile-text-blue-muted text-xs sm:text-sm mt-1'>
                Completed
              </div>
            </div>
          </Card>

          {/* Avg Score Card */}
          <Card className='profile-card-yellow relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer'>
            <div className='relative p-3 sm:p-4 md:p-5 text-center'>
              <div className='profile-icon-yellow w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center'>
                <svg
                  className='w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </div>
              <div className='profile-text-yellow text-lg sm:text-xl md:text-2xl font-bold'>
                {Math.round(stats.average_score)}%
              </div>
              <div className='profile-text-yellow-muted text-xs sm:text-sm mt-1'>
                Avg Score
              </div>
            </div>
          </Card>

          {/* Streak Card */}
          <Card className='profile-card-green relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer'>
            <div className='relative p-3 sm:p-4 md:p-5 text-center'>
              <div className='profile-icon-green w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center'>
                <svg
                  className='w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='profile-text-green text-lg sm:text-xl md:text-2xl font-bold'>
                {stats.current_streak}
              </div>
              <div className='profile-text-green-muted text-xs sm:text-sm mt-1'>
                Day Streak
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Submissions */}
      <Card className='shadow-sm overflow-hidden bg-card border rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='p-6 border-b border-border bg-muted/20'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <CheckCircle className='w-5 h-5 text-primary' />
            </div>
            <div>
              <h4 className='font-semibold text-foreground text-base'>
                Recent Submissions
              </h4>
              <p className='text-sm text-muted-foreground mt-1'>
                Your latest completed challenges
              </p>
            </div>
          </div>
        </div>

        <div className='divide-y divide-border'>
          {loading ? (
            <div className='p-8 text-center'>
              <div className='animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
              <p className='text-muted-foreground'>Loading your submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className='p-8 text-center'>
              <CheckCircle className='w-12 h-12 text-muted-foreground/50 mx-auto mb-4' />
              <p className='text-muted-foreground'>No submissions yet</p>
              <p className='text-sm text-muted-foreground mt-2'>Start solving challenges to see your activity here!</p>
            </div>
          ) : (
            currentSubmissions.map((submission) => (
            <div
              key={submission.id}
              className='p-4 relative overflow-hidden transition-all duration-300 hover:bg-muted/50 cursor-pointer group'
            >
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='flex-shrink-0'>
                      <CheckCircle className='profile-check-icon w-5 h-5 transition-transform group-hover:scale-110' />
                    </div>
                    <h5 className='font-medium text-foreground text-base leading-tight group-hover:text-primary transition-colors'>
                      {submission.name}
                    </h5>
                  </div>
                  <div className='flex flex-wrap items-center gap-2 ml-8'>
                    <Badge
                      variant='secondary'
                      className={`text-xs font-medium ${
                        submission.level === 'Beginner'
                          ? 'profile-badge-beginner'
                          : submission.level === 'Intermediate'
                            ? 'profile-badge-intermediate'
                            : 'profile-badge-advanced'
                      }`}
                    >
                      {submission.level}
                    </Badge>
                    {submission.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant='outline'
                        className='text-xs hover:bg-primary/10 transition-colors'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className='text-xs text-muted-foreground mt-2 ml-8'>
                    {submission.date}
                  </div>
                </div>
                <div className='flex sm:flex-col items-center sm:items-end gap-2 ml-8 sm:ml-0'>
                  <div className='profile-score-text text-xl font-bold group-hover:scale-110 transition-transform'>
                    {submission.score}%
                  </div>
                  {/* Score indicator bar */}
                  <div className='w-16 sm:w-12 h-2 bg-muted rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out'
                      style={{
                        width: `${submission.score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className='p-4 border-t border-border bg-muted/10'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground'>
                Showing {startIndex + 1}-
                {Math.min(endIndex, submissions.length)} of{' '}
                {submissions.length} submissions
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className='flex items-center gap-1'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Button>
                <div className='flex items-center gap-1 mx-2'>
                  <span className='text-sm font-medium'>{currentPage}</span>
                  <span className='text-sm text-muted-foreground'>of</span>
                  <span className='text-sm font-medium'>{totalPages}</span>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className='flex items-center gap-1'
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
