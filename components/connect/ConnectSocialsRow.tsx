'use client'

import { Linkedin, Twitter, Youtube, Instagram, Github, Music, type LucideIcon } from 'lucide-react'
import { PRIMARY_SOCIAL_LINKS, type SocialLink } from '@/lib/social-links'
import { trackEvent } from '@/lib/analytics'

const ICON_MAP: Record<string, LucideIcon> = {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Github,
  Music,
}

export function ConnectSocialsRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {PRIMARY_SOCIAL_LINKS.map((social: SocialLink) => {
        const Icon = ICON_MAP[social.icon] ?? Music
        const key = social.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        return (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            onClick={() => trackEvent('connect_social_clicked', { network: key, url: social.url })}
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur transition-all hover:scale-105 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <Icon className="h-4.5 w-4.5" aria-hidden />
          </a>
        )
      })}
    </div>
  )
}
