'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { urlFor } from '@/lib/sanity/client'
import type { Project, SanitySlug } from '@/types'

interface ProjectCardProps {
  project: Project
}

function getSlugString(slug: SanitySlug | string): string {
  if (typeof slug === 'string') return slug
  return slug.current
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = `/work/${getSlugString(project.slug)}`

  return (
    <Link href={href}>
      <motion.article
        className={cn(
          'group relative overflow-hidden rounded-2xl',
          'border border-border-subtle bg-surface',
          'transition-all duration-500',
          'hover:border-border-hover'
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-elevated">
          {project.featuredImage ? (
            <Image
              src={urlFor(project.featuredImage).width(600).height(450).url()}
              alt={project.featuredImage.alt || project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-text-tertiary">No image</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              'bg-gradient-to-t from-background via-background/50 to-transparent',
              'opacity-60 group-hover:opacity-80'
            )}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          {/* Service Type badge (prominent) */}
          {project.serviceType && (
            <span
              className={cn(
                'mb-2 inline-flex self-start rounded-full',
                'border border-accent/30 bg-accent/10 backdrop-blur-sm',
                'px-2.5 py-1 text-xs font-medium text-accent'
              )}
            >
              {project.serviceType}
            </span>
          )}

          {/* Title */}
          <h3
            className={cn(
              'font-display text-lg font-bold text-text-primary',
              'transition-transform duration-300 group-hover:translate-x-1'
            )}
          >
            {project.title}
          </h3>

          {/* Industry (subtle) */}
          {project.industry && (
            <p className="mt-0.5 text-xs text-text-tertiary">
              {project.industry}
            </p>
          )}

          {/* View Project link (appears on hover) */}
          <div
            className={cn(
              'mt-3 flex items-center gap-1.5',
              'text-accent opacity-0 transition-all duration-300',
              'group-hover:opacity-100 group-hover:translate-x-1'
            )}
          >
            <span className="text-xs font-medium">View Project</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </motion.article>
    </Link>
  )
}
