import type { UserProfile, ProfileStats } from '@/types'

// Mock profile data - will be replaced with Supabase integration later
export const profileStats: ProfileStats = {
  challengesCompleted: 18,
  totalSubmissions: 24,
  averageRating: 82, // percentage
  currentStreak: 2,
  longestStreak: 7,
  totalPoints: 1450,
}

export const userProfile: UserProfile = {
  id: '1',
  username: 'muhannad',
  fullName: 'Muhannad Al-Srahen',
  email: 'muhannad@example.com',
  avatar: '/src/assets/images/girl.jpg',
  bio: 'Passionate frontend developer with a love for creating beautiful and functional user interfaces. Always learning and exploring new technologies.',
  location: 'Jordan, Amman',
  website: 'https://muhannad.dev',
  githubUrl: 'https://github.com/MuhannadAl-Srahen',
  linkedinUrl: 'https://linkedin.com/in/muhannad-al-srahen',
  twitterUrl: '',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js'],
  experience: 'Intermediate',
  joinedAt: '2024-01-15',
  stats: profileStats,
}

// Recent activity data
export const recentActivity = [
  {
    id: 1,
    type: 'challenge_completed',
    title: 'E-commerce Product Card',
    description: 'Completed with 95% score',
    timestamp: '2 hours ago',
    icon: '🎯',
  },
  {
    id: 2,
    type: 'feedback_received',
    title: 'Todo App Review',
    description: 'Received feedback from mentor',
    timestamp: '1 day ago',
    icon: '💬',
  },
  {
    id: 3,
    type: 'streak_milestone',
    title: 'Daily Streak',
    description: 'Maintained 2-day coding streak',
    timestamp: '2 days ago',
    icon: '🔥',
  },
]

// Saved challenges data
export const savedChallengesData = [
  {
    id: '1',
    title: 'Responsive Navigation Bar',
    difficulty: 'Intermediate' as const,
    tags: ['HTML', 'CSS', 'JavaScript'],
    description:
      'Create a mobile-friendly navigation component with dropdown menus',
    image: '/src/assets/images/desktop.jpg',
    estimatedTime: '30 min',
    submissions: 1250,
    savedAt: '2024-10-08',
  },
  {
    id: '2',
    title: 'Interactive Dashboard',
    difficulty: 'Advanced' as const,
    tags: ['React', 'Charts', 'TypeScript'],
    description: 'Build a data visualization dashboard with interactive charts',
    image: '/src/assets/images/hollow.jpg',
    estimatedTime: '4-6 hours',
    submissions: 567,
    savedAt: '2024-10-07',
  },
  {
    id: '3',
    title: 'Social Media Feed',
    difficulty: 'Advanced' as const,
    tags: ['React', 'API', 'Infinite Scroll'],
    description: 'Create a dynamic social media feed with infinite scroll',
    image: '/src/assets/images/mobile.jpg',
    estimatedTime: '6-8 hours',
    submissions: 234,
    savedAt: '2024-10-06',
  },
  {
    id: '4',
    title: 'Social Media Feed',
    difficulty: 'Advanced' as const,
    tags: ['React', 'API', 'Infinite Scroll'],
    description: 'Create a dynamic social media feed with infinite scroll',
    image: '/src/assets/images/mobile.jpg',
    estimatedTime: '6-8 hours',
    submissions: 234,
    savedAt: '2024-10-06',
  },
  {
    id: '5',
    title: 'E-commerce Shopping Cart',
    difficulty: 'Intermediate' as const,
    tags: ['React', 'Redux', 'TypeScript'],
    description: 'Build a fully functional shopping cart with state management',
    image: '/src/assets/images/desktop.jpg',
    estimatedTime: '4-5 hours',
    submissions: 892,
    savedAt: '2024-10-05',
  },
  {
    id: '6',
    title: 'Weather Dashboard App',
    difficulty: 'Beginner' as const,
    tags: ['HTML', 'CSS', 'API'],
    description: 'Create a weather app that fetches data from a weather API',
    image: '/src/assets/images/girl.jpg',
    estimatedTime: '2-3 hours',
    submissions: 1456,
    savedAt: '2024-10-04',
  },
  {
    id: '7',
    title: 'Portfolio Website Builder',
    difficulty: 'Advanced' as const,
    tags: ['Next.js', 'Tailwind', 'CMS'],
    description: 'Build a portfolio website with content management system',
    image: '/src/assets/images/hollow.jpg',
    estimatedTime: '8-10 hours',
    submissions: 345,
    savedAt: '2024-10-03',
  },
]
