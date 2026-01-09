'use client'

import Image from 'next/image'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { FadeUp } from '@/components/ui/text-reveal'
import { urlFor } from '@/lib/sanity/client'
import type { Testimonial } from '@/types'

interface TestimonialMarqueeProps {
  title?: string
  subtitle?: string
  testimonials: Testimonial[]
}

/**
 * Infinite scrolling testimonial marquee
 * Two rows moving in opposite directions
 */
export function TestimonialMarquee({
  title = 'What Clients Say',
  subtitle = 'Feedback from businesses we\'ve worked with',
  testimonials,
}: TestimonialMarqueeProps) {
  if (!testimonials.length) {
    return <TestimonialMarqueePlaceholder title={title} subtitle={subtitle} />
  }

  // Split testimonials into two rows
  const midpoint = Math.ceil(testimonials.length / 2)
  const row1 = testimonials.slice(0, midpoint)
  const row2 = testimonials.slice(midpoint)

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <Container>
        <FadeUp>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>
          </div>
        </FadeUp>
      </Container>

      {/* Marquee container - full width */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 - moves left */}
        <div className="mb-6 flex">
          <div className="animate-marquee flex gap-6 pause-on-hover">
            {row1.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-a-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
            {row1.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-b-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
          <div className="animate-marquee flex gap-6 pause-on-hover" aria-hidden="true">
            {row1.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-c-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
            {row1.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-d-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        {/* Row 2 - moves right */}
        <div className="flex">
          <div className="animate-marquee-reverse flex gap-6 pause-on-hover">
            {row2.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-a-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
            {row2.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-b-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
          <div className="animate-marquee-reverse flex gap-6 pause-on-hover" aria-hidden="true">
            {row2.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-c-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
            {row2.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-d-${testimonial._id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'w-[400px] flex-shrink-0 rounded-2xl',
        'border border-border-subtle bg-surface',
        'p-6 transition-all duration-300',
        'hover:border-border-hover hover:shadow-lg'
      )}
    >
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-accent/30" />

      {/* Quote text */}
      <p className="mt-4 line-clamp-4 text-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-4">
        {testimonial.image ? (
          <Image
            src={urlFor(testimonial.image).width(80).height(80).url()}
            alt={testimonial.author}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <span className="text-lg font-bold text-accent">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold text-text-primary">{testimonial.author}</p>
          <p className="text-sm text-text-tertiary">
            {testimonial.role && `${testimonial.role}, `}
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Placeholder when no testimonials available
 */
function TestimonialMarqueePlaceholder({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  const placeholderCards = [
    {
      quote: 'Placeholder testimonial. Add testimonials through the Sanity CMS to display real client feedback here.',
      author: 'Client Name',
      company: 'Company',
    },
    {
      quote: 'Another placeholder testimonial. These cards will be replaced with real testimonials from your CMS.',
      author: 'Another Client',
      company: 'Business Name',
    },
    {
      quote: 'Your testimonials will appear here. They help build trust and credibility with potential clients.',
      author: 'Happy Customer',
      company: 'Enterprise Co',
    },
  ]

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <Container>
        <FadeUp>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>
          </div>
        </FadeUp>
      </Container>

      {/* Marquee container */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <div className="flex">
          <div className="animate-marquee flex gap-6">
            {placeholderCards.map((item, index) => (
              <div
                key={`a-${index}`}
                className={cn(
                  'w-[400px] flex-shrink-0 rounded-2xl',
                  'border border-border-subtle bg-surface',
                  'p-6'
                )}
              >
                <Quote className="h-8 w-8 text-accent/30" />
                <p className="mt-4 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated" />
                  <div>
                    <p className="font-semibold text-text-primary">{item.author}</p>
                    <p className="text-sm text-text-tertiary">{item.company}</p>
                  </div>
                </div>
              </div>
            ))}
            {placeholderCards.map((item, index) => (
              <div
                key={`b-${index}`}
                className={cn(
                  'w-[400px] flex-shrink-0 rounded-2xl',
                  'border border-border-subtle bg-surface',
                  'p-6'
                )}
              >
                <Quote className="h-8 w-8 text-accent/30" />
                <p className="mt-4 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated" />
                  <div>
                    <p className="font-semibold text-text-primary">{item.author}</p>
                    <p className="text-sm text-text-tertiary">{item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="animate-marquee flex gap-6" aria-hidden="true">
            {placeholderCards.map((item, index) => (
              <div
                key={`c-${index}`}
                className={cn(
                  'w-[400px] flex-shrink-0 rounded-2xl',
                  'border border-border-subtle bg-surface',
                  'p-6'
                )}
              >
                <Quote className="h-8 w-8 text-accent/30" />
                <p className="mt-4 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated" />
                  <div>
                    <p className="font-semibold text-text-primary">{item.author}</p>
                    <p className="text-sm text-text-tertiary">{item.company}</p>
                  </div>
                </div>
              </div>
            ))}
            {placeholderCards.map((item, index) => (
              <div
                key={`d-${index}`}
                className={cn(
                  'w-[400px] flex-shrink-0 rounded-2xl',
                  'border border-border-subtle bg-surface',
                  'p-6'
                )}
              >
                <Quote className="h-8 w-8 text-accent/30" />
                <p className="mt-4 text-text-secondary">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-surface-elevated" />
                  <div>
                    <p className="font-semibold text-text-primary">{item.author}</p>
                    <p className="text-sm text-text-tertiary">{item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
