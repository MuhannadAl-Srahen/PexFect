import { useState, useEffect } from 'react'
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
  HelpCircle,
  LogIn,
} from 'lucide-react'
import { submitChallengeSolution } from '../challenges/api'
import type { Challenge } from '@/types'
import { supabase } from '@/lib/supabaseClient'

interface ChallengeSubmissionProps {
  challenge: Challenge
}

export function ChallengeSubmission({ challenge }: ChallengeSubmissionProps) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [, setDragCounter] = useState(0)

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    checkAuth()
  }, [])

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
        const errorMessage = err instanceof Error ? err.message : 'Failed to submit solution. Please try again.'
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

  // Show loading while checking authentication
  if (isAuthenticated === null) {
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
                options: { redirectTo: window.location.href },
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
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8'>
        {/* Submit Form */}
        <div className='lg:col-span-2 bg-card text-card-foreground flex flex-col gap-3 md:gap-6 rounded-xl border py-3 md:py-6 shadow-sm'>
          <div className='flex items-center px-3 md:px-6'>
            <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
              <Upload className='h-4 w-4 md:h-6 md:w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-sm md:text-xl font-bold text-foreground'>
                Submit Your Solution
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Share your completed project and get AI-powered feedback
              </p>
            </div>
          </div>
          <div className='px-3 md:px-6'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className='space-y-4 md:space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                <form.Field
                  name='githubUrl'
                  children={(field) => (
                    <div className='space-y-2'>
                      <div className='flex items-center space-x-2'>
                        <Label
                          htmlFor={field.name}
                          className='flex items-center text-sm md:text-base font-semibold'
                        >
                          <Github className='h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 text-muted-foreground' />
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
                        className='py-2 md:py-3 px-3 md:px-4 text-sm md:text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0'
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
                          className='flex items-center text-sm md:text-base font-semibold'
                        >
                          <ExternalLink className='h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 text-muted-foreground' />
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
                        className='py-2 md:py-3 px-3 md:px-4 text-sm md:text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0'
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
                    className='flex items-center text-sm md:text-base font-semibold'
                  >
                    <Upload className='h-4 w-4 md:h-5 md:w-5 mr-1.5 md:mr-2 text-muted-foreground' />
                    Project Screenshot (Optional)
                  </Label>
                </div>
                <div
                  className={`border-2 border-dashed rounded-xl p-4 md:p-8 text-center transition-all duration-200 cursor-pointer ${
                    isDragOver
                      ? 'border-primary bg-primary/10 scale-105'
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
                          className='max-h-32 md:max-h-48 object-contain mb-2 md:mb-4 rounded-lg shadow-sm'
                        />
                        <p className='text-xs md:text-sm text-foreground font-medium mb-1 md:mb-2'>
                          {screenshot.name}
                        </p>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-destructive hover:text-destructive hover:bg-destructive/10 text-xs md:text-sm'
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
                          className={`h-8 w-8 md:h-12 md:w-12 text-muted-foreground mx-auto mb-2 md:mb-4 transition-all duration-200 ${
                            isDragOver ? 'scale-110 text-primary' : ''
                          }`}
                        />
                        <p
                          className={`text-sm md:text-lg font-medium mb-1 md:mb-2 transition-colors duration-200 ${
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
                        <p className='text-xs md:text-sm text-muted-foreground'>
                          PNG, JPG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <form.Field
                name='description'
                children={(field) => (
                  <div className='space-y-2'>
                    <Label
                      htmlFor={field.name}
                      className='text-sm md:text-base font-semibold'
                    >
                      Project Description (Optional)
                    </Label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder="Tell us about your approach, challenges you faced, or features you're proud of..."
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        field.handleChange(e.target.value)
                      }
                      rows={4}
                      className='w-full py-2 md:py-3 px-3 md:px-4 text-sm md:text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0 resize-none bg-background'
                    />
                  </div>
                )}
              />

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 text-destructive px-3 md:px-4 py-2 md:py-3 rounded-lg'>
                  <div className='flex items-center'>
                    <AlertCircle className='h-4 w-4 mr-2' />
                    <span className='font-semibold text-sm md:text-base'>
                      Submission Error
                    </span>
                  </div>
                  <p className='mt-1 text-xs md:text-sm'>{error}</p>
                </div>
              )}

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmittingForm]) => (
                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-base md:text-lg py-4 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200'
                    disabled={!canSubmit || isSubmitting || isSubmittingForm}
                  >
                    {isSubmitting || isSubmittingForm ? (
                      <>
                        <div className='animate-spin w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-2 md:mr-3'></div>
                        Analyzing Solution...
                      </>
                    ) : (
                      <>
                        <Upload className='mr-2 h-4 w-4 md:h-5 md:w-5' />
                        Submit for AI Review
                      </>
                    )}
                  </Button>
                )}
              />
            </form>
          </div>
        </div>

        {/* Tips & Guidelines */}
        <div className='space-y-4 md:space-y-6'>
          <div className='bg-card text-card-foreground flex flex-col gap-3 md:gap-6 rounded-xl border py-3 md:py-6 shadow-sm'>
            <div className='flex items-center px-3 md:px-6'>
              <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
                <HelpCircle className='h-4 w-4 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-sm md:text-xl font-bold text-foreground'>
                  Submission Tips
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Guidelines for better results
                </p>
              </div>
            </div>
            <div className='px-3 md:px-6 space-y-3 md:space-y-4'>
              <div className='flex items-start space-x-2 md:space-x-3 group'>
                <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full mt-1.5 md:mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125'></div>
                <div>
                  <h4 className='font-medium text-foreground mb-1 text-sm md:text-base'>
                    Test Your Links
                  </h4>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    Ensure both URLs are working correctly.
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-2 md:space-x-3 group'>
                <div className='w-1.5 h-1.5 md:w-2 md:h-2 bg-secondary rounded-full mt-1.5 md:mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125'></div>
                <div>
                  <h4 className='font-medium text-foreground mb-1 text-sm md:text-base'>
                    Clean Code
                  </h4>
                  <p className='text-xs md:text-sm text-muted-foreground'>
                    Organize your code for better feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-card text-card-foreground flex flex-col gap-3 md:gap-6 rounded-xl border py-3 md:py-6 shadow-sm'>
            <div className='flex items-center px-3 md:px-6'>
              <div className='p-1.5 md:p-2 bg-primary/10 rounded-lg mr-2 md:mr-3'>
                <CheckCircle className='h-4 w-4 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-sm md:text-xl font-bold text-foreground'>
                  What We Analyze
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Our AI evaluation criteria
                </p>
              </div>
            </div>
            <div className='px-3 md:px-6 space-y-2 md:space-y-3'>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-3 w-3 md:h-4 md:w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-xs md:text-sm text-muted-foreground'>
                  Code structure & organization
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-3 w-3 md:h-4 md:w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-xs md:text-sm text-muted-foreground'>
                  Responsive design implementation
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-3 w-3 md:h-4 md:w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-xs md:text-sm text-muted-foreground'>
                  Accessibility best practices
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-3 w-3 md:h-4 md:w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-xs md:text-sm text-muted-foreground'>
                  Performance optimization
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-3 w-3 md:h-4 md:w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-xs md:text-sm text-muted-foreground'>
                  Design accuracy & creativity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
