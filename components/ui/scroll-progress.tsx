'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useScrollProgress, usePrefersReducedMotion } from '@/lib/hooks'

interface ScrollProgressProps {
  /** Style variant */
  variant?: 'line' | 'circle'
  /** Position for line variant */
  position?: 'top' | 'bottom'
  /** Color of the progress indicator */
  color?: string
  /** Height/thickness of the line */
  thickness?: number
  /** Size of circle variant */
  circleSize?: number
  className?: string
}

/**
 * Visual scroll progress indicator
 */
export function ScrollProgress({
  variant = 'line',
  position = 'top',
  color = 'var(--color-accent)',
  thickness = 3,
  circleSize = 48,
  className,
}: ScrollProgressProps) {
  const progress = useScrollProgress()
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) return null

  if (variant === 'circle') {
    const circumference = 2 * Math.PI * (circleSize / 2 - 4)
    const strokeDashoffset = circumference - progress * circumference

    return (
      <div
        className={cn(
          'fixed bottom-8 right-8 z-50',
          className
        )}
      >
        <svg
          width={circleSize}
          height={circleSize}
          viewBox={`0 0 ${circleSize} ${circleSize}`}
          className="-rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2 - 4}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={thickness}
          />
          {/* Progress circle */}
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={circleSize / 2 - 4}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </svg>
        {/* Percentage text */}
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-medium"
          style={{ color }}
        >
          {Math.round(progress * 100)}%
        </span>
      </div>
    )
  }

  // Line variant
  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{
        height: thickness,
        background: 'var(--color-surface)',
      }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${color}, var(--color-gradient-mid), var(--color-gradient-end))`,
          scaleX: progress,
        }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
    </motion.div>
  )
}
