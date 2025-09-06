import type { ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const location = useLocation()
  const isChallengePage =
    location.pathname.startsWith('/challenges/') &&
    location.pathname !== '/challenges'

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full'>{children}</main>
      {!isChallengePage && <Footer />}
    </div>
  )
}
