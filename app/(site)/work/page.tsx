import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { ProjectGrid } from '@/components/work/project-grid'
import { MegaCta } from '@/components/sections/mega-cta'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { allProjectsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

export const metadata: Metadata = {
  title: 'Web Development Portfolio & Case Studies',
  description: 'Explore our web development and SaaS portfolio. Custom websites and platforms for startups, real estate, automotive, and wellness industries.',
  alternates: {
    canonical: 'https://claritydigital.dev/work',
  },
  openGraph: {
    title: 'Web Development Portfolio & Case Studies | Clarity Digital',
    description: 'Explore our web development and SaaS portfolio. Custom websites and platforms for startups, real estate, automotive, and wellness industries.',
    url: 'https://claritydigital.dev/work',
  },
}

export const revalidate = 60

async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return []
  try {
    return client.fetch(allProjectsQuery, {}, { next: { tags: ['projects'] } })
  } catch {
    return []
  }
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <>
      <section className="py-24 md:py-32">
        <Container>
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-text-primary">
              Selected Work
            </h1>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">
              A collection of projects showcasing our approach to web design,
              development, and SaaS creation for startups and established brands.
            </p>
          </div>

          {/* Project Grid with Filters */}
          <ProjectGrid projects={projects} />
        </Container>
      </section>

      {/* CTA */}
      <MegaCta
        headline="Have a project in mind?"
        subheadline="Let's talk about how we can bring your vision to life."
      />
    </>
  )
}
