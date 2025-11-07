// src/navbar/useNavbarLogic.ts
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient.js' // keep your .js path if that works in your setup
import { ensureProfileExists } from '@/services/profile/lib/profileHelpers'
import { useAuth } from '@/services/challenges/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'

const SCROLL_THRESHOLD = 50
const THROTTLE_DELAY = 16

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
  const navigate = useNavigate()
  const pathname = location.pathname
  const { theme, setTheme } = useTheme()

  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  // Use the shared auth query to avoid duplicate fetches and to centralize auth state
  const { data: authData } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    // Update local user state when auth query changes
    setUser(authData?.session?.user ?? null)

    // Ensure the user's profile exists when they sign in
    if (authData?.session?.user) {
      ensureProfileExists().catch((e) =>
        console.error('[ensureProfileExists]', e)
      )
    }

    // Subscribe to Supabase auth changes and update the shared query cache so all components see updates
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(['auth'], {
          isAuthenticated: !!session,
          session,
        })
        setUser(session?.user ?? null)
        if (session?.user) {
          ensureProfileExists().catch((e) =>
            console.error('[ensureProfileExists]', e)
          )
        }
      }
    )

    return () => {
      if (
        authListener &&
        authListener.subscription &&
        typeof authListener.subscription.unsubscribe === 'function'
      ) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [authData, queryClient])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Don't hide navbar if mobile menu is open
    if (isMobileMenuOpen) {
      setScrollY(currentScrollY)
      return
    }

    // Show navbar when at the top
    if (currentScrollY < SCROLL_THRESHOLD) {
      setIsNavbarVisible(true)
    }
    // Hide navbar when scrolling down, show when scrolling up
    else if (
      currentScrollY > lastScrollY &&
      currentScrollY > SCROLL_THRESHOLD
    ) {
      // Scrolling down
      setIsNavbarVisible(false)
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsNavbarVisible(true)
    }

    setLastScrollY(currentScrollY)
    setScrollY(currentScrollY)
  }, [lastScrollY, isMobileMenuOpen])

  useEffect(() => {
    const throttledHandler = throttle(handleScroll, THROTTLE_DELAY)
    window.addEventListener('scroll', throttledHandler, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandler)
  }, [handleScroll])

  const navbarClasses = useMemo(
    () =>
      cn(
        'fixed top-0 w-full z-50 transition-all duration-500 ease-in-out',
        'bg-background/70 backdrop-blur-2xl border-b',
        !isMobileMenuOpen &&
          (scrollY > SCROLL_THRESHOLD
            ? 'border-border/80 shadow-lg shadow-primary/5'
            : 'border-border/30 shadow-sm'),
        isMobileMenuOpen && 'border-b-0',
        !isNavbarVisible && !isMobileMenuOpen && '-translate-y-full'
      ),
    [scrollY, isNavbarVisible, isMobileMenuOpen]
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // sign in (GitHub OAuth)
  const signInWithGitHub = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.origin },
    })
  }, [])

  // sign out
  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    // Clear user state immediately
    setUser(null)
    // Redirect to home page
    navigate({ to: '/' })
    // Force reload to clear any cached state
    window.location.href = '/'
  }, [navigate])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((v) => !v)
  }, [])

  return {
    pathname,
    theme,
    isLoggedIn: !!user,
    user,
    isMobileMenuOpen,
    scrollY,
    isNavbarVisible,
    navbarClasses,
    toggleTheme,
    closeMobileMenu,
    handleLogout,
    toggleMobileMenu,
    signInWithGitHub,
  }
}
