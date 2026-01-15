import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { CtaBlock } from '@/components/sections/cta-block'
import { Home, TrendingUp, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Real Estate Web Development',
  description: 'Custom websites and software for real estate professionals. Investor tools, agent sites, IDX integration, and lead generation platforms built for your market.',
  alternates: {
    canonical: 'https://claritydigital.dev/industries/real-estate',
  },
  openGraph: {
    title: 'Real Estate Web Development | Clarity Digital',
    description: 'Custom websites and software for real estate professionals. Investor tools, agent sites, IDX integration, and lead generation platforms built for your market.',
    url: 'https://claritydigital.dev/industries/real-estate',
  },
}

const challenges = [
  'Standing out in a competitive market',
  'Generating qualified leads online',
  'Managing property listings efficiently',
  'Building trust with potential clients',
]

const solutions = [
  {
    title: 'IDX-Integrated Websites',
    description: 'Property search functionality that keeps visitors on your site.',
    icon: Home,
  },
  {
    title: 'Lead Generation Systems',
    description: 'Capture and nurture leads with strategic landing pages and automation.',
    icon: TrendingUp,
  },
  {
    title: 'Personal Branding',
    description: 'Stand out with a unique online presence that reflects your expertise.',
    icon: Users,
  },
  {
    title: 'Custom Tools',
    description: 'Investment calculators, CRM integrations, and workflow automation.',
    icon: Zap,
  },
]

export default function RealEstatePage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-brand-100 p-4 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
              <Home className="h-8 w-8" />
            </div>
            <h1 className="text-display-md font-bold tracking-tight text-neutral-900 dark:text-white md:text-display-lg">
              Real Estate
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              Digital solutions that help real estate professionals generate leads,
              showcase properties, and close more deals.
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
                subtitle="What real estate professionals struggle with online"
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
                subtitle="Solutions tailored for real estate"
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
