import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Lab Quests — Build. Ship. Document. | FrankX.AI',
  description: 'A transparent log of every design challenge completed by Claude Code. Capabilities, tools, and deliverables documented.',
  robots: { index: false, follow: false },
}

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
  return children
}
