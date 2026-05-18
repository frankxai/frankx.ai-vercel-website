import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'

import { LogoMarkMinimal } from '@/components/ui/LogoMark'
import { socialLinks } from '@/lib/social-links'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                <LogoMarkMinimal size={20} />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-semibold text-white">FrankX.AI</span>
                <span className="block text-[10px] sm:text-xs text-white/55">AI Systems & Music</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
              Oracle AI architect by day. Music creator by night.
              Building systems, making music, sharing everything.
            </p>
            <nav aria-label="Social profiles" className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                LinkedIn
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.suno}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                Suno
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href="mailto:hello@frankx.ai"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                <Mail className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                Email
              </a>
            </nav>
          </div>

          {/* Create */}
          <nav aria-label="Create">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Create</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/prompt-library" className="hover:text-white transition-colors">Prompt Library</Link></li>
              <li><Link href="/products/vibe-os" className="hover:text-white transition-colors">Vibe OS</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </nav>

          {/* Learn */}
          <nav aria-label="Learn">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Learn</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/resources" className="hover:text-white transition-colors">Resource Hub</Link></li>
              <li><Link href="/students" className="hover:text-white transition-colors">Student Hub</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/library" className="hover:text-white transition-colors">Library</Link></li>
              <li><Link href="/chronicle" className="hover:text-white transition-colors">Chronicle</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link href="/workshops" className="hover:text-white transition-colors">Workshops</Link></li>
              <li><Link href="/study" className="hover:text-white transition-colors">Study</Link></li>
            </ul>
          </nav>

          {/* Build */}
          <nav aria-label="Build">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Build</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/ai-architecture" className="hover:text-white transition-colors">Architecture Hub</Link></li>
              <li><Link href="/ai-architecture/blueprints" className="hover:text-white transition-colors">Blueprints</Link></li>
              <li><Link href="/ai-architecture/prototypes" className="hover:text-white transition-colors">Prototypes</Link></li>
              <li><Link href="/ai-architecture/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/ai-architecture/tools" className="hover:text-white transition-colors">Tools</Link></li>
            </ul>
          </nav>

          {/* Work with me — commercial funnel + utility */}
          <nav aria-label="Work with Frank">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Work with me</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/start" className="hover:text-white transition-colors">Start here</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Build</Link></li>
              <li><Link href="/inner-circle" className="text-rose-400/70 hover:text-rose-300 transition-colors">Founder&apos;s Circle</Link></li>
              <li><Link href="/coaching" className="hover:text-white transition-colors">Coaching</Link></li>
              <li><Link href="/work-with-me" className="hover:text-white transition-colors">Studio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Frank. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1" aria-label="Legal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/30">·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-white/30">·</span>
            <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
          </nav>
          <p className="text-center md:text-right">
            Built with Next.js, deployed on Vercel. Music made with Suno.
          </p>
        </div>
      </div>
    </footer>
  )
}
