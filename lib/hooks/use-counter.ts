'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseCounterOptions {
  /** Starting value (default: 0) */
  from?: number
  /** Target value to count to */
  to: number
  /** Animation duration in ms (default: 2000) */
  duration?: number
  /** Number of decimal places (default: 0) */
  decimals?: number
  /** Delay before starting animation in ms (default: 0) */
  delay?: number
  /** Skip animation on mobile devices */
  skipOnMobile?: boolean
  /** Skip animation when reduced motion is preferred */
  respectReducedMotion?: boolean
}

interface UseCounterReturn {
  /** Current count value */
  count: number
  /** Formatted count string with decimals */
  formattedCount: string
  /** Ref to attach to the element */
  ref: RefObject<HTMLElement>
  /** Whether the counter is currently animating */
  isAnimating: boolean
  /** Whether animation has completed */
  hasCompleted: boolean
}

/**
 * Hook for animated number counting with mobile optimization
 * Uses requestAnimationFrame for smooth 60fps animation
 * Applies easeOutCubic for natural deceleration
 */
export function useCounter(options: UseCounterOptions): UseCounterReturn {
  const {
    from = 0,
    to,
    duration = 2000,
    decimals = 0,
    delay = 0,
    skipOnMobile = true,
    respectReducedMotion = true,
  } = options

  const [count, setCount] = useState(from)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for mobile and reduced motion preferences
    const isMobile = !window.matchMedia('(min-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Skip animation conditions
    const shouldSkip =
      (skipOnMobile && isMobile) || (respectReducedMotion && prefersReducedMotion)

    // Set up intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true

          // If skipping animation, set final value immediately
          if (shouldSkip) {
            setCount(to)
            setHasCompleted(true)
            observer.disconnect()
            return
          }

          // Start animation after delay
          const startAnimation = () => {
            setIsAnimating(true)
            let startTime: number | null = null
            let animationFrame: number

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp
              const elapsed = timestamp - startTime
              const progress = Math.min(elapsed / duration, 1)

              // Ease out cubic for natural deceleration
              const eased = 1 - Math.pow(1 - progress, 3)

              const currentValue = from + (to - from) * eased
              setCount(currentValue)

              if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
              } else {
                setCount(to) // Ensure we end on exact value
                setIsAnimating(false)
                setHasCompleted(true)
              }
            }

            animationFrame = requestAnimationFrame(animate)

            // Cleanup on unmount
            return () => {
              if (animationFrame) {
                cancelAnimationFrame(animationFrame)
              }
            }
          }

          if (delay > 0) {
            setTimeout(startAnimation, delay)
          } else {
            startAnimation()
          }

          observer.disconnect()
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-50px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [from, to, duration, delay, skipOnMobile, respectReducedMotion])

  // Format the count with proper decimals
  const formattedCount =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString()

  return {
    count,
    formattedCount,
    ref,
    isAnimating,
    hasCompleted,
  }
}

/**
 * Helper to determine if animations should be reduced
 * Useful for conditionally applying animations
 */
export function useShouldReduceAnimations(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false)

  useEffect(() => {
    const isMobile = !window.matchMedia('(min-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShouldReduce(isMobile || prefersReducedMotion)

    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(min-width: 768px)')

    const updateShouldReduce = () => {
      const mobile = !mobileQuery.matches
      const reduced = motionQuery.matches
      setShouldReduce(mobile || reduced)
    }

    motionQuery.addEventListener('change', updateShouldReduce)
    mobileQuery.addEventListener('change', updateShouldReduce)

    return () => {
      motionQuery.removeEventListener('change', updateShouldReduce)
      mobileQuery.removeEventListener('change', updateShouldReduce)
    }
  }, [])

  return shouldReduce
}
