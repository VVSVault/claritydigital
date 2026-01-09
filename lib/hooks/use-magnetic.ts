'use client'

import { useState, useEffect, useRef, RefObject, useCallback } from 'react'

interface MagneticValues {
  x: number
  y: number
}

interface UseMagneticOptions {
  /** Strength of the magnetic effect (0-1) */
  strength?: number
  /** Radius of the magnetic field in pixels */
  radius?: number
  /** Whether the effect is enabled */
  enabled?: boolean
}

interface UseMagneticReturn<T extends HTMLElement> {
  ref: RefObject<T>
  x: number
  y: number
  isHovered: boolean
}

/**
 * Hook for creating magnetic cursor effect on elements
 * Element subtly follows the cursor when hovering nearby
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  options: UseMagneticOptions = {}
): UseMagneticReturn<T> {
  const { strength = 0.35, radius = 100, enabled = true } = options

  const ref = useRef<T>(null)
  const [position, setPosition] = useState<MagneticValues>({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || !enabled) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      if (distance < radius) {
        // Within magnetic field
        setIsHovered(true)
        const pull = 1 - distance / radius // Stronger pull when closer
        setPosition({
          x: distanceX * strength * pull,
          y: distanceY * strength * pull,
        })
      } else {
        // Outside magnetic field
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }
    },
    [enabled, radius, strength]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    if (!enabled) {
      setPosition({ x: 0, y: 0 })
      setIsHovered(false)
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      return
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled, handleMouseMove, handleMouseLeave])

  return {
    ref,
    x: position.x,
    y: position.y,
    isHovered,
  }
}
