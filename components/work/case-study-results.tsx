import Image from 'next/image'
import { Quote } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { MetricsDisplay } from '@/components/shared/metrics-display'
import { urlFor } from '@/lib/sanity/client'
import type { ProjectResult, Testimonial } from '@/types'

interface CaseStudyResultsProps {
  results?: ProjectResult[]
  testimonial?: Testimonial
}

export function CaseStudyResults({ results, testimonial }: CaseStudyResultsProps) {
  return (
    <div className="space-y-16">
      {results && results.length > 0 && (
        <div>
          <SectionHeader
            title="Results"
            subtitle="The impact of our work"
            centered
          />
          <div className="mt-12">
            <MetricsDisplay metrics={results} />
          </div>
        </div>
      )}

      {testimonial && (
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 md:p-12">
          <Quote className="h-12 w-12 text-accent/30" />
          <blockquote className="mt-6 text-xl font-medium text-text-primary md:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            {testimonial.image ? (
              <Image
                src={urlFor(testimonial.image).width(96).height(96).url()}
                alt={testimonial.author}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-accent/10" />
            )}
            <div>
              <p className="font-semibold text-text-primary">
                {testimonial.author}
              </p>
              <p className="text-sm text-text-secondary">
                {testimonial.role && `${testimonial.role}, `}
                {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
