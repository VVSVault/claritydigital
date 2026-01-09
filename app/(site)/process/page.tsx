import type { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { CtaBlock } from '@/components/sections/cta-block'
import { MessageSquare, Search, Palette, Code, Rocket, HeartHandshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Process',
  description: 'Our proven process for delivering exceptional web design and development projects.',
}

const processSteps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We start with a conversation to understand your business, goals, target audience, and vision. This helps me determine if we\'re a good fit and how I can best help you.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Research & Strategy',
    description: 'I dive deep into your industry, competitors, and target market. This research informs the strategy and ensures we\'re building something that truly resonates.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Using insights from research, I create wireframes and designs that balance aesthetics with functionality. You\'ll review and provide feedback at every stage.',
    icon: Palette,
  },
  {
    number: '04',
    title: 'Development',
    description: 'Clean, efficient code brings the design to life. I build with performance and scalability in mind, ensuring your site works flawlessly across all devices.',
    icon: Code,
  },
  {
    number: '05',
    title: 'Launch',
    description: 'After thorough testing and your final approval, we launch. I handle all the technical details to ensure a smooth transition and optimal performance.',
    icon: Rocket,
  },
  {
    number: '06',
    title: 'Support',
    description: 'The relationship doesn\'t end at launch. I provide ongoing support, updates, and optimization to ensure your digital presence continues to deliver results.',
    icon: HeartHandshake,
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display-md font-bold tracking-tight text-neutral-900 md:text-display-lg">
              How We Work Together
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              A collaborative, transparent process designed to deliver exceptional results
              while keeping you informed and involved every step of the way.
            </p>
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16 md:py-24">
        <Container>
          <div className="space-y-12 md:space-y-24">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={step.number}
                  className={`flex flex-col items-center gap-8 md:flex-row ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-brand-500">
                        {step.number}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-neutral-900 md:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video rounded-2xl bg-neutral-200" />
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <CtaBlock />
    </>
  )
}
