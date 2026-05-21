export const socialLinks = {
  twitter: "https://x.com/frankxeth",
  linkedin: "https://www.linkedin.com/in/frank-x-riemer/",
  github: "https://github.com/frankxai",
  youtube: "https://youtube.com/@frankxai",
  instagram: "https://www.instagram.com/frank_riemer/",
  spotify: "https://open.spotify.com/artist/1G2R4912J4k2y0424",
  tiktok: "https://tiktok.com/@frankx.ai",
  suno: "https://suno.com/@frankx"
} as const;

export const socialHandles = {
  twitter: "@frankxeth",
  linkedin: "frank-x-riemer",
  instagram: "@frank_riemer",
} as const;

export type SocialPlatform = keyof typeof socialLinks;

export const SHARE_URLS = {
  twitter: (text: string, url: string, via?: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}${via ? `&via=${via}` : ''}`,
  linkedin: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  whatsapp: (text: string, url: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
  telegram: (text: string, url: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};

export const SCHEMA_SAME_AS = [
  socialLinks.twitter,
  socialLinks.linkedin,
  socialLinks.github,
  socialLinks.youtube,
  socialLinks.instagram,
  socialLinks.suno,
];

export const SOCIAL_META = {
  twitter: {
    handle: socialHandles.twitter,
    url: socialLinks.twitter,
  },
  linkedin: {
    url: socialLinks.linkedin,
  },
};

export const PRIMARY_SOCIAL_LINKS = [
  { name: 'Twitter / X', url: socialLinks.twitter, icon: 'Twitter', description: 'Daily thoughts and AI updates' },
  { name: 'LinkedIn', url: socialLinks.linkedin, icon: 'LinkedIn', description: 'Enterprise AI & Architecture' },
  { name: 'YouTube', url: socialLinks.youtube, icon: 'YouTube', description: 'Video essays and tutorials' },
  { name: 'Instagram', url: socialLinks.instagram, icon: 'Instagram', description: 'Visuals and life' },
  { name: 'GitHub', url: socialLinks.github, icon: 'GitHub', description: 'Open source code and agents' },
];