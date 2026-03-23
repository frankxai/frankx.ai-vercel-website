import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'For Creators — AI Music, Prompts & Tools | FrankX.AI',
  description:
    'Build your creator empire with AI. 12K+ songs with Suno, 50+ battle-tested prompts, open-source ACOS toolkit. Free tutorials, workflows, and tools for generative creators.',
  keywords: [
    'ai music creation',
    'suno ai prompts',
    'ai creator tools',
    'prompt library',
    'agentic creator os',
    'ai art generation',
    'music production workflow',
    'ai content creation',
  ],
  path: '/for/creators',
})

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
