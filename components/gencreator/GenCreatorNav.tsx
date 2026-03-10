'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/gencreator', label: 'Hub' },
  { href: '/gencreator/principles', label: 'Principles' },
  { href: '/gencreator/handbook', label: 'Handbook' },
  { href: '/gencreator/blueprints', label: 'Blueprints' },
  { href: '/gencreator/soul', label: 'Soul' },
  { href: '/gencreator/assess', label: 'Assess' },
  { href: '/gencreator/learn', label: 'Learn' },
  { href: '/gencreator/toolkit', label: 'Toolkit' },
  { href: '/gencreator/tracker', label: 'Tracker' },
  { href: '/gencreator/showcase', label: 'Showcase' },
  { href: '/gencreator/glossary', label: 'Glossary' },
  { href: '/gencreator/community', label: 'Community' },
  { href: '/gencreator/join', label: 'Join' },
  { href: '/gencreator/manifesto', label: 'Manifesto' },
]

export default function GenCreatorNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-white/[0.08] bg-white/[0.02]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
