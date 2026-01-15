import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CtaBlock } from '@/components/sections/cta-block'
import { Home, Heart, Camera, Gem, Store, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Web Development by Industry',
  description: 'Industry-focused web development and SaaS solutions. Specialized websites for real estate, wellness, photography, jewelry, and retail businesses.',
  alternates: {
    canonical: 'https://claritydigital.dev/industries',
  },
  openGraph: {
    title: 'Web Development by Industry | Clarity Digital',
    description: 'Industry-focused web development and SaaS solutions. Specialized websites for real estate, wellness, photography, jewelry, and retail businesses.',
    url: 'https://claritydigital.dev/industries',
  },
}

const industries = [
  {
    title: 'Real Estate',
    description: 'Websites and tools that help agents and investors close more deals.',
    href: '/industries/real-estate',
    icon: Home,
  },
  {
    title: 'Wellness & Med Spa',
    description: 'Booking-focused websites that fill your calendar with ideal clients.',
    href: '/industries/wellness',
    icon: Heart,
  },
  {
    title: 'Photography',
    description: 'Portfolio websites that showcase your work and attract bookings.',
    href: '/industries/photography',
    icon: Camera,
  },
  {
    title: 'Jewelry & Luxury',
    description: 'Elegant e-commerce and brand experiences for luxury products.',
    href: '/industries/jewelry',
    icon: Gem,
  },
  {
    title: 'Storefronts',
    description: 'Local business websites that drive foot traffic and online sales.',
    href: '/industries/storefronts',
    icon: Store,
  },
]

export default function IndustriesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-md font-bold tracking-tight text-neutral-900 dark:text-white md:text-display-lg">
              Industries We Serve
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
              We specialize in creating digital solutions for businesses in these industries,
              understanding the unique challenges and opportunities each one presents.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <Link key={industry.href} href={industry.href}>
                  <Card className="group h-full transition-all hover:border-brand-500 hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="flex items-center gap-2">
                        {industry.title}
                        <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </CardTitle>
                      <CardDescription>{industry.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  )
}
