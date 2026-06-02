import type { LucideIcon } from 'lucide-react'
import {
  Brain,
  Eye,
  Film,
  Code2,
  Bot,
  Mic,
  ImageIcon,
} from 'lucide-react'

export type Capability =
  | 'reasoning'
  | 'multimodal'
  | 'video-gen'
  | 'coding'
  | 'agentic-infra'
  | 'voice'
  | 'image-gen'

export interface CapabilityMeta {
  id: Capability
  label: string
  short: string
  description: string
  icon: LucideIcon
  accent: string
  query: string
}

export const CAPABILITIES: Record<Capability, CapabilityMeta> = {
  reasoning: {
    id: 'reasoning',
    label: 'Reasoning & Analysis',
    short: 'Reasoning',
    description: 'Complex problem-solving, math, abstract reasoning, long-horizon planning',
    icon: Brain,
    accent: '#a855f7',
    query: 'best reasoning llm 2026',
  },
  multimodal: {
    id: 'multimodal',
    label: 'Multimodal Understanding',
    short: 'Multimodal',
    description: 'Vision, document, chart, and cross-modal reasoning across text/image/audio',
    icon: Eye,
    accent: '#06b6d4',
    query: 'best multimodal llm 2026',
  },
  'video-gen': {
    id: 'video-gen',
    label: 'Video Generation',
    short: 'Video Gen',
    description: 'Generative video models, text-to-video, image-to-video, editing',
    icon: Film,
    accent: '#ec4899',
    query: 'best ai video generator 2026',
  },
  coding: {
    id: 'coding',
    label: 'Coding & Engineering',
    short: 'Coding',
    description: 'Agentic coding, terminal use, debugging, multi-file refactors',
    icon: Code2,
    accent: '#10b981',
    query: 'best ai coding model 2026',
  },
  'agentic-infra': {
    id: 'agentic-infra',
    label: 'Agentic Infrastructure',
    short: 'Agentic',
    description: 'Tool use, function calling, agent SDKs, computer use, long-horizon execution',
    icon: Bot,
    accent: '#f59e0b',
    query: 'best agentic ai platform 2026',
  },
  voice: {
    id: 'voice',
    label: 'Voice & Audio',
    short: 'Voice',
    description: 'Native speech in/out, real-time conversation, audio understanding',
    icon: Mic,
    accent: '#8b5cf6',
    query: 'best ai voice model 2026',
  },
  'image-gen': {
    id: 'image-gen',
    label: 'Image Generation',
    short: 'Image Gen',
    description: 'Text-to-image, editing, in-painting, brand-consistent generation',
    icon: ImageIcon,
    accent: '#3b82f6',
    query: 'best ai image model 2026',
  },
}

export const CAPABILITY_ORDER: Capability[] = [
  'reasoning',
  'multimodal',
  'video-gen',
  'coding',
  'agentic-infra',
  'voice',
  'image-gen',
]
