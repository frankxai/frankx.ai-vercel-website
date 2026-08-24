"use client";

import {
  Github,
  Instagram,
  Linkedin,
  Music,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { PRIMARY_SOCIAL_LINKS, type SocialLink } from "@/lib/social-links";

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Github,
  Music,
};

export function ConnectSocialsRow() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4">
      {PRIMARY_SOCIAL_LINKS.map((social: SocialLink) => {
        const Icon = iconMap[social.icon] ?? Music;
        const key = social.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

        return (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("connect_social_clicked", {
                network: key,
                url: social.url,
              })
            }
            className="inline-flex min-h-11 items-center gap-2 border-b border-[#171915]/25 text-sm font-medium text-[#454940] transition-colors hover:border-[#2157d5] hover:text-[#2157d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2157d5]"
          >
            <Icon className="h-4 w-4" aria-hidden />
            {social.name}
          </a>
        );
      })}
    </div>
  );
}
