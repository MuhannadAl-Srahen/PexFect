import { Link } from '@tanstack/react-router'

export const NavbarLogo = () => {
  return (
    <Link to='/' className='flex items-center group relative'>
      <div className='relative transition-all duration-300 group-hover:scale-105'>
        <img
          src='/pexfect_white.svg'
          alt='PexFect Logo'
          className='h-20 sm:h-26 w-auto dark:block hidden'
        />
        <img
          src='/pextfect_balck.svg'
          alt='PexFect Logo'
          className='h-20 sm:h-26 w-auto dark:hidden block'
        />
      </div>
    </Link>
  )
}
