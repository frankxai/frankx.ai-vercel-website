import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GenCreator Showcase — Real Projects, Real Results',
  description:
    'See what GenCreators build. Real projects, real systems, real output — from music and AI tools to content engines and digital products.',
  openGraph: {
    title: 'GenCreator Showcase',
    description: 'Real projects built by GenCreators. Music, AI tools, content engines, digital products.',
    url: 'https://frankx.ai/gencreator/showcase',
  },
}

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children
}
