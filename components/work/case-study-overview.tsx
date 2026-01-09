import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TechStackDisplay } from '@/components/shared/tech-stack-display'
import type { Industry, Service } from '@/types'

interface CaseStudyOverviewProps {
  client?: string
  industry?: string | Industry
  services?: Service[]
  techStack?: string[]
  projectUrl?: string
}

export function CaseStudyOverview({
  client,
  industry,
  services,
  techStack,
  projectUrl,
}: CaseStudyOverviewProps) {
  // Industry can be either a string or an object
  const industryDisplay = typeof industry === 'string' ? industry : industry?.title

  return (
    <div className="sticky top-24 space-y-8 rounded-2xl border border-border bg-surface p-6">
      {client && (
        <div>
          <h3 className="text-sm font-medium text-text-tertiary">
            Client
          </h3>
          <p className="mt-1 font-semibold text-text-primary">
            {client}
          </p>
        </div>
      )}

      {industryDisplay && (
        <div>
          <h3 className="text-sm font-medium text-text-tertiary">
            Industry
          </h3>
          <p className="mt-1">
            <Badge>{industryDisplay}</Badge>
          </p>
        </div>
      )}

      {services && services.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-tertiary">
            Services
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {services.map((service) => (
              <Badge key={service._id} variant="secondary">
                {service.title}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {techStack && techStack.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-tertiary">
            Tech Stack
          </h3>
          <div className="mt-2">
            <TechStackDisplay techStack={techStack} />
          </div>
        </div>
      )}

      {projectUrl && (
        <div>
          <Link
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
          >
            View Live Site
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
