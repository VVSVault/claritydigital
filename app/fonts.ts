import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

// Inter - Body font (from Google Fonts via next/font)
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Satoshi - Display font (self-hosted for better performance)
export const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
})

// Font CSS variable classes to apply to html element
export const fontVariables = `${inter.variable} ${satoshi.variable}`
