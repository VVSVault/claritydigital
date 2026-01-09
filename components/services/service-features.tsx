import { Check } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { ScrollReveal } from '@/components/shared/scroll-reveal'

interface ServiceFeaturesProps {
  deliverables: string[]
  idealFor: string[]
}

export function ServiceFeatures({ deliverables, idealFor }: ServiceFeaturesProps) {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeader
              title="What's Included"
              subtitle="Everything you get with this service"
            />
            <ul className="mt-8 space-y-4">
              {deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-neutral-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionHeader
              title="Ideal For"
              subtitle="This service is perfect for"
            />
            <ul className="mt-8 space-y-4">
              {idealFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <span className="text-neutral-600">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
