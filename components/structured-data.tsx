export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clarity Digital',
    url: 'https://claritydigital.dev',
    logo: 'https://claritydigital.dev/og-image.png',
    description: 'Custom web development and SaaS solutions for startups and small businesses.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lexington',
      addressRegion: 'KY',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'tanner@claritydigital.dev',
      contactType: 'customer service',
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Clarity Digital',
    url: 'https://claritydigital.dev',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: ['Web Development', 'SaaS Development', 'Web Design'],
    provider: {
      '@type': 'Organization',
      name: 'Clarity Digital',
      url: 'https://claritydigital.dev',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    description: 'Custom web development, SaaS platform creation, and web design services for startups and small businesses.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Clarity Digital',
    url: 'https://claritydigital.dev',
    email: 'tanner@claritydigital.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lexington',
      addressRegion: 'KY',
      addressCountry: 'US',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function CaseStudySchema({
  title,
  description,
  image,
  url,
  datePublished
}: {
  title: string
  description: string
  image?: string
  url: string
  datePublished?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    url: url,
    datePublished: datePublished,
    author: {
      '@type': 'Organization',
      name: 'Clarity Digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Clarity Digital',
      url: 'https://claritydigital.dev',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
