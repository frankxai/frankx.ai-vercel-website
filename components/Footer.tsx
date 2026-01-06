import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'

import { LogoMarkMinimal } from '@/components/ui/LogoMark'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-violet-500/20 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                <LogoMarkMinimal size={24} />
              </div>
              <div>
                <span className="block text-lg font-semibold text-white">FrankX.AI</span>
                <span className="block text-xs text-white/40">AI Systems & Music</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Oracle AI architect by day. Music creator by night.
              Building systems, making music, sharing everything.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://linkedin.com/in/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
              >
                LinkedIn
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://suno.com/@frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
              >
                Suno
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href="mailto:hello@frankx.ai"
                className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3" />
                Email
              </a>
            </div>
          </div>

          {/* Create */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Create</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/prompt-library" className="hover:text-white transition-colors">Prompt Library</Link></li>
              <li><Link href="/products/vibe-os" className="hover:text-white transition-colors">Vibe OS</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Learn</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/resources" className="hover:text-white transition-colors">Resource Hub</Link></li>
              <li><Link href="/students" className="hover:text-white transition-colors">Student Hub</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">More</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} Frank. All rights reserved.</p>
          <p className="text-center md:text-right">
            Built with Next.js, deployed on Vercel. Music made with Suno.
          </p>
        </div>
      </div>
    </footer>
  )
}
