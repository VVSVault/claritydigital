'use client'

interface GrainProps {
  /** Opacity of the grain effect (0-1) */
  opacity?: number
  /** Whether the grain effect is enabled */
  enabled?: boolean
}

/**
 * Film grain overlay for premium visual texture
 * Uses SVG noise filter for performance
 */
export function Grain({ opacity = 0.02, enabled = true }: GrainProps) {
  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
