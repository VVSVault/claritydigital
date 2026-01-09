'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { usePrefersReducedMotion } from '@/lib/hooks'

interface BrowserMockupProps {
  className?: string
}

// Timeline constants (in ms)
const TIMELINE = {
  TOTAL_DURATION: 9000,
  FADE_IN_END: 500,        // Fade in during first 500ms
  IDLE_END: 1000,          // Then idle until 1000ms
  CURSOR_TO_CTA_END: 1700,
  BUTTON_HOVER_END: 1900,
  BUTTON_CLICK_END: 2100,
  MODAL_IN_END: 2500,
  CURSOR_TO_ADDRESS_END: 3000,
  ADDRESS_FOCUS_END: 3200,
  TYPE_ADDRESS_END: 4500,
  CURSOR_TO_EMAIL_END: 4800,
  EMAIL_FOCUS_END: 5000,
  TYPE_EMAIL_END: 6000,
  CURSOR_TO_SUBMIT_END: 6300,
  SUBMIT_HOVER_END: 6500,
  SUBMIT_CLICK_END: 6700,
  LOADING_END: 7100,
  NOTIFICATION_IN_END: 7500,
  SUCCESS_HOLD_END: 8500,  // 1 second after notification
  FADE_OUT_START: 8500,    // Start fade out
}

// Text to type
const ADDRESS_TEXT = '123 Maple Street'
const EMAIL_TEXT = 'john@email.com'

// Browser dimensions
const BROWSER_WIDTH = 480
const BROWSER_HEIGHT = 400
const CHROME_HEIGHT = 48

// Approximate character width for cursor positioning
const CHAR_WIDTH = 7.2

// Cursor positions (relative to content area, adjusted for modal position)
const CURSOR_POSITIONS = {
  // Start below the CTA button, then move up to it
  REST: { x: BROWSER_WIDTH / 2 + 40, y: 320 },
  CTA_BUTTON: { x: BROWSER_WIDTH / 2 + 40, y: 220 },
  // Positions at the END of the full text strings, centered vertically in input box
  ADDRESS_INPUT: { x: 125 + ADDRESS_TEXT.length * CHAR_WIDTH, y: 139 },
  EMAIL_INPUT: { x: 130 + EMAIL_TEXT.length * CHAR_WIDTH, y: 218 },
  SUBMIT_BUTTON: { x: BROWSER_WIDTH / 2, y: 305 },
}

/**
 * Animated browser mockup demonstrating lead generation
 * Shows a real estate website converting visitors to leads
 */
