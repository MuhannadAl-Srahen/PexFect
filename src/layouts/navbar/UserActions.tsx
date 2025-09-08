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
import type { UserData } from '@/types'

// Mock user data - in a real app this would come from auth state
const currentUser: UserData = {
  fullName: 'Muhannad Al-Srahen',
  username: 'muhannad-dev',
  initials: 'MA',
  avatarUrl: '/placeholder.svg?height=40&width=40',
}

interface UserActionsProps {
  isLoggedIn: boolean
  onLogout: () => void
}

export const UserActions = ({ isLoggedIn, onLogout }: UserActionsProps) => {
  if (!isLoggedIn) {
    return (
      <Link
        to='/login'
        className='hidden md:flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-muted/30 text-muted-foreground hover:text-foreground group'
      >
        <Github className='h-5 w-5 group-hover:scale-105 transition-transform duration-300' />
        <span className='text-sm font-medium'>Sign In</span>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='hidden md:flex h-11 w-11 rounded-full hover:bg-transparent transition-all duration-300 p-0'
        >
          <Avatar className='h-11 w-11 transition-all duration-300'>
            <AvatarImage
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
            />
            <AvatarFallback className='bg-primary/10 text-primary text-xs font-medium transition-colors duration-300'>
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60 bg-background border border-border shadow-2xl rounded-2xl p-0 animate-in slide-in-from-top-2 fade-in-0 duration-300 overflow-hidden'
        align='end'
        sideOffset={12}
      >
        {/* Enhanced User Header */}
        <div className='relative px-4 py-4 bg-muted/30'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={currentUser.avatarUrl}
                alt={currentUser.fullName}
              />
              <AvatarFallback className='bg-primary/10 text-primary text-sm font-medium'>
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-semibold text-foreground truncate'>
                {currentUser.fullName}
              </p>
              <p className='text-xs text-muted-foreground'>
                @{currentUser.username}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Menu Items */}
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
