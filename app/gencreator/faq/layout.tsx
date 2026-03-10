import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator FAQ — Frequently Asked Questions',
  description:
    'Everything you want to know about the GenCreator Framework. What is it, who is it for, how to start, pricing, soul.md, blueprints, and more.',
  openGraph: {
    title: 'GenCreator FAQ',
    description: 'All your questions about the GenCreator Framework answered.',
    url: 'https://frankx.ai/gencreator/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
