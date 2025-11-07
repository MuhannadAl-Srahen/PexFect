import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, Github, Map, BookOpen, Swords, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'
import { supabase } from '@/lib/supabaseClient'

const navItems = [
  { name: 'Challenges', href: '/challenges', icon: Swords },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: Trophy },
] as const

interface UserData {
  email?: string
  user_metadata?: {
    avatar_url?: string
    name?: string
    user_name?: string
  }
}

interface MobileMenuProps {
  isOpen: boolean
  pathname: string
  theme: string | undefined
  isLoggedIn: boolean
  user?: UserData | null
  onClose: () => void
  onToggleTheme: () => void
  onLogout: () => void
}

export const MobileMenu = ({
  isOpen,
  pathname,
  theme,
  isLoggedIn,
  user,
  onClose,
  onToggleTheme,
  onLogout,
}: MobileMenuProps) => {
  const avatarUrl =
    user?.user_metadata?.avatar_url || '/placeholder.svg?height=40&width=40'
  const fullName = user?.user_metadata?.name || user?.email || 'User'
  const githubUsername = user?.user_metadata?.user_name
  const initials = fullName
    .split(' ')
    .map((s: string) => s?.[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-out',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div
        className={cn(
          'shadow-lg',
          isOpen ? 'animate-in slide-in-from-top-2 fade-in-0 duration-300' : ''
        )}
      >
        <div className='px-6 py-6 max-w-7xl mx-auto'>
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
                      'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-95',
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
                    search={{ tab: 'recent' }}
                    onClick={onClose}
                    className='flex items-center gap-3 px-4 py-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 mb-3 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-95 group'
                  >
                    <Avatar className='h-10 w-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300'>
                      <AvatarImage
                        src={avatarUrl}
                        alt='User'
                        referrerPolicy='no-referrer'
                        crossOrigin='anonymous'
                      />
                      <AvatarFallback className='bg-primary/10 text-primary text-sm font-medium group-hover:bg-primary/20 transition-colors duration-300'>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300'>
                        {fullName}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {user?.email}
                      </p>
                    </div>
                  </Link>

                  {/* GitHub Profile Link */}
                  {githubUsername && (
                    <a
                      href={`https://github.com/${githubUsername}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all duration-300 mb-3 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-95 group'
                    >
                      <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110'>
                        <Github className='w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12' />
                      </div>
                      <span className='text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300'>
                        View GitHub Profile
                      </span>
                      <svg
                        className='w-3 h-3 ml-auto text-muted-foreground group-hover:text-primary transition-colors duration-300'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                  )}

                  {/* Actions Row */}
                  <div className='flex gap-5 items-center justify-between'>
                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        onLogout()
                        onClose()
                      }}
                      className='flex items-center gap-3 px-3 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all duration-300 flex-1 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-95 group'
                    >
                      <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/20 group-hover:bg-destructive/30 transition-all duration-300 group-hover:scale-110'>
                        <LogOut className='w-4 h-4 transition-transform duration-300 group-hover:rotate-12' />
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
                  <button
                    onClick={async () => {
                      await supabase.auth.signInWithOAuth({
                        provider: 'github',
                        options: { redirectTo: window.location.origin },
                      })
                      onClose()
                    }}
                    className='flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 flex-1 transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-95 group'
                  >
                    <Github className='w-4 h-4 group-hover:scale-110 transition-transform duration-300' />
                    <span className='font-medium text-sm'>
                      Sign In with GitHub
                    </span>
                  </button>

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
