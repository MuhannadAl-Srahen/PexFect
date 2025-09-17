import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout'
import { ResourceControls, ResourcesSection } from '@/services/Resources'
import { PageHeader } from '@/layouts'

export const Route = createFileRoute('/resources/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <PageLayout>
      <PageHeader
        title='Learning Resources'
        description='Created tools, documentation, and Videos to accelerate your learning'
      />

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
