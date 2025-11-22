import { useState, useEffect, useCallback } from 'react'
import { generateAIFeedback, getFeedbackBySubmission, isAIConfigured } from './index'
import type { FeedbackTemplate } from './types'

interface UseAIFeedbackOptions {
  submissionId: string
  autoGenerate?: boolean
}

interface UseAIFeedbackResult {
  feedback: FeedbackTemplate | null
  loading: boolean
  generating: boolean
  error: string | null
  canGenerate: boolean
  generateFeedback: () => Promise<void>
  refetchFeedback: () => Promise<void>
}

/**
 * Provides seamless integration with existing UI components
 */
export function useAIFeedback({
  submissionId,
  autoGenerate = false
}: UseAIFeedbackOptions): UseAIFeedbackResult {
  const [feedback, setFeedback] = useState<FeedbackTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const canGenerate = isAIConfigured()

  // Generate new feedback
  const handleGenerateFeedback = useCallback(async (): Promise<void> => {
    try {
      setGenerating(true)
      setError(null)

      console.log('Generating new feedback...')
      const result = await generateAIFeedback(submissionId)

      if (result.success && result.feedback) {
        console.log('Feedback generated successfully')
        setFeedback(result.feedback)
      } else {
        throw new Error(result.error || 'Failed to generate feedback')
      }
    } catch (err) {
      console.error('Error generating feedback:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate feedback')
    } finally {
      setGenerating(false)
    }
  }, [submissionId])

  // Fetch existing feedback
  const fetchFeedback = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      console.log('Fetching feedback for submission:', submissionId)
      const result = await getFeedbackBySubmission(submissionId)
      
      if (result.success && result.feedback) {
        console.log('Found existing feedback')
        setFeedback(result.feedback)
      } else {
        console.log('No existing feedback found')
        setFeedback(null)
        
        // Auto-generate if enabled and AI is configured
        if (autoGenerate && canGenerate) {
          console.log('Auto-generating feedback...')
          await handleGenerateFeedback()
        }
      }
    } catch (err) {
      console.error('Error fetching feedback:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch feedback')
    } finally {
      setLoading(false)
    }
  }, [submissionId, autoGenerate, canGenerate, handleGenerateFeedback])

  // Initial fetch
  useEffect(() => {
    fetchFeedback()
  }, [fetchFeedback])

  return {
    feedback,
    loading,
    generating,
    error,
    canGenerate,
    generateFeedback: handleGenerateFeedback,
    refetchFeedback: fetchFeedback
  }
}


export function transformFeedbackForUI(template: FeedbackTemplate): {
  overallScore: number
  overallAnalysis: {
    whatYouDidWell: string[]
    areasForImprovement: string[]
  }
  techAnalysis: {
    bestPractices: {
      score: number
      title: string
      description: string
      whatYouDidWell: string[]
      areasForImprovement: string[]
      specificFeedback: string[]
      isExpanded: boolean
    }
    codeFormatting: {
      score: number
      title: string
      description: string
      whatYouDidWell: string[]
      areasForImprovement: string[]
      specificFeedback: string[]
      isExpanded: boolean
    }
    functionality: {
      score: number
      title: string
      description: string
      whatYouDidWell: string[]
      areasForImprovement: string[]
      specificFeedback: string[]
      isExpanded: boolean
    }
    accessibility: {
      score: number
      title: string
      description: string
      whatYouDidWell: string[]
      areasForImprovement: string[]
      specificFeedback: string[]
      isExpanded: boolean
    }
  }
  recommendedResources: Array<{
    id: string
    title: string
    category: string
    description: string
    url: string
    thumbnail?: string
    author: string
    difficulty: string
  }>
  recommendedNextChallenge: string
} {
  // Calculate section scores based on feedback items
  const calculateSectionScore = (section: {
    success: string[]
    warning: string[]
    error: string[]
    info: string[]
  }) => {
    const total = section.success.length + section.warning.length + section.error.length
    if (total === 0) return 75
    
    const successWeight = section.success.length * 100
    const warningWeight = section.warning.length * 60
    const errorWeight = section.error.length * 20
    
    return Math.round((successWeight + warningWeight + errorWeight) / total)
  }

  return {
    overallScore: template.overallScore,
    overallAnalysis: template.overallAnalysis,
    techAnalysis: {
      bestPractices: {
        score: calculateSectionScore(template.techAnalysis.bestPractices),
        title: 'Best Practices & Architecture',
        description: 'Analysis of code architecture and best practices',
        whatYouDidWell: template.techAnalysis.bestPractices.success,
        areasForImprovement: template.techAnalysis.bestPractices.warning.concat(
          template.techAnalysis.bestPractices.error
        ),
        specificFeedback: template.techAnalysis.bestPractices.info,
        isExpanded: false
      },
      codeFormatting: {
        score: calculateSectionScore(template.techAnalysis.codeFormatting),
        title: 'Code Formatting & Style',
        description: 'Code readability and formatting analysis',
        whatYouDidWell: template.techAnalysis.codeFormatting.success,
        areasForImprovement: template.techAnalysis.codeFormatting.warning.concat(
          template.techAnalysis.codeFormatting.error
        ),
        specificFeedback: template.techAnalysis.codeFormatting.info,
        isExpanded: false
      },
      functionality: {
        score: calculateSectionScore(template.techAnalysis.functionality),
        title: 'Functionality & Features',
        description: 'Feature implementation and functionality analysis',
        whatYouDidWell: template.techAnalysis.functionality.success,
        areasForImprovement: template.techAnalysis.functionality.warning.concat(
          template.techAnalysis.functionality.error
        ),
        specificFeedback: template.techAnalysis.functionality.info,
        isExpanded: false
      },
      accessibility: {
        score: calculateSectionScore(template.techAnalysis.accessibility),
        title: 'Accessibility',
        description: 'Web accessibility standards compliance',
        whatYouDidWell: template.techAnalysis.accessibility.success,
        areasForImprovement: template.techAnalysis.accessibility.warning.concat(
          template.techAnalysis.accessibility.error
        ),
        specificFeedback: template.techAnalysis.accessibility.info,
        isExpanded: false
      }
    },
    recommendedResources: template.recommendedResources.map((resource: { type: 'video' | 'documentation'; title: string; url: string }) => ({
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: resource.title,
      category: resource.type === 'video' ? 'Video' : 'Documentation',
      description: `${resource.type} resource: ${resource.title}`,
      url: resource.url,
      thumbnail: undefined,
      author: 'AI Generated',
      difficulty: 'intermediate'
    })),
    recommendedNextChallenge: template.recommendedNextChallenge
  }
}
