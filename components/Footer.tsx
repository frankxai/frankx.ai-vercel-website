import Link from 'next/link'
import { Mail, Newspaper, Search, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-fuchsia-500/10"
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.45)]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-lg font-semibold text-white">FrankX Agent Collective</span>
                <span className="block text-xs uppercase tracking-[0.3em] text-white/60">Intelligence · Story · Music Lab</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Architecting soulful intelligence systems that creatives, families, and executive teams trust. Every artifact here
              is crafted by multi-disciplinary pods spanning strategy, engineering, design, and the Music Lab.
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
                href="mailto:hello@frankx.ai?subject=Conscious%20AI%20Collaboration"
                className="rounded-lg border border-white/10 p-2 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Email the FrankX agent team"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Intelligence Hub</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/#updates" className="hover:text-white transition-colors">Latest Updates</Link></li>
              <li><Link href="/#resources" className="hover:text-white transition-colors">Resource Library</Link></li>
              <li><Link href="/#projects" className="hover:text-white transition-colors">Project Roadmap</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition-colors">Agent Protocols</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Semantic Search</Link></li>
              <li><Link href="/rss.xml" className="hover:text-white transition-colors">RSS Feed</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">Programs &amp; Guides</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/founder-playbook" className="hover:text-white transition-colors">Founder’s AI Playbook</Link></li>
              <li><Link href="/family-guide" className="hover:text-white transition-colors">AI Basics for Families</Link></li>
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides Collection</Link></li>
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
                className="rounded-lg bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.35)] hover:scale-[1.02] transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-center text-sm text-white/70">
          <p>
            &copy; {new Date().getFullYear()} FrankX Agent Collective. All rights reserved. Crafted with conscious AI collaboration and human-first
            design.
          </p>
        </div>
      </div>
    </footer>
  )
}
