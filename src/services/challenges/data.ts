import type { Challenge, ChallengeListItem } from '@/types'

export const challengeDetailData: Record<number, Challenge> = {
  1: {
    id: 1,
    title: 'E-commerce Product Card',
    difficulty: 'Beginner',
    tags: ['HTML', 'CSS', 'Responsive'],
    description:
      'Create a modern, responsive product card component that showcases a product with an image, title, price, and call-to-action button. This challenge focuses on clean design principles and responsive layout techniques.',
    images: [
      {
        url: '/src/assets/images/desktop.jpg',
        alt: 'Desktop view of the product card',
        label: 'Desktop',
      },
      {
        url: '/src/assets/images/hollow.jpg',
        alt: 'Mobile view of the product card',
        label: 'Mobile',
      },
    ],
    livePreviewUrl: 'https://example-product-card.netlify.app',
    estimatedTime: '2-3 hours',
    completions: 1234,
    rating: 4.8,

    requirements: [
      'Product image with hover effects',
      'Product title and description',
      'Price display with discount badge',
      'Add to cart button with hover states',
      'Responsive design (mobile-first)',
      'Clean, modern aesthetic',
    ],
    tips: [
      'Use semantic HTML elements for better accessibility',
      'Implement smooth hover transitions for better UX',
      'Consider using CSS custom properties for consistent theming',
      'Test on multiple screen sizes during development',
      'Use relative units (rem, em) for better scalability',
    ],
    pitfalls: [
      'Avoid using fixed pixel values for responsive elements',
      "Don't forget to add alt text for images",
      'Ensure sufficient color contrast for text readability',
      'Test keyboard navigation for accessibility',
      "Don't overcomplicate the hover animations",
    ],

    designSpecs: {
      typography: {
        primaryFont: 'Inter',
        fallbackFonts: 'system-ui, -apple-system, sans-serif',
        fontSizes: {
          heading: '1.5rem (24px)',
          body: '0.875rem (14px)',
          caption: '0.75rem (12px)',
          button: '0.875rem (14px)',
        },
        fontWeights: {
          heading: '600 (Semi-bold)',
          body: '400 (Regular)',
          emphasis: '700 (Bold)',
          button: '500 (Medium)',
        },
      },
      breakpoints: {
        mobile: '320px - 767px',
        tablet: '768px - 1023px',
        desktop: '1024px+',
      },
      colorPalette: {
        primary: '#3B82F6',
        primaryHover: '#2563EB',
        secondary: '#64748B',
        background: '#FFFFFF',
        cardBackground: '#F8FAFC',
        text: '#1E293B',
        textMuted: '#64748B',
        border: '#E2E8F0',
        success: '#10B981',
        warning: '#F59E0B',
      },
      spacing: {
        cardPadding: '1.5rem (24px)',
        elementGap: '1rem (16px)',
        borderRadius: '0.75rem (12px)',
        buttonPadding: '0.75rem 1.5rem',
      },
    },

    resources: {
      videos: [
        {
          title: 'Building Responsive Product Cards',
          duration: '15 min',
          url: '/resources#videos',
          description:
            'Step-by-step guide to creating responsive product cards',
          thumbnail: '/placeholder.svg?height=120&width=200',
        },
        {
          title: 'CSS Hover Effects Masterclass',
          duration: '22 min',
          url: '/resources#videos',
          description: 'Learn to create smooth and engaging hover animations',
          thumbnail: '/placeholder.svg?height=120&width=200',
        },
        {
          title: 'Mobile-First Design Principles',
          duration: '18 min',
          url: '/resources#videos',
          description:
            'Understanding responsive design from mobile perspective',
          thumbnail: '/placeholder.svg?height=120&width=200',
        },
      ],
      documents: [
        {
          title: 'HTML Semantic Elements Guide',
          type: 'PDF',
          url: '/resources#documentation',
          description: 'Complete reference for semantic HTML structure',
        },
        {
          title: 'CSS Flexbox Cheat Sheet',
          type: 'PDF',
          url: '/resources#documentation',
          description: 'Quick reference for Flexbox properties and values',
        },
        {
          title: 'Accessibility Best Practices',
          type: 'Guide',
          url: '/resources#documentation',
          description: 'Essential accessibility guidelines for web development',
        },
      ],
      guides: [
        {
          title: 'Product Card Design Patterns',
          url: '/resources#tutorials',
          description:
            'Common design patterns and best practices for product cards',
        },
        {
          title: 'Responsive Images Tutorial',
          url: '/resources#tutorials',
          description: 'Implementing responsive images with modern techniques',
        },
        {
          title: 'CSS Custom Properties Guide',
          url: '/resources#tutorials',
          description: 'Using CSS variables for maintainable stylesheets',
        },
      ],
      tools: [
        {
          title: 'Figma',
          description: 'Design tool for creating mockups and prototypes',
          url: 'https://figma.com',
          category: 'Design',
        },
        {
          title: 'VS Code',
          description: 'Code editor with excellent web development support',
          url: 'https://code.visualstudio.com',
          category: 'Editor',
        },
        {
          title: 'Chrome DevTools',
          description: 'Browser developer tools for debugging and testing',
          url: 'https://developer.chrome.com/docs/devtools',
          category: 'Debug',
        },
        {
          title: 'Responsive Design Checker',
          description: 'Test your design across different screen sizes',
          url: 'https://responsivedesignchecker.com',
          category: 'Testing',
        },
      ],
    },
  },
}

export const challenges: ChallengeListItem[] = [
  {
    id: 1,
    title: 'Responsive Navigation Bar',
    difficulty: 'Beginner',
    tags: ['responsive', 'navigation', 'flexbox'],
    description:
      'Create a mobile-friendly navigation component with dropdown menus',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '30 min',
    submissions: 1250,
  },
  {
    id: 2,
    title: 'Todo App with Local Storage',
    difficulty: 'Intermediate',
    tags: ['dom', 'localStorage', 'events'],
    description: 'Build a fully functional todo application with persistence',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '2 hours',
    submissions: 890,
  },
  {
    id: 3,
    title: 'React Component Library',
    difficulty: 'Advanced',
    tags: ['components', 'props', 'typescript'],
    description: 'Design and implement reusable React components',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '4 hours',
    submissions: 456,
  },
  {
    id: 4,
    title: 'E-commerce Product Card',
    difficulty: 'Beginner',
    tags: ['HTML', 'CSS', 'Responsive'],
    description:
      'Create a modern product card with hover effects and responsive design',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '2-3 hours',
    submissions: 1234,
  },
  {
    id: 5,
    title: 'Interactive Dashboard',
    difficulty: 'Intermediate',
    tags: ['React', 'JavaScript', 'Charts'],
    description: 'Build a data visualization dashboard with interactive charts',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '4-6 hours',
    submissions: 567,
  },
  {
    id: 6,
    title: 'Social Media Feed',
    difficulty: 'Advanced',
    tags: ['React', 'TypeScript', 'API'],
    description: 'Create a dynamic social media feed with infinite scroll',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '6-8 hours',
    submissions: 234,
  },
]
