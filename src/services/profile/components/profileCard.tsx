import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Linkedin, Calendar, Globe, Edit, Save, X, Twitter, Instagram, Youtube, Facebook } from 'lucide-react'
import { useProfile, useUpdateProfile } from '../hooks/useProfile'
import { supabase } from '@/lib/supabaseClient'

export function ProfileCard() {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const { data: user, isLoading: isFetching } = useProfile(userId)
  const updateProfileMutation = useUpdateProfile()

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    fullName: '',
    email: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    website: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
  })

  // Get current user ID on mount
  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      if (authUser) {
        setUserId(authUser.id)
      }
    }
    getCurrentUser()
  }, [])

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
        facebookUrl: (user as any).facebookUrl || '',
        twitterUrl: (user as any).twitterUrl || '',
        instagramUrl: (user as any).instagramUrl || '',
        youtubeUrl: (user as any).youtubeUrl || '',
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
          facebookUrl: editData.facebookUrl,
          twitterUrl: editData.twitterUrl,
          instagramUrl: editData.instagramUrl,
          youtubeUrl: editData.youtubeUrl,
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
      facebookUrl: (user as any).facebookUrl || '',
      twitterUrl: (user as any).twitterUrl || '',
      instagramUrl: (user as any).instagramUrl || '',
      youtubeUrl: (user as any).youtubeUrl || '',
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
                <div className='text-xs text-muted-foreground/70'>Enter the full GitHub URL (e.g. https://github.com/your-username)</div>
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
                <div className='text-xs text-muted-foreground/70'>Add your public LinkedIn profile URL so recruiters and collaborators can connect.</div>
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
                <div className='text-xs text-muted-foreground/70'>Optional: personal site, portfolio or blog. Include full URL starting with https://</div>
              </div>
              {/* Additional social inputs so edit mode shows all socials */}
              <div className='space-y-1'>
                <Label htmlFor='facebookUrl' className='text-xs font-medium text-muted-foreground flex items-center gap-1'>
                  <Facebook className='w-3 h-3' />
                  Facebook
                </Label>
                <Input
                  id='facebookUrl'
                  placeholder='https://facebook.com/yourpage'
                  value={editData.facebookUrl}
                  onChange={(e) => setEditData((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                  className='text-sm'
                />
                <div className='text-xs text-muted-foreground/70'>Optional: Facebook profile or page URL.</div>
              </div>

              <div className='space-y-1'>
                <Label htmlFor='twitterUrl' className='text-xs font-medium text-muted-foreground flex items-center gap-1'>
                  <Twitter className='w-3 h-3' />
                  Twitter
                </Label>
                <Input
                  id='twitterUrl'
                  placeholder='https://twitter.com/username'
                  value={editData.twitterUrl}
                  onChange={(e) => setEditData((prev) => ({ ...prev, twitterUrl: e.target.value }))}
                  className='text-sm'
                />
                <div className='text-xs text-muted-foreground/70'>Optional: your Twitter profile (full URL or @handle).</div>
              </div>

              <div className='space-y-1'>
                <Label htmlFor='instagramUrl' className='text-xs font-medium text-muted-foreground flex items-center gap-1'>
                  <Instagram className='w-3 h-3' />
                  Instagram
                </Label>
                <Input
                  id='instagramUrl'
                  placeholder='https://instagram.com/username'
                  value={editData.instagramUrl}
                  onChange={(e) => setEditData((prev) => ({ ...prev, instagramUrl: e.target.value }))}
                  className='text-sm'
                />
                <div className='text-xs text-muted-foreground/70'>Optional: Instagram profile URL.</div>
              </div>

              <div className='space-y-1'>
                <Label htmlFor='youtubeUrl' className='text-xs font-medium text-muted-foreground flex items-center gap-1'>
                  <Youtube className='w-3 h-3' />
                  YouTube
                </Label>
                <Input
                  id='youtubeUrl'
                  placeholder='https://youtube.com/channel/your-channel'
                  value={editData.youtubeUrl}
                  onChange={(e) => setEditData((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                  className='text-sm'
                />
                <div className='text-xs text-muted-foreground/70'>Optional: your YouTube channel URL.</div>
              </div>
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
                    <span className='truncate'>Add your GitHub (e.g. github.com/username)</span>
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
                    <span className='truncate'>Add your LinkedIn (e.g. linkedin.com/in/username)</span>
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
                    <span className='truncate'>Add your website (e.g. yoursite.com)</span>
                  </Button>
                )}
              </div>
              {/* New social display rows */}
              <div>
                {(editData.facebookUrl || (user as any).facebookUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.facebookUrl || (user as any).facebookUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Facebook className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>{(editData.facebookUrl || (user as any).facebookUrl || '').replace(/^https?:\/\//, '')}</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Facebook className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your Facebook (e.g. facebook.com/yourpage)</span>
                  </Button>
                )}
              </div>

              <div>
                {(editData.twitterUrl || (user as any).twitterUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.twitterUrl || (user as any).twitterUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Twitter className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>
                        {(() => {
                          const val = editData.twitterUrl || (user as any).twitterUrl || ''
                          try {
                            const handle = val.split('/').filter(Boolean).pop()
                            return handle?.startsWith('@') ? handle : (handle || val.replace(/^https?:\/\//, ''))
                          } catch {
                            return val.replace(/^https?:\/\//, '')
                          }
                        })()}
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
                    <Twitter className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your Twitter (e.g. twitter.com/username)</span>
                  </Button>
                )}
              </div>

              <div>
                {(editData.instagramUrl || (user as any).instagramUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.instagramUrl || (user as any).instagramUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Instagram className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>{(editData.instagramUrl || (user as any).instagramUrl || '').replace(/^https?:\/\//, '')}</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Instagram className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your Instagram (e.g. instagram.com/username)</span>
                  </Button>
                )}
              </div>

              <div>
                {(editData.youtubeUrl || (user as any).youtubeUrl) ? (
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/10 border-0 transition-all duration-300 hover:scale-[1.02] hover:translate-x-1'
                    asChild
                  >
                    <a
                      href={editData.youtubeUrl || (user as any).youtubeUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center min-w-0'
                    >
                      <Youtube className='w-4 h-4 mr-3 flex-shrink-0' />
                      <span className='truncate'>{(editData.youtubeUrl || (user as any).youtubeUrl || '').replace(/^https?:\/\//, '')}</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditing(true)}
                    className='w-full justify-start text-muted-foreground/70 border-0 bg-transparent hover:bg-primary/5 min-w-0'
                  >
                    <Youtube className='w-4 h-4 mr-3 flex-shrink-0' />
                    <span className='truncate'>Add your YouTube channel</span>
                  </Button>
                )}
              </div>
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
