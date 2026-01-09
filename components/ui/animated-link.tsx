'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  /** Animation variant */
  variant?: 'underline' | 'highlight' | 'arrow'
  /** External link */
  external?: boolean
}

/**
 * Link with animated hover effects
 */
export function AnimatedLink({
  href,
  children,
  className,
  variant = 'underline',
  external = false,
}: AnimatedLinkProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  if (variant === 'underline') {
    return (
      <Link
        href={href}
        className={cn(
          'group relative inline-flex items-center gap-1',
          'text-text-secondary hover:text-text-primary',
          'transition-colors duration-300',
          className
        )}
        {...linkProps}
      >
        <span>{children}</span>
        <span
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </Link>
    )
  }

  if (variant === 'highlight') {
    return (
      <Link
        href={href}
        className={cn(
          'relative inline-flex items-center gap-1 px-1 -mx-1',
          'text-text-secondary hover:text-text-primary',
          'transition-colors duration-300',
          className
        )}
        {...linkProps}
      >
        <motion.span
          className="absolute inset-0 -z-10 rounded bg-accent/10"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
        />
        <span>{children}</span>
      </Link>
    )
  }

  if (variant === 'arrow') {
    return (
      <Link
        href={href}
        className={cn(
          'group inline-flex items-center gap-2',
          'text-accent hover:text-accent-hover',
          'transition-colors duration-300',
          className
        )}
        {...linkProps}
      >
        <span>{children}</span>
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      </Link>
    )
  }

  return (
    <Link href={href} className={className} {...linkProps}>
      {children}
    </Link>
  )
}
