import { cn } from '@/lib/utils/cn'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-brand-500">
          {subtitle}
        </p>
      )}
    </div>
  )
}
