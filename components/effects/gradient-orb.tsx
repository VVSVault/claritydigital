'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'
import { usePrefersReducedMotion } from '@/lib/hooks'

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'))

interface GradientOrbProps {
  className?: string
  /** Spline scene URL (optional - will use CSS fallback if not provided) */
  splineUrl?: string
  /** Show CSS fallback instead of Spline */
  useCssFallback?: boolean
}

/**
 * Loading skeleton for the 3D orb
 */
function OrbSkeleton() {
  return (
    <div className="relative h-full w-full animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-64 w-64 rounded-full opacity-50 blur-3xl md:h-96 md:w-96"
          style={{
            background:
              'radial-gradient(circle, var(--color-gradient-start) 0%, var(--color-gradient-mid) 50%, transparent 70%)',
          }}
        />
      </div>
    </div>
  )
}

/**
 * CSS-only animated gradient orb fallback
 * Used when Spline is not available or for reduced motion
 */
function CssGradientOrb({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-full w-full', className)}>
      {/* Main orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div
            className="absolute -inset-20 animate-pulse rounded-full opacity-30 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-mid) 0%, transparent 70%)',
              animationDuration: '4s',
            }}
          />

          {/* Middle layer */}
          <div
            className="absolute -inset-10 animate-float rounded-full opacity-50 blur-2xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-gradient-start) 0%, var(--color-gradient-mid) 50%, transparent 80%)',
            }}
          />

          {/* Core orb */}
          <div
            className="relative h-48 w-48 rounded-full md:h-72 md:w-72 lg:h-96 lg:w-96"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, var(--color-accent-hover) 0%, var(--color-gradient-start) 30%, var(--color-gradient-mid) 60%, var(--color-gradient-end) 100%)',
              boxShadow: `
                0 0 60px 20px var(--color-accent-glow),
                inset 0 0 60px 10px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Highlight */}
            <div
              className="absolute left-[15%] top-[15%] h-1/4 w-1/4 rounded-full opacity-60 blur-xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-2 w-2 animate-float rounded-full"
            style={{
              background: 'var(--color-accent)',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 3D Gradient Orb for hero section
 * Uses Spline for 3D rendering with CSS fallback
 */
export function GradientOrb({
  className,
  splineUrl,
  useCssFallback = false,
}: GradientOrbProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [useSpline, setUseSpline] = useState(false)

  useEffect(() => {
    // Only try to load Spline if:
    // 1. User doesn't prefer reduced motion
    // 2. We have a Spline URL
    // 3. We're not forcing CSS fallback
    setUseSpline(!prefersReducedMotion && !!splineUrl && !useCssFallback)
  }, [prefersReducedMotion, splineUrl, useCssFallback])

  // Always show CSS fallback for now (Spline URL not configured)
  // When you have a Spline scene, set the splineUrl prop
  if (!useSpline || !splineUrl) {
    return <CssGradientOrb className={className} />
  }

  return (
    <div className={cn('relative h-full w-full', className)}>
      <Suspense fallback={<OrbSkeleton />}>
        <Spline scene={splineUrl} />
      </Suspense>
    </div>
  )
}
