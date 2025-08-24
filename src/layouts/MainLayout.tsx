import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full mt-20'>{children}</main>
      <Footer />
    </div>
  )
}
