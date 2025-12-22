import Script from 'next/script'

import OptimizedHomePage from '@/components/home/OptimizedHomePage'
import { createMetadata } from '@/lib/seo'
import CallToAction from '@/components/funnels/CallToAction'
import EmailCaptureForm from '@/components/funnels/EmailCaptureForm'

export const metadata = createMetadata({
  title: 'FrankX | Build AI Systems Aligned With Your Goals',
  description:
    'Free resources, practical frameworks, and open development for creators and students building personal AI workflows. Vibe OS for music, Student Hub for learning.',
  keywords: [
    'personal ai system',
    'ai music creation',
    'suno workflow',
    'ai for creators',
    'ai for students',
    'build with ai',
    'values aligned ai',
  ],
  path: '/',
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FrankX',
  url: 'https://frankx.ai',
  description:
    'A hub for creators and students building AI systems aligned with their unique goals and values. Free resources, practical frameworks, and transparent development.',
  founder: {
    '@type': 'Person',
    name: 'Frank',
    jobTitle: 'AI Systems Architect',
  },
  sameAs: [
    'https://linkedin.com/in/frank',
    'https://twitter.com/frankxai',
    'https://www.youtube.com/@frankxai',
  ],
  knowsAbout: [
    'ai music creation',
    'personal ai systems',
    'ai for students',
    'ai for creators',
    'suno workflows',
  ],
  hasPart: [
    {
      '@type': 'CreativeWork',
      name: 'Vibe OS',
      url: 'https://frankx.ai/products/vibe-os',
    },
    {
      '@type': 'CreativeWork',
      name: 'Student Hub',
      url: 'https://frankx.ai/students',
    },
    {
      '@type': 'CreativeWork',
      name: 'Prompt Library',
      url: 'https://frankx.ai/prompt-library',
    },
    {
      '@type': 'CreativeWork',
      name: 'Creation Chronicles',
      url: 'https://frankx.ai/creation-chronicles',
    },
  ],
}

export default function Page() {
  return (
    <>
      <OptimizedHomePage />
      <div className="container-px my-24">
        <CallToAction
          title="Explore the Prompt Library"
          description="Browse over 500 expertly crafted prompts to enhance your creative and business workflows."
          buttonText="Explore Prompts"
          href="/prompt-library"
        />
      </div>
      <div className="container-px my-24 max-w-2xl mx-auto">
        <EmailCaptureForm />
      </div>
      <Script id="frankx-organization" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
    </>
  )
}