export function BrowserMockup({ className }: BrowserMockupProps) {
  const [time, setTime] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setTime((t) => (t + 16) % TIMELINE.TOTAL_DURATION)
    }, 16)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Derive animation states from time
  const showModal = time >= TIMELINE.BUTTON_CLICK_END && time < TIMELINE.FADE_OUT_START
  const showNotification = time >= TIMELINE.NOTIFICATION_IN_END && time < TIMELINE.FADE_OUT_START

  const isCtaHovered = time >= TIMELINE.CURSOR_TO_CTA_END && time < TIMELINE.BUTTON_CLICK_END
  const isCtaClicked = time >= TIMELINE.BUTTON_HOVER_END && time < TIMELINE.MODAL_IN_END

  const isAddressFocused = time >= TIMELINE.ADDRESS_FOCUS_END && time < TIMELINE.CURSOR_TO_EMAIL_END
  const isEmailFocused = time >= TIMELINE.EMAIL_FOCUS_END && time < TIMELINE.CURSOR_TO_SUBMIT_END

  const isSubmitHovered = time >= TIMELINE.CURSOR_TO_SUBMIT_END && time < TIMELINE.SUBMIT_CLICK_END
  const isSubmitClicked = time >= TIMELINE.SUBMIT_HOVER_END && time < TIMELINE.LOADING_END
  const isLoading = time >= TIMELINE.SUBMIT_CLICK_END && time < TIMELINE.NOTIFICATION_IN_END

  // Determine if cursor should be text cursor (I-beam)
  const isOverTextInput =
    (time >= TIMELINE.CURSOR_TO_ADDRESS_END && time < TIMELINE.CURSOR_TO_EMAIL_END) ||
    (time >= TIMELINE.CURSOR_TO_EMAIL_END && time < TIMELINE.CURSOR_TO_SUBMIT_END)

  // Calculate typed text
  const getTypedText = (text: string, startTime: number, endTime: number): string => {
    if (time < startTime) return ''
    if (time >= endTime) return text
    const progress = (time - startTime) / (endTime - startTime)
    const charCount = Math.floor(progress * text.length)
    return text.slice(0, charCount)
  }

  const addressValue = getTypedText(ADDRESS_TEXT, TIMELINE.ADDRESS_FOCUS_END, TIMELINE.TYPE_ADDRESS_END)
  const emailValue = getTypedText(EMAIL_TEXT, TIMELINE.EMAIL_FOCUS_END, TIMELINE.TYPE_EMAIL_END)

  // Calculate cursor position based on timeline
  const getCursorPosition = () => {
    // During fade in and idle - stay at rest
    if (time < TIMELINE.IDLE_END) {
      return CURSOR_POSITIONS.REST
    }

    // Moving to CTA button
    if (time < TIMELINE.CURSOR_TO_CTA_END) {
      const progress = (time - TIMELINE.IDLE_END) / (TIMELINE.CURSOR_TO_CTA_END - TIMELINE.IDLE_END)
      return interpolatePosition(CURSOR_POSITIONS.REST, CURSOR_POSITIONS.CTA_BUTTON, progress)
    }

    // Hovering/clicking CTA, waiting for modal
    if (time < TIMELINE.MODAL_IN_END) {
      return CURSOR_POSITIONS.CTA_BUTTON
    }

    // Moving to address input
    if (time < TIMELINE.CURSOR_TO_ADDRESS_END) {
      const progress = (time - TIMELINE.MODAL_IN_END) / (TIMELINE.CURSOR_TO_ADDRESS_END - TIMELINE.MODAL_IN_END)
      return interpolatePosition(CURSOR_POSITIONS.CTA_BUTTON, CURSOR_POSITIONS.ADDRESS_INPUT, progress)
    }

    // At address input - stationary at end of text position
    if (time < TIMELINE.TYPE_ADDRESS_END) {
      return CURSOR_POSITIONS.ADDRESS_INPUT
    }

    // Moving to email input
    if (time < TIMELINE.CURSOR_TO_EMAIL_END) {
      const progress = (time - TIMELINE.TYPE_ADDRESS_END) / (TIMELINE.CURSOR_TO_EMAIL_END - TIMELINE.TYPE_ADDRESS_END)
      return interpolatePosition(CURSOR_POSITIONS.ADDRESS_INPUT, CURSOR_POSITIONS.EMAIL_INPUT, progress)
    }

    // At email input - stationary at end of text position
    if (time < TIMELINE.TYPE_EMAIL_END) {
      return CURSOR_POSITIONS.EMAIL_INPUT
    }

    // Moving to submit button
    if (time < TIMELINE.CURSOR_TO_SUBMIT_END) {
      const progress = (time - TIMELINE.TYPE_EMAIL_END) / (TIMELINE.CURSOR_TO_SUBMIT_END - TIMELINE.TYPE_EMAIL_END)
      return interpolatePosition(CURSOR_POSITIONS.EMAIL_INPUT, CURSOR_POSITIONS.SUBMIT_BUTTON, progress)
    }

    // Stay at submit button for everything after (hover, click, loading, notification, fade out)
    // This ensures cursor doesn't move during the fade out period
    return CURSOR_POSITIONS.SUBMIT_BUTTON
  }

  const cursorPos = getCursorPosition()

  // Smooth fade in at start, fade out at end for seamless loop
  const getFadeOpacity = () => {
    // Fade in during first 500ms
    if (time < TIMELINE.FADE_IN_END) {
      return time / TIMELINE.FADE_IN_END
    }
    // Fade out during last 500ms
    if (time >= TIMELINE.FADE_OUT_START) {
      const fadeOutDuration = TIMELINE.TOTAL_DURATION - TIMELINE.FADE_OUT_START
      const fadeProgress = (time - TIMELINE.FADE_OUT_START) / fadeOutDuration
      return 1 - fadeProgress
    }
    // Full opacity in between
    return 1
  }
  const fadeOpacity = getFadeOpacity()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Reduced motion: show static state
  if (prefersReducedMotion) {
    return (
      <div className={cn('relative', className)} aria-hidden="true">
        <StaticBrowserMockup />
      </div>
    )
  }

  return (
    <motion.div
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <motion.div
          className="relative"
          style={{ opacity: fadeOpacity }}
        >
          {/* Browser Frame */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{
              width: BROWSER_WIDTH,
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}
          >
            {/* Browser Chrome */}
            <div
              className="flex items-center gap-4 px-4"
              style={{
                height: CHROME_HEIGHT,
                background: '#FAFAFA',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {/* Traffic Lights */}
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="h-3 w-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
              </div>

              {/* URL Bar */}
              <div className="flex-1 text-center">
                <span
                  className="font-mono text-[13px]"
                  style={{ color: '#71717A' }}
                >
                  premierhomes.com
                </span>
              </div>

              {/* Spacer for symmetry */}
              <div className="w-[52px]" />
            </div>

            {/* Content Area */}
            <div
              className="relative"
              style={{
                height: BROWSER_HEIGHT,
                background: '#FFFFFF',
                padding: '24px',
              }}
            >
              {/* Landing Page Content */}
              <div className="text-center">
                {/* Headline */}
                <h3
                  className="text-[26px] font-semibold leading-tight"
                  style={{ color: '#171717' }}
                >
                  Find Your Dream Home
                </h3>

                {/* Subheadline */}
                <h3
                  className="text-[26px] font-semibold leading-tight"
                  style={{ color: '#6366F1' }}
                >
                  in Lexington, KY
                </h3>

                {/* Description */}
                <p
                  className="mx-auto mt-4 max-w-[320px] text-[15px] leading-relaxed"
                  style={{ color: '#71717A' }}
                >
                  Browse 200+ listings or get a free home valuation today.
                </p>

                {/* CTA Button */}
                <motion.button
                  className="mt-8 rounded-lg px-8 py-3.5 text-[15px] font-medium text-white"
                  style={{
                    background: isCtaHovered ? '#4F46E5' : '#6366F1',
                  }}
                  animate={{
                    scale: isCtaClicked ? 0.97 : isCtaHovered ? 1.03 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  What's My Home Worth?
                </motion.button>
              </div>

              {/* Modal */}
              <AnimatePresence>
                {showModal && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ padding: '24px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'rgba(0,0,0,0.15)' }}
                    />

                    {/* Modal Content */}
                    <motion.div
                      className="relative z-10 w-[320px] rounded-xl p-6"
                      style={{
                        background: '#FFFFFF',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      }}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Modal Header */}
                      <h4
                        className="text-xl font-semibold"
                        style={{ color: '#171717' }}
                      >
                        Get Your Home Value
                      </h4>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: '#71717A' }}
                      >
                        Instant estimate in 30 seconds
                      </p>

                      {/* Address Input */}
                      <div className="mt-5">
                        <div
                          className="flex items-center rounded-lg px-4 py-3 text-[15px]"
                          style={{
                            background: '#F9FAFB',
                            border: isAddressFocused
                              ? '2px solid #6366F1'
                              : '1px solid #E5E7EB',
                            color: addressValue ? '#171717' : '#9CA3AF',
                            boxShadow: isAddressFocused
                              ? '0 0 0 3px rgba(99, 102, 241, 0.15)'
                              : 'none',
                            minHeight: '48px',
                          }}
                        >
                          <span>{addressValue || 'Property address...'}</span>
                          {isAddressFocused && (
                            <motion.span
                              className="ml-0.5 inline-block w-0.5 bg-[#171717]"
                              style={{ height: '18px' }}
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.53, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p
                          className="mt-1.5 text-xs"
                          style={{ color: '#9CA3AF' }}
                        >
                          Property Address
                        </p>
                      </div>

                      {/* Email Input */}
                      <div className="mt-4">
                        <div
                          className="flex items-center rounded-lg px-4 py-3 text-[15px]"
                          style={{
                            background: '#F9FAFB',
                            border: isEmailFocused
                              ? '2px solid #6366F1'
                              : '1px solid #E5E7EB',
                            color: emailValue ? '#171717' : '#9CA3AF',
                            boxShadow: isEmailFocused
                              ? '0 0 0 3px rgba(99, 102, 241, 0.15)'
                              : 'none',
                            minHeight: '48px',
                          }}
                        >
                          <span>{emailValue || 'Email address...'}</span>
                          {isEmailFocused && (
                            <motion.span
                              className="ml-0.5 inline-block w-0.5 bg-[#171717]"
                              style={{ height: '18px' }}
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.53, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <p
                          className="mt-1.5 text-xs"
                          style={{ color: '#9CA3AF' }}
                        >
                          Email Address
                        </p>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        className="mt-5 w-full rounded-lg py-3.5 text-[15px] font-medium text-white"
                        style={{
                          background: isSubmitHovered ? '#4F46E5' : '#6366F1',
                        }}
                        animate={{
                          scale: isSubmitClicked ? 0.97 : isSubmitHovered ? 1.02 : 1,
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                            />
                            Sending...
                          </span>
                        ) : (
                          'Get My Estimate'
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Cursor - hidden during fade transitions */}
              <motion.div
                className="pointer-events-none absolute z-[100]"
                style={{ left: 0, top: 0, opacity: fadeOpacity }}
                animate={{
                  x: cursorPos.x,
                  y: cursorPos.y,
                  scale: isCtaClicked || isSubmitClicked ? 0.85 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 22,
                  mass: 0.8,
                }}
              >
                {isOverTextInput ? (
                  // Text cursor (I-beam) for input fields - simple capital I shape
                  <svg
                    width="16"
                    height="24"
                    viewBox="0 0 16 24"
                    fill="none"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}
                  >
                    {/* Top serif */}
                    <rect x="3" y="3" width="10" height="2" rx="1" fill="#171717" stroke="#FFFFFF" strokeWidth="1" />
                    {/* Vertical line */}
                    <rect x="7" y="3" width="2" height="18" rx="0.5" fill="#171717" stroke="#FFFFFF" strokeWidth="1" />
                    {/* Bottom serif */}
                    <rect x="3" y="19" width="10" height="2" rx="1" fill="#171717" stroke="#FFFFFF" strokeWidth="1" />
                  </svg>
                ) : (
                  // Pointer cursor for buttons
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                  >
                    <path
                      d="M5.5 3.21V16.79c0 .45.54.67.85.35l3.52-3.52 2.59 5.53c.2.43.71.62 1.14.42l1.62-.76c.43-.2.62-.71.42-1.14l-2.59-5.53h4.95c.45 0 .67-.54.35-.85L5.5 3.21z"
                      fill="#171717"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </motion.div>
            </div>
          </div>

          {/* Notification Toast - Outside browser, higher z-index */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                className="absolute flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  right: -20,
                  top: 100,
                  background: '#FFFFFF',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  borderLeft: '4px solid #22C55E',
                  zIndex: 200,
                }}
                initial={{ opacity: 0, x: 60, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.9 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {/* Check Icon */}
                <motion.div
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: '#22C55E' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: '#171717' }}
                  >
                    New Lead!
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: '#9CA3AF' }}
                  >
                    Just now
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Helper function to interpolate between positions with easing
function interpolatePosition(
  from: { x: number; y: number },
  to: { x: number; y: number },
  progress: number
): { x: number; y: number } {
  // Use cubic ease-out for smooth deceleration
  const eased = 1 - Math.pow(1 - progress, 3)
  return {
    x: from.x + (to.x - from.x) * eased,
    y: from.y + (to.y - from.y) * eased,
  }
}

// Static version for reduced motion
function StaticBrowserMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-xl"
      style={{
        width: BROWSER_WIDTH,
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
      }}
    >
      {/* Browser Chrome */}
      <div
        className="flex items-center gap-4 px-4"
        style={{
          height: CHROME_HEIGHT,
          background: '#FAFAFA',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="h-3 w-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <div className="h-3 w-3 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-[13px]" style={{ color: '#71717A' }}>
            premierhomes.com
          </span>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Content */}
      <div
        className="text-center"
        style={{
          height: BROWSER_HEIGHT,
          background: '#FFFFFF',
          padding: '24px',
        }}
      >
        <h3 className="text-[26px] font-semibold leading-tight" style={{ color: '#171717' }}>
          Find Your Dream Home
        </h3>
        <h3 className="text-[26px] font-semibold leading-tight" style={{ color: '#6366F1' }}>
          in Lexington, KY
        </h3>
        <p className="mx-auto mt-4 max-w-[320px] text-[15px] leading-relaxed" style={{ color: '#71717A' }}>
          Browse 200+ listings or get a free home valuation today.
        </p>
        <button
          className="mt-8 rounded-lg px-8 py-3.5 text-[15px] font-medium text-white"
          style={{ background: '#6366F1' }}
        >
          What's My Home Worth?
        </button>
      </div>
    </div>
  )
}
