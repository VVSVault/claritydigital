# Clarity Digital v2.0/v3.0/v4.0 - Quick Reference

## v4 Design System (Latest)

**Status:** Active migration from v2 to v4 color system
**Philosophy:** Dark-first luxury aesthetic with accent-driven interactions

**What's New in v4:**
- Tailwind utilities now map to CSS custom properties
- Use `bg-surface`, `text-primary`, `border-border`, `accent` classes
- Avoid legacy `brand-*` and `neutral-*` colors
- All new components use v4 tokens

**Updated Components:**
- ✅ Tailwind Config - v4 design tokens
- ✅ Button - Glow effects, 5 variants
- ✅ Forms (Input, Textarea, Select) - Dark-optimized
- ✅ Logo - Accent gradient
- ✅ Header - Surface/backdrop blur
- ✅ Nav - Accent links, surface hover
- 🔄 Mobile Nav, Cards, Services - In progress

## Color Tokens

```css
/* Backgrounds */
bg-background       /* #0A0A0B - Page bg */
bg-surface          /* #141416 - Cards */
bg-surface-elevated /* #1C1C1F - Hover */

/* Text */
text-text-primary   /* #FAFAFA - Headlines */
text-text-secondary /* #A1A1AA - Body */
text-text-tertiary  /* #71717A - Captions */

/* Borders */
border-border       /* #27272A - Default */
border-border-subtle/* #1F1F22 - Subtle */

/* Accent */
text-accent         /* #6366F1 - Links */
bg-accent           /* #6366F1 - Buttons */
```

## Utility Classes

```css
/* Gradients */
.text-gradient      /* Accent gradient text */
.bg-gradient-accent /* Accent gradient bg */

/* Effects */
.glow               /* Box shadow glow */
.glow-text          /* Text shadow glow */
.glass              /* Frosted glass effect */
.grain              /* Film grain overlay */

/* Animations */
.animate-fade-in
.animate-fade-in-up
.animate-float
.animate-pulse-glow
.animate-marquee
.pause-on-hover
```

## Components Cheatsheet

### Buttons

**Standard Button (v4 Updated)**
```tsx
import { Button } from '@/components/ui/button'

// Primary - Accent with glow
<Button variant="primary" size="lg">Primary Action</Button>

// Secondary - Surface with accent border
<Button variant="secondary">Secondary</Button>

// Outline - Transparent with border
<Button variant="outline">Outline</Button>

// Ghost - Minimal style
<Button variant="ghost">Ghost</Button>

// Link - Text only
<Button variant="link">Link</Button>
```

**Magnetic Button**
```tsx
<MagneticButton variant="primary" size="lg">
  Primary Action
</MagneticButton>

<MagneticButton variant="outline" size="md">
  Secondary
</MagneticButton>
```

### Forms (v4 Updated)

```tsx
import { Input, Textarea, Select } from '@/components/ui'

// Input with error state
<Input
  placeholder="Enter email"
  error={hasError}
/>

// Textarea
<Textarea
  placeholder="Your message"
  rows={4}
/>

// Select
<Select>
  <option>Choose option</option>
  <option value="1">Option 1</option>
</Select>
```

**All form components feature:**
- Dark-optimized backgrounds (`bg-surface`)
- Accent focus states
- Smooth transitions
- Consistent error styling

### Text Animations
```tsx
// Word reveal
<TextReveal text="Hello World" type="word" />

// Fade up
<FadeUp delay={0.3}>
  <p>Content</p>
</FadeUp>
```

### Links
```tsx
<AnimatedLink href="/about" variant="underline">
  About
</AnimatedLink>

<AnimatedLink href="/work" variant="arrow">
  View Work →
</AnimatedLink>
```

## Hooks

```tsx
// Responsive
const isMobile = useIsMobile()
const isDesktop = useIsDesktop()

// Scroll
const progress = useScrollProgress()  // 0-1
const scrolled = useScrolledPast(100) // boolean

// Intersection
const { ref, isInView } = useInView({ once: true })

// Motion preference
const reducedMotion = usePrefersReducedMotion()

// Counter (v4) - animated counting with mobile optimization
const { count, formattedCount, ref } = useCounter({
  to: 100,
  duration: 2000,
  skipOnMobile: true,
})

// Should reduce animations (v4)
const shouldReduce = useShouldReduceAnimations() // true if mobile OR reduced motion
```

## Project Data Model (v3)

```typescript
// Service Types (required field)
'Web Design' | 'Web Development' | 'SaaS Platform' | 'E-Commerce' | 'SEO'

// Project display hierarchy
serviceType: prominent (accent badge)
industry: subtle (muted text below title)
```

