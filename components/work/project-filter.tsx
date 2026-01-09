'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import type { Industry, Service } from '@/types'

interface ProjectFilterProps {
  industries: Industry[]
  services: Service[]
  selectedIndustry: string | null
  selectedService: string | null
  onIndustryChange: (slug: string | null) => void
  onServiceChange: (slug: string | null) => void
  onClear: () => void
}

export function ProjectFilter({
  industries,
  services,
  selectedIndustry,
  selectedService,
  onIndustryChange,
  onServiceChange,
  onClear,
}: ProjectFilterProps) {
  const hasFilters = selectedIndustry || selectedService

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Filter by:
      </span>

      {/* Industry filters */}
      <div className="flex flex-wrap gap-2">
        {industries.map((industry) => (
          <button
            key={industry._id}
            onClick={() =>
              onIndustryChange(
                selectedIndustry === industry.slug.current
                  ? null
                  : industry.slug.current
              )
            }
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              selectedIndustry === industry.slug.current
                ? 'bg-brand-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
            )}
          >
            {industry.title}
          </button>
        ))}
      </div>

      {/* Divider */}
      {industries.length > 0 && services.length > 0 && (
        <span className="text-neutral-300 dark:text-neutral-700">|</span>
      )}

      {/* Service filters */}
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() =>
              onServiceChange(
                selectedService === service.slug.current
                  ? null
                  : service.slug.current
              )
            }
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              selectedService === service.slug.current
                ? 'bg-brand-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
            )}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Clear button */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="gap-1 text-neutral-500"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
