import type { BrandId, FounderBrand } from './contracts'

// The shared character never replaces a brand's own identity or implies a live agent.
export const founderBrands: Record<BrandId, FounderBrand> = {
  frankx: {
    id: 'frankx', name: 'FrankX', founderName: 'Frank Riemer', role: 'AI Architect · Amsterdam',
    description: 'AI architecture, books, software and music. Frank directs the work and chooses what becomes public.',
    storyHref: '/about#story-title', storyLabel: 'Read the founder story', contactHref: '/connect',
    trustLinks: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }, { label: 'Business identity', href: '/legal' }, { label: 'Licensing', href: '/licensing' }],
  },
  starlight: {
    id: 'starlight', name: 'Starlight Intelligence', founderName: 'Frank Riemer', role: 'Founder · Amsterdam',
    description: 'Frank leads the project. Each surface states what you can use today and what remains in development.',
    storyHref: 'https://www.frankx.ai/about', storyLabel: 'About Frank', contactHref: 'mailto:frank@frankx.ai', trustLinks: [],
  },
  arcanea: {
    id: 'arcanea', name: 'Arcanea', founderName: 'Frank Riemer', role: 'Founder',
    description: 'Created by Frank Riemer. Founder attribution sits outside Arcanea’s fictional world and character canon.',
    storyHref: 'https://www.frankx.ai/about', storyLabel: 'About the founder', contactHref: 'mailto:frank@frankx.ai', trustLinks: [],
  },
  gencreator: {
    id: 'gencreator', name: 'GenCreator', founderName: 'Frank Riemer', role: 'Founder · AI Architect',
    description: 'Built by Frank Riemer. Inspect the draft and the proof it still needs before taking the work further.',
    storyHref: 'https://www.frankx.ai/about', storyLabel: 'About Frank', contactHref: 'mailto:frank@frankx.ai', trustLinks: [],
  },
}
