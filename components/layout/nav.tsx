'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { mainNavigation } from '@/lib/constants/navigation'

export function Nav() {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {mainNavigation.map((item) => {
        const isActive =
          pathname === item.href ||
          pathname.startsWith(item.href + '/')

        if (item.children) {
          return (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.title)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={cn(
                  'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-elevated',
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary'
                )}
              >
                {item.title}
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === item.title && (
                <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-surface p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block rounded-md px-4 py-2 text-sm transition-colors hover:bg-surface-elevated',
                        pathname === child.href
                          ? 'text-accent'
                          : 'text-text-secondary'
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-elevated',
              isActive
                ? 'text-accent'
                : 'text-text-secondary'
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
