import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s — GenCreator Framework',
    default: 'The GenCreator Framework — Principles, Handbook, Blueprints & Soul',
  },
}

export default function GenCreatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
