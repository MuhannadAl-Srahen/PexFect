import { Link } from '@tanstack/react-router'
import { Code2 } from 'lucide-react'

export const NavbarLogo = () => {
  return (
    <Link
      to='/'
      className='flex items-center space-x-2 sm:space-x-3 group relative'
    >
      <div className='relative'>
        {/* Main icon */}
        <div className='relative bg-gradient-to-br from-primary/10 to-secondary/10 p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/20'>
          <Code2 className='h-6 w-6 text-primary transition-all duration-300 group-hover:rotate-12' />
        </div>
      </div>

      <div className='relative'>
        <span className='text-xl sm:text-2xl font-bold text-primary transition-all duration-300 group-hover:text-primary/80'>
          PexFect
        </span>
      </div>
    </Link>
  )
}
