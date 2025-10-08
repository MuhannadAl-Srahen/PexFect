import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'
import type { ProfileStats } from '@/types'
import '@/types/profile.css'

interface Submission {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  technologies: string[]
  date: string
  score: number
}

interface RecentActivityTabProps {
  stats: ProfileStats
  submissions: Submission[]
}

export function RecentActivityTab({ stats, submissions }: RecentActivityTabProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Quick Stats */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {/* Completed Card */}
          <Card className="profile-card-blue relative overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer">
            <div className="relative p-4 md:p-6 text-center">
              <div className="profile-icon-blue w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-background flex items-center justify-center">
                  <div className="profile-icon-blue w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"></div>
                </div>
              </div>
              <div className="profile-text-blue text-xl md:text-2xl font-bold">
                {stats.challengesCompleted}
              </div>
              <div className="profile-text-blue-muted text-xs mt-1">
                Completed
              </div>
            </div>
          </Card>

          {/* Avg Score Card */}
          <Card className="profile-card-yellow relative overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer">
            <div className="relative p-4 md:p-6 text-center">
              <div className="profile-icon-yellow w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="profile-text-yellow text-xl md:text-2xl font-bold">
                {stats.averageRating}%
              </div>
              <div className="profile-text-yellow-muted text-xs mt-1">
                Avg Score
              </div>
            </div>
          </Card>

          {/* Excellent Card */}
          <Card className="profile-card-green relative overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer sm:col-span-2 lg:col-span-1">
            <div className="relative p-4 md:p-6 text-center">
              <div className="profile-icon-green w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="profile-text-green text-xl md:text-2xl font-bold">
                {stats.currentStreak}
              </div>
              <div className="profile-text-green-muted text-xs mt-1">
                Excellent
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Submissions */}
      <Card className="shadow-sm overflow-hidden bg-card">
        <div className="profile-header-bg p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm md:text-base">
                Recent Submissions
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Your latest completed challenges
              </p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {submissions.map((submission, index) => (
            <div
              key={submission.id}
              className="p-3 md:p-4 relative overflow-hidden transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
              style={{ 
                animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center gap-2 md:gap-3 mb-2">
                    <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                      <CheckCircle className="profile-check-icon w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h5 className="font-medium text-foreground text-sm md:text-base leading-tight">
                      {submission.name}
                    </h5>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2 ml-6 md:ml-8">
                    <Badge
                      variant="secondary"
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
                        variant="outline" 
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 ml-6 md:ml-8">
                    {submission.date}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 ml-6 sm:ml-0">
                  <div className="profile-score-text text-lg md:text-xl font-bold">
                    {submission.score}%
                  </div>
                  {/* Score indicator bar */}
                  <div className="w-16 sm:w-12 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                      style={{ 
                        width: `${submission.score}%`,
                        transform: 'translateX(-100%)',
                        animation: `scoreBar 1s ease-out ${index * 0.2}s forwards`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scoreBar {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}