import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Github, Map, BookOpen, Swords, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { name: 'Challenges', href: '/challenges', icon: Swords },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: Trophy },
] as const

interface MobileMenuProps {
  isOpen: boolean
  pathname: string
  theme: string | undefined
  isLoggedIn: boolean
  onClose: () => void
  onToggleTheme: () => void
  onLogout: () => void
}

export const MobileMenu = ({
  isOpen,
  pathname,
  theme,
  isLoggedIn,
  onClose,
  onToggleTheme,
  onLogout,
}: MobileMenuProps) => {
  return (
    <div
      className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-out',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div
        className={cn(
          'bg-background/95 backdrop-blur-sm border-t border-border/20 shadow-lg',
          isOpen ? 'animate-in slide-in-from-top-2 fade-in-0 duration-300' : ''
        )}
      >
        <div className='container mx-auto px-6 py-6'>
          {/* Navigation Section */}
          <div className='mb-6'>
            <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1'>
              Navigate
            </div>
            <div className='grid gap-2'>
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-sm hover:scale-105',
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm animate-in slide-in-from-left-1'
                        : 'text-foreground hover:bg-muted/50 hover:text-primary'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300',
                        isActive
                          ? 'bg-primary/20 text-primary shadow-sm'
                          : 'bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-110'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          !isActive && 'hover:rotate-12'
                        )}
                      />
                    </div>
                    <span className='font-medium'>{item.name}</span>
                    {isActive && (
                      <div className='ml-auto w-2 h-2 bg-primary rounded-full' />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Account Section */}
          <div>
            <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1'>
              Account
            </div>
            <div className='space-y-2'>
              {isLoggedIn ? (
                <>
                  {/* User Header - Clickable */}
                  <Link
                    to='/profile'
                    onClick={onClose}
                    className='flex items-center gap-3 px-4 py-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 mb-3 hover:shadow-sm hover:scale-105'
                  >
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src='/placeholder.svg?height=40&width=40'
                        alt='User'
                      />
                      <AvatarFallback className='bg-primary/10 text-primary text-sm font-medium'>
                        MA
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-foreground truncate'>
                        Muhannad Al-Srahen
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        @muhannad-dev
                      </p>
                    </div>
                  </Link>

                  {/* Actions Row */}
                  <div className='flex gap-5 items-center justify-between'>
                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        onLogout()
                        onClose()
                      }}
                      className='flex items-center gap-3 px-3 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all duration-300 flex-1 hover:shadow-md hover:scale-105'
                    >
                      <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/20 hover:bg-destructive/30 transition-all duration-300 hover:scale-110'>
                        <LogOut className='w-4 h-4 transition-transform duration-300 hover:rotate-12' />
                      </div>
                      <span className='font-medium'>Sign out</span>
                    </button>

                    {/* Theme Toggle */}
                    <ThemeToggle
                      theme={theme}
                      toggleTheme={onToggleTheme}
                      variant='mobile'
                    />
                  </div>
                </>
              ) : (
                /* Clean Sign In Section */
                <div className='flex gap-5 items-center justify-between'>
                  {/* Simple GitHub Login */}
                  <Link
                    to='/login'
                    onClick={onClose}
                    className='flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 flex-1 transition-all duration-300'
                  >
                    <Github className='w-4 h-4' />
                    <span className='font-medium text-sm'>Sign In</span>
                  </Link>

                  {/* Theme Toggle */}
                  <ThemeToggle
                    theme={theme}
                    toggleTheme={onToggleTheme}
                    variant='mobile'
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
