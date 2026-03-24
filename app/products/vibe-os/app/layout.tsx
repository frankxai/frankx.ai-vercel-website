import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe OS App Dashboard — AI Music Agents & Prompt Library | FrankX.ai',
  description:
    'Launch AI music agents, browse curated Suno prompts, and produce studio-quality tracks. Free tier available.',
}

export default function VibeOSAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
