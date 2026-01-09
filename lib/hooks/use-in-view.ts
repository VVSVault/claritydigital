'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseInViewOptions {
  /** Threshold for triggering (0-1) */
  threshold?: number
  /** Root margin for the intersection observer */
  rootMargin?: string
  /** Only trigger once */
  once?: boolean
  /** Delay before setting inView to true (ms) */
  delay?: number
}

interface UseInViewReturn<T extends HTMLElement> {
  ref: RefObject<T>
  isInView: boolean
  hasBeenInView: boolean
}

/**
 * Hook for detecting when an element enters the viewport
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): UseInViewReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = false,
    delay = 0,
  } = options

  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If once mode and already seen, don't observe
    if (once && hasBeenInView) return

    let timeoutId: NodeJS.Timeout

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        if (inView) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setIsInView(true)
              setHasBeenInView(true)
            }, delay)
          } else {
            setIsInView(true)
            setHasBeenInView(true)
          }

          // Unobserve if once mode
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          clearTimeout(timeoutId)
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, delay, hasBeenInView])

  return { ref, isInView, hasBeenInView }
}
