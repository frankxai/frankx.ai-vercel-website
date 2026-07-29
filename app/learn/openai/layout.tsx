import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'OpenAI Mastery: Chat vs ChatGPT Work vs Codex | FrankX',
  description:
    'Choose the right OpenAI mode for your work, then follow a verified learning path for Chat, ChatGPT Work, or Codex.',
  path: '/learn/openai',
  updatedTime: '2026-07-29',
  keywords: [
    'ChatGPT Work',
    'ChatGPT vs Codex',
    'OpenAI learning path',
    'Codex tutorial',
    'ChatGPT for founders',
    'ChatGPT for researchers',
  ],
})

export default function OpenAIMasteryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

