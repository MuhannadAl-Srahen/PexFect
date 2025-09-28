import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import { RecentActivityTab } from '@/components/profile/RecentActivityTab'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { SavedChallenges } from '@/components/profile/savedChallenges'
import { ProfileProgress } from '@/components/profile/ProfileProgress'
import { CheckCircle, Trophy, Heart } from 'lucide-react'
import { useState } from 'react'

interface TabItem {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  shortLabel: string
  firstWord: string
  secondWord?: string
}

const tabs: TabItem[] = [
  { key: 'recent', label: 'Recent Activity', shortLabel: 'Recent', firstWord: 'Recent', secondWord: 'Activity', icon: CheckCircle },
  { key: 'progress', label: 'Progress', shortLabel: 'Progress', firstWord: 'Progress', icon: Trophy },
  { key: 'saved', label: 'Saved Challenges', shortLabel: 'Saved', firstWord: 'Saved', secondWord: 'Challenges', icon: Heart },
]

// Mock data
const mockUser = {
  id: '1',
  username: 'johndoe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '',
  bio: 'Frontend developer passionate about building intuitive and performant web applications. Always learning new technologies and contributing to open source projects.',
  joinedAt: '2024-01-01',
  githubUrl: 'https://github.com/johndoe',
  linkedinUrl: 'https://linkedin.com/in/john-doe-profile',
  website: 'https://johndoe.dev',
  skills: [],
  experience: 'Intermediate',
  stats: {
    challengesCompleted: 18,
    totalSubmissions: 18,
    averageRating: 82,
    currentStreak: 2,
    longestStreak: 2,
    totalPoints: 0,
  },
}

const mockStats = {
  challengesCompleted: 18,
  averageRating: 82,
  currentStreak: 2,
}

const mockSubmissions = [
  {
    id: '1',
    name: 'Interactive Dashboard Widget',
    level: 'Intermediate' as const,
    technologies: ['React', 'JavaScript'],
    date: '20/01/2024',
    score: 85,
  },
  {
    id: '2',
    name: 'E-commerce Product Card',
    level: 'Beginner' as const,
    technologies: ['HTML', 'CSS'],
    date: '18/01/2024',
    score: 92,
  },
  {
    id: '3',
    name: 'Todo App with Filters',
    level: 'Intermediate' as const,
    technologies: ['React', 'JavaScript'],
    date: '15/01/2024',
    score: 78,
  },
  {
    id: '4',
    name: 'Landing Page Hero',
    level: 'Beginner' as const,
    technologies: ['HTML', 'CSS'],
    date: '12/01/2024',
    score: 95,
  },
  {
    id: '5',
    name: 'Weather App Widget',
    level: 'Intermediate' as const,
    technologies: ['JavaScript', 'API'],
    date: '10/01/2024',
    score: 81,
  },
]

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const [activeTab, setActiveTab] = useState('recent')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recent':
        return <RecentActivityTab stats={mockStats} submissions={mockSubmissions} />
      case 'progress':
        return <ProfileProgress />
      case 'saved':
        return <SavedChallenges />
      default:
        return null
    }
  }

  return (
    <PageLayout maxWidth='6xl'>
      <div className='container mx-auto px-4 py-4 md:py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Profile Card */}
          <div 
            className='lg:col-span-4'
            style={{
              animation: `slideInLeft 0.6s ease-out 0s both`,
            }}
          >
            <ProfileCard user={mockUser} />
          </div>

          {/* Main Content */}
          <div 
            className='lg:col-span-8'
            style={{
              animation: `slideInRight 0.6s ease-out 0.2s both`,
            }}
          >
            {/* Custom Tabs */}
            <div className='w-full'>
              <div 
                className='grid grid-cols-3 mb-6 md:mb-8 bg-card border shadow-sm h-12 md:h-16 rounded-lg overflow-hidden relative cursor-pointer group transition-all duration-300 hover:shadow-md hover:scale-[1.01]'
                style={{
                  animation: `slideInUp 0.5s ease-out 0.4s both`,
                }}
              >
                {/* Tab hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                
                {tabs.map((tab, index) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`h-full transition-all duration-300 relative px-1 group/tab overflow-hidden ${
                        activeTab === tab.key
                          ? 'bg-primary/10 text-primary scale-100'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-[1.02] hover:-translate-y-0.5'
                      }`}
                      style={{
                        animation: `slideInUp 0.4s ease-out ${0.5 + index * 0.1}s both`,
                      }}
                    >
                      {/* Tab button hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/tab:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Desktop Layout - Horizontal */}
                      <div className='hidden md:flex items-center justify-center gap-2 h-full'>
                        <Icon className={`h-4 w-4 flex-shrink-0 relative z-10 transition-all duration-300 ${
                          activeTab === tab.key 
                            ? 'scale-110 drop-shadow-sm' 
                            : 'group-hover/tab:scale-110 group-hover/tab:rotate-12 group-hover/tab:drop-shadow-sm'
                        }`} />
                        
                        <span className='text-sm lg:text-base relative z-10 transition-all duration-300 group-hover/tab:drop-shadow-sm whitespace-nowrap'>
                          {tab.label}
                        </span>
                      </div>

                      {/* Mobile Layout - Vertical */}
                      <div className='flex md:hidden flex-col items-center justify-center gap-1 h-full py-1'>
                        <Icon className={`h-3 w-3 flex-shrink-0 relative z-10 transition-all duration-300 ${
                          activeTab === tab.key 
                            ? 'scale-110 drop-shadow-sm' 
                            : 'group-hover/tab:scale-110 group-hover/tab:rotate-12 group-hover/tab:drop-shadow-sm'
                        }`} />
                        
                        <div className='text-center relative z-10 transition-all duration-300 group-hover/tab:drop-shadow-sm leading-tight'>
                          <div className='text-xs font-medium'>
                            {tab.firstWord}
                          </div>
                          {tab.secondWord && (
                            <div className='text-xs font-medium'>
                              {tab.secondWord}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Tab Contents */}
              <div 
                className='space-y-4 md:space-y-6 relative overflow-hidden'
                style={{
                  animation: `fadeInUp 0.6s ease-out 0.6s both`,
                }}
              >
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </PageLayout>
  )
}