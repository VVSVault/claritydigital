import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { fontVariables } from './fonts'
import { LenisProvider } from '@/components/providers'
import { siteConfig } from '@/lib/constants/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
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
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
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
