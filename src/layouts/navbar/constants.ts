import { Map, BookOpen, Swords, Trophy } from 'lucide-react'

export const navItems = [
  { name: 'Challenges', href: '/challenges', icon: Swords },
  { name: 'Roadmap', href: '/roadmap', icon: Map },
  { name: 'Resources', href: '/resources', icon: BookOpen },
  { name: 'Progress', href: '/progress', icon: Trophy },
] as const

export const SCROLL_THRESHOLD = 50
export const THROTTLE_DELAY = 16 // ~60fps
