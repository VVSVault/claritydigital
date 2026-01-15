import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { ServiceCard } from '@/components/services/service-card'
import { ProcessTeaser } from '@/components/sections/process-teaser'
import { CtaBlock } from '@/components/sections/cta-block'
import { client, isSanityConfigured } from '@/lib/sanity/client'
import { allServicesQuery } from '@/lib/sanity/queries'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Web Development & SaaS Services',
  description: 'Custom web design, development, SaaS platforms, and SEO services for startups and small businesses. Explore our full range of digital services.',
  alternates: {
    canonical: 'https://claritydigital.dev/services',
  },
  openGraph: {
    title: 'Web Development & SaaS Services | Clarity Digital',
    description: 'Custom web design, development, SaaS platforms, and SEO services for startups and small businesses.',
    url: 'https://claritydigital.dev/services',
  },
}

export const revalidate = 60

async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return []
  try {
    return client.fetch(allServicesQuery, {}, { next: { tags: ['services'] } })
  } catch {
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-md font-bold tracking-tight text-text-primary md:text-display-lg">
              Services
            </h1>
            <p className="mt-6 text-lg text-text-secondary">
              From concept to launch and beyond, I offer comprehensive digital services
              tailored to help your business grow online.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} variant="detailed" />
            ))}
          </div>
        </Container>
      </section>

      <ProcessTeaser />
      <CtaBlock />
    </>
  )
}
