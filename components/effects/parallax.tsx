'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { usePrefersReducedMotion } from '@/lib/hooks'

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  /** Speed of parallax effect (-1 to 1, negative = move up on scroll) */
  speed?: number
  /** Offset from original position */
  offset?: number
}

/**
 * Wrapper component that adds parallax scroll effect
 */
export function Parallax({
  children,
  className,
  speed = 0.5,
  offset = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(offset)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const movement = scrollProgress * speed * 100

      setTransform(offset + movement)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, offset, prefersReducedMotion])

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform: prefersReducedMotion ? 'none' : `translateY(${transform}px)`,
        transition: 'transform 0.1s linear',
      }}
    >
      {children}
    </div>
  )
}
