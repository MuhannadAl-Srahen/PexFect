import { Link } from '@tanstack/react-router'
import { Code2 } from 'lucide-react'

export const FooterLogo = () => {
  return (
    <Link to='/' className='flex items-center space-x-2 group mb-4'>
      <div className='relative bg-gradient-to-br from-primary/10 to-secondary/10 p-2 rounded-xl transition-all duration-300 group-hover:scale-110'>
        <Code2 className='h-6 w-6 text-primary transition-all duration-300 group-hover:rotate-12' />
      </div>
      <span className='text-3xl font-bold text-primary transition-all duration-300 group-hover:text-primary/80'>
        PexFect
      </span>
    </Link>
  )
}
