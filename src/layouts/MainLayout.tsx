import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full'>{children}</main>
      <Footer />
    </div>
  )
}
