import { Metadata } from 'next'
import { DM_Serif_Display, Outfit } from 'next/font/google'
import VibeOSContent from './VibeOSContent'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vibe OS — Multi-Agent Music Creation & AI Orchestration | FrankX.AI',
  description:
    'AI agents for Suno music production, multi-LLM creative workflows, and Arcanea Cloud worldbuilding. Free tier. No credit card.',
  keywords: [
    'vibe os',
    'ai music production',
    'multi-agent system',
    'suno ai prompts',
    'arcanea cloud',
    'agentic creator os',
    'multi-llm orchestration',
  ],
  openGraph: {
    title: 'Vibe OS — AI Agents Meet Music Creation',
    description:
      'Specialized AI agents, multi-LLM routing, and Arcanea Cloud worldbuilding. Built on ACOS v10 intelligence.',
    type: 'website',
    images: [{ url: '/images/vibe-os/vibe-os-ecosystem-overview.png', width: 1376, height: 768 }],
  },
}

export default function VibeOSPage() {
  return (
    <div className={`${dmSerif.variable} ${outfit.variable}`}>
      <VibeOSContent />
    </div>
  )
}
