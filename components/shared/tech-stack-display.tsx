import { Badge } from '@/components/ui/badge'

const techStackLabels: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  typescript: 'TypeScript',
  tailwind: 'Tailwind CSS',
  nodejs: 'Node.js',
  postgresql: 'PostgreSQL',
  supabase: 'Supabase',
  vercel: 'Vercel',
  sanity: 'Sanity',
  stripe: 'Stripe',
  openai: 'OpenAI',
  framer: 'Framer Motion',
}

interface TechStackDisplayProps {
  techStack: string[]
}

export function TechStackDisplay({ techStack }: TechStackDisplayProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => (
        <Badge key={tech} variant="secondary">
          {techStackLabels[tech] || tech}
        </Badge>
      ))}
    </div>
  )
}
