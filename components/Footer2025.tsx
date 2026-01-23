'use client'

import Link from 'next/link'

const links = {
  explore: [
    { name: 'Music', href: '/music-lab' },
    { name: 'Learning', href: '/students' },
    { name: 'Prompts', href: '/prompt-library' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Templates', href: '/templates' },
    { name: 'Guides', href: '/guides' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'RSS', href: '/rss.xml' },
  ],
  connect: [
    { name: 'About', href: '/about' },
    { name: 'Email', href: 'mailto:hello@frankx.ai' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/frank', external: true },
    { name: 'GitHub', href: 'https://github.com/frankxai', external: true },
  ],
}

export default function Footer2025() {
  return (
    <footer className="border-t border-white/5 bg-void">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
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
            <p className="text-sm text-white/40 max-w-xs">
              My system for building with AI. Take what works.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {links.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-white/30 mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              {links.connect.map((link) => (
                <li key={link.name}>
                  {'external' in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            {new Date().getFullYear()} Frank. Built in public.
          </p>
          <p className="text-xs text-white/30">
            Resources curated from Oracle, Google, MIT, and more.
          </p>
        </div>
      </div>
    </footer>
  )
}
