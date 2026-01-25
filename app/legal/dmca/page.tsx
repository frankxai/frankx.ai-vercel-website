import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'DMCA & Copyright Policy | FrankX.ai',
  description: 'How to report copyright infringement and our content takedown process.',
  path: '/legal/dmca',
})

export default function DMCAPage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <article className="mx-auto max-w-3xl px-6 text-white/80">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">DMCA &amp; Copyright Policy</h1>
        <p className="mb-10 text-sm text-white/40">Last updated: January 25, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white/90">

          <p>
            FrankX.ai respects the intellectual property rights of others and expects users to do
            the same. We respond to notices of alleged copyright infringement in accordance with
            the Digital Millennium Copyright Act (DMCA).
          </p>

          <h2>Reporting Copyright Infringement</h2>
          <p>
            If you believe that content on FrankX.ai infringes your copyright, please send a written
            notice to our designated agent with the following information:
          </p>
          <ol className="ml-4 list-decimal space-y-2">
            <li>A description of the copyrighted work you claim has been infringed</li>
            <li>The URL or location on our site where the allegedly infringing material is found</li>
            <li>Your contact information (name, address, phone number, email)</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
            <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on their behalf</li>
            <li>Your physical or electronic signature</li>
          </ol>

          <h2>Designated Agent</h2>
          <p>
            Send DMCA notices to:{' '}
            <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
              hello@frankx.ai
            </a>
          </p>
          <p>Subject line: <strong className="text-white">DMCA Takedown Notice</strong></p>

          <h2>Counter-Notification</h2>
          <p>
            If you believe your content was removed by mistake or misidentification, you may submit
            a counter-notification with:
          </p>
          <ol className="ml-4 list-decimal space-y-2">
            <li>Identification of the material that was removed and its previous location</li>
            <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
            <li>Your name, address, phone number, and consent to jurisdiction</li>
            <li>Your physical or electronic signature</li>
          </ol>

          <h2>Our Content</h2>
          <p>
            All original content on FrankX.ai — including articles, tutorials, images, and music —
            is protected by copyright. You may share links to our content and quote brief excerpts
            with attribution. Republishing full articles or redistributing digital products without
            permission is prohibited.
          </p>

          <h3>AI-Generated Content</h3>
          <p>
            Some content on this site is created with AI assistance. The copyright status of
            AI-generated content varies by jurisdiction. We claim copyright in the selection,
            arrangement, and human-directed creation of all site content.
          </p>

          <h2>Repeat Infringers</h2>
          <p>
            We will terminate access for users who are repeat infringers in appropriate circumstances.
          </p>
        </div>
      </article>
    </main>
  )
}
