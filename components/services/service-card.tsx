import Link from 'next/link'
import { ArrowRight, Palette, Code, Rocket, Search } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { Service } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  code: Code,
  rocket: Rocket,
  search: Search,
}

interface ServiceCardProps {
  service: Service
  variant?: 'default' | 'detailed'
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const Icon = iconMap[service.icon || 'code'] || Code
  const href = `/services/${service.slug.current}`

  if (variant === 'detailed') {
    return (
      <Link href={href}>
        <Card className="group h-full transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10">
          <CardHeader>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Icon className="h-7 w-7" />
            </div>
            <CardTitle className="flex items-center gap-2 text-xl text-text-primary">
              {service.title}
              <ArrowRight className="h-5 w-5 text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </CardTitle>
            {service.tagline && (
              <p className="text-sm font-medium text-accent">
                {service.tagline}
              </p>
            )}
            <CardDescription className="mt-2">
              {service.description}
            </CardDescription>
          </CardHeader>
          {service.deliverables && service.deliverables.length > 0 && (
            <CardContent>
              <h4 className="mb-3 text-sm font-medium text-text-primary">
                What&apos;s Included:
              </h4>
              <ul className="space-y-2">
                {service.deliverables.slice(0, 4).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      </Link>
    )
  }

  return (
    <Link href={href}>
      <Card className="group h-full transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10">
        <CardHeader>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="flex items-center gap-2 text-lg text-text-primary">
            {service.title}
            <ArrowRight className="h-4 w-4 text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
