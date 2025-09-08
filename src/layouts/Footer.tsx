import { Link } from '@tanstack/react-router'
import {
  Code2,
  Github,
  Linkedin,
  Twitter,
  ChevronRight,
  Mail,
  MapPin,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Footer Logo Component
const FooterLogo = () => {
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

// Social Links Component
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/pexfect',
    icon: Github,
    color:
      'hover:bg-slate-300 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/pexfect',
    icon: Linkedin,
    color:
      'hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/pexfect',
    icon: Twitter,
    color:
      'hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400',
  },
] as const

const SocialLinks = () => {
  return (
    <div className='flex space-x-3'>
      {socialLinks.map(({ name, href, icon: Icon, color }) => (
        <a
          key={name}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            'group w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center',
            'transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1',
            color
          )}
          aria-label={`Follow us on ${name}`}
        >
          <Icon className='h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:scale-110' />
        </a>
      ))}
    </div>
  )
}

// Footer Navigation Component
const navigationLinks = [
  { name: 'Challenges', to: '/challenges' },
  { name: 'Roadmap', to: '/roadmap' },
  { name: 'Resources', to: '/resources' },
  { name: 'Progress', to: '/progress' },
] as const

const FooterNavigation = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h3 className='text-foreground font-semibold text-lg relative'>
        Explore
        <div className='absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full' />
      </h3>
      <ul className='space-y-3'>
        {navigationLinks.map(({ name, to }) => (
          <li key={name}>
            <Link
              to={to}
              className='group flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 py-1'
            >
              <ChevronRight className='h-5 w-5 text-primary/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1' />
              <span className='group-hover:translate-x-1 transition-transform duration-300'>
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Contact Info Component
const ContactInfo = () => {
  return (
    <div>
      <h3 className='text-foreground font-semibold text-lg mb-6 relative'>
        Get in Touch
        <div className='absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full' />
      </h3>
      <div className='space-y-3'>
        <div className='group flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300'>
          <div className='flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110'>
            <Mail className='h-4 w-4 text-primary' />
          </div>
          <a
            href='mailto:pexfect@gmail.com'
            className='text-muted-foreground hover:text-primary transition-colors duration-300 font-medium'
          >
            pexfect@gmail.com
          </a>
        </div>
        <div className='group flex items-start space-x-3 p-3 rounded-xl hover:bg-muted/30 transition-all duration-300'>
          <div className='flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 mt-0.5'>
            <MapPin className='h-4 w-4 text-primary' />
          </div>
          <div className='text-muted-foreground'>
            <div className='font-medium'>Zarqa - Russeifa</div>
            <div className='text-sm opacity-75'>Jordan</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Footer Bottom Component
const currentYear = new Date().getFullYear()

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
] as const

const FooterBottom = () => {
  return (
    <div className='border-t border-border mt-5 pt-7'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
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

// Main Footer Component
export default function Footer() {
  return (
    <footer className='bg-background border-t border-border'>
      <div className='container mx-auto py-10'>
        <div className='mx-auto max-w-7xl px-4'>
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
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}
