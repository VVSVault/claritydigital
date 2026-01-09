import { Hero } from '@/components/sections/hero'
import { StatsStrip } from '@/components/sections/stats-strip'
import { ServicesOverview } from '@/components/sections/services-overview'
import { BentoGrid } from '@/components/sections/bento-grid'
import { ImpactStats } from '@/components/sections/impact-stats'
import { ProcessTeaser } from '@/components/sections/process-teaser'
import { TestimonialSingle } from '@/components/sections/testimonial-single'
import { MegaCta } from '@/components/sections/mega-cta'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { featuredProjectsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

export const revalidate = 60

async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return []
  try {
    return client.fetch(featuredProjectsQuery, {}, { next: { tags: ['projects'] } })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects()

  return (
    <>
      {/* Section 1: Hero with animated browser mockup */}
      <Hero />

      {/* Section 2: Stats Strip */}
      <StatsStrip />

      {/* Section 3: Selected Work bento grid */}
      <BentoGrid
        title="Selected Work"
        subtitle="Projects that moved the needle"
        projects={projects}
      />

      {/* Section 4: Services grid */}
      <ServicesOverview />

      {/* Section 5: Impact Stats (NEW in v4) */}
      <ImpactStats />

      {/* Section 6: Process teaser */}
      <ProcessTeaser />

      {/* Section 7: Client Testimonial */}
      <TestimonialSingle />

      {/* Section 8: Full-width CTA */}
      <MegaCta
        headline="Ready to build something great?"
        subheadline="Let's talk about your project and see if we're a good fit. No pressure, just a conversation."
      />
    </>
  )
}
