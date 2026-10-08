import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'For Creators — AI Music, Prompts & Tools | FrankX.AI',
  description:
    'Build with AI: Suno workflows, prompt templates, and the open-source ACOS toolkit. Tutorials and tools for generative creators, free to start.',
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
