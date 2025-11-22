import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AIFeedbackContext, FeedbackTemplate } from './types'

/**
 * Initialize Gemini AI
 */
function initializeGemini() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  
  if (!apiKey) {
    console.warn('VITE_GEMINI_API_KEY not found in environment variables')
    return null
  }
  
  return new GoogleGenerativeAI(apiKey)
}

/**
 * Create comprehensive AI prompt for code analysis
 */
function createAIPrompt(context: AIFeedbackContext): string {
  const { submission, challenge, previousFeedback } = context
  
  return `You are an expert code reviewer providing comprehensive feedback for a frontend web development challenge.

**Challenge Details:**
Title: ${challenge.title}
Difficulty: ${challenge.difficulty}
Description: ${challenge.overview_description || challenge.description}
Requirements: ${challenge.requirements?.join(', ') || 'Not specified'}
Expected Features: ${challenge.expected_features?.join(', ') || 'Not specified'}
${challenge.tips && challenge.tips.length > 0 ? `
**Challenge Tips:**
${challenge.tips.map(tip => `- ${tip}`).join('\n')}
` : ''}
${challenge.pitfalls && challenge.pitfalls.length > 0 ? `
**Common Pitfalls to Check:**
${challenge.pitfalls.map(pitfall => `- ${pitfall}`).join('\n')}
` : ''}

**Submission Information:**
- GitHub Repository: ${submission.github_url}
- Live Site: ${submission.live_site_url}
- Submission Date: ${new Date(submission.submitted_at).toLocaleDateString()}

${previousFeedback.length > 0 ? `**Previous Attempts:**
${previousFeedback.map(pf => `- Score: ${pf.overall_score}/100`).join('\n')}
` : ''}

**Your Task:**
Analyze this submission comprehensively and provide structured feedback in JSON format matching this exact structure:

{
  "overallScore": <number 0-100>,
  "overallAnalysis": {
    "whatYouDidWell": ["<specific achievement 1>", "<specific achievement 2>", "..."],
    "areasForImprovement": ["<specific improvement 1>", "<specific improvement 2>", "..."]
  },
  "techAnalysis": {
    "bestPractices": {
      "success": ["<what they did right>"],
      "warning": ["<potential issues>"],
      "error": ["<critical problems>"],
      "info": ["<additional context>"]
    },
    "codeFormatting": {
      "success": ["<good formatting practices>"],
      "warning": ["<formatting concerns>"],
      "error": ["<formatting problems>"],
      "info": ["<formatting suggestions>"]
    },
    "functionality": {
      "success": ["<working features>"],
      "warning": ["<partial implementations>"],
      "error": ["<broken functionality>"],
      "info": ["<functionality notes>"]
    },
    "accessibility": {
      "success": ["<accessibility wins>"],
      "warning": ["<accessibility concerns>"],
      "error": ["<accessibility violations>"],
      "info": ["<accessibility tips>"]
    }
  },
  "recommendedNextChallenge": "<specific challenge recommendation>",
  "recommendedResources": [
    { "type": "video", "title": "<resource title>", "url": "<resource url>" },
    { "type": "documentation", "title": "<resource title>", "url": "<resource url>" }
  ]
}

**Guidelines:**
1. Be specific and actionable in your feedback
2. Provide at least 3-5 items in each category where applicable
3. Base your analysis on modern web development best practices
4. Consider responsive design, performance, and user experience
5. Recommend relevant learning resources
6. Ensure all feedback is constructive and encouraging

Return ONLY the JSON object, no additional text.`
}

/**
 * Generate AI feedback using Google Gemini
 */
