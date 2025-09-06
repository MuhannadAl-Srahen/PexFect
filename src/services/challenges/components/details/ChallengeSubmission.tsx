import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import {
  Github,
  ExternalLink,
  Upload,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { submitChallengeSolution } from '../../api'
import type { Challenge } from '@/types/challenge'

interface ChallengeSubmissionProps {
  challenge: Challenge
}

export function ChallengeSubmission({ challenge }: ChallengeSubmissionProps) {
  const navigate = useNavigate()
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        await submitChallengeSolution(challenge.id, {
          ...value,
          screenshot,
        })

        setSubmitted(true)

        setTimeout(() => {
          navigate({
            to: `/feedback/${Math.random().toString(36).substr(2, 9)}`,
          })
        }, 2000)
      } catch {
        setError('Failed to submit solution. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.')
        return
      }
      setScreenshot(file)
      setError(null)
    }
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
    <div className='space-y-6 md:space-y-8'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8'>
        {/* Submit Form */}
        <div className='lg:col-span-2 bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
          <div className='flex items-center px-4 md:px-6'>
            <div className='p-2 bg-primary/10 rounded-lg mr-3'>
              <Upload className='h-4 w-4 md:h-6 md:w-6 text-primary' />
            </div>
            <div>
              <h3 className='text-base md:text-xl font-bold text-foreground'>
                Submit Your Solution
              </h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                Share your completed project and get AI-powered feedback
              </p>
            </div>
          </div>
          <div className='px-4 md:px-6'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className='space-y-6'
            >
              {/* Challenge Title */}
              <form.Field
                name='title'
                children={(field) => (
                  <div className='space-y-2'>
                    <Label htmlFor={field.name}>Challenge Title</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='bg-muted'
                      readOnly
                    />
                  </div>
                )}
              />

              <form.Field
                name='githubUrl'
                children={(field) => (
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <Label
                        htmlFor={field.name}
                        className='flex items-center text-base font-semibold'
                      >
                        <Github className='h-5 w-5 mr-2 text-muted-foreground' />
                        GitHub Repository URL{' '}
                        <span className='text-destructive ml-1'>*</span>
                      </Label>
                      <div className='group relative'>
                        <HelpCircle className='h-4 w-4 text-muted-foreground hover:text-foreground cursor-help' />
                        <div className='invisible group-hover:visible absolute z-10 w-72 p-2 mt-1 text-sm text-muted-foreground bg-card border rounded-lg shadow-lg'>
                          Your GitHub repository contains your project's source
                          code. Make sure it's public so our AI can analyze your
                          code.
                        </div>
                      </div>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='url'
                      placeholder='https://github.com/username/project-name'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='py-3 px-4 text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0'
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
                        className='flex items-center text-base font-semibold'
                      >
                        <ExternalLink className='h-5 w-5 mr-2 text-muted-foreground' />
                        Live Site URL{' '}
                        <span className='text-destructive ml-1'>*</span>
                      </Label>
                      <div className='group relative'>
                        <HelpCircle className='h-4 w-4 text-muted-foreground hover:text-foreground cursor-help' />
                        <div className='invisible group-hover:visible absolute z-10 w-72 p-2 mt-1 text-sm text-muted-foreground bg-card border rounded-lg shadow-lg'>
                          The live site URL where your project is hosted. Our AI
                          will test responsiveness and performance.
                        </div>
                      </div>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type='url'
                      placeholder='https://your-project.netlify.app'
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className='py-3 px-4 text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0'
                      required
                    />
                  </div>
                )}
              />

              {/* Screenshot Upload */}
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Label
                    htmlFor='screenshot'
                    className='flex items-center text-base font-semibold'
                  >
                    <Upload className='h-5 w-5 mr-2 text-muted-foreground' />
                    Project Screenshot (Optional)
                  </Label>
                </div>
                <div className='border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer'>
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
                          className='max-h-48 object-contain mb-4 rounded-lg shadow-sm'
                        />
                        <p className='text-sm text-foreground font-medium mb-2'>
                          {screenshot.name}
                        </p>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-destructive hover:text-destructive hover:bg-destructive/10'
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
                        <Upload className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                        <p className='text-lg text-muted-foreground font-medium mb-2'>
                          Drag & drop or{' '}
                          <span className='text-primary hover:underline'>
                            click to upload
                          </span>
                        </p>
                        <p className='text-sm text-muted-foreground'>
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
                      className='text-base font-semibold'
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
                      rows={5}
                      className='w-full py-3 px-4 text-base border-2 border-border rounded-lg focus:border-primary focus:ring-0 resize-none bg-background'
                    />
                  </div>
                )}
              />

              {error && (
                <div className='bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg'>
                  <div className='flex items-center'>
                    <AlertCircle className='h-4 w-4 mr-2' />
                    <span className='font-semibold'>Submission Error</span>
                  </div>
                  <p className='mt-1 text-sm'>{error}</p>
                </div>
              )}

              {!error && (
                <div className='bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg'>
                  <div className='flex items-center'>
                    <AlertCircle className='h-4 w-4 mr-2' />
                    <span className='font-semibold'>Important!</span>
                  </div>
                  <p className='mt-1 text-sm'>
                    Ensure both URLs are working and your repository is public.
                    Our AI will analyze your code, design, and responsiveness.
                  </p>
                </div>
              )}

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmittingForm]) => (
                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200'
                    disabled={!canSubmit || isSubmitting || isSubmittingForm}
                  >
                    {isSubmitting || isSubmittingForm ? (
                      <>
                        <div className='animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full mr-3'></div>
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

        {/* Tips & Guidelines */}
        <div className='space-y-6'>
          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <HelpCircle className='h-5 w-5 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  Submission Tips
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Guidelines for better results
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6 space-y-4'>
              <div className='flex items-start space-x-3 group'>
                <div className='w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125'></div>
                <div>
                  <h4 className='font-medium text-foreground mb-1'>
                    Test Your Links
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Ensure both URLs are working correctly.
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3 group'>
                <div className='w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0 transition-all duration-300 group-hover:scale-125'></div>
                <div>
                  <h4 className='font-medium text-foreground mb-1'>
                    Clean Code
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Organize your code for better feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-card text-card-foreground flex flex-col gap-4 md:gap-6 rounded-xl border py-4 md:py-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.01]'>
            <div className='flex items-center px-4 md:px-6'>
              <div className='p-2 bg-primary/10 rounded-lg mr-3'>
                <CheckCircle className='h-5 w-5 md:h-6 md:w-6 text-primary' />
              </div>
              <div>
                <h3 className='text-base md:text-xl font-bold text-foreground'>
                  What We Analyze
                </h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Our AI evaluation criteria
                </p>
              </div>
            </div>
            <div className='px-4 md:px-6 space-y-3'>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm text-muted-foreground'>
                  Code structure & organization
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm text-muted-foreground'>
                  Responsive design implementation
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm text-muted-foreground'>
                  Accessibility best practices
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm text-muted-foreground'>
                  Performance optimization
                </span>
              </div>
              <div className='flex items-center space-x-2 group'>
                <CheckCircle className='h-4 w-4 text-primary transition-all duration-300 group-hover:scale-110' />
                <span className='text-sm text-muted-foreground'>
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
