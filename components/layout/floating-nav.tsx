'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { mainNavigation } from '@/lib/constants/navigation'
import { useScrolledPast, useIsMobile } from '@/lib/hooks'

/**
 * Floating navigation that morphs on scroll
 * - Starts full-width and transparent
 * - Becomes a centered pill shape when scrolled
 */
export function FloatingNav() {
  const pathname = usePathname()
  const isScrolled = useScrolledPast(100)
  const isMobile = useIsMobile()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'px-4 md:px-6',
          'transition-all duration-500 ease-out-expo'
        )}
      >
        <nav
          className={cn(
            'mx-auto flex items-center justify-between',
            'rounded-full border',
            'transition-all duration-500 ease-out-expo'
          )}
          style={{
            marginTop: isScrolled ? '16px' : '0px',
            maxWidth: isScrolled ? '48rem' : '80rem',
            padding: isScrolled ? '8px 16px' : '16px 0px',
            borderColor: isScrolled ? 'var(--color-border-subtle)' : 'transparent',
            backgroundColor: isScrolled ? 'rgba(20, 20, 22, 0.4)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
            boxShadow: isScrolled
              ? '0 2px 8px rgba(0, 0, 0, 0.04)'
              : 'none',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 font-display font-bold tracking-tight',
              'transition-all duration-300',
              isScrolled ? 'text-lg' : 'text-xl'
            )}
          >
            <span className="text-gradient">Clarity</span>
            <span className="text-text-primary">Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {mainNavigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-4 py-2',
                    'text-sm font-medium',
                    'transition-colors duration-200',
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform duration-200',
                        openDropdown === item.href && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {openDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          'absolute left-0 top-full pt-2',
                          'min-w-[200px]'
                        )}
                      >
                        <div
                          className={cn(
                            'rounded-xl border border-border-subtle',
                            'bg-surface/95 backdrop-blur-xl',
                            'p-2 shadow-xl'
                          )}
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block rounded-lg px-4 py-2.5',
                                'text-sm font-medium',
                                'transition-colors duration-200',
                                pathname === child.href
                                  ? 'bg-accent/10 text-accent'
                                  : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
                              )}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <MagneticButton
              variant="primary"
              size={isScrolled ? 'sm' : 'md'}
              onClick={() => (window.location.href = '/contact')}
            >
              Start a Project
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full md:hidden',
              'text-text-primary',
              'transition-colors duration-200',
              'hover:bg-surface-elevated'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8 px-6"
            >
              {mainNavigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className="text-center"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'block font-display text-3xl font-bold',
                      'transition-colors duration-200',
                      pathname === item.href
                        ? 'text-gradient'
                        : 'text-text-secondary hover:text-text-primary'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>

                  {/* Mobile submenu */}
                  {item.children && (
                    <div className="mt-3 flex flex-wrap justify-center gap-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'rounded-full border border-border px-4 py-1.5',
                            'text-sm font-medium',
                            'transition-colors duration-200',
                            pathname === child.href
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'text-text-tertiary hover:border-border-hover hover:text-text-secondary'
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-4"
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    window.location.href = '/contact'
                  }}
                >
                  Start a Project
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
