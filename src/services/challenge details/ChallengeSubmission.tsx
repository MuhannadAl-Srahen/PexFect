import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import {
  Github,
  ExternalLink,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  LogIn,
} from 'lucide-react'
import { submitChallengeSolution } from '../challenges/api'
import type { Challenge } from '@/types'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/services/challenges/hooks/useAuth'
import useDelayedLoading from '@/lib/useDelayedLoading'

interface ChallengeSubmissionProps {
  challenge: Challenge
}

export function ChallengeSubmission({ challenge }: ChallengeSubmissionProps) {
  const navigate = useNavigate()
  // Use the shared auth query instead of manual effect
  const { data: authData, isLoading: isAuthLoading } = useAuth()
  const isAuthenticated = authData?.isAuthenticated ?? false
  const showLoading = useDelayedLoading(isAuthLoading, 160)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [, setDragCounter] = useState(0)

  const form = useForm({
    defaultValues: {
      title: challenge.title,
      githubUrl: '',
      liveUrl: '',
      description: '',
    },
    onSubmit: async ({ value }) => {
      setError(null)

      if (!value.githubUrl || !value.liveUrl) {
        setError('Please provide both GitHub Repository URL and Live Site URL.')
        return
      }

      setIsSubmitting(true)

      try {
        const result = await submitChallengeSolution(challenge.id, {
          ...value,
          screenshot,
        })

        setSubmitted(true)

        setTimeout(() => {
          navigate({
            to: `/feedback/${result.submissionId}`,
          })
        }, 2000)
      } catch (err) {
        let errorMessage = 'Failed to submit solution. Please try again.'

        if (err instanceof Error) {
          // Check for specific error codes
          if (err.message.startsWith('GITHUB_URL_USED:')) {
            errorMessage = err.message.replace('GITHUB_URL_USED: ', '')
          } else if (err.message.startsWith('LIVE_URL_USED:')) {
            errorMessage = err.message.replace('LIVE_URL_USED: ', '')
          } else if (err.message.startsWith('OFFICIAL_URL_USED:')) {
            errorMessage = err.message.replace('OFFICIAL_URL_USED: ', '')
          }
          // Check for "URLs already used for another challenge" errors
          else if (err.message.includes('already used for another challenge')) {
            errorMessage = err.message
          }
          // Check for duplicate GitHub URL error (should not happen with new logic)
          else if (
            err.message.includes('challenge_submissions_github_url_key')
          ) {
            errorMessage =
              'This GitHub repository URL is already in use. Please use a different repository.'
          }
          // Check for duplicate live site URL error (should not happen with new logic)
          else if (
            err.message.includes('challenge_submissions_live_site_url_key')
          ) {
            errorMessage =
              'This live preview URL is already in use. Please deploy your project to a different URL.'
          }
          // Generic duplicate key error
          else if (err.message.includes('duplicate key')) {
            errorMessage =
              'This URL is already in use. Please use different URLs for your repository and live site.'
          }
          // Other errors
          else {
            errorMessage = err.message
          }
        }

        setError(errorMessage)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.')
      return
    }

    setScreenshot(file)
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter((prev) => prev + 1)
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter((prev) => {
      const newCounter = prev - 1
      if (newCounter === 0) {
        setIsDragOver(false)
      }
      return newCounter
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter(0)
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith('image/'))

    if (imageFile) {
      validateAndSetFile(imageFile)
    } else if (files.length > 0) {
      setError('Please upload an image file.')
    }
  }

  // Show loading while checking authentication (small delay to avoid flicker)
  if (showLoading && isAuthLoading) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <div className='animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full'></div>
      </div>
    )
  }

  // Show sign-in prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <Card className='w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-xl text-center p-8'>
          <div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <LogIn className='h-10 w-10 text-primary' />
          </div>
          <h1 className='text-3xl font-bold text-foreground mb-4'>
            Sign In to Submit Your Solution
          </h1>
          <p className='text-muted-foreground mb-6'>
            Create an account or sign in to submit your challenge solutions and
            get AI-powered feedback on your work.
          </p>
          <Button
            onClick={async () => {
              await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                  redirectTo: `${window.location.origin}${window.location.pathname}`,
                },
              })
            }}
            className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary'
          >
            <Github className='mr-2 h-5 w-5' />
            Sign In with GitHub
          </Button>
        </Card>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className='min-h-[400px] flex items-center justify-center'>
        <div className='w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-xl text-center p-8'>
          <div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle className='h-10 w-10 text-primary' />
          </div>
          <h1 className='text-3xl font-bold text-foreground mb-4'>
            Solution Submitted!
          </h1>
          <p className='text-muted-foreground mb-6'>
            Your solution is being analyzed by our AI. You'll be redirected to
            view your feedback shortly.
          </p>
          <div className='animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-4 md:space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        {/* Submit Form */}
        <div className='lg:col-span-2 bg-card text-card-foreground rounded-xl border shadow-sm'>
          <div className='flex items-center px-6 pt-6 '>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <Upload className='h-5 w-5 text-primary' />
            </div>
            <div>
              <h3 className='text-lg font-bold text-foreground'>
                Submit Your Solution
              </h3>
              <p className='text-sm text-muted-foreground'>
                Share your completed project and get AI-powered feedback
              </p>
            </div>
          </div>
          <div className='px-6 py-6'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className='space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <form.Field
                  name='githubUrl'
                  children={(field) => (
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Label
                          htmlFor={field.name}
                          className='flex items-center text-sm font-semibold'
                        >
                          <Github className='h-4 w-4 mr-2 text-muted-foreground' />
                          GitHub Repository URL{' '}
                          <span className='text-destructive ml-1'>*</span>
                        </Label>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type='url'
                        placeholder='https://github.com/username/project-name'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='h-10 px-3 text-sm border-2 border-border rounded-lg focus:border-primary focus:ring-0'
                        required
                      />
                    </div>
                  )}
                />

                <form.Field
                  name='liveUrl'
                  children={(field) => (
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Label
                          htmlFor={field.name}
                          className='flex items-center text-sm font-semibold'
                        >
                          <ExternalLink className='h-4 w-4 mr-2 text-muted-foreground' />
                          Live Site URL{' '}
                          <span className='text-destructive ml-1'>*</span>
                        </Label>
                      </div>
                      <Input
                        id={field.name}
                        name={field.name}
                        type='url'
                        placeholder='https://your-project.netlify.app'
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className='h-10 px-3 text-sm border-2 border-border rounded-lg focus:border-primary focus:ring-0'
                        required
                      />
                    </div>
                  )}
                />
              </div>

              {/* Screenshot Upload */}
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Label
                    htmlFor='screenshot'
                    className='flex items-center text-sm font-semibold'
                  >
                    <Upload className='h-4 w-4 mr-2 text-muted-foreground' />
                    Project Screenshot (Optional)
                  </Label>
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? 'border-primary bg-primary/10 scale-[1.02]'
                      : 'border-border hover:border-primary/40 hover:bg-primary/5'
                  }`}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    id='screenshot'
                    type='file'
                    accept='image/*'
                    onChange={handleFileUpload}
                    className='hidden'
                  />
                  <label
                    htmlFor='screenshot'
                    className='block w-full h-full cursor-pointer'
                  >
                    {screenshot ? (
                      <div className='flex flex-col items-center'>
                        <img
                          src={URL.createObjectURL(screenshot)}
                          alt='Uploaded screenshot preview'
                          className='max-h-40 object-contain mb-4 rounded-lg shadow-sm'
                        />
                        <p className='text-sm text-foreground font-medium mb-3'>
                          {screenshot.name}
                        </p>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-destructive hover:text-destructive hover:bg-destructive/10 text-sm'
                          onClick={(e) => {
                            e.preventDefault()
                            setScreenshot(null)
                            setError(null)
                          }}
                        >
                          Remove Screenshot
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload
                          className={`h-12 w-12 text-muted-foreground mx-auto mb-4 transition-all duration-200 ${
                            isDragOver ? 'scale-110 text-primary' : ''
                          }`}
                        />
                        <p
                          className={`text-base font-medium mb-2 transition-colors duration-200 ${
                            isDragOver
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {isDragOver ? (
                            'Drop your image here'
                          ) : (
                            <>
                              Drag & drop or{' '}
                              <span className='text-primary hover:underline'>
                                click to upload
                              </span>
                            </>
                          )}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg'>
                  <div className='flex items-start'>
                    <AlertCircle className='h-4 w-4 mr-2 flex-shrink-0 mt-0.5' />
                    <div>
                      <span className='font-semibold text-sm'>
                        Submission Error
                      </span>
                      <p className='mt-1 text-sm'>{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmittingForm]) => (
                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-base py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200'
                    disabled={!canSubmit || isSubmitting || isSubmittingForm}
                  >
                    {isSubmitting || isSubmittingForm ? (
                      <>
                        <div className='animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2'></div>
                        Analyzing Solution...
                      </>
                    ) : (
                      <>
                        <Upload className='mr-2 h-5 w-5' />
                        Submit for AI Review
                      </>
                    )}
                  </Button>
                )}
              />
            </form>
          </div>
        </div>

        {/* URL Explanations & Guidelines */}
        <div className='space-y-6'>
          <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm'>
            <div className='flex items-center px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <Info className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-base font-bold text-foreground'>
                  What to Submit
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Two essential links required
                </p>
              </div>
            </div>
            <div className='px-6 space-y-5'>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Github className='h-5 w-5 text-primary flex-shrink-0' />
                  <h4 className='font-semibold text-foreground text-sm'>
                    GitHub Repository
                  </h4>
                </div>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Your project's source code hosted on GitHub for code review
                  and quality assessment.
                </p>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <ExternalLink className='h-5 w-5 text-primary flex-shrink-0' />
                  <h4 className='font-semibold text-foreground text-sm'>
                    Live Site URL
                  </h4>
                </div>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Deployed version of your project to test functionality,
                  design, and user experience.
                </p>
              </div>
            </div>
          </div>

          <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm'>
            <div className='flex items-center px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <CheckCircle className='h-5 w-5 text-primary' />
              </div>
              <div>
                <h3 className='text-base font-bold text-foreground'>
                  What We Analyze
                </h3>
                <p className='text-sm text-muted-foreground'>
                  Our AI evaluation criteria
                </p>
              </div>
            </div>
            <div className='px-6 space-y-3'>
              <div className='flex items-center space-x-3 group'>
                <CheckCircle className='h-4 w-4 text-primary flex-shrink-0' />
                <span className='text-sm text-muted-foreground'>
                  Code structure & organization
                </span>
              </div>
              <div className='flex items-center space-x-3 group'>
                <CheckCircle className='h-4 w-4 text-primary flex-shrink-0' />
                <span className='text-sm text-muted-foreground'>
                  Responsive design implementation
                </span>
              </div>
              <div className='flex items-center space-x-3 group'>
                <CheckCircle className='h-4 w-4 text-primary flex-shrink-0' />
                <span className='text-sm text-muted-foreground'>
                  Accessibility best practices
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
