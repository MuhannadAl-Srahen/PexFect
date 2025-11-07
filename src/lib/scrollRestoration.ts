// Scroll position restoration utility
export const saveScrollPosition = (key: string) => {
  const scrollPosition = {
    x: window.scrollX,
    y: window.scrollY,
  }
  sessionStorage.setItem(`scroll-${key}`, JSON.stringify(scrollPosition))
}

export const restoreScrollPosition = (key: string) => {
  const saved = sessionStorage.getItem(`scroll-${key}`)
  if (saved) {
    try {
      const { x, y } = JSON.parse(saved)
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(x, y)
      })
    } catch (e) {
      console.error('Error restoring scroll position:', e)
    }
  }
}

export const clearScrollPosition = (key: string) => {
  sessionStorage.removeItem(`scroll-${key}`)
}
