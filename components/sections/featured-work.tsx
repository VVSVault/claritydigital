import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/shared/section-header'
import { ScrollReveal } from '@/components/shared/scroll-reveal'
import { ProjectCard } from '@/components/work/project-card'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { featuredProjectsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

async function getFeaturedProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return []
  try {
    return client.fetch(featuredProjectsQuery, {}, { next: { tags: ['projects'] } })
  } catch {
    return []
  }
}

export async function FeaturedWork() {
  const projects = await getFeaturedProjects()

  // If no projects in CMS, show placeholder
  if (!projects || projects.length === 0) {
    return (
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900 md:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeader
              title="Featured Work"
              subtitle="Recent projects that showcase our approach"
              centered
            />
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/work">
                View All Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900 md:py-24">
      <Container>
        <ScrollReveal>
          <SectionHeader
            title="Featured Work"
            subtitle="Recent projects that showcase our approach"
            centered
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project._id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/work">
              View All Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
