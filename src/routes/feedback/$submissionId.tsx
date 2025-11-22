import { createFileRoute } from '@tanstack/react-router'
import { Eye, Code2, CheckCircle, Info, Circle, Lightbulb, Github } from 'lucide-react'
import { PageLayout } from '@/layouts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAIFeedback, transformFeedbackForUI } from '@/services/AI-feedback/hooks'

import {
  ExpandableSection,
  RecommendedResources,
  NextChallengeComponent as NextChallenge,
} from '@/services/feedback'

export const Route = createFileRoute('/feedback/$submissionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { submissionId } = Route.useParams()
  
  // Use AI Feedback system
  const { feedback, loading, generating, error, canGenerate, generateFeedback } = useAIFeedback({
    submissionId,
    autoGenerate: true
  })

  // Transform AI feedback to UI format
  const feedbackData = feedback ? {
    ...transformFeedbackForUI(feedback),
    challengeTitle: feedback.challengeTitle,
    submissionDate: feedback.submissionDate,
    overallRating: feedback.overallRating,
    submissionUrls: {
      livePreview: feedback.livePreviewUrl,
      viewCode: feedback.codeViewUrl
    },
    // Extract fields directly from transformed data
    bestPractices: transformFeedbackForUI(feedback).techAnalysis.bestPractices,
    codeFormatting: transformFeedbackForUI(feedback).techAnalysis.codeFormatting,
    functionality: transformFeedbackForUI(feedback).techAnalysis.functionality,
    accessibility: transformFeedbackForUI(feedback).techAnalysis.accessibility,
    nextChallenge: feedback.recommendedNextChallenge,
    designImages: feedback.designImages || [],
    userScreenshots: feedback.userScreenshots || []
  } : null
  
  // Handle loading state
  if (loading || generating) {
    return (
      <PageLayout maxWidth='6xl'>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>
              {generating ? 'Generating AI feedback...' : 'Loading feedback...'}
            </p>
          </div>
        </div>
      </PageLayout>
    )
  }
  
  // Handle error state or no feedback
  if (error || !feedbackData) {
    return (
      <PageLayout maxWidth='6xl'>
        <div className='flex items-center justify-center min-h-[60vh]'>
          <Card className='p-8 text-center max-w-md mx-auto'>
            <div className='mb-6'>
              <div className='w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center'>
                <Info className='w-8 h-8 text-muted-foreground' />
              </div>
              <h1 className='text-2xl font-bold text-foreground mb-2'>
                {error ? 'Error Loading Feedback' : 'No Feedback Found'}
              </h1>
              <p className='text-muted-foreground mb-4'>
                {error || 'No feedback available for this submission yet.'}
              </p>
              {canGenerate && !error && (
                <Button onClick={generateFeedback} className='mt-4'>
                  <Lightbulb className='w-4 h-4 mr-2' />
                  Generate AI Feedback
                </Button>
              )}
            </div>
          </Card>
        </div>
      </PageLayout>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 80) return 'text-blue-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <PageLayout maxWidth='6xl'>
      <div className='space-y-8'>
        {/* Header Section */}
        <Card className='p-4 md:p-6'>
          <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
            {/* Left Side - Title, Date, Buttons */}
            <div className='flex-1'>
              <h1 className='text-2xl md:text-3xl font-bold text-primary mb-2'>
                {feedbackData.challengeTitle}
              </h1>
              <p className='text-sm md:text-base text-muted-foreground mb-4 md:mb-14'>
                Submitted on {feedbackData.submissionDate}
              </p>
              
              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                {feedbackData.submissionUrls?.livePreview && (
                  <Button 
                    asChild
                    className='bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto'
                  >
                    <a 
                      href={feedbackData.submissionUrls.livePreview} 
                      target='_blank' 
                      rel='noopener noreferrer'
                    >
                      <Eye className='w-4 h-4' />
                      Live Preview
                    </a>
                  </Button>
                )}

                {feedbackData.submissionUrls?.viewCode && (
                  <Button 
                    asChild
                    variant='outline' 
                    className='hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-300 w-full sm:w-auto'
                  >
                    <a 
                      href={feedbackData.submissionUrls.viewCode} 
                      target='_blank' 
                      rel='noopener noreferrer'
                    >
                      <Github className='w-4 h-4' />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Overall Score */}
            <div className='flex justify-center md:justify-end'>
              <div className='bg-muted/30 rounded-2xl px-6 py-5 md:px-8 md:py-6 text-center border border-border/50 shadow-sm w-full max-w-[200px] md:max-w-none md:w-auto'>
                <div className={`text-4xl md:text-5xl lg:text-6xl font-bold ${getScoreColor(feedbackData.overallScore)} mb-2`}>
                  {feedbackData.overallScore}
                </div>
                <div className='text-xs md:text-sm text-muted-foreground mb-2'>Overall Score</div>
                {feedbackData.overallRating && (
                  <div className={`text-sm md:text-base lg:text-lg font-semibold ${getScoreColor(feedbackData.overallScore)}`}>
                    {feedbackData.overallRating}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Overall Analysis Section */}
        <Card className='p-6'>
          <h2 className='text-2xl font-bold text-foreground mb-6'>Overall Analysis</h2>
          
          <div className='grid md:grid-cols-2 gap-8'>
            {/* What You Did Well */}
            <div>
              <div className='flex items-center mb-4'>
                <CheckCircle className='w-5 h-5 text-green-500 mr-2' />
                <h3 className='text-lg font-semibold text-green-600 dark:text-green-500'>
                  What You Did Well
                </h3>
              </div>
              <ul className='space-y-3'>
                {feedbackData.overallAnalysis.whatYouDidWell.map((item: string, index: number) => (
                  <li key={index} className='text-sm text-muted-foreground flex items-start'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div>
              <div className='flex items-center mb-4'>
                <Lightbulb className='w-5 h-5 text-orange-500 mr-2' />
                <h3 className='text-lg font-semibold text-orange-600 dark:text-orange-500'>
                  Areas for Improvement
                </h3>
              </div>
              <ul className='space-y-3'>
                {feedbackData.overallAnalysis.areasForImprovement.map((item: string, index: number) => (
                  <li key={index} className='text-sm text-muted-foreground flex items-start'>
                    <Lightbulb className='w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Design Comparison Section */}
        {(feedbackData.designImages && feedbackData.designImages.length > 0) || 
         (feedbackData.userScreenshots && feedbackData.userScreenshots.length > 0) ? (
        <Card className='p-6'>
          <h2 className='text-2xl font-bold text-foreground mb-2'>Design Comparison</h2>
          <p className='text-muted-foreground mb-6'>
            Side-by-side comparison with the original design
          </p>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Original Design */}
            <div>
              <h3 className='font-semibold text-foreground mb-3'>Original Design</h3>
              <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border overflow-hidden'>
                {feedbackData.designImages && feedbackData.designImages.length > 0 ? (
                  <img 
                    src={feedbackData.designImages[0]} 
                    alt='Original Design Preview'
                    className='w-full h-full object-contain'
                  />
                ) : (
                  <div className='text-center text-muted-foreground'>
                    <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto ' />
                    <p className='text-sm'>Original Design Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Your Result */}
            <div>
              <h3 className='font-semibold text-foreground mb-3'>Your Result</h3>
              <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border overflow-hidden'>
                {feedbackData.userScreenshots && feedbackData.userScreenshots.length > 0 ? (
                  <img 
                    src={feedbackData.userScreenshots[0]} 
                    alt='Your Implementation'
                    className='w-full h-full object-contain'
                  />
                ) : (
                  <div className='text-center text-muted-foreground'>
                    <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto ' />
                    <p className='text-sm'>Your Implementation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        ) : null}

        {/* Tech Analysis - Collapsible Sections */}
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-foreground'>Tech Analysis</h2>
          
          {/* Best Practices */}
          <ExpandableSection 
            section={feedbackData.bestPractices}
            icon={<CheckCircle className='w-5 h-5 text-blue-500' />}
          />
          
          {/* Code Formatting */}
          <ExpandableSection 
            section={feedbackData.codeFormatting}
            icon={<Code2 className='w-5 h-5 text-blue-500' />}
          />
          
          {/* Functionality */}
          <ExpandableSection 
            section={feedbackData.functionality}
            icon={<Circle className='w-5 h-5 text-blue-500' />}
          />
          
          {/* Accessibility */}
          <ExpandableSection 
            section={feedbackData.accessibility}
            icon={<Info className='w-5 h-5 text-blue-500' />}
          />
        </div>

        {/* Bottom Section - Recommendations */}
        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Recommended Learning Resources */}
          <RecommendedResources />
          
          {/* Next Challenge */}
          <NextChallenge />
        </div>
      </div>
    </PageLayout>
  )
}
