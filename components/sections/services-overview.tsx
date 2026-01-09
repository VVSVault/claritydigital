'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Palette,
  Code2,
  Rocket,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'

const services = [
  {
    number: '01',
    title: 'Web Design',
    description: 'Conversion-focused design that looks as good as it performs. Every pixel serves a purpose.',
    detailedDescription: 'Custom designs that capture your brand and convert visitors into customers. From wireframes to high-fidelity mockups, I create interfaces that are both beautiful and functional.',
    icon: Palette,
    features: [
      'User-centered design process',
      'Conversion optimization',
      'Mobile-first approach',
      'Brand identity integration'
    ],
    href: '/services/web-design',
  },
  {
    number: '02',
    title: 'Development',
    description: 'Modern, fast, built to scale with clean code and performance in mind.',
    detailedDescription: 'Lightning-fast websites and applications built with modern frameworks. Clean, maintainable code that scales with your business growth.',
    icon: Code2,
    features: [
      'Next.js & React expertise',
      'Performance optimization',
      'SEO-friendly architecture',
      'Scalable infrastructure'
    ],
    href: '/services/web-development',
  },
  {
    number: '03',
    title: 'SaaS Creation',
    description: 'From idea to launched product—auth, dashboards, billing, the works.',
    detailedDescription: 'Complete SaaS platforms from concept to launch. User authentication, interactive dashboards, subscription billing, and all the features you need.',
    icon: Rocket,
    features: [
      'User authentication & security',
      'Payment integration (Stripe)',
      'Admin dashboards',
      'API development'
    ],
    href: '/services/saas-creation',
  },
  {
    number: '04',
    title: 'SEO Solutions',
    description: 'Get found by the right people with technical SEO and strategy.',
    detailedDescription: 'Strategic SEO that drives qualified traffic. Technical optimization, keyword research, and content strategy to rank higher and convert better.',
    icon: TrendingUp,
    features: [
      'Technical SEO audits',
      'Keyword research & strategy',
      'On-page optimization',
      'Performance monitoring'
    ],
    href: '/services/seo',
  },
]

export function ServicesOverview() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            What I Bring to the Table
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />
        </div>
      </Container>

      {/* Stacking cards */}
      <div className="relative">
        {services.map((service, index) => (
          <ServiceStackCard
            key={service.number}
            service={service}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

interface ServiceStackCardProps {
  service: typeof services[0]
  index: number
}

function ServiceStackCard({ service, index }: ServiceStackCardProps) {
  const Icon = service.icon
  const totalCards = services.length

  return (
    <div
      className="sticky"
      style={{
        top: `${80 + index * 40}px`,
        marginBottom: index === totalCards - 1 ? '0' : '40px',
      }}
    >
      <Container>
        <Link href={service.href}>
          <motion.article
            className={cn(
              'group relative mx-auto max-w-4xl overflow-hidden rounded-3xl',
              'border-2 border-border-subtle bg-surface',
              'transition-all duration-500',
              'hover:border-accent hover:shadow-2xl hover:shadow-accent/10'
            )}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex flex-col p-8 md:p-12">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                    {service.detailedDescription}
                  </p>
                </div>

                {/* Icon */}
                <motion.div
                  className={cn(
                    'ml-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl',
                    'bg-accent/10 text-accent',
                    'transition-all duration-500'
                  )}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'var(--color-accent)',
                    color: '#ffffff'
                  }}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
              </div>

              {/* Divider */}
              <motion.div
                className="my-6 h-px bg-border"
                whileHover={{ backgroundColor: 'var(--color-accent)' }}
                transition={{ duration: 0.3 }}
              />

              {/* Features */}
              <div className="grid gap-3 sm:grid-cols-2">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Learn more link */}
              <div className="mt-8">
                <div className="flex items-center gap-3 text-accent transition-colors group-hover:text-accent-hover">
                  <span className="text-lg font-medium">Learn more</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(99,102,241,0.15)]" />
            </div>
          </motion.article>
        </Link>
      </Container>
    </div>
  )
}
