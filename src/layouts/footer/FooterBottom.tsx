const currentYear = new Date().getFullYear()

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
] as const

export const FooterBottom = () => {
  return (
    <div className='border-t border-border mt-12 pt-8'>
      <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
        <div className='text-sm text-muted-foreground flex items-center space-x-2'>
          <span>© {currentYear} PexFect. All rights reserved.</span>
          <div className='hidden md:block w-1 h-1 bg-muted-foreground/50 rounded-full' />
          <span className='hidden md:inline text-xs'>
            Made with ❤️ for developers
          </span>
        </div>
        <div className='flex items-center space-x-6 text-sm'>
          {legalLinks.map(({ name, href }, index) => (
            <div key={name} className='flex items-center space-x-6'>
              <a
                href={href}
                className='text-muted-foreground hover:text-primary transition-all duration-300 hover:underline hover:underline-offset-4 hover:scale-105'
              >
                {name}
              </a>
              {index < legalLinks.length - 1 && (
                <div className='w-1 h-1 bg-muted-foreground/30 rounded-full' />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
