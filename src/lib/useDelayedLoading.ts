import { useState, useEffect } from 'react'

// Returns true only if `isLoading` remains true for longer than `delayMs`.
export default function useDelayedLoading(isLoading: boolean, delayMs = 200) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let mounted = true
    let t: ReturnType<typeof setTimeout> | null = null

    if (isLoading) {
      t = setTimeout(() => {
        if (mounted) setShow(true)
      }, delayMs)
    } else {
      // hide immediately when loading finishes
      setShow(false)
    }

    return () => {
      mounted = false
      if (t) clearTimeout(t)
    }
  }, [isLoading, delayMs])

  return show
}
