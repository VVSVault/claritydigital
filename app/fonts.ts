import { Inter } from 'next/font/google'

// Inter - Body font (from Google Fonts via next/font)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Satoshi will be loaded via Fontshare CDN in the layout
// For self-hosting later, use localFont from 'next/font/local'

// Font CSS variable classes to apply to html element
export const fontVariables = `${inter.variable}`
