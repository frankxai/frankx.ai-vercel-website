import { type LucideIcon, CircuitBoard, PenTool, Telescope, Waves } from 'lucide-react'

export type ClaudeAgent = {
  id: string
  name: string
  focus: string
  role: string
  icon: LucideIcon
  workflows: string[]
  deliverables: string[]
  cta: { label: string; href: string }
}

export const claudeAgents: ClaudeAgent[] = [
  {
    id: 'starlight-architect',
    name: 'Starlight Architect',
    focus: 'Creator Systems Architecture',
    role: 'Designs operating systems, automations, and dashboards that keep creators shipping.',
    icon: CircuitBoard,
    workflows: [
      'Creator lab mapping sessions that translate goals into rituals and automations.',
      'Workflow audits connecting SongGrid, product registry, and analytics signals.',
      'Implementation plans that turn prompts into reusable components and utilities.'
    ],
    deliverables: [
      'Visual creator OS roadmap with weekly rituals and dependencies.',
      'Automation + analytics checklist wired into the codebase.',
      '30/60/90 upgrade plan for content velocity and revenue experiments.'
    ],
    cta: { label: 'Review the Creator Lab Overview', href: '/products/agentic-creator-os' }
  },
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    focus: 'Story & Launch Architecture',
    role: 'Transforms insights into essays, funnels, and campaigns that move creators to act.',
    icon: PenTool,
    workflows: [
      'Story mining sessions capturing founder voice and community language.',
      'Launch arc planning across email, social, and live experiences.',
      'Content system setup linking Claude prompts to CTA + analytics events.'
    ],
    deliverables: [
      'Editorial calendar with creator-facing prompts and hooks.',
      'Landing pages, email flows, and resource scripts ready for Codex implementation.',
      'Measurement dashboards summarising open + conversion signals.'
    ],
    cta: { label: 'Access Launch Templates', href: '/templates' }
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    focus: 'Sonic Storytelling & Ritual Design',
    role: 'Produces Suno sessions, copy, and liner notes that make releases unforgettable.',
    icon: Waves,
    workflows: [
      'Session labs translating emotional intent into Suno prompts and stems.',
      'Ritual design pairing music with newsletters, livestreams, and Realm labs.',
      'Sound branding experiments aligned with creator milestones.'
    ],
    deliverables: [
      'Custom Suno prompt banks and session briefs.',
      'Release packs with liner notes, social snippets, and CTA flow.',
      'Audio branding kits synced with campaign milestones.'
    ],
    cta: { label: 'Enter the Music Lab', href: '/music-lab' }
  },
  {
    id: 'luminor-oracle',
    name: 'Luminor Oracle',
    focus: 'Creator Foresight & Strategy',
    role: 'Future-casts the creator journey, highlighting opportunities and guardrails.',
    icon: Telescope,
    workflows: [
      'Signal scanning to surface culture, platform, and tech shifts relevant to creators.',
      'Scenario modeling turning big visions into quarterly plays.',
      'Decision pre-mortems linking future outcomes to present experiments.'
    ],
    deliverables: [
      'Seasonal strategy decks with priority rituals and drops.',
      'Opportunity matrices for products, collaborations, and community plays.',
      'Reflection questions and frameworks for Realm and Inner Circle members.'
    ],
    cta: { label: 'Read Creation Chronicles', href: '/creation-chronicles' }
  }
]
