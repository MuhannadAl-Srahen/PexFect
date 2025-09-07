import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 50
const THROTTLE_DELAY = 16 // ~60fps

// Throttle function for better scroll performance
const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout
  let lastExecTime = 0
  return function (...args: Parameters<T>) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func(...args)
          lastExecTime = Date.now()
        },
        delay - (currentTime - lastExecTime)
      )
    }
  }
}

export const useNavbarLogic = () => {
  const location = useLocation()
  const pathname = location.pathname
  const { theme, setTheme } = useTheme()

  // State
  const [isLoggedIn, setIsLoggedIn] = useState(true) // This will be replaced with actual auth state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    const throttledHandler = throttle(handleScroll, THROTTLE_DELAY)
    window.addEventListener('scroll', throttledHandler, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandler)
  }, [handleScroll])

  // Memoize expensive calculations
  const navbarClasses = useMemo(
    () =>
      cn(
        'sticky top-0 w-full z-50 transition-all duration-300 ease-out',
        'bg-background/80 backdrop-blur-xl border-b',
        scrollY > SCROLL_THRESHOLD
          ? 'border-border/80 shadow-lg shadow-primary/5'
          : 'border-border/30 shadow-sm'
      ),
    [scrollY]
  )

  // Handlers
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }, [isMobileMenuOpen])

  return {
    // State
    pathname,
    theme,
    isLoggedIn,
    isMobileMenuOpen,
    scrollY,

    // Computed
    navbarClasses,

    // Handlers
    toggleTheme,
    closeMobileMenu,
    handleLogout,
    toggleMobileMenu,
  }
}
