import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator Toolkit — The Complete Creator Stack',
  description:
    'Curated tools that power the GenCreator workflow. AI, automation, publishing, design, audio, and analytics — every tool earns its spot.',
  openGraph: {
    title: 'GenCreator Toolkit',
    description: 'Curated tools for generative creators. AI, automation, publishing, design.',
    url: 'https://frankx.ai/gencreator/toolkit',
  },
}

export default function ToolkitLayout({ children }: { children: React.ReactNode }) {
  return children
}
