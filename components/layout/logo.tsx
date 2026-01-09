import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-80',
        className
      )}
    >
      <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
        Clarity
      </span>
      <span className="text-text-primary">Digital</span>
    </Link>
  )
}
