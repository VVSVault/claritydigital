'use client'

import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { FadeUp } from '@/components/ui/text-reveal'
import { cn } from '@/lib/utils/cn'

export function TestimonialSingle() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeUp>
          <div className="mx-auto max-w-4xl">
            {/* Quote icon */}
            <Quote className="mx-auto h-16 w-16 text-accent/30" />

            {/* Quote text */}
            <blockquote className="mt-8 text-center font-display text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
              &ldquo;Its genuinely so perfect, i&apos;m seriously amazed&rdquo;
            </blockquote>

            {/* Author info */}
            <div className="mt-12 text-center">
              <p className="text-lg font-semibold text-text-primary">
                Ryan Richardson
              </p>
              <p className="mt-2 text-text-secondary">
                Owner of Sold By You and Pink Posts Installations
              </p>
            </div>

            {/* Decorative accent line */}
            <div className="mx-auto mt-8 h-1 w-24 bg-gradient-to-r from-accent to-purple-500" />
          </div>
        </FadeUp>
      </Container>
    </section>
  )
}
