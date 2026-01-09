# Clarity Digital Services

Premium portfolio website for Clarity Digital Services — A Kentucky-based web development agency specializing in conversion-focused design, modern development, SaaS creation, and SEO.

**Live Site:** [claritydigital.dev](https://claritydigital.dev)

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 14.2.x |
| Language | TypeScript | 5.5+ |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion + GSAP | 11.x / 3.x |
| Smooth Scroll | Lenis | Latest |
| CMS | Sanity | 3.x |
| Email | Resend + React Email | Latest |
| Forms | React Hook Form + Zod | Latest |
| Analytics | Vercel Analytics | Latest |
| Hosting | Vercel | Edge |

## Features

### v4.0 (Current)
- ✨ **Impact Stats Section** - Animated counters with industry statistics
- 📱 **Mobile Optimizations** - Reduced animations, instant counters, no backdrop-filter
- 🎭 **Animation System** - Centralized variants with mobile-aware performance
- 📊 **Stats Strip** - Standalone stats component with animated counters
- 🎨 **Counter Component** - Reusable animated number counter with easing

### v3.0
- 🎯 **Research-Driven Positioning** - Generalized development approach
- 🏷️ **Service Type Filters** - Portfolio filtered by service, not industry
- 📋 **Updated Navigation** - No industries section
- 💼 **Project Data Model** - serviceType (prominent), industry (subtle)

### Core Features
- 🌙 **Dark-First Design** - Premium aesthetic with deep blacks and subtle gradients
- ✨ **Intentional Motion** - Every animation serves a purpose
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** - 95+ Lighthouse score target
- 🎨 **Component Library** - Reusable, animated UI components
- 📝 **Headless CMS** - Content managed via Sanity Studio
- 🔍 **SEO Ready** - Optimized meta tags and structured data

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Sanity account (for CMS)
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/clarity-digital.git
cd clarity-digital

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables

Create `.env.local` with:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
SANITY_REVALIDATE_SECRET=your-secret

# Resend (Email)
RESEND_API_KEY=your-api-key
CONTACT_EMAIL=your@email.com

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Cal.com (Optional)
NEXT_PUBLIC_CAL_LINK=your-username/discovery
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000

# Start on custom port
npm run dev -- -p 3002
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
clarity-digital/
├── app/                    # Next.js app directory
│   ├── (site)/            # Main site routes
│   │   ├── page.tsx       # Homepage
│   │   ├── work/          # Portfolio pages
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── services/      # Services page
│   ├── studio/            # Sanity Studio
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── sections/         # Page sections
│   ├── layout/           # Layout components
│   └── work/             # Portfolio components
├── lib/                   # Utilities
│   ├── hooks/            # Custom React hooks
│   ├── sanity/           # Sanity client & schemas
│   └── constants/        # Constants & configs
├── public/               # Static assets
│   └── projects/         # Portfolio images
├── scripts/              # Automation scripts
└── docs/                 # Documentation
```

## Portfolio Management

### Upload Projects

Bulk upload portfolio projects to Sanity:

```bash
npm run upload-projects
```

### Update Project Descriptions

Update existing projects with improved content:

```bash
npm run update-descriptions
```

See [scripts/README.md](scripts/README.md) for full documentation.

### Current Projects

- **Bluegrass Precision Motorwerks** - Web Design | Automotive
- **FlipOps** - SaaS Platform | Real Estate
- **Sold By You** - Web Development | Real Estate
- **Infinet** - SaaS Platform | AI Technology
- **Lim & Carlson** - E-Commerce | Luxury Retail
- **Kentucky Gentlemen Cigars** - E-Commerce | Tobacco Retail
- **CAID** - SaaS Platform | AI Technology

## Documentation

- [V2-CHANGELOG.md](docs/V2-CHANGELOG.md) - Complete version history
- [QUICK-REFERENCE.md](docs/QUICK-REFERENCE.md) - Component cheatsheet
- [scripts/README.md](scripts/README.md) - Upload script documentation

## Component Showcase

### Animated Counter (v4)

```tsx
import { Counter } from '@/components/ui/counter'

<Counter to={94} suffix="%" duration={2000} />
```

### Impact Stats Section (v4)

```tsx
import { ImpactStats } from '@/components/sections/impact-stats'

<ImpactStats />
```

### Magnetic Button

```tsx
import { MagneticButton } from '@/components/ui/magnetic-button'

<MagneticButton variant="primary" size="lg">
  Start a Project
</MagneticButton>
```

### Text Reveal

```tsx
import { TextReveal } from '@/components/ui/text-reveal'

<TextReveal text="Your headline" type="word" />
```

## Performance

Target metrics:
- **Lighthouse:** 95+
- **FCP:** < 1.2s
- **LCP:** < 2.0s
- **CLS:** < 0.1

Mobile optimizations:
- Instant counter values (no animation)
- No backdrop-filter (solid backgrounds)
- Reduced Framer Motion animations
- Hidden grid pattern overlays

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Add all variables from `.env.local` to your Vercel project settings.

## License

© 2026 VVS Vault LLC. All rights reserved.

## Contact

**Tanner** | Clarity Digital Services
Email: tanner@claritydigital.dev
Website: [claritydigital.dev](https://claritydigital.dev)
