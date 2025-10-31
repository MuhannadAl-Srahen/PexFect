import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Linkedin, Calendar, Globe, Edit, Save, X } from 'lucide-react'
import { useProfile, useUpdateProfile } from '../hooks/useProfile'
// Use the shared auth hook instead of directly calling supabase in this component
import { useAuth } from '@/services/challenges/hooks/useAuth'

export function ProfileCard() {
  const { data: authData } = useAuth()
  const userId = authData?.session?.user?.id
  const { data: user, isLoading: isFetching } = useProfile(undefined)
  const updateProfileMutation = useUpdateProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    fullName: '',
    email: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    website: '',
  })

  // userId derived from the shared auth query (authData)

  // Update edit data when user data changes
  useEffect(() => {
    if (user) {
      setEditData({
        fullName: user.fullName,
        email: user.email,
        bio: user.bio || '',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        website: user.website || '',
      })
    }
  }, [user])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  const handleSave = async () => {
    if (!user || !userId) return

    updateProfileMutation.mutate(
      {
        userId,
        updates: {
            fullName: editData.fullName,
            email: editData.email,
            bio: editData.bio,
            githubUrl: editData.githubUrl,
            linkedinUrl: editData.linkedinUrl,
            website: editData.website,
          },
      },
      {
        onSuccess: () => {
          setIsEditing(false)
          console.log('Profile updated successfully!')
        },
        onError: (error) => {
          console.error('Failed to update profile:', error)
          // In a real app, you'd show an error toast here
        },
      }
    )
  }

  const handleCancel = () => {
    if (!user) return

    setEditData({
      fullName: user.fullName,
      email: user.email,
      bio: user.bio || '',
      githubUrl: user.githubUrl || '',
      linkedinUrl: user.linkedinUrl || '',
      website: user.website || '',
    })
    setIsEditing(false)
  }

  // Show loading skeleton while fetching
  if (isFetching) {
    return (
      <Card className='p-6 border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg'>
        <div className='space-y-4 animate-pulse'>
          <div className='flex flex-col items-center space-y-3'>
            <div className='w-24 h-24 bg-muted rounded-full' />
            <div className='h-6 w-32 bg-muted rounded' />
            <div className='h-4 w-48 bg-muted rounded' />
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-muted rounded' />
            <div className='h-4 bg-muted rounded w-3/4' />
          </div>
        </div>
      </Card>
    )
  }

  // Show error state if no user
  if (!user) {
    return (
      <Card className='p-6 border-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-lg'>
        <div className='text-center space-y-2'>
          <p className='text-muted-foreground'>Unable to load profile</p>
          <Button onClick={() => window.location.reload()} size='sm'>
            Retry
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Main Profile Card */}
      <Card className='p-6 shadow-sm border bg-card rounded-xl w-full transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex flex-col items-center text-center space-y-6'>
          {/* Avatar */}
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300'></div>
            <Avatar className='relative w-24 md:w-28 h-24 md:h-28 ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-105'>
              <AvatarImage
                src={user.avatar}
                alt={isEditing ? editData.fullName : user.fullName}
                className='object-cover'
              />
              <AvatarFallback className='bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xl md:text-2xl font-bold'>
                {getInitials(isEditing ? editData.fullName : user.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          {isEditing ? (
            <div className='w-full space-y-4'>
              <div className='space-y-2'>
                <Label
                  htmlFor='fullName'
                  className='text-xs font-medium text-muted-foreground'
                >
                  Full Name
                </Label>
                <Input
                  id='fullName'
                  value={editData.fullName}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className='text-center text-lg font-semibold'
                />
              </div>
              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-xs font-medium text-muted-foreground'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  value={editData.email}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className='text-center text-sm'
                />
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              <h2 className='text-xl md:text-2xl font-bold text-foreground'>
                {user.fullName}
              </h2>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
            </div>
          )}

          {/* Bio */}
          <div className='w-full text-left space-y-3'>
            <h3 className='text-sm font-semibold text-foreground flex items-center gap-2'>
              <div className='w-2 h-2 bg-primary rounded-full'></div>
              About
            </h3>
            {isEditing ? (
              <div className='space-y-2'>
                <textarea
                  value={editData.bio}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className='w-full p-3 text-sm text-muted-foreground leading-relaxed border border-border rounded-lg bg-background resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                  placeholder='Tell us about yourself...'
                />
              </div>
            ) : (
              <div className='text-sm text-muted-foreground leading-relaxed pl-4'>
                {user.bio ? (
                  user.bio
                ) : (
                  <>
                    <span>
                      I am passionate about building delightful web experiences — I enjoy turning designs into accessible, fast, and maintainable applications.
                    </span>
                    <span className='mt-2 block text-xs text-muted-foreground/80'>
                      Click <strong className='font-medium'>Edit Profile</strong> to personalize this section.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className='flex gap-2 w-full'>
              <Button
                onClick={handleSave}
                disabled={updateProfileMutation.isPending}
                className='flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50'
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <div className='w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className='w-4 h-4 mr-2' />
                    <span>Save</span>
                  </>
                )}
              </Button>
              <Button
                onClick={handleCancel}
                disabled={updateProfileMutation.isPending}
                variant='outline'
                className='flex-1 border-border hover:bg-muted transition-all duration-300 hover:scale-[1.02] disabled:opacity-50'
              >
                <X className='w-4 h-4 mr-2' />
                <span>Cancel</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className='w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md'
            >
              <Edit className='w-4 h-4 mr-2' />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </Card>

      {/* Social Links Card */}
      <Card className='p-4 shadow-sm border bg-card rounded-xl w-full transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='space-y-4'>
          <div className='flex items-center gap-2 mb-3'>
            <div className='w-2 h-2 bg-primary rounded-full'></div>
            <h3 className='text-sm font-semibold text-foreground'>Connect</h3>
          </div>

          {isEditing ? (
            <div className='space-y-3'>
              <div className='space-y-1'>
                <Label
                  htmlFor='githubUrl'
                  className='text-xs font-medium text-muted-foreground flex items-center gap-1'
                >
                  <Github className='w-3 h-3' />
                  GitHub
                </Label>
                <Input
                  id='githubUrl'
                  placeholder='https://github.com/username'
                  value={editData.githubUrl}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      githubUrl: e.target.value,
                    }))
                  }
                  className='text-sm'
                />
                {/* helper text removed per design: keep only the input */}
              </div>
              <div className='space-y-1'>
                <Label
                  htmlFor='linkedinUrl'
                  className='text-xs font-medium text-muted-foreground flex items-center gap-1'
                >
                  <Linkedin className='w-3 h-3' />
                  LinkedIn
                </Label>
                <Input
                  id='linkedinUrl'
                  placeholder='https://linkedin.com/in/username'
                  value={editData.linkedinUrl}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      linkedinUrl: e.target.value,
                    }))
                  }
                  className='text-sm'
                />
                {/* helper text removed per design */}
              </div>
              <div className='space-y-1'>
                <Label
                  htmlFor='website'
                  className='text-xs font-medium text-muted-foreground flex items-center gap-1'
                >
                  <Globe className='w-3 h-3' />
                  Website
                </Label>
                <Input
                  id='website'
                  placeholder='https://yourwebsite.com'
                  value={editData.website}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                  className='text-sm'
                />
                {/* helper text removed per design */}
              </div>
              {/* only GitHub, LinkedIn and Website inputs are shown per request */}
            </div>
          ) : (
            <div className='space-y-2'>
              <div>
                {(editData.githubUrl || user.githubUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.githubUrl || user.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Github className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>
                        @{String(editData.githubUrl || user.githubUrl || user.username || 'username')
                          .split('/')
                          .filter(Boolean)
                          .pop()}
                      </span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Github className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your GitHub</span>
                  </Button>
                )}
              </div>

              <div>
                {(editData.linkedinUrl || user.linkedinUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.linkedinUrl || user.linkedinUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Linkedin className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>
                        {(editData.linkedinUrl || user.linkedinUrl || '').replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Linkedin className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your LinkedIn</span>
                  </Button>
                )}
              </div>

              <div>
                {(editData.website || user.website) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.website || user.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Globe className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>
                        {(editData.website || user.website || '').replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Globe className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your website</span>
                  </Button>
                )}
              </div>
              {/* removed extra social displays per request */}
            </div>
          )}
        </div>
      </Card>

      {/* Join Date Card */}
      <Card className='p-4 shadow-sm border bg-card rounded-xl w-full transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
        <div className='flex items-center gap-3 text-sm text-muted-foreground'>
          <div className='p-2 bg-primary/10 rounded-lg'>
            <Calendar className='w-4 h-4 text-primary' />
          </div>
          <div>
            <div className='font-medium text-foreground'>Member since</div>
            <div>
              {new Date(user.joinedAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
