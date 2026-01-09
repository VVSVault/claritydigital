'use client'

import { forwardRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useMagnetic, usePrefersReducedMotion } from '@/lib/hooks'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** Magnetic effect strength */
  magneticStrength?: number
  /** Disable magnetic effect */
  disableMagnetic?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  asChild?: boolean
}

const variants = {
  primary: cn(
    'bg-accent text-white',
    'hover:bg-accent-hover',
    'shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
  ),
  secondary: cn(
    'border border-accent/30 bg-surface-elevated text-text-primary',
    'hover:border-accent/50 hover:bg-surface-hover'
  ),
  outline: cn(
    'border-2 border-border bg-transparent text-text-primary',
    'hover:border-accent hover:bg-surface/50'
  ),
  ghost: cn(
    'text-text-secondary',
    'hover:bg-surface-elevated hover:text-text-primary'
  ),
}

const sizes = {
  sm: 'h-9 px-4 text-sm gap-2',
  md: 'h-11 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-3',
}

/**
 * Button with magnetic cursor effect
 * The button subtly follows the cursor when hovering nearby
 */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      magneticStrength = 0.35,
      disableMagnetic = false,
      onClick,
      disabled = false,
      type = 'button',
    },
    forwardedRef
  ) => {
    const prefersReducedMotion = usePrefersReducedMotion()
    const { ref, x, y, isHovered } = useMagnetic<HTMLButtonElement>({
      strength: magneticStrength,
      enabled: !disableMagnetic && !disabled && !prefersReducedMotion,
    })

    // Use forwarded ref or internal ref
    const buttonRef = forwardedRef || ref

    return (
      <motion.button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'relative inline-flex items-center justify-center',
          'rounded-full font-medium',
          'transition-all duration-300 ease-out-expo',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        animate={{
          x: x,
          y: y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner content with slight additional movement */}
        <motion.span
          className="inline-flex items-center justify-center gap-2"
          animate={{
            x: x * 0.3,
            y: y * 0.3,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
        >
          {children}
        </motion.span>

        {/* Glow effect on hover */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full opacity-0 blur-xl"
            style={{
              background: 'var(--color-accent)',
            }}
            animate={{
              opacity: isHovered ? 0.3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    )
  }
)

MagneticButton.displayName = 'MagneticButton'
