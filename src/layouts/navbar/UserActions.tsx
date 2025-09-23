import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, LogOut, Github } from 'lucide-react'

interface UserData {
  email?: string
  user_metadata?: {
    avatar_url?: string
    name?: string
  }
}

interface UserActionsProps {
  isLoggedIn: boolean
  user?: UserData | null
  onLogout: () => void
  onLogin: () => void
}

export const UserActions = ({
  isLoggedIn,
  user,
  onLogout,
  onLogin,
}: UserActionsProps) => {
  // not logged in -> use the GitHub login function (no page navigation)
  if (!isLoggedIn) {
    return (
      <button
        onClick={onLogin}
        className='hidden md:flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-muted/30 text-muted-foreground hover:text-foreground group'
      >
        <Github className='h-5 w-5 group-hover:scale-105 transition-transform duration-300' />
        <span className='text-sm font-medium'>Sign In</span>
      </button>
    )
  }

  // logged in -> use data from Supabase user object
  const avatarUrl =
    user?.user_metadata?.avatar_url || '/placeholder.svg?height=40&width=40'
  const fullName = user?.user_metadata?.name || user?.email || 'User'
  const initials = fullName
    .split(' ')
    .map((s: string) => s?.[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='hidden md:flex h-11 w-11 rounded-full hover:bg-transparent transition-all duration-300 p-0'
        >
          <Avatar className='h-11 w-11 transition-all duration-300'>
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium transition-colors duration-300'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-72 bg-background border border-border shadow-2xl rounded-2xl p-0 animate-in slide-in-from-top-2 fade-in-0 duration-300 overflow-hidden'
        align='end'
        sideOffset={12}
      >
        <div className='relative px-4 py-4 bg-muted/30'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback className='bg-primary/10 text-primary text-sm font-medium'>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-foreground truncate'>
                {fullName}
              </p>
              <p className='text-xs text-muted-foreground truncate'>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <div className='p-2'>
          <DropdownMenuItem asChild>
            <Link
              to='/profile'
              className='flex items-center gap-3 px-3 py-3 text-sm rounded-xl hover:bg-accent transition-all duration-300 hover:shadow-sm hover:scale-105'
            >
              <User className='h-4 w-4 text-muted-foreground transition-colors duration-300' />
              <span className='font-medium'>Profile & Settings</span>
            </Link>
          </DropdownMenuItem>

          <div className='h-px bg-border my-2'></div>

          <button
            className='w-full flex items-center gap-3 px-3 py-3 text-sm rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-all duration-300 cursor-pointer group hover:shadow-md hover:scale-105'
            onClick={() => {
              onLogout()
              console.log('Sign out clicked')
            }}
          >
            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-all duration-300 group-hover:scale-110'>
              <LogOut className='w-4 h-4 text-red-600 dark:text-red-400 transition-transform duration-300 group-hover:rotate-12' />
            </div>
            <span className='font-medium text-red-600 dark:text-red-400'>
              Sign out
            </span>
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
