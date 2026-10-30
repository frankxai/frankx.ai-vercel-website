import { socialLinks } from './social-links.ts'

// Page URLs describe different reader jobs; they all describe the same person.
export function buildFrankPerson(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#frank-riemer`,
    name: 'Frank Riemer',
    alternateName: 'FrankX',
    jobTitle: 'AI Architect',
    url: `${siteUrl}/frank-riemer`,
    image: `${siteUrl}/images/portraits/frank-presenting-oracle-2025.jpg`,
    sameAs: [
      socialLinks.linkedin,
      socialLinks.github,
      socialLinks.x,
      socialLinks.youtube,
      socialLinks.instagram,
      socialLinks.suno,
    ],
    homeLocation: { '@type': 'Place', name: 'Amsterdam, Netherlands' },
    knowsAbout: ['AI architecture', 'Agentic workflows', 'AI music creation'],
  }
}
