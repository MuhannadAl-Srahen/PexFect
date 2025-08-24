import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

const navigationLinks = [
  { name: 'Challenges', to: '/challenges' },
  { name: 'Roadmap', to: '/roadmap' },
  { name: 'Resources', to: '/resources' },
  { name: 'Progress', to: '/progress' },
] as const

export const FooterNavigation = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h3 className='text-foreground font-semibold text-lg  relative'>
        Explore
        <div className='absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full' />
      </h3>
      <ul className='space-y-3'>
        {navigationLinks.map(({ name, to }) => (
          <li key={name}>
            <Link
              to={to}
              className='group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 py-1'
            >
              <ChevronRight className='h-5 w-5 text-primary/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1' />
              <span className='group-hover:translate-x-1 transition-transform duration-300'>
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
