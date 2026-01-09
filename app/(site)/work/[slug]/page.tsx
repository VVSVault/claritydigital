import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { CaseStudyHero } from '@/components/work/case-study-hero'
import { CaseStudyOverview } from '@/components/work/case-study-overview'
import { CaseStudyContent } from '@/components/work/case-study-content'
import { CaseStudyResults } from '@/components/work/case-study-results'
import { CaseStudyGallery } from '@/components/work/case-study-gallery'
import { CtaBlock } from '@/components/sections/cta-block'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityConfigured) return null
  try {
    return client.fetch(
      projectBySlugQuery,
      { slug },
      { next: { tags: ['projects'] } }
    )
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured) return []
  try {
    const slugs: string[] = await client.fetch(projectSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.excerpt,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <CaseStudyHero
        title={project.title}
        excerpt={project.excerpt}
        featuredImage={project.featuredImage}
        client={project.client}
        completedAt={project.completedAt}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <CaseStudyOverview
                client={project.client}
                industry={project.industry}
                services={project.services}
                techStack={project.techStack}
                projectUrl={project.projectUrl}
              />
            </div>

            <div className="lg:col-span-2">
              {project.challenge && (
                <CaseStudyContent
                  title="The Challenge"
                  content={project.challenge}
                />
              )}
              {project.approach && (
                <CaseStudyContent
                  title="The Approach"
                  content={project.approach}
                />
              )}
              {project.solution && (
                <CaseStudyContent
                  title="The Solution"
                  content={project.solution}
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <CaseStudyGallery images={project.gallery} title={project.title} />
      )}

      {(project.results || project.testimonial) && (
        <section className="border-y border-border-subtle bg-surface/30 py-16 md:py-24">
          <Container>
            <CaseStudyResults
              results={project.results}
              testimonial={project.testimonial}
            />
          </Container>
        </section>
      )}

      <CtaBlock />
    </>
  )
}
