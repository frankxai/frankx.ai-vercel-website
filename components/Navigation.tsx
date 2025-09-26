'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, Menu as MenuIcon, X, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { gradientPresets } from '@/lib/design/gradients'

type NavItem = {
  name: string
  href: string
  isAnchor?: boolean
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Products',
    href: '/products',
    subItems: [
      { name: 'All Products', href: '/products' },
      { name: 'Vibe OS', href: '/products/vibe-os' },
      { name: 'Music Lab', href: '/music-lab' },
      { name: 'Agentic AI', href: '/agentic-ai-center' },
      { name: 'Intelligence Atlas', href: '/intelligence-atlas' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    subItems: [
      { name: 'Prompt Library', href: '/prompt-library' },
      { name: 'Blog', href: '/blog' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Affiliates', href: '/affiliates' },
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
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/90 backdrop-blur-2xl"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-xl p-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 hover:bg-white/5"
            aria-label="FrankX.AI - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">FrankX.AI</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.subItems ? (
                <Menu as="div" className="relative" key={item.name}>
                  <Menu.Button
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
                      'min-h-[40px] flex items-center relative group',
                      isActivePath(item.href, item.isAnchor)
                        ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1 text-slate-500 group-hover:text-white transition-colors" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-slate-800 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {item.subItems.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            {({ active }) => (
                              <Link
                                href={subItem.href}
                                className={cn(
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                  active ? 'bg-slate-800 text-white' : 'text-slate-400'
                                )}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
                    'min-h-[40px] flex items-center relative group',
                    isActivePath(item.href, item.isAnchor)
                      ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
                >
                  {item.name}
                  {isActivePath(item.href, item.isAnchor) && (
                    <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </Link>
              )
            )}

            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/10">
              <Link
                href="/products/vibe-os"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/products"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
              >
                Explore Products
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <Link
              href="/products"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300"
            >
              Products
            </Link>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 min-h-[44px] min-w-[44px] transition-colors duration-300"
              aria-label={`${isOpen ? 'Close' : 'Open'} navigation menu`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <MenuIcon className="w-5 h-5" aria-hidden="true" />}
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
                  'px-3 py-4 rounded-xl text-base font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  'focus:ring-2 focus:ring-primary-500/70 focus:ring-offset-2 focus:ring-offset-slate-900', // Enhanced focus
                  'min-h-[52px] flex items-center', // Better touch targets for mobile
                  'active:bg-white/20 active:scale-[0.98]', // Touch feedback
                  isActivePath(item.href, item.isAnchor)
                    ? 'bg-white/15 text-white'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
                aria-label={`Navigate to ${item.name} ${item.isAnchor ? 'section' : 'page'}`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/soul-frequency-quiz"
              className={cn(
                'mt-2 px-6 py-4 rounded-xl text-sm font-semibold text-white shadow-[0_12px_30px_rgba(12,27,68,0.25)]',
                'min-h-[52px] flex items-center justify-center', // Better touch targets
                'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-900',
                'active:scale-[0.96] transition-transform', // Touch feedback
                gradientPresets.buttonAurora
              )}
              onClick={() => setIsOpen(false)}
              aria-label="Take the free Soul Frequency Quiz"
            >
              Free Quiz
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
