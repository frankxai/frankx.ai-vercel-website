import { createMetadata } from '@/lib/seo'
import { listFrankxBlueprints } from '@/lib/mcp/blueprints-catalog'
import { listFrankxSkills } from '@/lib/mcp/skills-catalog'
import { recommendFrankxStack, type StackGoal } from '@/lib/mcp/stack-recommendations'
import { McpConsoleClient } from './McpConsoleClient'

export const revalidate = 3600

export const metadata = createMetadata({
  title: 'FrankX MCP Console | Connect Any AI Agent',
  description:
    'Stateless HTTP Model Context Protocol endpoint for querying FrankX technical guides, installable SKILL.md modules, architecture blueprints, and disclosed tool stacks.',
  path: '/mcp',
})

const GOALS: StackGoal[] = [
  'coding-agents',
  'voice-audio',
  'video-motion',
  'creator-publishing',
  'ai-architecture',
  'research-seo',
]

export default function McpPage() {
  const { skills } = listFrankxSkills({ limit: 12 })
  const { blueprints, total: totalBlueprints } = listFrankxBlueprints({ limit: 12 })

  const stacksByGoal = Object.fromEntries(
    GOALS.map((goal) => {
      const rec = recommendFrankxStack({ goal, limit: 6 })
      return [goal, { tools: rec.tools, disclosureNote: rec.disclosureNote }]
    }),
  ) as Record<StackGoal, { tools: ReturnType<typeof recommendFrankxStack>['tools']; disclosureNote: string }>

  return (
    <McpConsoleClient
      skills={skills}
      blueprints={blueprints}
      totalBlueprints={totalBlueprints}
      stacksByGoal={stacksByGoal}
    />
  )
}
