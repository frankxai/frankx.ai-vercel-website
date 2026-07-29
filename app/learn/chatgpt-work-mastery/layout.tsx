import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'ChatGPT Work Mastery | Research, Deliverables & Operations | FrankX',
  description:
    'Learn when and how to use ChatGPT Work for multi-step research, reports, decks, spreadsheets, Sites, and repeatable team workflows.',
  path: '/learn/chatgpt-work-mastery',
  updatedTime: '2026-07-29',
  keywords: [
    'ChatGPT Work tutorial',
    'ChatGPT Work for founders',
    'ChatGPT Work research',
    'ChatGPT Work workflows',
    'ChatGPT Work vs Codex',
  ],
})

export default function ChatGPTWorkMasteryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

