import type { ReactNode } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import {
  saveScrollPosition,
  restoreScrollPosition,
} from '@/lib/scrollRestoration'

type Props = {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  const location = useLocation()
  const isChallengePage =
    location.pathname.startsWith('/challenges/') &&
    location.pathname !== '/challenges'

  // Scroll restoration
  useEffect(() => {
    const key = location.pathname

    // Restore scroll position after images are loaded or when browser is idle
    let restored = false;
    function doRestore() {
      if (!restored) {
        restoreScrollPosition(key);
        restored = true;
      }
    }
    const images = Array.from(document.images);
    const unloadedImages = images.filter(img => !img.complete);
    if (unloadedImages.length > 0) {
      let loadedCount = 0;
      unloadedImages.forEach(img => {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === unloadedImages.length) {
            doRestore();
          }
        });
        img.addEventListener('error', () => {
          loadedCount++;
          if (loadedCount === unloadedImages.length) {
            doRestore();
          }
        });
      });
      // Fallback: in case images never load, restore after idle
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(doRestore, { timeout: 500 });
      } else {
        setTimeout(doRestore, 500);
      }
    } else {
      // No images to wait for, restore immediately
      doRestore();
    }

    // Save scroll position before user leaves the page
    const handleBeforeUnload = () => {
      saveScrollPosition(key)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // Save scroll position when component unmounts (navigation)
      saveScrollPosition(key)
    }
  }, [location.pathname])

  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 w-full max-w-full'>{children}</main>
      {!isChallengePage && <Footer />}
      <ScrollToTop />
    </div>
  )
}
