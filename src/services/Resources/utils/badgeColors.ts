// Function to get badge colors based on category
export const getBadgeColors = (category: string): string => {
  const categoryLower = category.toLowerCase()
  
  // Documentation - Blue
  if (categoryLower.includes('documentation')) {
    return 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30'
  }
  // Reference - Red
  if (categoryLower.includes('reference')) {
    return 'bg-red-500/10 text-red-700 border-red-500/20 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30'
  }
  // Tutorial - Yellow
  if (categoryLower.includes('tutorial')) {
    return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30'
  }
  // Learning - Green
  if (categoryLower.includes('learning')) {
    return 'bg-green-500/10 text-green-700 border-green-500/20 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30'
  }
  // Tools/Editor/Debug/Hosting - Emerald
  if (categoryLower.includes('tool') || categoryLower.includes('editor') || categoryLower.includes('debug') || categoryLower.includes('hosting')) {
    return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
  }
  // Video/YouTube - Blue
  if (categoryLower.includes('video') || categoryLower.includes('youtube')) {
    return 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30'
  }
  // CSS - Yellow
  if (categoryLower.includes('css')) {
    return 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30'
  }
  // JavaScript/Frontend - Purple
  if (categoryLower.includes('javascript') || categoryLower.includes('frontend')) {
    return 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30'
  }
  // React - Primary (using primary color)
  if (categoryLower.includes('react')) {
    return 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30'
  }
  // Language - Purple
  if (categoryLower.includes('language')) {
    return 'bg-purple-500/10 text-purple-700 border-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30'
  }
  // Framework - Blue
  if (categoryLower.includes('framework')) {
    return 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30'
  }
  
  // Default color - Red
  return 'bg-red-500/10 text-red-700 border-red-500/20 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30'
}

// Color mapping for easier reference and potential future use
export const BADGE_COLOR_MAP = {
  documentation: 'blue',
  reference: 'red',
  tutorial: 'yellow',
  learning: 'green',
  tool: 'emerald',
  editor: 'emerald',
  debug: 'emerald',
  hosting: 'emerald',
  video: 'blue',
  youtube: 'blue',
  css: 'yellow',
  javascript: 'purple',
  react: 'primary',
  frontend: 'purple',
  language: 'purple',
  framework: 'blue',
  default: 'red'
} as const