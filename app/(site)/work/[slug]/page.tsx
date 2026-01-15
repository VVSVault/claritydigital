import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { CaseStudyHero } from '@/components/work/case-study-hero'
import { CaseStudyOverview } from '@/components/work/case-study-overview'
import { CaseStudyContent } from '@/components/work/case-study-content'
import { CaseStudyResults } from '@/components/work/case-study-results'
import { CaseStudyGallery } from '@/components/work/case-study-gallery'
import { CtaBlock } from '@/components/sections/cta-block'
import { client, isSanityConfigured, urlFor } from '@/lib/sanity/client'
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity/queries'
import type { Project } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

// SEO-optimized metadata for known case studies
const caseStudyMeta: Record<string, { title: string; description: string }> = {
  'flipops': {
    title: 'FlipOps | Real Estate SaaS Platform',
    description: 'Custom SaaS platform for real estate investors. Deal discovery, pipeline management, and analytics from discovery to close. View the full case study.',
  },
  'bluegrass-precision-motorwerks': {
    title: 'Automotive Website Design Case Study',
    description: 'Custom website design for a premier European and exotic vehicle service center. Modern design with a digital presence to match their quality.',
  },
  'sold-by-you': {
    title: 'FSBO Platform Development',
    description: 'Custom platform making for-sale-by-owner simple. From listing to closing, a complete solution for homeowners selling without an agent.',
  },
  'pink-post-installations': {
    title: 'Real Estate Yard Sign Software',
    description: 'SaaS platform simplifying yard sign management for real estate professionals. Scheduling, tracking, and installation management in one place.',
  },
  'recovery-plus': {
    title: 'Wellness SaaS Platform | Recovery Plus',
    description: 'Data-driven wellness platform with personalized recovery protocols. Science-based approach to health optimization. View the full case study.',
  },
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

  // Use SEO-optimized metadata if available, otherwise fallback to dynamic generation
  const seoMeta = caseStudyMeta[slug]
  const title = seoMeta?.title || `${project.title} | Case Study`
  const description = seoMeta?.description || project.excerpt || `Discover how Clarity Digital built ${project.title}—a custom ${project.serviceType || 'web development'} project.`
  const imageUrl = project.featuredImage ? urlFor(project.featuredImage).width(1200).height(630).url() : undefined

  return {
    title,
    description,
    alternates: {
      canonical: `https://claritydigital.dev/work/${slug}`,
    },
    openGraph: {
      title: `${title} | Clarity Digital`,
      description,
      url: `https://claritydigital.dev/work/${slug}`,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ] : undefined,
    },
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
