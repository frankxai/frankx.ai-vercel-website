'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Music', href: '/music-lab' },
  { name: 'Learning', href: '/students' },
  { name: 'Prompts', href: '/prompt-library' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Navigation2025() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - minimal */}
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors font-medium"
            >
              <span className="sr-only">FrankX.AI Home</span>
              <svg
                viewBox="0 0 32 32"
                className="w-8 h-8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="28"
                  height="28"
                  rx="8"
                  className="fill-white/10 stroke-white/20"
                  strokeWidth="1"
                />
                <path
                  d="M10 22V10h8M10 16h6"
                  className="stroke-white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                    isActive(item.href)
                      ? 'text-white bg-white/10'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/start"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Explore →
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#0a0a0f] border-l border-white/5"
            >
              <div className="p-6 pt-20">
                <div className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block px-4 py-3 text-lg font-medium rounded-xl transition-all',
                          isActive(item.href)
                            ? 'text-white bg-white/10'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/5"
                >
                  <Link
                    href="/start"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-white text-black rounded-full font-semibold"
                  >
                    Explore the System
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
