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
    focus: 'Enterprise Systems & Governance',
    role: 'Designs scalable systems and ensures every experience is enterprise-grade yet soul-aligned.',
    icon: CircuitBoard,
    workflows: [
      'Enterprise architecture sprints aligning Claude agents with regulatory and cultural guardrails.',
      'Risk and dependency audits across data, workflow, and people layers.',
      'Scenario mapping that converts leadership goals into prioritized agent roadmaps.',
    ],
    deliverables: [
      'Creative AI blueprint with integration layers and escalation rituals.',
      'Executive-ready governance dashboards and KPI scorecards.',
      'Implementation backlog with 30-60-90 day experiments.',
    ],
    cta: { label: 'Review the Creative AI Blueprint', href: '/founder-playbook' },
  },
  {
    id: 'creation-engine',
    name: 'Creation Engine',
    focus: 'Narrative & Launch Architecture',
    role: 'Transforms research and interviews into multi-format content, courses, and playbooks.',
    icon: PenTool,
    workflows: [
      'Story mining sessions capturing founder voice and community language.',
      'Launch arc planning across email, video, and live experiences.',
      'Content system setup linking Claude prompts to campaign metrics.',
    ],
    deliverables: [
      'Editorial calendar with agent-ready prompts.',
      'Course, playbook, and template packages for go-to-market.',
      'Measurement dashboards for engagement and conversion signals.',
    ],
    cta: { label: 'Access Launch Templates', href: '/templates' },
  },
  {
    id: 'frequency-alchemist',
    name: 'Frequency Alchemist',
    focus: 'Sonic & Ritual Design',
    role: 'Produces Suno-powered soundscapes that encode the emotional frequency of the work.',
    icon: Waves,
    workflows: [
      'Immersive scoring labs translating project emotion into AI-assisted compositions.',
      'Session rituals that align teams before key launches or briefings.',
      'Sound branding experiments blended with live performance cues.',
    ],
    deliverables: [
      'Custom Suno prompt banks and stems for ongoing use.',
      'Event-ready playlists and meditations for cohorts.',
      'Audio branding kits synced with campaign milestones.',
    ],
    cta: { label: 'Enter the Music Lab', href: '/music-lab' },
  },
  {
    id: 'luminor-oracle',
    name: 'Luminor Oracle',
    focus: 'Strategic Foresight & Scenario Design',
    role: 'Future-casts strategy from a 2124 vantage point to stress test today’s decisions.',
    icon: Telescope,
    workflows: [
      'Signal scanning rituals analyzing regulatory, cultural, and technology shifts.',
      'Future scenario modeling to evaluate long-horizon bets.',
      'Decision pre-mortems linking forecasts to current investments.',
    ],
    deliverables: [
      'Quarterly foresight briefings and risk radars.',
      'Opportunity matrices for product, community, and policy plays.',
      'Strategic memos guiding leadership rituals and communications.',
    ],
    cta: { label: 'Read the Intelligence Revolution Playbook', href: '/blog/intelligence-revolution-2025' },
  },
]
