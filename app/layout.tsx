import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { fontVariables } from './fonts'
import { LenisProvider } from '@/components/providers'
import { siteConfig } from '@/lib/constants/site'
import { OrganizationSchema, WebsiteSchema, ServiceSchema, LocalBusinessSchema } from '@/components/structured-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Clarity Digital | Custom Web Development & SaaS Solutions',
    template: '%s | Clarity Digital',
  },
  description: 'Clarity Digital builds high-performance websites and custom SaaS platforms for startups and small businesses. Modern development with Next.js, React, and scalable architecture.',
  keywords: ['web development', 'saas development', 'custom software', 'startup website', 'small business web design', 'web development company usa', 'lexington web developer'],
  authors: [{ name: 'Clarity Digital' }],
  creator: 'Clarity Digital',
  publisher: 'Clarity Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Clarity Digital',
    title: 'Clarity Digital | Custom Web Development & SaaS Solutions',
    description: 'We build high-performance websites and custom SaaS platforms for startups and small businesses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Clarity Digital - Web Design & Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clarity Digital | Custom Web Development & SaaS Solutions',
    description: 'We build high-performance websites and custom SaaS platforms for startups and small businesses.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Google Analytics - delayed load for better performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EZC806Y56K"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EZC806Y56K');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <OrganizationSchema />
        <WebsiteSchema />
        <ServiceSchema />
        <LocalBusinessSchema />
        <LenisProvider>
          {/* Film grain overlay */}
          <div className="grain" />
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
