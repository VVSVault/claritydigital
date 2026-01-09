import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        {
          'border border-accent/30 bg-accent/10 text-accent':
            variant === 'default',
          'bg-surface-elevated text-text-secondary':
            variant === 'secondary',
          'border border-border text-text-secondary':
            variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
