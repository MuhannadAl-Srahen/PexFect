import type { Resource } from '@/types'

export const resources: Resource[] = [
  {
    id: '1',
    title: 'HTML & CSS Fundamentals',
    description:
      'Learn the basics of HTML and CSS to create beautiful web pages',
    type: 'course',
    category: 'Frontend',
    url: '/resources/html-css-fundamentals',
    difficulty: 'Beginner',
    tags: ['HTML', 'CSS', 'Web Development'],
    thumbnail: '/images/html-css-course.jpg',
    duration: '4 hours',
    author: 'Jane Smith',
    publishedAt: '2024-01-15',
    rating: 4.8,
    views: 1250,
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Guide',
    description: 'Master modern JavaScript features and best practices',
    type: 'article',
    category: 'Frontend',
    url: '/resources/javascript-es6-guide',
    difficulty: 'Intermediate',
    tags: ['JavaScript', 'ES6', 'Programming'],
    thumbnail: '/images/javascript-guide.jpg',
    duration: '20 min read',
    author: 'John Doe',
    publishedAt: '2024-02-20',
    rating: 4.6,
    views: 890,
  },
  {
    id: '3',
    title: 'React Hooks Deep Dive',
    description: 'Understanding React Hooks and their practical applications',
    type: 'video',
    category: 'Frontend',
    url: '/resources/react-hooks-deep-dive',
    difficulty: 'Advanced',
    tags: ['React', 'Hooks', 'TypeScript'],
    thumbnail: '/images/react-hooks.jpg',
    duration: '45 minutes',
    author: 'Sarah Johnson',
    publishedAt: '2024-03-10',
    rating: 4.9,
    views: 2100,
  },
]

export const getResourceById = (id: string): Resource | undefined => {
  return resources.find((resource) => resource.id === id)
}
