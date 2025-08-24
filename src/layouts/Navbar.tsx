import { Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'
import {
  Coffee,
  House,
  Swords,
  Map,
  BookKey,
  Trophy,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Home', icons: House },
  { to: '/challenges', label: 'Challenges', icons: Swords },
  { to: '/roadmap', label: 'Roadmap', icons: Map },
  { to: '/resources', label: 'Resources', icons: BookKey },
  { to: '/progress', label: 'Progress', icons: Trophy },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4'>
      <nav className='container mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center gap-2 text-primary'>
            <Link to='/' className='flex items-center gap-2'>
              <Coffee className='h-6 w-6' />
              <span className='text-xl md:text-2xl font-semibold'>PexFect</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className='hidden lg:flex items-center gap-10'>
            {navLinks.map(({ to, label, icons: Icons }) => (
              <Link
                key={to}
                to={to}
                className='relative font-medium text-muted-foreground transition-all duration-200 hover:text-foreground [&.active]:text-primary [&.active]:font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full [&.active]:after:w-full flex items-center gap-1'
              >
                <Icons className='h-4 w-4' />
                <span className='text-base'>{label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className='hidden md:flex items-center gap-2'>
            <ModeToggle />
            <Link to='/login'>
              <Button variant='outline' className='transition-all duration-300'>
                Sign In
              </Button>
            </Link>
            <Link to='/signup'>
              <Button
                variant='default'
                className='border-black border-2 transition-all duration-300'
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center gap-2 lg:hidden'>
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 hover:bg-muted rounded-lg transition-colors'
              aria-label='Toggle mobile menu'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='lg:hidden mt-4 pb-4 border-t border-border'>
            <div className='space-y-3 pt-4'>
              {navLinks.map(({ to, label, icons: Icons }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='flex items-center gap-3 px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground [&.active]:text-primary rounded-lg hover:bg-muted transition-all duration-200'
                >
                  <Icons className='h-5 w-5' />
                  {label}
                </Link>
              ))}

              {/* Mobile Action Buttons */}
              <div className='flex flex-col gap-2 pt-3 border-t border-border'>
                <Link to='/login' onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant='outline' className='w-full'>
                    Sign In
                  </Button>
                </Link>
                <Link to='/signup' onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant='default'
                    className='w-full border-black border-2'
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
