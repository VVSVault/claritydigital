import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/hero'
import { StatsStrip } from '@/components/sections/stats-strip'
import { BentoGrid } from '@/components/sections/bento-grid'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { featuredProjectsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

export const metadata: Metadata = {
  title: 'Custom Web Development for Startups',
  description: 'Clarity Digital builds custom websites, web applications, and SaaS platforms for startups and small businesses. From design to development to launch.',
  alternates: {
    canonical: 'https://claritydigital.dev',
  },
  openGraph: {
    title: 'Custom Web Development for Startups | Clarity Digital',
    description: 'Clarity Digital builds custom websites, web applications, and SaaS platforms for startups and small businesses. From design to development to launch.',
    url: 'https://claritydigital.dev',
  },
}

// Lazy load below-the-fold sections to reduce initial JS bundle
const ServicesOverview = dynamic(
  () => import('@/components/sections/services-overview').then(mod => mod.ServicesOverview),
  { ssr: true }
)
const ImpactStats = dynamic(
  () => import('@/components/sections/impact-stats').then(mod => mod.ImpactStats),
  { ssr: true }
)
const ProcessTeaser = dynamic(
  () => import('@/components/sections/process-teaser').then(mod => mod.ProcessTeaser),
  { ssr: true }
)
const TestimonialSingle = dynamic(
  () => import('@/components/sections/testimonial-single').then(mod => mod.TestimonialSingle),
  { ssr: true }
)
const MegaCta = dynamic(
  () => import('@/components/sections/mega-cta').then(mod => mod.MegaCta),
  { ssr: true }
)

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

      {/* Spacer for Safari compatibility */}
      <div className="section-spacer" aria-hidden="true" />

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
