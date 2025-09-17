'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

type NavItem = {
  name: string
  href: string
  isAnchor?: boolean
}

const navItems: NavItem[] = [
  { name: 'Hub', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Updates', href: '/#updates', isAnchor: true },
  { name: 'Resources', href: '/#resources', isAnchor: true },
  { name: 'Projects', href: '/#projects', isAnchor: true },
  { name: 'Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
  { name: 'Music Lab', href: '/music-lab' },
  { name: 'Search', href: '/search' },
  { name: 'Assessment', href: '/soul-frequency-assessment' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActivePath = (href: string, isAnchor?: boolean) => {
    if (isAnchor) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-lg p-1 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 hover:scale-[1.015]"
            aria-label="Frank - Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-sky-500 flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.45)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">Frank</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActivePath(item.href, item.isAnchor)
                    ? 'bg-white/10 text-white shadow-[0_10px_40px_rgba(59,130,246,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                )}
                aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/soul-frequency-quiz"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.25)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              Free Quiz
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label={`${isOpen ? 'Close' : 'Open'} navigation menu`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
            isOpen ? 'max-h-[540px] opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
          )}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  isActivePath(item.href, item.isAnchor)
                    ? 'bg-white/15 text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/soul-frequency-quiz"
              className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 text-center text-sm font-semibold text-white shadow-[0_20px_40px_rgba(56,189,248,0.25)]"
              onClick={() => setIsOpen(false)}
            >
              Free Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
