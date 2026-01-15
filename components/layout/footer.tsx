'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { AnimatedLink } from '@/components/ui/animated-link'
import { footerNavigation } from '@/lib/constants/navigation'
import { siteConfig } from '@/lib/constants/site'
import { useInView } from '@/lib/hooks'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { ref, isInView } = useInView<HTMLElement>({ once: true, threshold: 0.1 })

  return (
    <footer
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        'border-t border-border-subtle',
        'bg-surface'
      )}
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, var(--color-accent-glow) 0%, transparent 50%)',
        }}
      />

      <Container className="relative">
        {/* Main footer content */}
        <div className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight"
              >
                <span className="text-gradient">Clarity</span>
                <span className="text-text-primary">Digital</span>
              </Link>

              <p className="mt-4 max-w-xs text-text-secondary">
                Web design, development & SaaS for startups and established brands.
              </p>

              <p className="mt-4 text-sm text-text-tertiary">
                {siteConfig.location}
              </p>

              {/* Email link */}
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(
                  'mt-4 inline-flex items-center gap-2',
                  'text-text-secondary hover:text-accent',
                  'transition-colors duration-300'
                )}
              >
                <span>{siteConfig.email}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerNavigation.navigation.map((item) => (
                  <li key={item.href}>
                    <AnimatedLink href={item.href} variant="underline">
                      {item.title}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                Services
              </h4>
              <ul className="space-y-3">
                {footerNavigation.services.map((item) => (
                  <li key={item.href}>
                    <AnimatedLink href={item.href} variant="underline">
                      {item.title}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect - only shown when social links are configured */}
            {footerNavigation.connect.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                  Connect
                </h4>
                <ul className="space-y-3">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'group inline-flex items-center gap-1.5',
                          'text-text-secondary hover:text-accent',
                          'transition-colors duration-300'
                        )}
                      >
                        {item.title}
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-subtle py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-text-tertiary">
              &copy; {currentYear} Clarity Digital Services &bull; {siteConfig.location}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
