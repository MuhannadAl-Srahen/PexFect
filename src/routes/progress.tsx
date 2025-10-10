import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/progress')({
  beforeLoad: () => {
    // Redirect to profile page with progress tab
    throw redirect({
      to: '/profile',
      search: { tab: 'progress' },
    })
  },
  component: () => null, // This won't render due to redirect
})
