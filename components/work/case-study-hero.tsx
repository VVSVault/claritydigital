import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { urlFor } from '@/lib/sanity/client'
import { formatDate } from '@/lib/utils/formatDate'
import type { SanityImage } from '@/types'

interface CaseStudyHeroProps {
  title: string
  excerpt: string
  featuredImage?: SanityImage
  client?: string
  completedAt?: string
}

export function CaseStudyHero({
  title,
  excerpt,
  featuredImage,
  client,
  completedAt,
}: CaseStudyHeroProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-text-secondary">
            {excerpt}
          </p>
          {completedAt && (
            <p className="mt-4 text-sm text-text-tertiary">
              Completed {formatDate(completedAt)}
            </p>
          )}
        </div>

        {featuredImage && (
          <div className="mt-12 overflow-hidden rounded-2xl">
            <Image
              src={urlFor(featuredImage).width(1400).height(800).url()}
              alt={featuredImage.alt || title}
              width={1400}
              height={800}
              className="w-full object-cover"
              priority
            />
          </div>
        )}
      </Container>
    </section>
  )
}
