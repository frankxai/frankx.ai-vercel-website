'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = {
  name: string
  href: string
  subItems?: NavItem[]
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'AI Architecture',
    href: '/ai-architecture',
    subItems: [
      { name: 'Architecture Hub', href: '/ai-architecture' },
      { name: 'Blueprints', href: '/ai-architecture/blueprints' },
      { name: 'Prototypes (BYOK)', href: '/ai-architecture/prototypes' },
      { name: 'Templates', href: '/ai-architecture/templates' },
      { name: 'Tools', href: '/ai-architecture/tools' },
    ],
  },
  {
    name: 'For Creators',
    href: '/products/vibe-os',
    subItems: [
      { name: 'Vibe OS (AI Music)', href: '/products/vibe-os' },
      { name: 'Prompt Library', href: '/prompt-library' },
      { name: 'Music Lab', href: '/music-lab' },
      { name: 'Templates', href: '/templates' },
      { name: 'Creation Chronicles', href: '/creation-chronicles' },
    ],
  },
  {
    name: 'For Students',
    href: '/students',
    subItems: [
      { name: 'Student Hub', href: '/students' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'Courses', href: '/courses' },
      { name: 'Guides', href: '/guides' },
      { name: 'AI Assessment', href: '/ai-assessment' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    subItems: [
      { name: "The Creator's Soulbook", href: '/soulbook' },
      { name: 'Member Vault', href: '/vault' },
      { name: 'Live Labs', href: '/labs' },
      { name: 'Weekly Drops', href: '/drops' },
      { name: 'Skill Builder', href: '/skills' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'All Resources', href: '/resources' },
      { name: 'Prompt Library', href: '/prompt-library' },
      { name: 'Templates', href: '/templates' },
      { name: 'Guides', href: '/guides' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    name: 'Products',
    href: '/products',
    subItems: [
      { name: 'All Products', href: '/products' },
      { name: 'Vibe OS', href: '/products/vibe-os' },
      { name: 'Creative AI Toolkit', href: '/products/creative-ai-toolkit' },
      { name: 'Generative Creator OS', href: '/products/generative-creator-os' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

type MobileFullMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileFullMenu({ isOpen, onClose }: MobileFullMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemName)) {
        next.delete(itemName)
      } else {
        next.add(itemName)
      }
      return next
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel - Slide up from bottom */}
      <div
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Full navigation menu"
      >
        {/* Menu Container */}
        <div className="relative max-h-[85vh] flex flex-col bg-[#030712]/98 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl shadow-2xl shadow-black/50">
          {/* Top glow accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-lg font-display font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Navigation
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              aria-label="Close menu"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 safe-area-bottom">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isExpanded = expandedItems.has(item.name)
                const isActive = isActivePath(item.href)
                const hasSubItems = item.subItems && item.subItems.length > 0

                return (
                  <div key={item.name} className="space-y-1">
                    {/* Main Item */}
                    {hasSubItems ? (
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200',
                          'min-h-[52px]',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
                          isActive
                            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        )}
                        type="button"
                        aria-expanded={isExpanded}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-slate-500 transition-transform duration-200',
                            isExpanded && 'rotate-180'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200',
                          'min-h-[52px]',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
                          isActive
                            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* Sub Items - Accordion */}
                    {hasSubItems && (
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300 ease-in-out',
                          isExpanded ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'
                        )}
                      >
                        <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-emerald-500/20 ml-4">
                          {item.subItems!.map((subItem) => {
                            const isSubActive = isActivePath(subItem.href)
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                  'min-h-[44px]',
                                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
                                  isSubActive
                                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                )}
                                aria-current={isSubActive ? 'page' : undefined}
                              >
                                <ChevronRight
                                  className={cn(
                                    'w-4 h-4 transition-colors',
                                    isSubActive ? 'text-emerald-400' : 'text-slate-600'
                                  )}
                                  aria-hidden="true"
                                />
                                {subItem.name}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              <Link
                href="/free-playbook"
                onClick={onClose}
                className="block w-full px-6 py-4 rounded-xl text-center text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                Get Free Playbooks
              </Link>
              <Link
                href="/products"
                onClick={onClose}
                className="block w-full px-6 py-4 rounded-xl text-center text-base font-medium text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-[0.98]"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
