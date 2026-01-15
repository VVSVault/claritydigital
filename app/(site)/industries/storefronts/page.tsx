import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { CtaBlock } from '@/components/sections/cta-block'
import { Store, MapPin, ShoppingCart, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Retail & Storefront Website Development',
  description: 'Custom websites for retail stores and local businesses. Ecommerce integration, local SEO, and online presence that drives foot traffic and online sales.',
  alternates: {
    canonical: 'https://claritydigital.dev/industries/storefronts',
  },
  openGraph: {
    title: 'Retail & Storefront Website Development | Clarity Digital',
    description: 'Custom websites for retail stores and local businesses. Ecommerce integration, local SEO, and online presence that drives foot traffic and online sales.',
    url: 'https://claritydigital.dev/industries/storefronts',
  },
}

const challenges = [
  'Getting found by local customers',
  'Competing with big-box retailers',
  'Managing inventory across channels',
  'Building an online presence that matches in-store experience',
]

const solutions = [
  {
    title: 'Local SEO',
    description: 'Get found when customers search for businesses like yours nearby.',
    icon: MapPin,
  },
  {
    title: 'Online Ordering',
    description: 'E-commerce or order-ahead functionality for your products.',
    icon: ShoppingCart,
  },
  {
    title: 'Store Presence',
    description: 'Showcase your location, hours, and in-store experience.',
    icon: Store,
  },
  {
    title: 'Reviews & Reputation',
    description: 'Highlight customer reviews and build local trust.',
    icon: Star,
  },
]

export default function StorefrontsPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-brand-100 p-4 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
              <Store className="h-8 w-8" />
            </div>
            <h1 className="text-display-md font-bold tracking-tight text-neutral-900 dark:text-white md:text-display-lg">
              Storefronts
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              Local business websites that bring customers through your door
              and extend your reach online.
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
                subtitle="What local businesses face online"
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
                subtitle="Solutions tailored for local retail"
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
