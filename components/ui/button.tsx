import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
          {
            // Primary - Accent gradient with glow effect
            'bg-accent text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]': variant === 'primary',
            // Secondary - Surface with accent border
            'border border-accent/30 bg-surface-elevated text-text-primary hover:border-accent/50 hover:bg-surface-hover': variant === 'secondary',
            // Outline - Transparent with accent border
            'border-2 border-border bg-transparent text-text-primary hover:border-accent hover:bg-surface/50': variant === 'outline',
            // Ghost - Minimal hover effect
            'text-text-secondary hover:bg-surface-elevated hover:text-text-primary': variant === 'ghost',
            // Link - Text only with accent color
            'text-accent underline-offset-4 hover:text-accent-hover hover:underline': variant === 'link',
          },
          {
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
