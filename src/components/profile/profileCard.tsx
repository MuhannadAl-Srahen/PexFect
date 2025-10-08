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
    <Card className='p-4 md:p-6 shadow-lg border-0 bg-card rounded-2xl w-full max-w-sm mx-auto lg:mx-0'>
      <div className='flex flex-col items-center text-center space-y-4'>
        {/* Avatar */}
        <div 
          className="transition-all duration-300"
          style={{
            animation: `slideInUp 0.5s ease-out 0s both`,
          }}
        >
          <Avatar className='w-24 md:w-28 h-24 md:h-28 ring-4 ring-primary/20'>
            <AvatarImage src={user.avatar} alt={user.fullName} className="object-cover rounded-full" />
            <AvatarFallback className='bg-primary/10 text-primary text-xl md:text-2xl font-bold rounded-full'>
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div 
          className='space-y-2'
          style={{
            animation: `slideInUp 0.5s ease-out 0.1s both`,
          }}
        >
          <h2 className='text-xl md:text-2xl font-bold text-foreground'>
            {user.fullName}
          </h2>
          <p className='text-sm text-muted-foreground'>
            {user.email}
          </p>
        </div>

        {/* Bio */}
        <div 
          className='w-full text-left space-y-2'
          style={{
            animation: `slideInUp 0.5s ease-out 0.2s both`,
          }}
        >
          <h3 className='text-sm font-semibold text-foreground'>
            Bio
          </h3>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            {user.bio}
          </p>
        </div>

        {/* Join Date */}
        <div 
          className='w-full flex items-center gap-2 text-sm text-muted-foreground'
          style={{
            animation: `slideInUp 0.5s ease-out 0.3s both`,
          }}
        >
          <Calendar className='w-4 h-4 text-primary' />
          <span>
            Joined{' '}
            {new Date(user.joinedAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Social Links */}
        <div 
          className='w-full'
          style={{
            animation: `slideInUp 0.5s ease-out 0.4s both`,
          }}
        >
          <h3 className='text-sm font-semibold text-foreground mb-3 text-left'>
            Social Links
          </h3>
          <div className='space-y-2'>
            {user.githubUrl && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-200 hover:scale-[1.02]'
                asChild
              >
                <a
                  href={user.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Github className='w-4 h-4 mr-2' />
                  <span>
                    @{user.username}
                  </span>
                </a>
              </Button>
            )}
            {user.linkedinUrl && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-200 hover:scale-[1.02]'
                asChild
              >
                <a
                  href={user.linkedinUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Linkedin className='w-4 h-4 mr-2' />
                  <span>
                    {user.fullName.toLowerCase().replace(' ', '-')}-profile
                  </span>
                </a>
              </Button>
            )}
            {user.website && (
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start text-primary hover:text-primary hover:bg-primary/10 border-0 transition-all duration-200 hover:scale-[1.02]'
                asChild
              >
                <a
                  href={user.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="flex items-center"
                >
                  <Globe className='w-4 h-4 mr-2' />
                  <span>
                    {user.website.replace('https://', '')}
                  </span>
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button 
          className='w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-200 hover:scale-[1.02]'
          style={{
            animation: `slideInUp 0.5s ease-out 0.5s both`,
          }}
        >
          <Edit className='w-4 h-4 mr-2' />
          <span>
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