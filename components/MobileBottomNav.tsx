'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, BookOpen, Music, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileFullMenu from './MobileFullMenu'

type BottomNavItem = {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  action?: 'menu'
}

const bottomNavItems: BottomNavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Learn', href: '/blog', icon: BookOpen },
  { name: 'Create', href: '/music-lab', icon: Music },
  { name: 'More', action: 'menu', icon: Menu },
]

export default function MobileBottomNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsMenuOpen(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActivePath = (href?: string) => {
    if (!href) return false
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleItemClick = (item: BottomNavItem) => {
    if (item.action === 'menu') {
      setIsMenuOpen((prev) => !prev)
    }
  }

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <nav
        className={cn(
          'lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300',
          isVisible ? 'translate-y-0' : 'translate-y-full'
        )}
        aria-label="Mobile bottom navigation"
      >
        {/* Glassmorphic Background with Border */}
        <div className="relative">
          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          {/* Main nav container */}
          <div className="bg-[#0a0a0b]/95 backdrop-blur-xl border-t border-white/10">
            <div className="safe-area-bottom px-4 pb-2 pt-1">
              <div className="flex items-center justify-around">
                {bottomNavItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isActivePath(item.href)
                  const isMenuActive = item.action === 'menu' && isMenuOpen

                  const content = (
                    <>
                      <div
                        className={cn(
                          'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300',
                          'min-w-[64px] min-h-[56px]',
                          'active:scale-95',
                          isActive || isMenuActive
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        )}
                      >
                        {/* Icon Container with Glow */}
                        <div className="relative">
                          <Icon
                            className={cn(
                              'w-6 h-6 transition-all duration-300',
                              isActive || isMenuActive
                                ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                : 'text-slate-400'
                            )}
                            aria-hidden="true"
                          />

                          {/* Active indicator dot */}
                          {(isActive || isMenuActive) && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={cn(
                            'text-xs font-medium transition-colors duration-300',
                            isActive || isMenuActive
                              ? 'text-white'
                              : 'text-slate-400'
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                    </>
                  )

                  if (item.action === 'menu') {
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleItemClick(item)}
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded-xl"
                        aria-label={`${isMenuOpen ? 'Close' : 'Open'} full menu`}
                        aria-expanded={isMenuOpen}
                        type="button"
                      >
                        {content}
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href!}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded-xl"
                      aria-label={item.name}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {content}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Menu Overlay */}
      <MobileFullMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
