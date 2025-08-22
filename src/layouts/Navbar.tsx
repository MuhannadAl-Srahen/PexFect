import { Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components/mode-toggle'

const navLinks = [
  { to: '/challenges', label: 'Challenges' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/resources', label: 'Resources' },
]

export function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-8'>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className='relative text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground [&.active]:text-primary [&.active]:font-semibold after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full [&.active]:after:w-full'
              >
                {label}
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
