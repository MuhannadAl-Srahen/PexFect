import { createFileRoute } from '@tanstack/react-router'
import { Eye, Code2, CheckCircle, Info, Circle, Github,Lightbulb  } from 'lucide-react'
import { PageLayout } from '@/layouts'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ExpandableSection,
  RecommendedResources,
  NextChallengeComponent as NextChallenge,
  mockFeedbackData
} from '@/services/feedback'

export const Route = createFileRoute('/feedback/$submissionId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { submissionId } = Route.useParams()
  
  // TODO: In the future, fetch actual feedback data based on submissionId
  // For now, we'll use mock data and show the submissionId
  const feedbackData = {
    ...mockFeedbackData,
    submissionId: submissionId
  }

  // Extract challengeId from the feedback data or from the mock data
  // In a real application, this would come from the submission data
  const challengeId = feedbackData.challengeId || mockFeedbackData.nextChallenge?.id || 'interactive-dashboard-widget'

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
        <Card className='p-6'>
          <div className='flex items-start justify-between'>
            {/* Left Side - Title, Date, Buttons */}
            <div className='flex-1'>
              <h1 className='text-3xl font-bold text-primary mb-2'>
                {feedbackData.challengeTitle}
              </h1>
              <p className='text-muted-foreground mb-6'>
                Submitted on {feedbackData.submissionDate}
              </p>
              
              {/* Action Buttons */}
              <div className='flex space-x-4'>
               
                  <Button className='bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300'>
                    <Eye className='w-4 h-4' />
                    Live Preview
                  </Button>

                  <Button variant='outline' className='hover:bg-primary/10 hover:text-primary hover:scale-105 transition-all duration-300'>
                    <Github className='w-4 h-4' />
                    View Code
                  </Button>
              </div>
            </div>
            
            {/* Right Side - Overall Score */}
           <div className='text-center md:text-right md:self-start md:pr-4'>
  <div className={`text-5xl md:text-6xl font-bold ${getScoreColor(feedbackData.overallScore)} mb-1 md:mb-2`}>
    {feedbackData.overallScore}
  </div>
  <div className='text-xs md:text-sm text-muted-foreground mb-1'>Overall Score</div>
</div>
          </div>
        </Card>

        {/* Overall Analysis Section */}
        <Card className='p-6'>
          <h2 className='text-2xl font-bold text-foreground mb-6'>Overall Analysis</h2>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {feedbackData.overallAnalysis}
          </p>
          
          <div className='grid md:grid-cols-2 gap-8'>
            {/* What You Did Well */}
            <div>
              <div className='flex items-center mb-4'>
                <CheckCircle className='w-5 h-5 text-green-500 mr-2' />
                <h3 className='text-lg font-semibold text-green-700 dark:text-green-400'>
                  What You Did Well
                </h3>
              </div>
              <ul className='space-y-3'>
                {feedbackData.bestPractices.whatYouDidWell.slice(0, 4).map((item: string, index: number) => (
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
                <Lightbulb  className='w-5 h-5 text-orange-400 mr-2' />
                <h3 className='text-lg font-semibold text-orange-400 dark:text-orange-400'>
                  Areas for Improvement
                </h3>
              </div>
              <ul className='space-y-3'>
                {feedbackData.bestPractices.areasForImprovement.map((item: string, index: number) => (
                  <li key={index} className='text-sm text-muted-foreground flex items-start'>
                    <Lightbulb  className='w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Design Comparison Section */}
        <Card className='p-6'>
          <h2 className='text-2xl font-bold text-foreground mb-2'>Design Comparison</h2>
          <p className='text-muted-foreground mb-6'>
            Side-by-side comparison with the original design
          </p>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Original Design */}
            <div>
              <h3 className='font-semibold text-foreground mb-3'>Original Design</h3>
              <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border'>
                <div className='text-center text-muted-foreground'>
                  <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-2' />
                  <p className='text-sm'>Original Design Preview</p>
                </div>
              </div>
            </div>

            {/* Your Result */}
            <div>
              <h3 className='font-semibold text-foreground mb-3'>Your Result</h3>
              <div className='bg-muted rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-border'>
                <div className='text-center text-muted-foreground'>
                  <div className='w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-2' />
                  <p className='text-sm'>Your Implementation</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
          <RecommendedResources challengeId={challengeId} />
          
          {/* Next Challenge */}
          <NextChallenge nextChallenge={feedbackData.nextChallenge} />
        </div>
      </div>
    </PageLayout>
  )
}
