import { FooterLogo } from './footer/FooterLogo'
import { SocialLinks } from './footer/SocialLinks'
import { FooterNavigation } from './footer/FooterNavigation'
import { ContactInfo } from './footer/ContactInfo'
import { FooterBottom } from './footer/FooterBottom'

export default function Footer() {
  return (
    <footer className='bg-background border-t border-border relative overflow-hidden'>
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02]' />
      <div className='relative'>
        <div className='container mx-auto px-4 py-16'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
              {/* Company Info */}
              <div className='md:col-span-1'>
                <FooterLogo />
                <p className='text-muted-foreground leading-relaxed mb-8 max-w-sm'>
                  Master frontend development with AI-powered practice. Build
                  real-world projects and get instant feedback.
                </p>
                <SocialLinks />
              </div>

              {/* Quick Links */}
              <div className='md:col-span-1'>
                <FooterNavigation />
              </div>

              {/* Contact */}
              <div className='md:col-span-1'>
                <ContactInfo />
              </div>
            </div>

            {/* Bottom Section */}
            <FooterBottom />
          </div>
        </div>
      </div>
    </footer>
  )
}
