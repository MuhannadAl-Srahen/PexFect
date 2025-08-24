import { Github, Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export const SocialLinks = () => {
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
