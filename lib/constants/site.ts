export const siteConfig = {
  name: 'Clarity Digital',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://claritydigital.dev',
  description: 'Web design, development & SaaS for startups and established brands. Based in Lexington, Kentucky.',
  owner: 'Tanner',
  company: 'VVS Vault LLC',
  location: 'Lexington, Kentucky',
  email: 'tanner@claritydigital.dev',
}

export const defaultHero = {
  headline: 'Your website should be your best salesperson.',
  subheadline: 'We make that happen.',
  primaryCta: {
    text: 'Start a Project',
    href: '/contact',
  },
  secondaryCta: {
    text: 'View My Work',
    href: '/work',
  },
}
