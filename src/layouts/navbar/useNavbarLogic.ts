// src/navbar/useNavbarLogic.ts
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient.js' // keep your .js path if that works in your setup

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
  const pathname = location.pathname
  const { theme, setTheme } = useTheme()

  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // get current user on mount
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user ?? null)
    }
    fetchUser()

    // listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription?.unsubscribe?.()
    }
  }, [])

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useEffect(() => {
    const throttledHandler = throttle(handleScroll, THROTTLE_DELAY)
    window.addEventListener('scroll', throttledHandler, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandler)
  }, [handleScroll])

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
  }, [])

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
    navbarClasses,
    toggleTheme,
    closeMobileMenu,
    handleLogout,
    toggleMobileMenu,
    signInWithGitHub,
  }
}
