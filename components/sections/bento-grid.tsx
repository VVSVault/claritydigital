'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { FadeUp } from '@/components/ui/text-reveal'
import { urlFor } from '@/lib/sanity/client'
import type { Project } from '@/types'

interface BentoGridProps {
  title?: string
  subtitle?: string
  projects: Project[]
  showViewAll?: boolean
}

export function BentoGrid({
  title = 'Selected Work',
  subtitle = 'Projects that moved the needle',
  projects,
  showViewAll = true,
}: BentoGridProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Take first 5 projects for the scroll animation
  const gridProjects = projects.slice(0, 5)

  if (!gridProjects.length) {
    return <BentoGridPlaceholder title={title} subtitle={subtitle} />
  }

  return (
    <section ref={targetRef} style={{ height: `${gridProjects.length * 100}vh` }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-start justify-center pt-8 md:items-center md:pt-0">
          <Container>
            {/* Header */}
            <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>
              </div>

              {showViewAll && (
                <Link
                  href="/work"
                  className={cn(
                    'group inline-flex items-center gap-2',
                    'text-accent transition-colors hover:text-accent-hover'
                  )}
                >
                  <span>View All Projects</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>

            {/* Scrolling cards */}
            <div className="relative mx-auto h-[450px] max-w-5xl md:h-[600px]">
              {gridProjects.map((project, index) => (
                <ScrollCard
                  key={project._id}
                  project={project}
                  index={index}
                  totalCards={gridProjects.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {gridProjects.map((_, index) => (
                <motion.div
                  key={index}
                  className="h-1.5 w-12 rounded-full bg-border"
                  style={{
                    backgroundColor: useTransform(
                      scrollYProgress,
                      [
                        index / gridProjects.length,
                        (index + 0.5) / gridProjects.length,
                        (index + 1) / gridProjects.length,
                      ],
                      ['var(--color-border)', 'var(--color-accent)', 'var(--color-border)']
                    ),
                  }}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

interface ScrollCardProps {
  project: Project
  index: number
  totalCards: number
  scrollYProgress: any
}

function ScrollCard({ project, index, totalCards, scrollYProgress }: ScrollCardProps) {
  const cardProgress = useTransform(
    scrollYProgress,
    [
      (index - 1) / totalCards,
      index / totalCards,
      (index + 1) / totalCards,
    ],
    [1, 0, -1]
  )

  const opacity = useTransform(
    cardProgress,
    [-1, -0.5, 0, 0.5, 1],
    [0, 0.5, 1, 0.5, 0]
  )

  const scale = useTransform(
    cardProgress,
    [-1, 0, 1],
    [0.8, 1, 0.8]
  )

  const x = useTransform(
    cardProgress,
    [-1, 0, 1],
    ['-100%', '0%', '100%']  // Reversed: left to right
  )

  return (
    <motion.div
      style={{
        opacity,
        scale,
        x,
      }}
      className="absolute inset-0"
    >
      <Link href={`/work/${typeof project.slug === 'string' ? project.slug : project.slug?.current}`}>
        <motion.article
          className={cn(
            'group relative mx-auto h-full overflow-hidden rounded-3xl',
            'border-2 border-border-subtle bg-surface',
            'transition-all duration-500',
            'hover:border-accent hover:shadow-2xl hover:shadow-accent/10'
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Full-size Image */}
          <div className="relative h-full w-full overflow-hidden">
            {project.featuredImage && (
              <motion.div
                className="h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={urlFor(project.featuredImage).width(1400).height(800).url()}
                  alt={project.featuredImage.alt || project.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}

            {/* Gradient overlay - bottom only for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

            {/* Service Type badge - top left */}
            {project.serviceType && (
              <div className="absolute left-8 top-8">
                <span
                  className={cn(
                    'inline-flex rounded-full',
                    'border border-accent/30 bg-accent/10 backdrop-blur-md',
                    'px-4 py-2 text-sm font-medium text-accent'
                  )}
                >
                  {project.serviceType}
                </span>
              </div>
            )}

            {/* Hover arrow indicator - top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <ArrowUpRight className="h-6 w-6" />
            </motion.div>

            {/* Content Overlay - bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              {/* Industry */}
              {project.industry && (
                <p className="text-sm font-medium text-text-tertiary">
                  {project.industry}
                </p>
              )}

              {/* Title */}
              <h3 className="mt-2 font-display text-4xl font-bold leading-tight text-text-primary md:text-5xl">
                {project.title}
              </h3>

              {/* Excerpt */}
              {project.excerpt && (
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
                  {project.excerpt}
                </p>
              )}

              {/* View Project link */}
              <div className="mt-6 flex items-center gap-3 text-accent transition-colors group-hover:text-accent-hover">
                <span className="text-lg font-medium">View Project</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="h-5 w-5" />
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
    </motion.div>
  )
}

/**
 * Placeholder grid when no projects available
 */
function BentoGridPlaceholder({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <FadeUp>
          <div className="mb-12 md:mb-16">
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>
          </div>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl border border-border-subtle bg-surface-elevated"
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
