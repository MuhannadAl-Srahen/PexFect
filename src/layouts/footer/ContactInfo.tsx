import { Mail, MapPin } from 'lucide-react'

export const ContactInfo = () => {
  return (
    <div>
      <h3 className='text-foreground font-semibold text-lg mb-6 relative'>
        Get in Touch
        <div className='absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full' />
      </h3>
      <div className='space-y-4'>
        <div className='group flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300'>
          <div className='flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110'>
            <Mail className='h-4 w-4 text-primary' />
          </div>
          <a
            href='mailto:hello@pexfect.com'
            className='text-muted-foreground hover:text-primary transition-colors duration-300 font-medium'
          >
            hello@pexfect.com
          </a>
        </div>
        <div className='group flex items-start space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300'>
          <div className='flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 mt-0.5'>
            <MapPin className='h-4 w-4 text-primary' />
          </div>
          <div className='text-muted-foreground'>
            <div className='font-medium'>San Francisco, CA</div>
            <div className='text-sm opacity-75'>United States</div>
          </div>
        </div>
      </div>
    </div>
  )
}
