import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Accessibility Statement | FrankX.ai',
  description: 'Our commitment to making FrankX.ai accessible to all users.',
  path: '/legal/accessibility',
})

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <article className="mx-auto max-w-3xl px-6 text-white/80">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Accessibility Statement</h1>
        <p className="mb-10 text-sm text-white/55">Last updated: January 25, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">

          <p>
            FrankX.ai is committed to ensuring digital accessibility for people with disabilities.
            We are continually improving the user experience for everyone and applying relevant
            accessibility standards.
          </p>

          <h2>Standards</h2>
          <p>
            We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
            These guidelines explain how to make web content more accessible to people with a
            wide array of disabilities.
          </p>

          <h2>What We Do</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Use semantic HTML and proper heading hierarchy</li>
            <li>Provide alt text for images</li>
            <li>Ensure sufficient color contrast ratios</li>
            <li>Support keyboard navigation throughout the site</li>
            <li>Include a &quot;Skip to content&quot; link for screen reader users</li>
            <li>Use ARIA labels on interactive elements where appropriate</li>
            <li>Respect user preferences for reduced motion</li>
            <li>Design responsive layouts that work across devices and zoom levels</li>
          </ul>

          <h2>Known Limitations</h2>
          <p>
            While we strive for full accessibility, some areas may have limitations:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Some older blog post images may lack detailed alt text</li>
            <li>AI-generated infographics contain text within images that may not be fully accessible to screen readers (we provide descriptive alt text as a mitigation)</li>
            <li>Third-party embeds (Suno music player, Gumroad checkout) are governed by their own accessibility standards</li>
          </ul>

          <h2>Feedback</h2>
          <p>
            We welcome feedback on the accessibility of FrankX.ai. If you encounter accessibility
            barriers or have suggestions for improvement, please contact us:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              Email:{' '}
              <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
                hello@frankx.ai
              </a>
            </li>
            <li>Subject line: <strong className="text-white">Accessibility Feedback</strong></li>
          </ul>
          <p>
            We aim to respond to accessibility feedback within 5 business days and to resolve
            accessibility issues as quickly as possible.
          </p>
        </div>
      </article>
    </main>
  )
}
