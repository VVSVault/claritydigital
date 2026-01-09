import { Palette, Code, Rocket, Search } from 'lucide-react'
import { Container } from '@/components/ui/container'

const iconMap: Record<string, React.ElementType> = {
  palette: Palette,
  code: Code,
  rocket: Rocket,
  search: Search,
}

interface ServiceHeroProps {
  title: string
  tagline: string
  description: string
  icon: string
}

export function ServiceHero({ title, tagline, description, icon }: ServiceHeroProps) {
  const Icon = iconMap[icon] || Code

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full p-4" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#6366F1' }}>
            <Icon className="h-8 w-8" />
          </div>
          <h1 className="font-bold tracking-tight text-neutral-900" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
            {title}
          </h1>
          <p className="mt-4 text-lg font-medium" style={{ color: '#6366F1' }}>
            {tagline}
          </p>
          <p className="mt-6 text-lg text-neutral-600">
            {description}
          </p>
        </div>
      </Container>
    </section>
  )
}
