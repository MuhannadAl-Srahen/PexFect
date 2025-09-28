import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Github, Linkedin, Calendar, Globe, Edit } from 'lucide-react'
import type { UserProfile } from '@/types'

interface ProfileCardProps {
  user: UserProfile
}

export function ProfileCard({ user }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <Card className='p-4 md:p-6 shadow-lg border-0 bg-card rounded-2xl w-full max-w-sm mx-auto lg:mx-0 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1'>
      {/* Card hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className='flex flex-col items-center text-center space-y-4 relative z-10'>
        {/* Avatar */}
        <div 
          className="relative overflow-hidden cursor-pointer group/avatar transition-all duration-300 hover:scale-110 hover:-translate-y-1 rounded-full"
          style={{
            animation: `slideInUp 0.5s ease-out 0s both`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
          <Avatar className='w-24 md:w-28 h-24 md:h-28 ring-4 ring-primary/20 transition-all duration-300 group-hover/avatar:ring-6 group-hover/avatar:ring-primary/30 group-hover/avatar:shadow-lg'>
            <AvatarImage src={user.avatar} alt={user.fullName} className="object-cover rounded-full" />
            <AvatarFallback className='bg-primary/10 text-primary text-xl md:text-2xl font-bold transition-all duration-300 group-hover/avatar:bg-primary/20 group-hover/avatar:scale-110 group-hover/avatar:drop-shadow-sm rounded-full'>
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div 
          className='space-y-2 relative overflow-hidden cursor-pointer group/info transition-all duration-300 hover:scale-105 p-2 rounded-lg'
          style={{
            animation: `slideInUp 0.5s ease-out 0.1s both`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/info:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
          <h2 className='text-xl md:text-2xl font-bold text-foreground transition-all duration-300 group-hover/info:text-primary group-hover/info:drop-shadow-sm relative z-10'>
            {user.fullName}
          </h2>
          <p className='text-sm text-muted-foreground transition-all duration-300 group-hover/info:opacity-80 group-hover/info:text-primary/60 relative z-10'>
            {user.email}
          </p>
        </div>

        {/* Bio */}
        <div 
          className='w-full text-left space-y-2 relative overflow-hidden cursor-pointer group/bio transition-all duration-300 hover:scale-[1.02] p-2 rounded-lg'
          style={{
            animation: `slideInUp 0.5s ease-out 0.2s both`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/bio:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
          <h3 className='text-sm font-semibold text-foreground transition-colors duration-300 group-hover/bio:text-primary relative z-10'>
            Bio
          </h3>
          <p className='text-sm text-muted-foreground leading-relaxed transition-all duration-300 group-hover/bio:opacity-90 group-hover/bio:text-primary/70 relative z-10'>
            {user.bio}
          </p>
        </div>

        {/* Join Date */}
        <div 
          className='w-full flex items-center gap-2 text-sm text-muted-foreground relative overflow-hidden cursor-pointer group/date transition-all duration-300 hover:scale-105 p-2 rounded-lg'
          style={{
            animation: `slideInUp 0.5s ease-out 0.3s both`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/date:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
          <Calendar className='w-4 h-4 text-primary transition-all duration-300 group-hover/date:scale-110 group-hover/date:rotate-12 group-hover/date:drop-shadow-sm relative z-10' />
          <span className="transition-all duration-300 group-hover/date:drop-shadow-sm group-hover/date:text-primary/70 relative z-10">
            Joined{' '}
            {new Date(user.joinedAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Social Links */}
        <div 
          className='w-full relative overflow-hidden cursor-pointer group/social-section transition-all duration-300 hover:scale-[1.02] p-2 rounded-lg'
          style={{
            animation: `slideInUp 0.5s ease-out 0.4s both`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/social-section:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
          <h3 className='text-sm font-semibold text-foreground mb-3 text-left transition-colors duration-300 group-hover/social-section:text-primary relative z-10'>
            Social Links
          </h3>
          <div className='space-y-2 relative z-10'>
            {user.githubUrl && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-105 hover:shadow-sm hover:-translate-y-0.5 group/social'
                asChild
              >
                <a
                  href={user.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Github className='w-4 h-4 mr-2 transition-all duration-300 group-hover/social:scale-110 group-hover/social:rotate-12 group-hover/social:drop-shadow-sm' />
                  <span className="transition-all duration-300 group-hover/social:drop-shadow-sm">
                    @{user.username}
                  </span>
                </a>
              </Button>
            )}
            {user.linkedinUrl && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-105 hover:shadow-sm hover:-translate-y-0.5 group/social'
                asChild
              >
                <a
                  href={user.linkedinUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Linkedin className='w-4 h-4 mr-2 transition-all duration-300 group-hover/social:scale-110 group-hover/social:rotate-12 group-hover/social:drop-shadow-sm' />
                  <span className="transition-all duration-300 group-hover/social:drop-shadow-sm">
                    {user.fullName.toLowerCase().replace(' ', '-')}-profile
                  </span>
                </a>
              </Button>
            )}
            {user.website && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-105 hover:shadow-sm hover:-translate-y-0.5 group/social'
                asChild
              >
                <a
                  href={user.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Globe className='w-4 h-4 mr-2 transition-all duration-300 group-hover/social:scale-110 group-hover/social:rotate-12 group-hover/social:drop-shadow-sm' />
                  <span className="transition-all duration-300 group-hover/social:drop-shadow-sm">
                    {user.website.replace('https://', '')}
                  </span>
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button 
          className='w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1 group/edit relative overflow-hidden'
          style={{
            animation: `slideInUp 0.5s ease-out 0.5s both`,
          }}
        >
          {/* Button hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/5 to-transparent opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300" />
          <Edit className='w-4 h-4 mr-2 transition-all duration-300 group-hover/edit:rotate-12 group-hover/edit:scale-110 group-hover/edit:drop-shadow-sm relative z-10' />
          <span className="relative z-10 transition-all duration-300 group-hover/edit:drop-shadow-sm">
            Edit Profile
          </span>
        </Button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  )
}