import type { FeedbackData } from './types'

export const mockFeedbackData: FeedbackData = {
  submissionId: 'sub_123456',
  challengeTitle: 'E-commerce Product Card',
  submissionDate: 'January 15, 2024',
  overallScore: 95,
  scoreLevel: 'Excellent',
  overallAnalysis: 'Excellent implementation with clean, semantic HTML and well-structured CSS. Your solution demonstrates strong understanding of responsive design principles and accessibility practices.',
  
  designComparison: {
    originalDesign: undefined, // Optional - will show placeholder
    userResult: undefined, // Optional - will show upload prompt
    keyDifferences: [
      'Button styling differs from original design',
      'Spacing between elements is slightly larger',
      'Font weight for price is lighter than specified'
    ]
  },
  
  bestPractices: {
    score: 92,
    title: 'Best Practices',
    description: 'Recommended coding approaches that keep projects scalable, maintainable, and consistent across teams.',
    whatYouDidWell: [
      'Used semantic HTML5 elements (nav, ul, li)',
      'Proper CSS class naming conventions'
    ],
    areasForImprovement: [
      'Consider adding meta viewport tag for better mobile support'
    ],
    specificFeedback: [
      'Use CSS custom properties for consistent theming',
      'Implement proper focus states for keyboard navigation',
      'Consider using CSS Grid subgrid for more complex layouts'
    ]
  },
  
  codeFormatting: {
    score: 98,
    title: 'Code Formatting',
    description: 'Consistent code formatting and organization. Your code is clean, readable, and well-commented.',
    whatYouDidWell: [
      'Consistent indentation and spacing',
      'Meaningful variable and class names',
      'Good use of comments to explain complex logic'
    ],
    areasForImprovement: [
      'Consider using Prettier for automatic code formatting'
    ],
    specificFeedback: [
      'Group related CSS properties together',
      'Use meaningful class names that describe purpose, not appearance'
    ]
  },
  
  functionality: {
    score: 94,
    title: 'Functionality',
    description: 'All required functionality implemented correctly. Navigation works smoothly across all device sizes.',
    whatYouDidWell: [
      'Mobile hamburger menu works perfectly',
      'Responsive breakpoints are well-chosen'
    ],
    areasForImprovement: [
      'Consider adding keyboard navigation support',
      'Add focus indicators for better keyboard users'
    ],
    specificFeedback: [
      'Consider adding keyboard navigation support'
    ]
  },
  
  accessibility: {
    score: 88,
    title: 'Accessibility',
    description: 'Good accessibility implementation with room for minor improvements.',
    whatYouDidWell: [
      'Proper ARIA labels for screen readers',
      'Good color contrast ratios'
    ],
    areasForImprovement: [
      'Add focus indicators for keyboard users',
      'Consider adding skip navigation link'
    ],
    specificFeedback: [
      'Use ARIA live regions for dynamic content updates',
      'Implement proper focus trapping in modals',
      'Add descriptive labels for form inputs'
    ]
  },
  
  recommendedResources: [
    {
      id: 'css-flexbox-guide',
      title: 'Advanced CSS Flexbox Techniques',
      category: 'Tutorial',
      description: 'Deep dive into advanced flexbox patterns and real-world use cases',
      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      author: 'CSS-Tricks',
      difficulty: 'Intermediate'
    },
    {
      id: 'web-accessibility-guidelines',
      title: 'Web Accessibility Guidelines',
      category: 'Documentation',
      description: 'Complete guide to web accessibility standards and best practices',
      url: 'https://www.w3.org/WAI/WCAG21/quickref/',
      author: 'W3C',
      difficulty: 'Beginner'
    },
    {
      id: 'responsive-design-patterns',
      title: 'Responsive Design Patterns',
      category: 'Video Tutorial',
      description: 'Modern responsive design techniques and mobile-first approaches',
      url: 'https://www.youtube.com/watch?v=example',
      author: 'Design Course',
      difficulty: 'Intermediate'
    }
  ],
  
  nextChallenge: {
    id: 'interactive-dashboard-widget',
    title: 'Interactive Dashboard Widget',
    difficulty: 'intermediate',
    technologies: ['React', 'JavaScript', 'Charts', 'API Integration'],
    description: 'Based on your CSS skills, try adding JavaScript interactivity with data visualization',
    estimatedTime: '4-6 hours',
    roadmapPath: 'intermediate',
    challengeCount: 12,
    progressPercentage: 25
  }
}