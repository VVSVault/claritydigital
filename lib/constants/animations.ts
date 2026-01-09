import type { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
}

export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// ============================================
// V4 ANIMATION SYSTEM
// ============================================

// Timing constants
export const timing = {
  micro: 150,      // Button states, toggles
  fast: 250,       // Dropdowns, tooltips
  normal: 400,     // Cards, reveals
  slow: 600,       // Page transitions, hero
  dramatic: 1000,  // Initial load sequence
}

// Easing curves
export const easing = {
  smooth: [0.16, 1, 0.3, 1],           // Smooth deceleration
  bounce: [0.34, 1.56, 0.64, 1],       // Playful overshoot
  sharp: [0.4, 0, 0.2, 1],             // Material-like
}

// Spring configs
export const springs = {
  gentle: { type: 'spring', stiffness: 200, damping: 20 },
  snappy: { type: 'spring', stiffness: 300, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 25 },
}

// Stagger timing
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
}

// ============================================
// SECTION HEADER ANIMATIONS
// ============================================

export const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
}

// ============================================
// GRID CONTAINER ANIMATIONS
// ============================================

export const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

// ============================================
// CARD ANIMATIONS
// ============================================

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
}

export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: easing.smooth },
  },
}

// ============================================
// STATS ANIMATIONS
// ============================================

export const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
}

export const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export const statNumberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 200,
    },
  },
}

// ============================================
// IMPACT STATS ANIMATIONS
// ============================================

export const impactSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

export const impactCategoryVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export const impactStatCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
}

// ============================================
// LINE/UNDERLINE ANIMATIONS
// ============================================

export const underlineDrawVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: easing.smooth,
    },
  },
}

export const verticalLineDrawVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: easing.smooth,
    },
  },
}

// ============================================
// PROCESS STEP ANIMATIONS
// ============================================

export const processContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

export const processStepVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
}

export const stepNumberVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}

// ============================================
// CTA ANIMATIONS
// ============================================

export const megaCTAVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
}

// ============================================
// MOBILE-OPTIMIZED VARIANTS
// These variants skip animations entirely
// ============================================

export const mobileStaticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

/**
 * Helper to get appropriate variants based on device/preference
 */
export function getVariants(
  normalVariants: Variants,
  shouldReduceAnimations: boolean
): Variants {
  return shouldReduceAnimations ? mobileStaticVariants : normalVariants
}
