import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { EmailSignup } from '@/components/email-signup'
import Image from 'next/image'
import { socialLinks } from '@/lib/social-links'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0b] text-white overflow-hidden">
      {/* Aurora ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-cyan-500/[0.07] blur-[128px]" />
        <div className="absolute top-1/2 right-1/4 h-48 w-80 rounded-full bg-violet-500/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-40 w-72 rounded-full bg-emerald-500/[0.04] blur-[100px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <Image src="/images/mascot/axi-v3-icon.png" alt="Axi" width={36} height={36} className="rounded-lg" />
              <div>
                <span className="block text-base sm:text-lg font-semibold text-white">FrankX.AI</span>
                <span className="block text-[10px] sm:text-xs text-white/55">AI Systems &amp; Music</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
              AI architect by day. Music creator by night.
              Building systems, making music, sharing everything.
            </p>
            <nav aria-label="Social profiles" className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.suno}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                Suno
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                X
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                YouTube
              </a>
              <span className="text-white/20" aria-hidden>·</span>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/55 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </nav>
          </div>

          {/* Music */}
          <nav aria-label="Music">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Music</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/music" className="hover:text-white transition-colors">Music Showcase</Link></li>
              <li><Link href="/music-lab" className="hover:text-white transition-colors">Music Lab</Link></li>
              <li><Link href="/products/vibe-os" className="hover:text-white transition-colors">Vibe OS</Link></li>
              <li>
                <a
                  href={socialLinks.suno}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Suno Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Create */}
          <nav aria-label="Create">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Create</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/gencreator" className="hover:text-white transition-colors">GenCreator Hub</Link></li>
              <li><Link href="/prompt-library" className="hover:text-white transition-colors">Prompt Library</Link></li>
              <li><Link href="/acos" className="hover:text-white transition-colors">ACOS</Link></li>
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/creation-chronicles" className="hover:text-white transition-colors">Creation Chronicles</Link></li>
              <li>
                <a
                  href="https://gencreator.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1 text-emerald-400/80"
                >
                  GenCreator.AI
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Learn */}
          <nav aria-label="Learn">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Learn</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/books" className="hover:text-white transition-colors">Books</Link></li>
              <li><Link href="/library" className="hover:text-white transition-colors">Library</Link></li>
              <li><Link href="/games" className="hover:text-white transition-colors">Games Lab</Link></li>
              <li><Link href="/watch" className="hover:text-white transition-colors">Watch</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </nav>

          {/* Build */}
          <nav aria-label="Build">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Build</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/ai-architecture" className="hover:text-white transition-colors">Architecture Hub</Link></li>
              <li><Link href="/ai-architecture/blueprints" className="hover:text-white transition-colors">Blueprints</Link></li>
              <li><Link href="/ai-world" className="hover:text-white transition-colors">AI World</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Research Hub</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
            </ul>
          </nav>

          {/* Work with me */}
          <nav aria-label="Work with Frank">
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider sm:tracking-widest text-white/60 mb-3 sm:mb-4">Work with me</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/40">
              <li><Link href="/start" className="hover:text-white transition-colors">Start Here</Link></li>
              <li><Link href="/foundry" className="text-emerald-400/70 hover:text-emerald-300 transition-colors">Foundry</Link></li>
              <li><Link href="/founders-circle" className="text-rose-400/70 hover:text-rose-300 transition-colors">Founder&apos;s Circle</Link></li>
              <li><Link href="/coaching" className="hover:text-white transition-colors">Coaching</Link></li>
              <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </nav>

        </div>

        {/* Newsletter — Aurora accent */}
        <div className="relative mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
          <div className="absolute inset-0 -mx-4 sm:-mx-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-transparent to-violet-950/20 pointer-events-none" aria-hidden />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Weekly dispatch — AI architecture &amp; creative systems</p>
              <p className="text-xs text-white/40">One email per week. Unsubscribe anytime.</p>
            </div>
            <div className="w-full sm:w-auto sm:min-w-[300px]">
              <EmailSignup listType="newsletter" placeholder="your@email.com" buttonText="Subscribe" compact />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Frank van den Bergh. All rights reserved.</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1" aria-label="Legal">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="text-white/30">·</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="text-white/30">·</span>
            <Link href="/legal" className="hover:text-white transition-colors">Legal</Link>
          </nav>
          <p className="text-center md:text-right">
            Built with Next.js &amp; deployed on Vercel.
          </p>
        </div>
      </div>
    </footer>
  )
}
