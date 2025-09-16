import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '@/layouts/PageLayout'
import { ResourcePageHeader, ResourceControls, ResourcesSection } from '@/services/Resources'
import { useState } from 'react'

export const ResourceControlsRoute = createFileRoute('/resources/')({
  component: RouteComponent,
})

export const Route = createFileRoute('/resources/')({
  component: RouteComponent,
})
function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  return (
    <PageLayout>
      <ResourcePageHeader />
      <ResourceControls
        searchTerm={searchTerm}
        selectedDifficulty={selectedDifficulty}
        selectedLanguage={selectedLanguage}
        onSearchChange={setSearchTerm}
        onDifficultyChange={setSelectedDifficulty}
        onLanguageChange={setSelectedLanguage}
      />
      <ResourcesSection
        searchTerm={searchTerm}
        selectedDifficulty={selectedDifficulty}
        selectedLanguage={selectedLanguage}
        
      />

    </PageLayout>
  )
}
