const currentYear = new Date().getFullYear()

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
] as const

export const FooterBottom = () => {
  return (
    <div className='border-t border-border mt-5 pt-7'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 '>
          <div className='text-sm text-muted-foreground flex items-center space-x-2'>
            <span>© {currentYear} PexFect. All rights reserved.</span>
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
    </div>
  )
}
