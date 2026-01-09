import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://claritydigital.dev'

export function createMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title?: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const siteName = 'Clarity Digital'
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const defaultDescription = 'Web design, development & SaaS for real estate, wellness, and luxury brands. Based in Lexington, Kentucky.'

  return {
    title: fullTitle,
    description: description || defaultDescription,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: fullTitle,
      description: description || defaultDescription,
      url: `${siteUrl}${path}`,
      siteName,
      images: image ? [{ url: image }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
    },
  }
}
