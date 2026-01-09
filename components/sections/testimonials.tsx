import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { ScrollReveal } from '@/components/shared/scroll-reveal'
import { client, urlFor, isSanityConfigured } from '@/lib/sanity/client'
import { featuredTestimonialsQuery } from '@/lib/sanity/queries'
import type { Testimonial } from '@/types'

async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return []
  try {
    return client.fetch(featuredTestimonialsQuery, {}, { next: { tags: ['testimonials'] } })
  } catch {
    return []
  }
}

export async function Testimonials() {
  const testimonials = await getTestimonials()

  // Placeholder if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeader
              title="What Clients Say"
              subtitle="Feedback from businesses we've worked with"
              centered
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
                  <Quote className="h-8 w-8 text-brand-200 dark:text-brand-900" />
                  <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                    &ldquo;Placeholder testimonial. Add testimonials through the Sanity CMS to display real client feedback here.&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-white">
                        Client Name
                      </p>
                      <p className="text-sm text-neutral-500">Company</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeader
            title="What Clients Say"
            subtitle="Feedback from businesses we've worked with"
            centered
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial._id} delay={index * 0.1}>
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
                <Quote className="h-8 w-8 text-brand-200 dark:text-brand-900" />
                <p className="mt-4 text-neutral-600 dark:text-neutral-400">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  {testimonial.image ? (
                    <Image
                      src={urlFor(testimonial.image).width(96).height(96).url()}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-brand-100 dark:bg-brand-900" />
                  )}
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.role && `${testimonial.role}, `}
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
