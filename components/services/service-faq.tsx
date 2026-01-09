'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { SectionHeader } from '@/components/shared/section-header'
import { ScrollReveal } from '@/components/shared/scroll-reveal'

interface FAQ {
  question: string
  answer: string
}

interface ServiceFaqProps {
  faqs: FAQ[]
}

export function ServiceFaq({ faqs }: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 md:py-24">
      <Container size="md">
        <ScrollReveal>
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions about this service"
            centered
          />
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="rounded-xl border border-neutral-200 bg-white">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-neutral-50"
                >
                  <span className="font-medium text-neutral-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-300',
                      openIndex === index && 'rotate-180 text-brand-500'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-neutral-200 p-6 pt-4">
                        <p className="text-neutral-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
