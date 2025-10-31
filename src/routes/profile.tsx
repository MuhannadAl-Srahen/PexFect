import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import { PageHeader } from '@/layouts/PageHeader'
import {
  RecentActivityTab,
  SavedChallenges,
  ProfileProgress,
  ProfileCard,
} from '@/services/profile'
import { CheckCircle, Trophy, Heart, LogIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/services/challenges/hooks/useAuth'
import useDelayedLoading from '@/lib/useDelayedLoading'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
  // Use the shared useAuth query so auth state is cached and consistent
  const { data: authData, isLoading: isAuthLoading } = useAuth()
  const isAuthenticated = authData?.isAuthenticated ?? false

  // delay showing the spinner a little so short loads don't flicker
  const showLoading = useDelayedLoading(isAuthLoading, 180)

  // Keep the auth query up-to-date if Supabase emits auth changes (update the query cache)
  const queryClient = useQueryClient()
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      queryClient.setQueryData(['auth'], { isAuthenticated: !!session, session })
    })

    return () => listener.subscription?.unsubscribe?.()
  }, [queryClient])

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

  // Show loading state while checking auth
  if (showLoading && isAuthLoading) {
    return (
      <PageLayout maxWidth='6xl'>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center space-y-4'>
            <div className='w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin' />
            <p className='text-muted-foreground'>Loading...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Show sign-in prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <PageLayout maxWidth='6xl'>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <Card className='p-8 md:p-12 text-center max-w-2xl mx-auto shadow-lg border-2'>
            <div className='flex justify-center mb-6'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20'>
                <LogIn className='h-10 w-10 text-primary' />
              </div>
            </div>
            <h2 className='text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              Sign In to View Your Profile
            </h2>
            <p className='text-muted-foreground text-lg mb-8 leading-relaxed'>
              Create an account or sign in to access your personalized dashboard, track your progress, 
              save your favorite challenges, and view your learning journey.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button 
                onClick={async () => {
                  await supabase.auth.signInWithOAuth({
                    provider: 'github',
                    options: { redirectTo: window.location.origin + '/profile' },
                  })
                }}
                size='lg'
                className='gap-2 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <LogIn className='h-5 w-5' />
                Sign In with GitHub
              </Button>
            </div>
            <p className='text-sm text-muted-foreground mt-6'>
              It's quick, free, and secure!
            </p>
          </Card>
        </div>
      </PageLayout>
    )
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
