import Link from 'next/link'
import { Mail, ExternalLink, Rss, Github } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0b] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <Image src="/images/mascot/axi-v3-icon.png" alt="Axi" width={36} height={36} className="rounded-lg" />
              <div>
                <span className="block text-base sm:text-lg font-semibold text-white">FrankX.AI</span>
                <span className="block text-[10px] sm:text-xs text-white/55">AI Systems & Music</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
              AI architect by day. Music creator by night.
              Building systems, making music, sharing everything.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="https://linkedin.com/in/frank-x-riemer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                LinkedIn
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://github.com/frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                <Github className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                GitHub
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://suno.com/@frankx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors flex items-center gap-1"
              >
                Suno
                <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://x.com/frankxeth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors"
              >
                X
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://youtube.com/@frankxai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-white/55 hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Create */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Create</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/prompt-library" className="hover:text-white transition-colors">Prompt Library</Link></li>
              <li><Link href="/products/vibe-os" className="hover:text-white transition-colors">Vibe OS</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Learn</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/students" className="hover:text-white transition-colors">Student Hub</Link></li>
              <li><Link href="/watch" className="hover:text-white transition-colors">Watch</Link></li>
            </ul>
          </div>

          {/* Build */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Build</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/ai-architecture" className="hover:text-white transition-colors">Architecture Hub</Link></li>
              <li><Link href="/ai-architecture/blueprints" className="hover:text-white transition-colors">Blueprints</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li>
                <a href="/rss.xml" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Rss className="w-3 h-3" />
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="mailto:hello@frankx.ai" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3 h-3" />
                  Email
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Weekly AI insights</p>
              <p className="text-xs text-white/40">No spam. Unsubscribe anytime.</p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
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
