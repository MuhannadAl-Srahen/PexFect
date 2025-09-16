import React, { useState } from 'react'
import { BookOpen, Video, Code, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ResourceGrid } from './ResourceGrid'
import { resources as docsData } from './ResourceDoc'
import { resources as tutorialData } from './ResourceTutorial'
import { resources as toolsData } from './ResourceTools'
import { resources as videoData } from './ResourceVideo'

interface ResourceItem {
  title: string
  description: string
  category: string
  url?: string
  rating?: number
  free?: boolean
  image?: string
  color?: string
  users?: string
}

interface TabItem {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: TabItem[] = [
  { key: 'documentation', label: 'Documentation', icon: BookOpen },
  { key: 'video', label: 'Videos', icon: Video },
  { key: 'tools', label: 'Tools', icon: Zap },
  { key: 'tutorial', label: 'Tutorials', icon: Code },
]

interface ResourcesSectionProps {
  searchTerm: string
  selectedDifficulty?: string
  selectedLanguage?: string
}

export function ResourcesSection({ 
  searchTerm
}: ResourcesSectionProps) {
  const [activeTab, setActiveTab] = useState('documentation')

  const getTabData = (key: string): ResourceItem[] => {
    switch (key) {
      case 'documentation':
        return docsData.documentation || []
      case 'tutorial':
        return tutorialData.tutorials || []
      case 'tools':
        return toolsData.tools || []
      case 'video':
        return videoData.videos || []
      default:
        return []
    }
  }

  const filterResources = (items: ResourceItem[]): ResourceItem[] => {
    if (!searchTerm) return items
    return items.filter((item: ResourceItem) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="w-full ">
      {/* Custom Tabs with Navigation Animation*/}
      <div className="flex items-center justify-center mb-15 px-4">
        <div className="bg-background dark:bg-background/50 rounded-2xl border border-border shadow-xl p-1.5 w-full max-w-3xl">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className=" group relative flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-2 transition-all duration-300 rounded-xl"
                >
                  <Icon
                    className={cn(
                       'w-5 h-5 transition-all duration-300',
                isActive
                  ? 'text-primary scale-110'
                  : 'text-muted-foreground group-hover:text-primary group-hover:scale-110'
              )}
            />
            <span
              className={cn(
                'text-sm sm:text-base font-medium transition-all duration-300 text-center',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {tab.label}
                  </span>

                  {/* Enhanced indicator line with smooth animations */}
                  <div
                    className={cn(
                      'absolute -bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out',
                isActive
                  ? 'w-8 sm:w-14 opacity-100 shadow-lg shadow-primary/30 animate-in slide-in-from-bottom-1'
                  : 'w-0 opacity-0 group-hover:w-6 sm:group-hover:w-8 group-hover:opacity-80 group-hover:shadow-md group-hover:shadow-primary/20'
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[380px] px-4 sm:px-10">
        <ResourceGrid items={filterResources(getTabData(activeTab))} />
      </div>
    </div>
  )
}
