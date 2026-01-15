'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { TextReveal, FadeUp } from '@/components/ui/text-reveal'
import { BrowserMockup } from '@/components/effects/browser-mockup'
import { defaultHero } from '@/lib/constants/site'

interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

const services = [
  'Web Design',
  'Development',
  'SaaS',
  'SEO',
]

export function Hero({
  headline = defaultHero.headline,
  subheadline = defaultHero.subheadline,
  primaryCta = defaultHero.primaryCta,
  secondaryCta = defaultHero.secondaryCta,
}: HeroProps) {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, var(--color-accent-glow) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <Container className="relative flex min-h-screen items-center">
        <div className="grid w-full gap-12 py-32 lg:grid-cols-2 lg:gap-8 lg:py-0">
          {/* Content */}
          <div className="flex flex-col justify-center">
            {/* Services badges */}
            <FadeUp delay={0.1}>
              <div className="mb-8 flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    className={cn(
                      'inline-flex items-center rounded-full',
                      'border border-border-subtle bg-surface/50',
                      'px-3 py-1 text-sm text-text-secondary',
                      'backdrop-blur-sm'
                    )}
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </FadeUp>

            {/* Headline */}
            <TextReveal
              text={headline}
              type="word"
              delay={200}
              stagger={80}
              className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.15] tracking-tight text-text-primary"
              as="h1"
            />

            {/* Subheadline */}
            <FadeUp delay={0.8}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary md:text-xl">
                {subheadline}
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={1}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => (window.location.href = primaryCta.href)}
                >
                  {primaryCta.text}
                </MagneticButton>

                <MagneticButton
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = secondaryCta.href)}
                >
                  {secondaryCta.text}
                </MagneticButton>
              </div>
            </FadeUp>

          </div>

          {/* Animated Browser Mockup */}
          <div className="relative hidden lg:flex lg:items-center lg:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrowserMockup />
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={scrollToContent}
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2',
          'flex flex-col items-center gap-2',
          'text-text-tertiary transition-colors duration-300',
          'hover:text-text-secondary'
        )}
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Mobile decorative gradient (shown at bottom on mobile) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, var(--color-accent-glow) 0%, transparent 70%)`,
          }}
        />
      </div>
    </section>
  )
}
