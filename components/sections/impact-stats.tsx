'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Counter } from '@/components/ui/counter'
import { useInView, useIsMobile, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/utils/cn'
import {
  impactSectionVariants,
  impactCategoryVariants,
  impactStatCardVariants,
  underlineDrawVariants,
  easing,
} from '@/lib/constants/animations'

// Impact stats data per v4 spec
const impactStats = {
  design: {
    title: 'DESIGN THAT CONVERTS',
    stats: [
      {
        value: 94,
        suffix: '%',
        label: 'First impressions',
        sublabel: 'are design-related',
        source: 'Forbes',
      },
      {
        value: 75,
        suffix: '%',
        label: 'Judge credibility',
        sublabel: 'by website design',
        source: 'Stanford',
      },
      {
        value: 400,
        suffix: '%',
        label: 'Conversion boost',
        sublabel: 'with professional UX',
        source: 'Forrester',
      },
    ],
  },
  seo: {
    title: 'SEO THAT DRIVES GROWTH',
    stats: [
      {
        value: 53,
        suffix: '%',
        label: 'Of all traffic',
        sublabel: 'from organic search',
        source: 'BrightEdge',
      },
      {
        value: 14.6,
        suffix: '%',
        label: 'Close rate',
        sublabel: 'on SEO leads',
        source: 'HubSpot',
        decimals: 1,
      },
      {
        value: 1000,
        suffix: '%',
        label: 'More traffic',
        sublabel: 'than social media',
        source: 'BrightEdge',
      },
    ],
  },
}

interface StatCardProps {
  stat: {
    value: number
    suffix: string
    label: string
    sublabel: string
    source: string
    decimals?: number
  }
  index: number
  isLast: boolean
  shouldReduceAnimations: boolean
}

function StatCard({ stat, index, isLast, shouldReduceAnimations }: StatCardProps) {
  return (
    <motion.div
      variants={shouldReduceAnimations ? undefined : impactStatCardVariants}
      className={cn(
        'relative px-4 py-6 text-center',
        'md:px-6'
      )}
    >
      {/* Animated number */}
      <motion.div
        initial={shouldReduceAnimations ? {} : { scale: 0.5, opacity: 0 }}
        whileInView={shouldReduceAnimations ? {} : { scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          type: 'spring',
          stiffness: 200,
        }}
        viewport={{ once: true }}
        className="mb-3"
      >
        <Counter
          to={stat.value}
          suffix={stat.suffix}
          decimals={stat.decimals || 0}
          duration={2000 + index * 200}
          delay={index * 100}
          className={cn(
            'font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold',
            'bg-gradient-to-r from-accent via-purple-500 to-pink-500',
            'bg-clip-text text-transparent'
          )}
        />
      </motion.div>

      {/* Label with slide up */}
      <motion.div
        initial={shouldReduceAnimations ? {} : { opacity: 0, y: 10 }}
        whileInView={shouldReduceAnimations ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        viewport={{ once: true }}
      >
        <span className="block text-base font-medium text-text-primary">
          {stat.label}
        </span>
        <span className="block mt-1 text-sm text-text-tertiary">
          {stat.sublabel}
        </span>
      </motion.div>

      {/* Divider between stats (not on last) */}
      {!isLast && (
        <div
          className={cn(
            'absolute',
            // Vertical divider on desktop
            'hidden md:block md:right-0 md:top-[20%] md:h-[60%] md:w-px',
            'bg-gradient-to-b from-transparent via-border to-transparent'
          )}
        />
      )}
    </motion.div>
  )
}

interface CategoryBoxProps {
  title: string
  stats: typeof impactStats.design.stats
  shouldReduceAnimations: boolean
  isMobile: boolean
}

function CategoryBox({ title, stats, shouldReduceAnimations, isMobile }: CategoryBoxProps) {
  return (
    <motion.div
      variants={shouldReduceAnimations ? undefined : impactCategoryVariants}
      className={cn(
        'rounded-2xl p-6 md:p-8',
        'border border-border',
        // Use solid background on mobile (no backdrop-filter)
        isMobile ? 'bg-surface' : 'bg-surface/60 backdrop-blur-sm'
      )}
    >
      {/* Category title with animated underline */}
      <div className="relative mb-8 inline-block">
        <span
          className={cn(
            'text-xs font-medium uppercase tracking-[0.1em]',
            'text-text-tertiary'
          )}
        >
          {title}
        </span>
        <motion.div
          variants={shouldReduceAnimations ? undefined : underlineDrawVariants}
          className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-accent to-purple-500"
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Stats row */}
      <motion.div
        variants={shouldReduceAnimations ? undefined : { visible: { transition: { staggerChildren: 0.12 } } }}
        className={cn(
          'grid gap-4',
          // 1 column on mobile, 3 columns on desktop
          'grid-cols-1 md:grid-cols-3'
        )}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            stat={stat}
            index={index}
            isLast={index === stats.length - 1}
            shouldReduceAnimations={shouldReduceAnimations}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export function ImpactStats() {
  const { ref, isInView } = useInView<HTMLElement>({ once: true, threshold: 0.1 })
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldReduceAnimations = isMobile || prefersReducedMotion

  return (
    <section
      ref={ref}
      className={cn(
        'py-24 md:py-32 overflow-hidden',
        // Subtle background gradient
        'bg-gradient-to-b from-background via-surface/50 to-background'
      )}
    >
      <Container>
        {/* Section Header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easing.smooth }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text-primary">
            Why Professional Matters
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />
          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            Your website isn&apos;t a brochure&mdash;it&apos;s your highest-performing
            employee. Here&apos;s the proof.
          </p>
        </motion.div>

        {/* Stats Categories */}
        <motion.div
          variants={shouldReduceAnimations ? undefined : impactSectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          <CategoryBox
            title={impactStats.design.title}
            stats={impactStats.design.stats}
            shouldReduceAnimations={shouldReduceAnimations}
            isMobile={isMobile}
          />
          <CategoryBox
            title={impactStats.seo.title}
            stats={impactStats.seo.stats}
            shouldReduceAnimations={shouldReduceAnimations}
            isMobile={isMobile}
          />
        </motion.div>

        {/* Sources */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="mt-8 text-center text-xs text-text-tertiary"
        >
          Sources: Forbes, Stanford, Forrester, BrightEdge, HubSpot
        </motion.p>
      </Container>
    </section>
  )
}
