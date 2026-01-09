'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { Nav } from './nav'
import { MobileNav } from './mobile-nav'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-border-subtle bg-surface/80 backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Logo />

          <Nav />

          <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex">
              <Link href="/contact">Start a Project</Link>
            </Button>

            <MobileNav />
          </div>
        </div>
      </Container>
    </motion.header>
  )
}
