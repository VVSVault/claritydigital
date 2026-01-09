'use client'

import { cn } from '@/lib/utils/cn'

interface GlowProps {
  children: React.ReactNode
  className?: string
  /** Glow color - defaults to accent */
  color?: string
  /** Glow intensity */
  intensity?: 'subtle' | 'normal' | 'strong'
  /** Whether glow only shows on hover */
  hoverOnly?: boolean
}

const intensityMap = {
  subtle: '0 0 20px -5px',
  normal: '0 0 30px -5px',
  strong: '0 0 50px -5px',
}

/**
 * Wrapper component that adds a glow effect to children
 */
export function Glow({
  children,
  className,
  color = 'var(--color-accent-glow)',
  intensity = 'normal',
  hoverOnly = false,
}: GlowProps) {
  const glowStyle = {
    '--glow-shadow': `${intensityMap[intensity]} ${color}`,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        'relative transition-shadow duration-300',
        hoverOnly ? 'hover:shadow-[var(--glow-shadow)]' : 'shadow-[var(--glow-shadow)]',
        className
      )}
      style={glowStyle}
    >
      {children}
    </div>
  )
}

/**
 * Animated glow that pulses
 */
export function PulsingGlow({
  children,
  className,
  color = 'var(--color-accent-glow)',
}: Omit<GlowProps, 'intensity' | 'hoverOnly'>) {
  return (
    <div
      className={cn('animate-pulse-glow', className)}
      style={{ '--color-accent-glow': color } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
