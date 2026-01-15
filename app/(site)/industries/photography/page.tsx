import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { CtaBlock } from '@/components/sections/cta-block'
import { Camera, Image, Zap, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Photography Website Development',
  description: 'Custom portfolio websites for photographers. Wedding, portrait, and commercial photography sites with galleries, booking systems, and client proofing built in.',
  alternates: {
    canonical: 'https://claritydigital.dev/industries/photography',
  },
  openGraph: {
    title: 'Photography Website Development | Clarity Digital',
    description: 'Custom portfolio websites for photographers. Wedding, portrait, and commercial photography sites with galleries, booking systems, and client proofing built in.',
    url: 'https://claritydigital.dev/industries/photography',
  },
}

const challenges = [
  'Showcasing work in the best light',
  'Standing out from other photographers',
  'Converting portfolio views into inquiries',
  'Managing client galleries and deliveries',
]

const solutions = [
  {
    title: 'Portfolio-First Design',
    description: 'Galleries that make your work the star of the show.',
    icon: Image,
  },
  {
    title: 'Fast Loading',
    description: 'Optimized images that load quickly without sacrificing quality.',
    icon: Zap,
  },
  {
    title: 'Booking Integration',
    description: 'Seamless inquiry forms and booking calendar integration.',
    icon: Calendar,
  },
  {
    title: 'Client Galleries',
    description: 'Private galleries for client proofing and delivery.',
    icon: Camera,
  },
]

export default function PhotographyPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-brand-100 p-4 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
              <Camera className="h-8 w-8" />
            </div>
            <h1 className="text-display-md font-bold tracking-tight text-neutral-900 dark:text-white md:text-display-lg">
              Photography
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              Portfolio websites that let your work speak for itself
              while driving inquiries and bookings.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-900 md:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeader
                title="Common Challenges"
                subtitle="What photographers face online"
              />
              <ul className="mt-8 space-y-4">
                {challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    <span className="text-neutral-600 dark:text-neutral-400">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeader
                title="How We Help"
                subtitle="Solutions tailored for photographers"
              />
              <div className="mt-8 space-y-6">
                {solutions.map((solution) => {
                  const Icon = solution.icon
                  return (
                    <div key={solution.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  )
}
