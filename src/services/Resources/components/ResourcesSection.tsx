import React from 'react'
import { BookOpen, Video, Wrench } from 'lucide-react'
import { ResourceGrid } from './ResourceGrid'
import { useResourceManagement } from '../hooks/useResourceManagement'

interface TabItem {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface ResourcesSectionProps {
  searchTerm?: string
  onSearchChange?: (value: string) => void
}

const tabs: TabItem[] = [
  { key: 'documentation', label: 'Documentation', icon: BookOpen },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'tools', label: 'Tools', icon: Wrench },
]

export function ResourcesSection({
  searchTerm = '',
  onSearchChange,
}: ResourcesSectionProps) {
  const { activeTab, setActiveTab, filteredData, loading, reload } =
    useResourceManagement(searchTerm)

  return (
    <div className='w-full mt-6 md:mt-10'>
      <div className='w-full'>
        {/* Tab List */}
        <div className='grid grid-cols-3 mb-6 md:mb-8 bg-card border shadow-sm h-10 md:h-12 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md'>
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key as 'video' | 'documentation' | 'tools')
                }
                className={`flex items-center justify-center gap-1 md:gap-2 h-full transition-all duration-200 relative px-1 ${
                  activeTab === tab.key
                    ? 'bg-primary/10 text-primary scale-100'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-[1.02]'
                }`}
              >
                <Icon className='h-3 w-3 md:h-4 md:w-4 flex-shrink-0' />
                <span className='hidden sm:inline text-sm md:text-base'>
                  {tab.label}
                </span>
                <span className='sm:hidden text-xs font-medium'>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className='min-h-[380px]'>
          <ResourceGrid
            items={filteredData}
            loading={loading}
            searchTerm={searchTerm}
            onClearSearch={
              onSearchChange ? () => onSearchChange('') : undefined
            }
            onRefresh={reload}
          />
        </div>
      </div>
    </div>
  )
}