export async function generateAIFeedbackWithGemini(
  context: AIFeedbackContext
): Promise<{ success: boolean; feedback: FeedbackTemplate; error?: string }> {
  try {
    const genAI = initializeGemini()
    
    if (!genAI) {
      return {
        success: false,
        feedback: createFallbackFeedback(context),
        error: 'Gemini AI not configured'
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const prompt = createAIPrompt(context)
    
    console.log('Sending request to Gemini AI...')
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    console.log("response is: " + text)
    
    console.log('Received response from Gemini AI')
    
    // Parse the JSON response
    const parsedFeedback = parseAndValidateAIResponse(text, context)
    
    return {
      success: true,
      feedback: parsedFeedback
    }
    
  } catch (error) {
    console.error('Error generating AI feedback:', error)
    return {
      success: false,
      feedback: createFallbackFeedback(context),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Parse and validate AI response
 */
function parseAndValidateAIResponse(text: string, context: AIFeedbackContext): FeedbackTemplate {
  try {
    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    
    const parsed = JSON.parse(jsonMatch[0])
    
    // Validate and ensure all required fields are present
    return {
      challengeTitle: context.challenge.title,
      submissionDate: new Date(context.submission.submitted_at).toLocaleDateString(),
      livePreviewUrl: context.submission.live_site_url,
      codeViewUrl: context.submission.github_url,
      overallScore: parsed.overallScore || 75,
      overallAnalysis: {
        whatYouDidWell: Array.isArray(parsed.overallAnalysis?.whatYouDidWell) 
          ? parsed.overallAnalysis.whatYouDidWell 
          : ['Good attempt at the challenge'],
        areasForImprovement: Array.isArray(parsed.overallAnalysis?.areasForImprovement)
          ? parsed.overallAnalysis.areasForImprovement
          : ['Continue refining your skills']
      },
      techAnalysis: {
        bestPractices: validateTechSection(parsed.techAnalysis?.bestPractices),
        codeFormatting: validateTechSection(parsed.techAnalysis?.codeFormatting),
        functionality: validateTechSection(parsed.techAnalysis?.functionality),
        accessibility: validateTechSection(parsed.techAnalysis?.accessibility)
      },
      recommendedNextChallenge: parsed.recommendedNextChallenge || 'Continue with similar difficulty challenges',
      recommendedResources: Array.isArray(parsed.recommendedResources)
        ? parsed.recommendedResources.filter((r: { type?: string; title?: string; url?: string }) => 
            r.type && r.title && r.url && (r.type === 'video' || r.type === 'documentation')
          )
        : []
    }
  } catch (error) {
    console.error('Error parsing AI response:', error)
    return createFallbackFeedback(context)
  }
}

/**
 * Validate tech analysis section
 */
function validateTechSection(section: unknown): {
  success: string[]
  warning: string[]
  error: string[]
  info: string[]
} {
  if (typeof section === 'object' && section !== null) {
    const s = section as Record<string, unknown>
    return {
      success: Array.isArray(s.success) ? s.success : [],
      warning: Array.isArray(s.warning) ? s.warning : [],
      error: Array.isArray(s.error) ? s.error : [],
      info: Array.isArray(s.info) ? s.info : []
    }
  }
  return { success: [], warning: [], error: [], info: [] }
}

/**
 * Create fallback feedback when AI is unavailable
 */
function createFallbackFeedback(context: AIFeedbackContext): FeedbackTemplate {
  return {
    challengeTitle: context.challenge.title,
    submissionDate: new Date(context.submission.submitted_at).toLocaleDateString(),
    livePreviewUrl: context.submission.live_site_url,
    codeViewUrl: context.submission.github_url,
    overallScore: 75,
    overallAnalysis: {
      whatYouDidWell: [
        'Successfully completed the challenge submission',
        'Provided both GitHub repository and live site',
        'Followed the submission process correctly'
      ],
      areasForImprovement: [
        'AI feedback is currently unavailable',
        'Please check back later for detailed analysis',
        'Continue practicing and improving your skills'
      ]
    },
    techAnalysis: {
      bestPractices: {
        success: ['Challenge submission completed'],
        warning: ['Detailed analysis pending'],
        error: [],
        info: ['AI analysis will be available once configured']
      },
      codeFormatting: {
        success: [],
        warning: ['Analysis pending'],
        error: [],
        info: ['Code formatting analysis will be provided by AI']
      },
      functionality: {
        success: [],
        warning: ['Analysis pending'],
        error: [],
        info: ['Functionality analysis will be provided by AI']
      },
      accessibility: {
        success: [],
        warning: ['Analysis pending'],
        error: [],
        info: ['Accessibility analysis will be provided by AI']
      }
    },
    recommendedNextChallenge: 'Continue with challenges at your current skill level',
    recommendedResources: [
      {
        type: 'documentation',
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/'
      },
      {
        type: 'video',
        title: 'Web Development Tutorials',
        url: 'https://www.youtube.com/results?search_query=web+development'
      }
    ]
  }
}
