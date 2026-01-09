'use client'

import { Container } from '@/components/ui/container'
import { ScrollReveal } from '@/components/shared/scroll-reveal'
import { SectionHeader } from '@/components/shared/section-header'
import { CheckCircle2, Users, XCircle } from 'lucide-react'

interface ServiceSection {
  title: string
  content: string
  subsections?: {
    title: string
    content: string
  }[]
}

interface ServiceContentProps {
  businessImpact: string
  whatIncluded: ServiceSection
  whyAlternativesFail: ServiceSection
  idealFor: string[]
}

export function ServiceContent({
  businessImpact,
  whatIncluded,
  whyAlternativesFail,
  idealFor,
}: ServiceContentProps) {
  return (
    <>
      {/* Business Impact Section */}
      <section className="py-16 md:py-24">
        <Container size="md">
          <ScrollReveal>
            <SectionHeader
              title="What This Actually Means For Your Business"
              subtitle="The real-world impact of professional service"
              centered
            />
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-600">
              {businessImpact.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* What's Included Section */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
        <Container size="md">
          <ScrollReveal>
            <SectionHeader
              title={whatIncluded.title}
              subtitle="Comprehensive service breakdown"
              centered
            />
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>{whatIncluded.content}</p>
            </div>

            {whatIncluded.subsections && whatIncluded.subsections.length > 0 && (
              <div className="mt-12 space-y-8">
                {whatIncluded.subsections.map((subsection, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="rounded-xl border border-neutral-200 bg-white p-6">
                      <h3 className="flex items-start gap-3 text-xl font-semibold text-neutral-900">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" style={{ color: '#6366F1' }} />
                        {subsection.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-neutral-600">
                        {subsection.content}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </ScrollReveal>
        </Container>
      </section>

      {/* Why Alternatives Fail Section */}
      <section className="py-16 md:py-24">
        <Container size="md">
          <ScrollReveal>
            <SectionHeader
              title={whyAlternativesFail.title}
              subtitle="Understanding the limitations"
              centered
            />
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-neutral-600">
              <p>{whyAlternativesFail.content}</p>
            </div>

            {whyAlternativesFail.subsections && whyAlternativesFail.subsections.length > 0 && (
              <div className="mt-12 space-y-8">
                {whyAlternativesFail.subsections.map((subsection, index) => {
                  // Check if content is a bullet list (starts with •)
                  const isBulletList = subsection.content.trim().startsWith('•')

                  if (isBulletList) {
                    const bullets = subsection.content
                      .split('•')
                      .map(b => b.trim())
                      .filter(b => b.length > 0)

                    return (
                      <ScrollReveal key={index} delay={index * 0.1}>
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                            {subsection.title}
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {bullets.map((bullet, bIndex) => (
                              <div
                                key={bIndex}
                                className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4"
                              >
                                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                                <span className="text-neutral-600">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    )
                  }

                  return (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900">
                          {subsection.title}
                        </h3>
                        <div className="mt-3 space-y-4 leading-relaxed text-neutral-600">
                          {subsection.content.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            )}
          </ScrollReveal>
        </Container>
      </section>

      {/* Ideal For Section */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16 md:py-24">
        <Container size="md">
          <ScrollReveal>
            <div className="text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-full p-4" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#6366F1' }}>
                <Users className="h-8 w-8" />
              </div>
              <SectionHeader
                title="Who This Is For"
                subtitle="This service is perfect for"
                centered
              />
            </div>
            <ul className="mt-8 space-y-4">
              {idealFor.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <li className="flex items-start gap-3 text-lg">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: '#6366F1' }} />
                    <span className="text-neutral-600">{item}</span>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
