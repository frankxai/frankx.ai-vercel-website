import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Terms of Service | FrankX.ai',
  description: 'Terms and conditions for using FrankX.ai and purchasing digital products.',
  path: '/terms',
})

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <article className="mx-auto max-w-3xl px-6 text-white/80">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Terms of Service</h1>
        <p className="mb-10 text-sm text-white/55">Last updated: January 25, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white/90 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1">

          <p>
            By accessing or using FrankX.ai (&quot;the Site&quot;), you agree to be bound by these
            Terms of Service. If you do not agree, do not use the Site.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            The Site provides educational content, digital products, courses, and tools related to
            AI systems, music production, and creative workflows. You may use the Site for lawful
            purposes only.
          </p>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Site to violate any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to any part of the Site</li>
            <li>Scrape, reproduce, or redistribute Site content without permission</li>
            <li>Use automated systems to access the Site in a way that exceeds reasonable use</li>
          </ul>

          <h2>2. Digital Products</h2>

          <h3>License</h3>
          <p>
            When you purchase a digital product (course, template, prompt library, toolkit), you
            receive a <strong className="text-white">personal, non-transferable, non-exclusive license</strong> to
            use the product for your own personal or business purposes. You may not resell,
            redistribute, or share access to purchased products.
          </p>

          <h3>Refund Policy</h3>
          <p>
            We offer a <strong className="text-white">30-day satisfaction guarantee</strong> on all
            digital products. If you are not satisfied, contact{' '}
            <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
              hello@frankx.ai
            </a>{' '}
            within 30 days of purchase for a full refund. Refunds are processed through the original
            payment platform (Gumroad).
          </p>

          <h3>Delivery</h3>
          <p>
            Digital products are delivered electronically via email or download link immediately
            after purchase. If you do not receive your product, contact us and we will resolve the
            issue promptly.
          </p>

          <h2>3. Free Content and Resources</h2>
          <p>
            Blog articles, guides, and free resources are provided for informational and educational
            purposes. You may share links to our content but may not copy, republish, or redistribute
            the content in full without written permission.
          </p>

          <h2>4. AI-Generated Content</h2>
          <p>
            Some content on this site is created with AI assistance, including:
          </p>
          <ul>
            <li><strong className="text-white/90">Music</strong> — created using Suno AI</li>
            <li><strong className="text-white/90">Images</strong> — generated using AI image models</li>
            <li><strong className="text-white/90">Written content</strong> — drafted or edited with AI tools</li>
          </ul>
          <p>
            AI-generated content is reviewed and curated by humans. We make reasonable efforts to
            ensure accuracy but do not guarantee that AI-generated content is error-free. Use
            professional judgment when applying information from this site to critical decisions.
          </p>

          <h2>5. Affiliate Links</h2>
          <p>
            Some links on this site are affiliate links. When you click an affiliate link and make
            a purchase, we may earn a commission at no additional cost to you. Affiliate relationships
            do not influence our editorial recommendations. See our{' '}
            <a href="/legal/affiliate-disclosure" className="text-emerald-400 hover:text-emerald-300 underline">
              Affiliate Disclosure
            </a>{' '}
            for details.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on FrankX.ai — including text, graphics, logos, images, audio, and software —
            is the property of FrankX.ai or its licensors and is protected by copyright and
            intellectual property laws.
          </p>
          <p>
            Third-party trademarks mentioned on this site (Oracle, Suno, Anthropic, OpenAI, etc.)
            are the property of their respective owners. Their mention does not imply endorsement or
            affiliation.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Site and its content are provided &quot;as is&quot; without warranties of any kind,
            either express or implied. We do not warrant that the Site will be uninterrupted,
            error-free, or free of harmful components.
          </p>
          <p>
            Educational and technical content is provided for informational purposes. It does not
            constitute professional advice. Results may vary based on your implementation.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, FrankX.ai shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages arising from your use of the
            Site or any products purchased through it. Our total liability shall not exceed the
            amount you paid for the specific product giving rise to the claim.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless FrankX.ai from any claims, losses, or damages
            arising from your use of the Site or violation of these Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Netherlands. Any disputes shall be resolved
            in the courts of the Netherlands.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            We may update these Terms at any time. Changes take effect when posted. Continued use
            of the Site constitutes acceptance of the updated Terms.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions about these Terms? Contact us at{' '}
            <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
              hello@frankx.ai
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
