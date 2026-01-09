'use client'

import { Container } from '@/components/ui/container'
import { MagneticButton } from '@/components/ui/magnetic-button'

interface CtaBlockProps {
  title?: string
  description?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
}

export function CtaBlock({
  title = "Ready to start your project?",
  description = "Let's discuss how we can help bring your vision to life.",
  primaryCta = { text: 'Start a Project', href: '/contact' },
  secondaryCta = { text: 'View Our Work', href: '/work' },
}: CtaBlockProps) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            {description}
          </p>
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
        </div>
      </Container>
    </section>
  )
}
