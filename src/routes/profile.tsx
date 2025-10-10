import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import { PageHeader } from '@/layouts/PageHeader'
import {
  RecentActivityTab,
  SavedChallenges,
  ProfileProgress,
  ProfileCard,
} from '@/services/profile'
import { CheckCircle, Trophy, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import '@/types/profile.css'

interface TabItem {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
  { key: 'recent', label: 'Recent Activity', icon: CheckCircle },
  { key: 'progress', label: 'Progress', icon: Trophy },
  { key: 'saved', label: 'Saved Challenges', icon: Heart },
]

// Data is now handled by the service layer

export const Route = createFileRoute('/profile')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as string) || 'recent',
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { tab } = Route.useSearch()
  const [activeTab, setActiveTab] = useState(tab || 'recent')

  // Update tab when search param changes
  useEffect(() => {
    setActiveTab(tab || 'recent')
  }, [tab])

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recent':
        return <RecentActivityTab />
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
      {/* Page Header */}
      <PageHeader
        title='Profile Dashboard'
        description='Track your progress, manage saved challenges, and view your learning journey'
      />

      <div className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Profile Card */}
          <div className='lg:col-span-4 lg:sticky lg:top-6 lg:self-start'>
            <ProfileCard />
          </div>

          {/* Main Content */}
          <div className='lg:col-span-8'>
            {/* Tab Navigation */}
            <div className='w-full'>
              <div className='relative inline-flex items-center w-full rounded-xl bg-muted/50 p-1 shadow-sm border border-border/30 mb-6'>
                {/* Animated sliding background */}
                <div
                  className='absolute top-1 bottom-1 bg-primary rounded-lg shadow-md transition-all duration-300 ease-out'
                  style={{
                    left:
                      activeTab === 'recent'
                        ? '4px'
                        : activeTab === 'progress'
                          ? 'calc(33.333% + 2px)'
                          : 'calc(66.666% + 2px)',
                    width: 'calc(33.333% - 8px)',
                  }}
                />

                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.key
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative z-10 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 ease-out flex-1 ${
                        isActive
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-all duration-300 ${
                          isActive ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      <span className='hidden sm:inline whitespace-nowrap font-medium'>
                        {tab.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Tab Contents */}
              <div className='space-y-4 md:space-y-6'>{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
