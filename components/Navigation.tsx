'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, Menu as MenuIcon, X } from 'lucide-react'

import { LogoMarkMinimal } from '@/components/ui/LogoMark'
import MobileBottomNav from './MobileBottomNav'

import { cn } from '@/lib/utils'

type NavItem = {
  name: string
  href: string
  isAnchor?: boolean
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
  {
    name: 'Research',
    href: '/research',
    subItems: [
      { name: 'Research Hub', href: '/research' },
      { name: 'Source Browser', href: '/research/sources' },
      { name: 'Methodology', href: '/research/methodology' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
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
    <>
      <nav
        className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#030712]/90 backdrop-blur-2xl"
        aria-label="Main navigation"
      >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 rounded-xl p-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 hover:bg-white/5"
            aria-label="FrankX.AI - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-violet-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-white/10">
              <LogoMarkMinimal size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">FrankX.AI</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.subItems ? (
                <Menu as="div" className="relative" key={item.name}>
                  <Menu.Button
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
                      'min-h-[40px] flex items-center relative group',
                      isActivePath(item.href, item.isAnchor)
                        ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-white/5 rounded-xl bg-[#0a0a0f] border border-white/10 shadow-lg shadow-black/50 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {item.subItems.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            {({ active }: { active: boolean }) => (
                              <Link
                                href={subItem.href}
                                className={cn(
                                  'group flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-colors',
                                  active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
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
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50',
                    'min-h-[40px] flex items-center relative group',
                    isActivePath(item.href, item.isAnchor)
                      ? 'text-white bg-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
                >
                  {item.name}
                  {isActivePath(item.href, item.isAnchor) && (
                    <div className="absolute -bottom-[1px] left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full" />
                  )}
                </Link>
              )
            )}

            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/10">
              <Link
                href="/free-playbook"
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Free Playbooks
              </Link>
              <Link
                href="/start"
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-all duration-300 border border-white/10"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-3">
            <Link
              href="/free-playbook"
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-sm font-semibold rounded-full transition-all duration-300"
            >
              Free
            </Link>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 min-h-[44px] min-w-[44px] transition-colors duration-300"
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
            'lg:hidden transition-all duration-300 ease-in-out overflow-hidden',
            isOpen ? 'max-h-[540px] opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
          )}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col space-y-1 rounded-2xl border border-white/10 bg-[#0a0a0f] px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                  'min-h-[48px] flex items-center',
                  'active:bg-white/20 active:scale-[0.98]',
                  isActivePath(item.href, item.isAnchor)
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActivePath(item.href, item.isAnchor) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/free-playbook"
              className="mt-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 text-center transition-all active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
            >
              Get Free Playbooks
            </Link>
            <Link
              href="/products"
              className="mt-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 border border-white/10 text-center transition-all active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Bottom Navigation */}
    <MobileBottomNav />
  </>
  )
}
