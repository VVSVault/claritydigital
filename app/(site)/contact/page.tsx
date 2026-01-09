import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { ContactForm } from '@/components/sections/contact-form'
import { Mail, MapPin, Calendar, Clock, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/constants/site'

export const metadata: Metadata = {
  title: 'Contact | Clarity Digital',
  description: 'Start a project with Clarity Digital. Tell me about your business and what you are looking to build.',
}

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-text-primary">
              Start a Project
            </h1>
            <div className="mt-4 h-1 w-16 bg-gradient-to-r from-accent to-purple-500" />
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">
              Tell me about your business and what you are looking to build. I review
              every submission personally and will get back to you within 24 hours.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prefer to Talk First */}
              <div className="rounded-2xl border border-border-subtle bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-primary">
                  Prefer to Talk First?
                </h2>
                <p className="mt-3 text-sm text-text-secondary">
                  Book a quick 15-minute call to discuss your project before filling out the form.
                </p>
                <Link
                  href="https://cal.com/claritydigital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule a Call
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              {/* Direct Contact */}
              <div className="rounded-2xl border border-border-subtle bg-surface p-6">
                <h2 className="text-lg font-semibold text-text-primary">
                  Direct Contact
                </h2>

                <div className="mt-4 space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-accent">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Email</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-text-secondary hover:text-accent transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-accent">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Location</p>
                      <p className="text-sm text-text-secondary">
                        {siteConfig.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="rounded-2xl border border-border-subtle bg-surface p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-accent">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Response Time</p>
                    <p className="mt-1 text-sm text-text-secondary">
                      I personally review every inquiry. Expect a response within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
