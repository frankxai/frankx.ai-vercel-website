import { NextRequest, NextResponse } from 'next/server'
import type { FunnelUserAnswers, AIAnalysisResult } from '@/components/funnel/agentic/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const answers: FunnelUserAnswers = body.answers || {}

    // Determine archetype & needs based on user answers
    const isCreative =
      answers.identity === 'creative_producer' ||
      answers.objective === 'creative_content_scale'

    const isEnterprise =
      answers.identity === 'enterprise_architect' ||
      answers.objective === 'mcp_infrastructure'

    let archetype = 'Autonomous System Architect'
    let recommendedProductId = 'agentic-creator-os'
    let recommendedProductName = 'Agentic Creator OS (ACOS)'
    let dynamicHeadline = 'Architecting Your Autonomous Agent Empire'
    let coreBottleneck = 'Manual context switching between disparate AI tools without unified orchestration.'
    let actionPlan = [
      'Deploy the Starlight multi-agent orchestration architecture to eliminate context switching.',
      'Connect pre-configured MCP tools and memory vaults for zero-hallucination execution.',
      'Launch self-serve automated delivery pipelines for immediate passive client acquisition.',
    ]
    let valueMetrics = {
      estimatedTimeSavedWeekly: '18-24 hrs',
      estimatedAutomationBoost: '4.8x Multiplier',
    }
    let readinessScore = 98.2

    if (isCreative) {
      archetype = 'Cinematic Media Director'
      recommendedProductId = 'creative-ai-toolkit'
      recommendedProductName = 'Creative AI Toolkit 2026'
      dynamicHeadline = 'Unlocking 60fps Generative Media & Visual Authority'
      coreBottleneck = 'Fragmented video/image generation workflows and low-quality prompt friction.'
      actionPlan = [
        'Implement anti-slop visual generation pipelines with curated style loras and seeds.',
        'Automate audio stem synthesis with Suno AI & prompt engineering matrix.',
        'Streamline asset export and social multi-platform distribution in under 10 minutes.',
      ]
      valueMetrics = {
        estimatedTimeSavedWeekly: '14-20 hrs',
        estimatedAutomationBoost: '5.2x Multiplier',
      }
      readinessScore = 96.5
    } else if (isEnterprise) {
      archetype = 'Enterprise Intelligence Architect'
      recommendedProductId = 'agentic-creator-os'
      recommendedProductName = 'Agentic Creator OS: Enterprise Suite'
      dynamicHeadline = 'Building Resilient Multi-Agent Swarms with Persistent Memory'
      coreBottleneck = 'Lack of deterministic state management, rate limits, and uncoordinated subagents.'
      actionPlan = [
        'Standardize on the 5-Layer Starlight Agent Operating Protocol with Santa Verification.',
        'Integrate AgentDB vector search with local SQLite & Obsidian knowledge vault layers.',
        'Enforce strict token gating and machine performance admission contracts.',
      ]
      valueMetrics = {
        estimatedTimeSavedWeekly: '25-35 hrs',
        estimatedAutomationBoost: '6.4x Multiplier',
      }
      readinessScore = 99.1
    }

    const analysis: AIAnalysisResult = {
      readinessScore,
      archetype,
      coreBottleneck,
      recommendedProductId,
      recommendedProductName,
      dynamicHeadline,
      actionPlan,
      valueMetrics,
    }

    return NextResponse.json({ success: true, analysis })
  } catch (error) {
    console.error('Error in /api/funnel/qualify:', error)
    return NextResponse.json(
      { error: 'Failed to process agentic qualification.' },
      { status: 500 }
    )
  }
}
