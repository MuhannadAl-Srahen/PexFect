import { Link } from '@tanstack/react-router'
import { Map, BookOpen, Swords, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Challenges', href: '/challenges', icon: Swords },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: Trophy },
] as const

interface DesktopNavProps {
  pathname: string
}

export const DesktopNav = ({ pathname }: DesktopNavProps) => {
  return (
    <div className='hidden md:flex items-center space-x-2'>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.name}
            to={item.href}
            className='group relative flex items-center space-x-2 px-4 py-2 transition-all duration-300 rounded-xl cursor-pointer hover:bg-muted/30 active:scale-95'
          >
            <Icon
              className={cn(
                'w-4 h-4 transition-all duration-300',
                isActive
                  ? 'text-primary scale-110'
                  : 'text-muted-foreground group-hover:text-primary group-hover:scale-110'
              )}
            />
            <span
              className={cn(
                'text-sm font-medium transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-foreground'
              )}
            >
              {item.name}
            </span>

            {/* Enhanced indicator line with smooth animations */}
            <div
              className={cn(
                'absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out',
                isActive
                  ? 'w-14 opacity-100 shadow-lg shadow-primary/30 animate-in slide-in-from-bottom-1'
                  : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-80 group-hover:shadow-md group-hover:shadow-primary/20'
              )}
            />
          </Link>
        )
      })}
    </div>
  )
}