### Work Page Filters
```tsx
// Filter tabs on /work page
All | Web Design | Development | SaaS | E-Commerce
```

## v4 Components

### Counter
```tsx
import { Counter } from '@/components/ui/counter'

<Counter to={94} suffix="%" duration={2000} />
```

### Impact Stats
```tsx
import { ImpactStats } from '@/components/sections/impact-stats'

<ImpactStats />
```

### Stats Strip
```tsx
import { StatsStrip } from '@/components/sections/stats-strip'

<StatsStrip />              // Standalone section
<StatsStrip variant="inline" />  // Inline in other components
```

## Homepage Section Order (v4)

1. Hero
2. Stats Strip
3. Selected Work (BentoGrid)
4. Services
5. **Impact Stats** (NEW)
6. Process
7. Testimonials
8. Mega CTA

## File Locations

| Component | Path |
|-----------|------|
| MagneticButton | `components/ui/magnetic-button.tsx` |
| TextReveal | `components/ui/text-reveal.tsx` |
| Counter | `components/ui/counter.tsx` |
| FloatingNav | `components/layout/floating-nav.tsx` |
| BrowserMockup | `components/effects/browser-mockup.tsx` |
| GradientOrb | `components/effects/gradient-orb.tsx` |
| ImpactStats | `components/sections/impact-stats.tsx` |
| StatsStrip | `components/sections/stats-strip.tsx` |
| ProjectGrid | `components/work/project-grid.tsx` |
| ProjectCard | `components/work/project-card.tsx` |
| Hooks | `lib/hooks/` |
| Animation Variants | `lib/constants/animations.ts` |
| Providers | `components/providers/` |
| Colors/Theme | `app/globals.css` |
| Site Config | `lib/constants/site.ts` |
| Sanity Schemas | `lib/sanity/schemas/` |
| Tanner Photo | `public/tanner.jpg` |
| Contact Validation | `lib/validations/contact.ts` |
| Contact Form | `components/sections/contact-form.tsx` |
| Contact API | `app/api/contact/route.ts` |

## Scripts

```bash
# Development
npm run dev              # Start dev server (default port 3000)
npm run dev -- -p 3002   # Start on custom port

# Build & Deploy
npm run build            # Production build
npm run start            # Start production server

# Content Management
npm run upload-projects      # Upload projects to Sanity CMS
npm run update-descriptions  # Update project descriptions

# Code Quality
npm run lint             # Run ESLint
```

## Portfolio Projects

9 projects with landing page + dashboard screenshots:

| Project | Type | Industry |
|---------|------|----------|
| Bluegrass Precision Motorwerks | Web Design | Automotive |
| FlipOps | SaaS Platform | Real Estate |
| Sold By You | Web Development | Real Estate |
| Pink Post Installations | SaaS Platform | Real Estate Services |
| Recovery Plus | SaaS Platform | Wellness |
| Lim & Carlson | E-Commerce | Luxury Retail |
| Kentucky Gentlemen Cigars | E-Commerce | Tobacco Retail |
| CAID | SaaS Platform | AI Technology |
| Infinet | SaaS Platform | AI Technology |

Assets location: `public/projects/`

**Note:** Service types and industries were corrected in latest update. See V2-CHANGELOG.md for details.

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
RESEND_API_KEY=xxx
CONTACT_EMAIL=tanner@claritydigital.dev

# Optional
NEXT_PUBLIC_SITE_URL=https://claritydigital.dev
NEXT_PUBLIC_CAL_LINK=claritydigital
CAL_API_KEY=xxx
```

## Contact Form Fields

**Section 1: About You**
- fullName, email, phone (optional), companyName, role, industry

**Section 2: About Your Project**
- projectType, hasExistingWebsite, currentWebsiteUrl (conditional), projectDrivers (multi-select), timeline, budget

**Section 3: Tell Me More**
- projectDescription (min 50 chars), additionalNotes (optional), referralSource (optional)

**Data Flow:**
```
Form Submit → POST /api/contact → Zod validation → Resend emails (2)
                                                  ├→ Notification to Tanner
                                                  └→ Confirmation to lead
```

## CSS Variables

```css
/* Timing */
var(--duration-fast)    /* 250ms */
var(--duration-normal)  /* 400ms */
var(--duration-slow)    /* 600ms */

/* Easing */
var(--ease-out-expo)    /* Smooth decel */
var(--ease-bounce)      /* Playful */

/* Typography */
var(--font-display)     /* Satoshi */
var(--font-body)        /* Inter */
var(--font-size-display-xl) /* clamp(3rem, 8vw, 6rem) */
```
