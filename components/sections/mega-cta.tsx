'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { TextReveal, FadeUp } from '@/components/ui/text-reveal'
import { siteConfig } from '@/lib/constants/site'

interface MegaCtaProps {
  headline?: string
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  showEmail?: boolean
}

/**
 * Full-width call-to-action section with gradient background
 */
export function MegaCta({
  headline = 'Ready to build something great?',
  subheadline = "Let's talk about your project and see if we're a good fit. No pressure, just a conversation.",
  primaryCta = { text: 'Book a Discovery Call', href: '/contact' },
  secondaryCta = { text: 'View My Work', href: '/work' },
  showEmail = true,
}: MegaCtaProps) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            {headline}
          </h2>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = primaryCta.href)}
            >
              {primaryCta.text}
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              size="lg"
              onClick={() => (window.location.href = secondaryCta.href)}
            >
              {secondaryCta.text}
            </MagneticButton>
          </div>

          {/* Email fallback */}
          {showEmail && (
            <div className="mt-10 flex items-center justify-center gap-2 text-text-tertiary">
              <Mail className="h-4 w-4" />
              <span>or email me at</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent transition-colors hover:text-accent-hover"
              >
                {siteConfig.email}
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
