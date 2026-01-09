'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { ProjectCard } from './project-card'
import type { Project } from '@/types'

interface ProjectGridProps {
  projects: Project[]
}

const SERVICE_TYPES = [
  { value: 'all', label: 'All' },
  { value: 'Web Design', label: 'Web Design' },
  { value: 'Web Development', label: 'Development' },
  { value: 'SaaS Platform', label: 'SaaS' },
  { value: 'E-Commerce', label: 'E-Commerce' },
]

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter((project) => project.serviceType === selectedFilter)

  // If no projects, show placeholder
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center">
        <p className="text-text-secondary">
          No projects yet. Add projects through the Sanity CMS.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={cn(
                'aspect-[4/3] rounded-2xl',
                'border border-border-subtle bg-surface-elevated'
              )}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap gap-2">
        {SERVICE_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedFilter(type.value)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
              selectedFilter === type.value
                ? 'bg-accent text-white'
                : 'border border-border bg-surface text-text-secondary hover:border-border-hover hover:text-text-primary'
            )}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results */}
      {filteredProjects.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-text-secondary">
            No projects match this filter.
          </p>
          <button
            onClick={() => setSelectedFilter('all')}
            className="mt-4 text-accent hover:text-accent-hover transition-colors"
          >
            View all projects
          </button>
        </div>
      )}
    </div>
  )
}
