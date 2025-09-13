import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'

import {
  User,
  Mail,
  Calendar,
  ExternalLink,
  Edit,
  Moon,
  Sun,
  Check,
  Star,
  Trophy,
  Activity,
  TrendingUp,
  Heart,
  Twitter,
  Github,
  Code,
  BarChart3,
  Clock,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'Recent Activity' | 'Progress' | 'Saved Challenges'
  >('Saved Challenges')
  const [mounted, setMounted] = useState(false)
  const [savedChallenges, setSavedChallenges] = useState<number[]>([1, 2, 3, 4])

  useEffect(() => {
    setMounted(true)

    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [darkMode, mounted])

  const submissions = [
    {
      title: 'Interactive Dashboard Widget',
      level: 'Intermediate',
      tech: ['React', 'JavaScript'],
      score: 85,
      date: '20/01/2024',
    },
    {
      title: 'E-commerce Product Card',
      level: 'Beginner',
      tech: ['HTML', 'CSS'],
      score: 92,
      date: '18/01/2024',
    },
    {
      title: 'Todo App with Filters',
      level: 'Intermediate',
      tech: ['React', 'JavaScript'],
      score: 78,
      date: '15/01/2024',
    },
    {
      title: 'Landing Page Hero',
      level: 'Beginner',
      tech: ['HTML', 'CSS'],
      score: 95,
      date: '12/01/2024',
    },
    {
      title: 'Weather App Widget',
      level: 'Intermediate',
      tech: ['JavaScript', 'API'],
      score: 81,
      date: '10/01/2024',
    },
  ]

  const savedChallengesList = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      difficulty: 'Advanced',
      description:
        'Master advanced React patterns including render props, context API, custom hooks, and state management.',
      tech: ['React', 'Hooks', 'Context'],
      time: '10 hours',
      participants: 186,
      hours: 10,
    },
    {
      id: 2,
      title: 'CSS Grid Mastery',
      difficulty: 'Intermediate',
      description:
        'Learn to master CSS Grid with responsive layouts and complex design patterns.',
      tech: ['CSS', 'Grid', 'Flexbox'],
      time: '5 hours',
      participants: 692,
      hours: 5,
    },
    {
      id: 3,
      title: 'Node.js REST API',
      difficulty: 'Advanced',
      description:
        'Create a full-featured REST API with authentication and database integration.',
      tech: ['Node.js', 'Express', 'MongoDB'],
      time: '12 hours',
      participants: 234,
      hours: 12,
    },
    {
      id: 4,
      title: 'Vue.js Component Library',
      difficulty: 'Intermediate',
      description:
        'Build a reusable component library with proper documentation and testing.',
      tech: ['Vue.js', 'Components', 'Library'],
      time: '8 hours',
      participants: 445,
      hours: 8,
    },
  ]

  const toggleSaveChallenge = (challengeId: number) => {
    setSavedChallenges((prev) =>
      prev.includes(challengeId)
        ? prev.filter((id) => id !== challengeId)
        : [...prev, challengeId]
    )
  }

  if (!mounted) return null

  return (
    <PageLayout maxWidth='6xl'>
      <div className='min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 py-6'>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className='fixed top-4 right-4 p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white z-10 shadow-md hover:scale-105 transition-transform'
          aria-label='Toggle dark mode'
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className='flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4'>
          <div className='w-full lg:w-80 h-fit p-6 rounded-xl shadow-sm border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300'>
            <div className='text-center mb-6'>
              <div className='w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-2xl font-medium mb-3'>
                JD
              </div>
              <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
                John Doe
              </h1>
              <p className='text-sm text-blue-600 dark:text-blue-400 mt-1 flex items-center justify-center gap-1'>
                <Mail size={14} />
                john.doe@example.com
              </p>
            </div>

            <div className='space-y-5 text-sm'>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                  <User size={16} />
                  Bio
                </h3>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  Frontend developer passionate about building intuitive and
                  performant web applications. Always learning new technologies
                  and contributing to open source projects.
                </p>
              </div>

              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                  <Calendar size={16} />
                  Joined
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>January 2024</p>
              </div>

              <div>
                <h3 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
                  <ExternalLink size={16} />
                  Social Links
                </h3>
                <div className='space-y-2'>
                  <a
                    href='#'
                    className='flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm'
                  >
                    <Twitter size={16} />
                    @jobmdoe
                  </a>
                  <a
                    href='#'
                    className='flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm'
                  >
                    <Github size={16} />
                    john-doe-profile
                  </a>
                </div>
              </div>

              <button className='w-full px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2'>
                <Edit size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className='flex-1 space-y-6'>
            <div className='flex border-b border-gray-200 dark:border-gray-700 gap-8'>
              <button
                onClick={() => setActiveTab('Recent Activity')}
                className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors min-w-[160px] text-center ${
                  activeTab === 'Recent Activity'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Activity size={16} />
                Recent Activity
              </button>
              <button
                onClick={() => setActiveTab('Progress')}
                className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors min-w-[160px] text-center ${
                  activeTab === 'Progress'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <TrendingUp size={16} />
                Progress
              </button>
              <button
                onClick={() => setActiveTab('Saved Challenges')}
                className={`px-6 py-3 text-sm font-medium flex items-center gap-2 transition-colors min-w-[160px] text-center ${
                  activeTab === 'Saved Challenges'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Heart size={16} />
                Saved Challenges
              </button>
            </div>

            {activeTab === 'Recent Activity' && (
              <div className='space-y-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                    <Activity size={18} className='text-blue-500' />
                    Quick Stats
                  </h2>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div className='p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-100 flex items-center gap-3 shadow-sm'>
                      <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white'>
                        <Check size={16} />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>18</p>
                        <p className='text-xs opacity-80'>Completed</p>
                      </div>
                    </div>
                    <div className='p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-100 flex items-center gap-3 shadow-sm'>
                      <div className='w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white'>
                        <Star size={16} />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>82%</p>
                        <p className='text-xs opacity-80'>Avg Score</p>
                      </div>
                    </div>
                    <div className='p-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-100 flex items-center gap-3 shadow-sm'>
                      <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white'>
                        <Trophy size={16} />
                      </div>
                      <div>
                        <p className='text-lg font-bold'>2</p>
                        <p className='text-xs opacity-80'>Excellent</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                    <Activity size={18} className='text-blue-500' />
                    Recent Submissions
                  </h2>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                    Your latest completed challenges
                  </p>
                  <div className='space-y-3'>
                    {submissions.map((submission, index) => (
                      <div
                        key={index}
                        className='p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400'>
                            <Check size={12} />
                          </div>
                          <div>
                            <h3 className='font-medium text-gray-900 dark:text-white'>
                              {submission.title}
                            </h3>
                            <div className='flex items-center gap-1 mt-1'>
                              <span
                                className={`px-1.5 py-0.5 text-xs rounded ${
                                  submission.level === 'Beginner'
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                                }`}
                              >
                                {submission.level}
                              </span>
                              {submission.tech.map((t) => (
                                <span
                                  key={t}
                                  className='px-1.5 py-0.5 text-xs rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='font-semibold text-blue-600 dark:text-blue-400'>
                            {submission.score}%
                          </span>
                          <span className='text-gray-500 dark:text-gray-400 text-sm'>
                            {submission.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Progress' && (
              <div className='space-y-6'>
                <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                  <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                    <TrendingUp size={18} className='text-blue-500' />
                    Learning Path Progress
                  </h2>
                  <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                    Your progress across different learning paths
                  </p>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='p-5 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-center'>
                      <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                        100%
                      </p>
                      <p className='text-sm text-gray-700 dark:text-gray-300 mt-1'>
                        Beginner Path
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        8/8 Completed
                      </p>
                    </div>

                    <div className='p-5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-center'>
                      <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                        60%
                      </p>
                      <p className='text-sm text-gray-700 dark:text-gray-300 mt-1'>
                        Intermediate Path
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        6/10 Completed
                      </p>
                    </div>

                    <div className='p-5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-center'>
                      <p className='text-2xl font-bold text-gray-600 dark:text-gray-300'>
                        0%
                      </p>
                      <p className='text-sm text-gray-700 dark:text-gray-300 mt-1'>
                        Advanced Path
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        0/8 Completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                      <Code size={18} className='text-blue-500' />
                      By Technology
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      Challenges completed in each technology
                    </p>
                    <div className='space-y-4'>
                      {[
                        {
                          name: 'HTML',
                          value: 8,
                          total: 10,
                          color: 'bg-orange-500',
                        },
                        {
                          name: 'CSS',
                          value: 7,
                          total: 12,
                          color: 'bg-blue-500',
                        },
                        {
                          name: 'JavaScript',
                          value: 6,
                          total: 15,
                          color: 'bg-yellow-500',
                        },
                        {
                          name: 'React',
                          value: 3,
                          total: 8,
                          color: 'bg-cyan-500',
                        },
                        {
                          name: 'TypeScript',
                          value: 2,
                          total: 6,
                          color: 'bg-purple-500',
                        },
                        {
                          name: 'Node.js',
                          value: 1,
                          total: 4,
                          color: 'bg-green-500',
                        },
                      ].map((item, idx) => (
                        <div key={idx} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <div
                                className={`w-3 h-3 rounded-full ${item.color}`}
                              ></div>
                              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                                {item.name}
                              </span>
                            </div>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>
                              {item.value}/{item.total}
                            </span>
                          </div>
                          <div className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                            <div
                              className={`h-full ${item.color}`}
                              style={{
                                width: `${(item.value / item.total) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                      <BarChart3 size={18} className='text-blue-500' />
                      By Difficulty
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-4'>
                      Performance across difficulty levels
                    </p>
                    <div className='space-y-4'>
                      {[
                        {
                          label: 'Beginner',
                          count: 12,
                          total: 15,
                          color: 'bg-green-500',
                        },
                        {
                          label: 'Intermediate',
                          count: 5,
                          total: 8,
                          color: 'bg-yellow-500',
                        },
                        {
                          label: 'Advanced',
                          count: 1,
                          total: 4,
                          color: 'bg-red-500',
                        },
                      ].map((item, idx) => (
                        <div key={idx} className='space-y-2'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <div
                                className={`w-3 h-3 rounded-full ${item.color}`}
                              ></div>
                              <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                                {item.label}
                              </span>
                            </div>
                            <span className='text-sm text-gray-500 dark:text-gray-400'>
                              {item.count}/{item.total}
                            </span>
                          </div>
                          <div className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                            <div
                              className={`h-full ${item.color}`}
                              style={{
                                width: `${(item.count / item.total) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <div className='flex justify-end'></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Saved Challenges' && (
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5'>
                <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
                  <Heart size={18} className='text-blue-500' />
                  Saved Challenges
                </h2>
                {savedChallengesList.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {savedChallengesList.map((challenge) => (
                      <div
                        key={challenge.id}
                        className='relative rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 overflow-hidden group'
                      >
                        <span
                          className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-medium z-10 ${
                            challenge.difficulty === 'Advanced'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : challenge.difficulty === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          }`}
                        >
                          {challenge.difficulty}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSaveChallenge(challenge.id)
                          }}
                          className='absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors'
                          aria-label={
                            savedChallenges.includes(challenge.id)
                              ? 'Remove from saved'
                              : 'Save challenge'
                          }
                        >
                          <Heart
                            size={18}
                            fill={
                              savedChallenges.includes(challenge.id)
                                ? 'currentColor'
                                : 'none'
                            }
                            className={`transition-colors ${
                              savedChallenges.includes(challenge.id)
                                ? 'text-red-500'
                                : 'text-gray-400 hover:text-red-500'
                            }`}
                          />
                        </button>

                        <div className='w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center'>
                          <div className='w-16 h-16 rounded-lg bg-white dark:bg-gray-800 shadow-md flex items-center justify-center'>
                            <Code size={28} className='text-blue-500' />
                          </div>
                        </div>

                        <div className='p-5'>
                          <h3
                            className='font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer'
                            onClick={() =>
                              console.log('Navigate to challenge', challenge.id)
                            }
                          >
                            {challenge.title}
                          </h3>
                          <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
                            {challenge.description}
                          </p>

                          <div className='flex flex-wrap gap-2 mb-4'>
                            {challenge.tech.map((t) => (
                              <span
                                key={t}
                                className='px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
                            <div className='flex items-center gap-1.5'>
                              <Clock size={16} />
                              <span>{challenge.time}</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                              <Users size={16} />
                              <span>{challenge.participants} participants</span>
                            </div>
                          </div>

                          <div className='mt-4'>
                            <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1'>
                              <span>Progress</span>
                              <span>0%</span>
                            </div>
                            <div className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                              <div
                                className='h-full bg-blue-500'
                                style={{ width: '0%' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <div className='mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4'>
                      <Heart size={24} className='text-gray-400' />
                    </div>
                    <h3 className='font-medium text-gray-900 dark:text-white mb-1'>
                      No saved challenges
                    </h3>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>
                      Save challenges to access them later
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
