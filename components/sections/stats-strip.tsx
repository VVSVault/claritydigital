'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Counter } from '@/components/ui/counter'
import { useInView, useIsMobile, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'
import { statsContainerVariants, statItemVariants } from '@/lib/constants/animations'

const stats = [
  {
    value: 50,
    suffix: '+',
    label: 'Projects',
    sublabel: 'Shipped',
    useCounter: true,
  },
  {
    mainText: 'Startups to',
    label: 'Established Brands',
    useCounter: false,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Client',
    sublabel: 'Satisfaction',
    useCounter: true,
  },
]

interface StatsStripProps {
  /** Whether to show as a full-width section or inline (in hero) */
  variant?: 'section' | 'inline'
  className?: string
}

export function StatsStrip({ variant = 'section', className }: StatsStripProps) {
  const { ref, isInView } = useInView<HTMLElement>({ once: true, threshold: 0.3 })
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldReduceAnimations = isMobile || prefersReducedMotion

  const content = (
    <motion.div
      variants={shouldReduceAnimations ? undefined : statsContainerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn(
        'flex flex-wrap items-center justify-center gap-8',
        'sm:gap-12 md:gap-16 lg:gap-20',
        className
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={shouldReduceAnimations ? undefined : statItemVariants}
          className="relative flex flex-col items-center text-center"
        >
          {/* Value or main text */}
          {stat.useCounter && stat.value !== undefined ? (
            <div className="flex items-baseline">
              <Counter
                to={stat.value}
                suffix={stat.suffix || ''}
                duration={1500}
                delay={index * 150}
                className="font-display text-3xl font-bold text-text-primary sm:text-4xl"
              />
            </div>
          ) : (
            <p className="font-display text-lg font-bold text-text-primary sm:text-xl">
              {stat.mainText}
            </p>
          )}

          {/* Label */}
          <p className="mt-1 text-sm text-text-tertiary">
            {stat.sublabel ? `${stat.label} ${stat.sublabel}` : stat.label}
          </p>

          {/* Divider (not on last item) */}
          {index < stats.length - 1 && (
            <div
              className={cn(
                'absolute -right-4 top-1/2 hidden h-12 w-px -translate-y-1/2',
                'bg-gradient-to-b from-transparent via-border to-transparent',
                'sm:-right-6 sm:block md:-right-8 lg:-right-10'
              )}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  )

  // Inline variant (used inside hero or other components)
  if (variant === 'inline') {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {content}
      </div>
    )
  }

  // Section variant (standalone)
  return (
    <section
      ref={ref}
      className={cn(
        'border-y border-border-subtle',
        'bg-surface/30 backdrop-blur-sm',
        'py-12 md:py-16'
      )}
    >
      <Container>{content}</Container>
    </section>
  )
}
