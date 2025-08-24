import { Coffee, Github, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className='border-t bg-background p-4'>
      <div className='container mx-auto px-2'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {/* Logo and Description */}
          <div className='md:col-span-2 space-y-2 -ml-5'>
            <div className='flex items-center gap-3 text-primary'>
              <Coffee className='h-8 w-8' />
              <span className='text-3xl font-semibold'>PexFect</span>
            </div>
            <p className='text-base text-muted-foreground max-w-lg'>
              Practice real-world frontend challenges and build your portfolio
              with projects that matter.
            </p>

            {/* Social Links */}
            <div className='flex items-center gap-4'>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
                className='ml-20 w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200'
                aria-label='GitHub'
              >
                <Github size={18} />
              </a>
              <a
                href='mailto:hello@example.com'
                className='w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200'
                aria-label='Email'
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-5  '>
            <h3 className='font-semibold text-foreground'>Quick Links</h3>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Contact</h3>
          </div>
        </div>
      </div>
    </footer>
  )
}
