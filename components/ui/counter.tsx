'use client'

import { useCounter } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'

interface CounterProps {
  /** Target value to count to */
  to: number
  /** Starting value (default: 0) */
  from?: number
  /** Animation duration in ms (default: 2000) */
  duration?: number
  /** Suffix to display after number (e.g., '%', '+') */
  suffix?: string
  /** Prefix to display before number (e.g., '$') */
  prefix?: string
  /** Number of decimal places (default: 0) */
  decimals?: number
  /** Additional CSS classes */
  className?: string
  /** Delay before starting animation in ms */
  delay?: number
}

/**
 * Animated counter component that counts up when in view
 * Automatically skips animation on mobile and respects reduced motion
 */
export function Counter({
  to,
  from = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  delay = 0,
}: CounterProps) {
  const { formattedCount, ref } = useCounter({
    from,
    to,
    duration,
    decimals,
    delay,
    skipOnMobile: true,
    respectReducedMotion: true,
  })

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn('tabular-nums', className)}
    >
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
