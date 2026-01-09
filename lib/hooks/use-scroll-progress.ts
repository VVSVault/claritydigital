'use client'

import { useState, useEffect, useCallback, RefObject } from 'react'

interface UseScrollProgressOptions {
  /** Element ref to track (defaults to document) */
  containerRef?: RefObject<HTMLElement>
  /** Throttle delay in ms */
  throttle?: number
}

/**
 * Hook for tracking scroll progress (0-1)
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}): number {
  const { containerRef, throttle = 10 } = options
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    if (containerRef?.current) {
      // For a specific container
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const maxScroll = scrollHeight - clientHeight
      const currentProgress = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(Math.min(1, Math.max(0, currentProgress)))
    } else {
      // For the document/window
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight
      const maxScroll = scrollHeight - clientHeight
      const currentProgress = maxScroll > 0 ? scrollTop / maxScroll : 0
      setProgress(Math.min(1, Math.max(0, currentProgress)))
    }
  }, [containerRef])

  useEffect(() => {
    let lastCall = 0

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastCall >= throttle) {
        lastCall = now
        updateProgress()
      }
    }

    // Initial progress
    updateProgress()

    const target = containerRef?.current || window
    target.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, throttle, updateProgress])

  return progress
}

/**
 * Hook for tracking scroll direction
 */
export function useScrollDirection(): 'up' | 'down' | null {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > lastScrollY && scrollY > 50) {
        setDirection('down')
      } else if (scrollY < lastScrollY) {
        setDirection('up')
      }

      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return direction
}

/**
 * Hook for detecting if page has scrolled past a threshold
 */
export function useScrolledPast(threshold: number = 100): boolean {
  const [scrolledPast, setScrolledPast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > threshold)
    }

    // Check initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return scrolledPast
}
