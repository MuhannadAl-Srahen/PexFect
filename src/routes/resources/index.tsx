import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import {
  ResourcePageHeader,
  ResourceControls,
  ResourcesSection,
} from '@/services/Resources'

export const Route = createFileRoute('/resources/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <PageLayout>
      <ResourcePageHeader />
      <ResourceControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ResourcesSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </PageLayout>
  )
}
