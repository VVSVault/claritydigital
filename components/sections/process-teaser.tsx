'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { useInView } from '@/lib/hooks'

const steps = [
  {
    number: '01',
    title: 'Discovery & Research',
    description:
      'We hop on a call. You tell me your vision, pain points, and goals. Then I research your industry and competitors so I build with context.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      "Based on research, I map out what we're building and why. You'll know exactly what to expect.",
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Heads down, with regular check-ins. You see progress weekly, not just at the end.',
  },
  {
    number: '04',
    title: 'Launch & Beyond',
    description:
      'We go live. I stick around for support, iterations, and making sure everything runs.',
  },
]

export function ProcessTeaser() {
  const { ref, isInView } = useInView<HTMLElement>({ once: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-surface/30">
      <Container>
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-text-primary">
            How We'll Work Together
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'group relative py-8 px-4 overflow-hidden cursor-pointer rounded-2xl',
                index < steps.length - 1 && 'border-b border-border-subtle'
              )}
            >
              {/* Animated gradient background */}
              <div
                className={cn(
                  'absolute inset-0 z-0',
                  'bg-gradient-to-r from-accent via-purple-500 to-pink-500',
                  '-translate-x-full transition-transform duration-500 ease-out',
                  'group-hover:translate-x-0'
                )}
              />

              <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                {/* Number */}
                <div className="flex items-center md:shrink-0">
                  <span
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-xl',
                      'border border-border bg-surface-elevated',
                      'font-display text-lg font-bold text-accent',
                      'transition-all duration-300',
                      'group-hover:bg-white/10 group-hover:border-white/30 group-hover:text-white'
                    )}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className={cn(
                    'text-xl font-semibold text-text-primary',
                    'transition-colors duration-300',
                    'group-hover:text-white'
                  )}>
                    {step.title}
                  </h3>
                  <p className={cn(
                    'mt-2 max-w-2xl text-text-secondary leading-relaxed',
                    'transition-colors duration-300',
                    'group-hover:text-white/90'
                  )}>
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
