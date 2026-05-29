import { CONTACT_INFO, SOCIAL_PROFILES } from '@/lib/social-links'

const CRLF = '\r\n'

function escapeValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

export function buildFrankVCard(): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Riemer;Frank;;;',
    'FN:Frank Riemer',
    'NICKNAME:FrankX',
    'TITLE:AI Architect & Creator',
    'ORG:FrankX.AI',
    `EMAIL;TYPE=INTERNET,PREF:${CONTACT_INFO.email.primary}`,
    `URL:${CONTACT_INFO.website.primary}`,
    `URL;TYPE=X-LINKEDIN:${SOCIAL_PROFILES.linkedin.url}`,
    `URL;TYPE=X-TWITTER:${SOCIAL_PROFILES.x.url}`,
    `URL;TYPE=X-YOUTUBE:${SOCIAL_PROFILES.youtube.url}`,
    `URL;TYPE=X-INSTAGRAM:${SOCIAL_PROFILES.instagram.url}`,
    `URL;TYPE=X-GITHUB:${SOCIAL_PROFILES.github.url}`,
    `URL;TYPE=X-SUNO:${SOCIAL_PROFILES.suno.url}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${SOCIAL_PROFILES.linkedin.url}`,
    `X-SOCIALPROFILE;TYPE=twitter:${SOCIAL_PROFILES.x.url}`,
    `X-SOCIALPROFILE;TYPE=youtube:${SOCIAL_PROFILES.youtube.url}`,
    `X-SOCIALPROFILE;TYPE=instagram:${SOCIAL_PROFILES.instagram.url}`,
    `X-SOCIALPROFILE;TYPE=github:${SOCIAL_PROFILES.github.url}`,
    `NOTE:${escapeValue('Met Frank at an event? Mention it when you reach out — partnerships, investor conversations, and collabs welcome.')}`,
    `REV:${new Date().toISOString()}`,
    'END:VCARD',
  ]

  return lines.join(CRLF) + CRLF
}

export const VCARD_FILENAME = 'frank-riemer.vcf'
