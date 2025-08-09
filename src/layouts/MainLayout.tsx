import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <div className='flex flex-1'>
        <main className='flex-1 p-4'>{children}</main>
      </div>
      <Footer />
    </div>
  )
}

// ;<div className='min-h-screen bg-background text-foreground'>{children}</div>
