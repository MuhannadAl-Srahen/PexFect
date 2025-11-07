import type { ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import {
  saveScrollPosition,
  restoreScrollPosition,
} from '@/lib/scrollRestoration'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const location = useLocation()
  const isChallengePage =
    location.pathname.startsWith('/challenges/') &&
    location.pathname !== '/challenges'

  // Scroll restoration
  useEffect(() => {
    const key = location.pathname

    // Restore scroll position after a short delay to ensure content is loaded
    const timeout = setTimeout(() => {
      restoreScrollPosition(key)
    }, 100)

    // Save scroll position before user leaves the page
    const handleBeforeUnload = () => {
      saveScrollPosition(key)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Save scroll position when component unmounts (navigation)
      saveScrollPosition(key)
    }
  }, [location.pathname])

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full'>{children}</main>
      {!isChallengePage && <Footer />}
      <ScrollToTop />
    </div>
  )
}
