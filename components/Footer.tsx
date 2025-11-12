import Link from 'next/link'
import { Mail, Newspaper, Search, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-sky-500/10"
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 via-primary-600 to-sky-500 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.45)]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-lg font-semibold text-white">FrankX Intelligence Hub</span>
                <span className="block text-xs uppercase tracking-[0.3em] text-white/60">Creative AI Studio</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Architecting avant-garde intelligence systems that creators and collaborators trust. Every artifact here
              is built with future-proofed AI strategy, creative design, and musical imagination.
            </p>
            <div className="mt-6 flex space-x-4 text-slate-300">
              <Link
                href="/blog"
                className="rounded-lg border border-white/10 p-2 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Read the latest intelligence updates"
              >
                <Newspaper className="w-5 h-5" />
              </Link>
              <Link
                href="/search"
                className="rounded-lg border border-white/10 p-2 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Search the hub"
              >
                <Search className="w-5 h-5" />
              </Link>
              <a
                href="mailto:hello@frankx.ai?subject=Creative%20AI%20Collaboration"
                className="rounded-lg border border-white/10 p-2 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email FrankX"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/blog" className="hover:text-white transition-colors">Intelligence Journal</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Free Resources</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">2025 Roadmap</Link></li>
              <li><Link href="/assessment" className="hover:text-white transition-colors">Soul Frequency Assessment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/products/vibe-os" className="hover:text-white transition-colors">Vibe OS Music Sessions</Link></li>
              <li><Link href="/products/creative-ai-toolkit" className="hover:text-white transition-colors">Creative AI Toolkit</Link></li>
              <li><Link href="/products/agentic-creator-os" className="hover:text-white transition-colors">Custom Creator OS</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Intelligence Dispatch</h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Weekly briefings on conscious AI systems, musical rituals, and agent orchestration.
            </p>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input type="hidden" name="redirect" value="/thank-you" />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-primary-500 via-primary-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(59,130,246,0.35)] hover:scale-[1.02] transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>
              &copy; {new Date().getFullYear()} FrankX.AI. All rights reserved. Crafted with conscious AI collaboration.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Legal">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}


