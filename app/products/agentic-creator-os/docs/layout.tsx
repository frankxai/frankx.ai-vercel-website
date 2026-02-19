'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Zap,
  Users,
  GitBranch,
  Puzzle,
  ChevronRight,
  Home,
  ArrowLeft
} from 'lucide-react'

/**
 * Agentic Creator OS Documentation Layout
 *
 * FrankX Design System: Tech-themed (emerald/cyan)
 * SEO: Breadcrumbs, semantic HTML, internal linking
 */

const docsNavigation = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    icon: Zap,
    description: 'Installation and quick start'
  },
  {
    title: 'Skills Guide',
    slug: 'skills',
    icon: BookOpen,
    description: 'Understanding the skill system'
  },
  {
    title: 'Agents Guide',
    slug: 'agents',
    icon: Users,
    description: 'Multi-agent architecture'
  },
  {
    title: 'Workflows',
    slug: 'workflows',
    icon: GitBranch,
    description: 'Orchestrated pipelines'
  },
  {
    title: 'MCP Integration',
    slug: 'mcp',
    icon: Puzzle,
    description: 'External tool connections'
  }
]

export default function DocsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentSlug = pathname.split('/').pop()

  return (
    <div className="min-h-screen bg-void">
      {/* Aurora background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tech-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/products/agentic-creator-os"
                className="text-slate-400 hover:text-tech-primary transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Agentic Creator OS
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <li>
              <Link
                href="/products/agentic-creator-os/docs"
                className={`transition-colors ${
                  pathname === '/products/agentic-creator-os/docs'
                    ? 'text-tech-primary'
                    : 'text-slate-400 hover:text-tech-primary'
                }`}
              >
                Documentation
              </Link>
            </li>
            {currentSlug && currentSlug !== 'docs' && (
              <>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <li className="text-white font-medium capitalize">
                  {docsNavigation.find(n => n.slug === currentSlug)?.title || currentSlug}
                </li>
              </>
            )}
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <nav className="space-y-1">
                {/* Docs Home */}
                <Link
                  href="/products/agentic-creator-os/docs"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-250
                    ${pathname === '/products/agentic-creator-os/docs'
                      ? 'bg-tech-primary/20 text-tech-primary border border-tech-primary/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                    }
                  `}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Overview</span>
                </Link>

                {/* Section Divider */}
                <div className="pt-4 pb-2">
                  <span className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Guides
                  </span>
                </div>

                {/* Navigation Items */}
                {docsNavigation.map((item) => {
                  const isActive = currentSlug === item.slug
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.slug}
                      href={`/products/agentic-creator-os/docs/${item.slug}`}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-250
                        ${isActive
                          ? 'bg-tech-primary/20 text-tech-primary border border-tech-primary/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <span className="font-medium block">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.description}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 p-4 rounded-xl bg-space/80 backdrop-blur-xl border border-white/10">
                <h4 className="font-semibold text-white mb-3">Resources</h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://github.com/frankxai/agentic-creator-os"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-400 hover:text-tech-primary transition-colors"
                  >
                    GitHub Repository
                  </a>
                  <a
                    href="https://github.com/frankxai/agentic-creator-os/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-slate-400 hover:text-tech-primary transition-colors"
                  >
                    Report an Issue
                  </a>
                  <Link
                    href="/products/agentic-creator-os"
                    className="block text-slate-400 hover:text-tech-primary transition-colors"
                  >
                    Product Page
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
