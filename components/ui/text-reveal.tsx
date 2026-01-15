'use client'

import { useMemo } from 'react'
import { motion, Variants, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { useInView, usePrefersReducedMotion } from '@/lib/hooks'

type RevealType = 'char' | 'word' | 'line'

interface TextRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Text to reveal */
  text: string
  /** Type of reveal animation */
  type?: RevealType
  /** Delay before animation starts (ms) */
  delay?: number
  /** Stagger delay between items (ms) */
  stagger?: number
  /** Only animate once */
  once?: boolean
  /** Custom className for the container */
  className?: string
  /** Custom className for each animated element */
  itemClassName?: string
  /** HTML tag for the container */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger / 1000,
    },
  }),
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

// Simpler variant for reduced motion
const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

/**
 * Text reveal animation component
 * Animates text character by character, word by word, or line by line
 */
export function TextReveal({
  text,
  type = 'word',
  delay = 0,
  stagger = 50,
  once = true,
  className,
  itemClassName,
  as: Tag = 'div',
  ...props
}: TextRevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    once,
    threshold: 0.2,
    delay,
  })
  const prefersReducedMotion = usePrefersReducedMotion()

  // Split text based on type
  const items = useMemo(() => {
    switch (type) {
      case 'char':
        return text.split('')
      case 'word':
        return text.split(' ')
      case 'line':
        return text.split('\n')
      default:
        return text.split(' ')
    }
  }, [text, type])

  // Use reduced motion variants if user prefers
  const activeVariants = prefersReducedMotion ? reducedMotionVariants : itemVariants

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={stagger}
      {...props}
    >
      <Tag className="flex flex-wrap">
        {items.map((item, index) => (
          <span key={index} className="overflow-hidden" style={{ perspective: '1000px' }}>
            <motion.span
              className={cn('inline-block', itemClassName)}
              variants={activeVariants}
              style={{ transformOrigin: 'bottom' }}
            >
              {item}
              {/* Add space after words (not chars or lines) */}
              {type === 'word' && index < items.length - 1 && '\u00A0'}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}

/**
 * Simpler fade-up text reveal
 */
export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once, delay: delay * 1000 })
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered children reveal
 */
export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  once?: boolean
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ once })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual stagger child - use inside StaggerChildren
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
