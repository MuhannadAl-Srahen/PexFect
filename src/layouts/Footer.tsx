import { FooterLogo } from './footer/FooterLogo'
import { SocialLinks } from './footer/SocialLinks'
import { FooterNavigation } from './footer/FooterNavigation'
import { ContactInfo } from './footer/ContactInfo'
import { FooterBottom } from './footer/FooterBottom'

export default function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      <div className='mx-auto container py-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
            {/* Company Info */}
            <div className='md:col-span-1 flex flex-col gap-5'>
              <div>
                <FooterLogo />
                <p className='text-muted-foreground leading-relaxed max-w-sm'>
                  Master frontend development with AI-powered practice. Build
                  real-world projects and get instant feedback.
                </p>
              </div>
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
        </div>
        <FooterBottom />
      </div>
    </footer>
  )
}
