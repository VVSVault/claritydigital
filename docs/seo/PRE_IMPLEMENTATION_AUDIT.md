# SEO Pre-Implementation Audit

## Date: January 14, 2026

## File Structure

### Pages in /app directory:
- `app/(site)/page.tsx` - Homepage (NO metadata export)
- `app/(site)/about/page.tsx` - About (HAS metadata)
- `app/(site)/contact/page.tsx` - Contact (HAS metadata)
- `app/(site)/work/page.tsx` - Work/Portfolio (HAS metadata)
- `app/(site)/work/[slug]/page.tsx` - Case Studies (HAS generateMetadata)
- `app/(site)/services/page.tsx` - Services (HAS metadata)
- `app/(site)/services/web-design/page.tsx` - Web Design Service (HAS metadata)
- `app/(site)/services/web-development/page.tsx` - Web Development Service (HAS metadata)
- `app/(site)/services/saas-creation/page.tsx` - SaaS Creation Service (HAS metadata)
- `app/(site)/services/seo/page.tsx` - SEO Service (HAS metadata)
- `app/(site)/process/page.tsx` - Process (HAS metadata)
- `app/(site)/industries/page.tsx` - Industries (HAS metadata)
- `app/(site)/industries/real-estate/page.tsx` - Real Estate Industry (HAS metadata)
- `app/(site)/industries/wellness/page.tsx` - Wellness Industry (HAS metadata)
- `app/(site)/industries/photography/page.tsx` - Photography Industry (HAS metadata)
- `app/(site)/industries/jewelry/page.tsx` - Jewelry Industry (HAS metadata)
- `app/(site)/industries/storefronts/page.tsx` - Storefronts Industry (HAS metadata)

## Current Metadata

### Root Layout (`app/layout.tsx`):
- Title: Uses `siteConfig.name` ("Clarity Digital")
- Template: `%s | ${siteConfig.name}`
- Description: Uses `siteConfig.description`
- metadataBase: `https://claritydigital.dev`
- OpenGraph: Configured with images
- Twitter: summary_large_image
- Robots: index: true, follow: true

### Homepage (`app/(site)/page.tsx`):
- **NO page-specific metadata** - Falls back to layout defaults
- Missing: canonical URL, specific title/description

## Current Heading Structure

### Homepage:
- H1: "Your website should be your best salesperson." (via TextReveal component)
- Located in: `components/sections/hero.tsx` (line 83-90)
- **Issue:** H1 is marketing copy, not SEO-optimized

## Identified Issues

1. **Homepage missing page-specific metadata** - No canonical URL, generic title
2. **Homepage H1 not SEO-optimized** - "Your website should be your best salesperson" doesn't target keywords
3. **Placeholder social links in footer** - Links to github.com, linkedin.com, twitter.com (not real profiles)
4. **Missing structured data** - No Organization, LocalBusiness, or Service schema
5. **Missing enhanced robots configuration** - No googleBot specific settings
6. **Missing keywords meta tag** - Could help with relevancy signals
7. **Missing formatDetection** - Phone/email auto-detection not disabled

## Existing Positive Elements

- sitemap.ts exists and includes all pages + dynamic projects
- robots.ts exists with proper configuration
- html lang="en" attribute present
- OG image configured
- Most pages have metadata exports
- Case studies use generateMetadata() for dynamic titles
