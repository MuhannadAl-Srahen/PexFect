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
    <div className="space-y-6">
      {/* Quick Stats */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 transition-colors duration-300 hover:text-primary">
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Completed Card */}
          <Card className="profile-card-blue relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer group">
            <div className="relative p-6 text-center">
              <div className="profile-icon-blue w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
                  <div className="profile-icon-blue w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"></div>
                </div>
              </div>
              <div className="profile-text-blue text-2xl font-bold transition-all duration-300 group-hover:scale-110">
                {stats.challengesCompleted}
              </div>
              <div className="profile-text-blue-muted text-xs mt-1 transition-opacity duration-300 group-hover:opacity-80">
                Completed
              </div>
            </div>
          </Card>

          {/* Avg Score Card */}
          <Card className="profile-card-yellow relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer group">
            <div className="relative p-6 text-center">
              <div className="profile-icon-yellow w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="profile-text-yellow text-2xl font-bold transition-all duration-300 group-hover:scale-110">
                {stats.averageRating}%
              </div>
              <div className="profile-text-yellow-muted text-xs mt-1 transition-opacity duration-300 group-hover:opacity-80">
                Avg Score
              </div>
            </div>
          </Card>

          {/* Excellent Card */}
          <Card className="profile-card-green relative overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer group">
            <div className="relative p-6 text-center">
              <div className="profile-icon-green w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="profile-text-green text-2xl font-bold transition-all duration-300 group-hover:scale-110">
                {stats.currentStreak}
              </div>
              <div className="profile-text-green-muted text-xs mt-1 transition-opacity duration-300 group-hover:opacity-80">
                Excellent
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Submissions */}
      <Card className="shadow-sm overflow-hidden bg-card transition-all duration-300 hover:shadow-md">
        <div className="profile-header-bg p-6 border-b border-border transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:scale-110">
              <CheckCircle className="w-5 h-5 text-primary transition-transform duration-300 hover:rotate-12" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground transition-colors duration-300 hover:text-primary">
                Recent Submissions
              </h4>
              <p className="text-sm text-muted-foreground mt-1 transition-opacity duration-300 hover:opacity-80">
                Your latest completed challenges
              </p>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {submissions.map((submission, index) => (
            <div
              key={submission.id}
              className="p-4 relative overflow-hidden transition-all duration-300 hover:bg-muted/50 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer group hover:shadow-lg hover:border-l-4 hover:border-l-primary/50"
              style={{ 
                animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <CheckCircle className="profile-check-icon w-5 h-5 flex-shrink-0 transition-colors duration-300 group-hover:text-primary group-hover:drop-shadow-sm" />
                    </div>
                    <h5 className="font-medium text-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-[1.02] group-hover:drop-shadow-sm">
                      {submission.name}
                    </h5>
                  </div>
                  <div className="flex items-center gap-2 ml-8">
                    <Badge
                      variant="secondary"
                      className={`text-xs font-medium transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm group-hover:-translate-y-0.5 ${
                        submission.level === 'Beginner' 
                          ? 'profile-badge-beginner group-hover:shadow-green-200/50' 
                          : submission.level === 'Intermediate'
                          ? 'profile-badge-intermediate group-hover:shadow-yellow-200/50'
                          : 'profile-badge-advanced group-hover:shadow-red-200/50'
                      }`}
                    >
                      {submission.level}
                    </Badge>
                    {submission.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={tech} 
                        variant="outline" 
                        className="text-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 group-hover:shadow-sm group-hover:-translate-y-0.5"
                        style={{
                          transitionDelay: `${techIndex * 50}ms`
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 ml-8 transition-all duration-300 group-hover:opacity-70 group-hover:scale-95 group-hover:text-primary/60">
                    {submission.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="profile-score-text text-xl font-bold transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg group-hover:-translate-y-0.5 group-hover:text-primary">
                    {submission.score}%
                  </div>
                  {/* Score indicator bar */}
                  <div className="w-12 h-1 bg-muted rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 group-hover:shadow-sm"
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

        .recent-submission-item:hover {
          background: linear-gradient(135deg, rgba(var(--primary), 0.05) 0%, transparent 100%);
        }
      `}</style>
    </div>
  )
}