'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { mainNavigation } from '@/lib/constants/navigation'
import { Button } from '@/components/ui/button'

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-elevated hover:text-text-primary"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full z-50 border-b border-border bg-surface/95 p-4 shadow-lg backdrop-blur-sm"
          >
            <nav className="flex flex-col gap-2">
              {mainNavigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/')

                if (item.children) {
                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left font-medium transition-colors hover:bg-surface-elevated',
                          isActive
                            ? 'text-accent'
                            : 'text-text-secondary'
                        )}
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform',
                            openSubmenu === item.title && 'rotate-180'
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  'block rounded-lg px-4 py-2 text-sm transition-colors hover:bg-surface-elevated',
                                  pathname === child.href
                                    ? 'text-accent'
                                    : 'text-text-secondary'
                                )}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'rounded-lg px-4 py-3 font-medium transition-colors hover:bg-surface-elevated',
                      isActive
                        ? 'text-accent'
                        : 'text-text-secondary'
                    )}
                  >
                    {item.title}
                  </Link>
                )
              })}
              <div className="mt-4 border-t border-border pt-4">
                <Button asChild className="w-full">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Start a Project
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
