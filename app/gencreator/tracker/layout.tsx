import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Tracker — Daily Creative Habit Log',
  description:
    'Track your daily shipping habit. Log what you created, see your streak, review your history. The core GenCreator practice — ship daily, compound forever.',
  openGraph: {
    title: 'GenCreator Shipping Tracker',
    description: 'Log your daily ships. Build streaks. Compound your creative output.',
    url: 'https://frankx.ai/gencreator/tracker',
  },
}

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return children
}
