import { Metadata } from 'next'
import localFont from 'next/font/local'
import VibeOSContent from './VibeOSContent'

const dmSerif = localFont({
  src: [
    { path: '../../public/fonts/brand/DMSerifDisplay-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-dm-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

const outfit = localFont({
  src: [
    { path: '../../public/fonts/brand/Outfit-Variable.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-outfit',
  display: 'swap',
  adjustFontFallback: 'Arial',
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
