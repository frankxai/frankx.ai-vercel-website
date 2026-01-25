import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Affiliate Disclosure | FrankX.ai',
  description: 'Transparency about our affiliate partnerships and how they support our work.',
  path: '/legal/affiliate-disclosure',
})

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <article className="mx-auto max-w-3xl px-6 text-white/80">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Affiliate Disclosure</h1>
        <p className="mb-10 text-sm text-white/40">Last updated: January 25, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white">

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-white/90">
              <strong className="text-white">In short:</strong> Some links on this site are affiliate links.
              If you click one and make a purchase, we may earn a commission at no extra cost to you.
              This helps support our content and research. Affiliate relationships never influence our
              recommendations — we only recommend tools we genuinely use.
            </p>
          </div>

          <h2>What Are Affiliate Links?</h2>
          <p>
            Affiliate links are special URLs that track when someone clicks through to a product or
            service from our site. If you make a purchase after clicking an affiliate link, the
            company pays us a small commission. The price you pay is the same regardless of whether
            you use our link.
          </p>

          <h2>How We Choose What to Recommend</h2>
          <p>
            Our editorial recommendations are based on direct experience. We use these tools in our
            own work — building AI systems, creating music, producing content. We will never recommend
            a product solely because it offers an affiliate commission. If a product has an affiliate
            program and we genuinely use it, we participate. If we recommend a product that does not
            have an affiliate program, we still recommend it.
          </p>

          <h2>Affiliate Partners</h2>
          <p>We may earn commissions from the following services when you sign up through our links:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>AI tools (Claude/Anthropic, ChatGPT/OpenAI, Midjourney, Suno, Perplexity)</li>
            <li>Productivity tools (Notion, Airtable, Zapier, Make.com)</li>
            <li>Creative tools (Figma, Adobe, Canva, Descript)</li>
            <li>Business tools (Stripe, Gumroad, Teachable, ConvertKit)</li>
          </ul>

          <h2>How to Identify Affiliate Links</h2>
          <p>
            Affiliate links on this site may include tracking parameters in the URL. Pages or
            sections containing affiliate links will include a disclosure notice. Our{' '}
            <a href="/affiliates" className="text-emerald-400 hover:text-emerald-300 underline">
              Affiliates page
            </a>{' '}
            lists all current partnerships.
          </p>

          <h2>FTC Compliance</h2>
          <p>
            This disclosure is provided in accordance with the Federal Trade Commission&apos;s
            guidelines on endorsements and testimonials (16 CFR Part 255). We are committed to
            transparent and honest recommendations.
          </p>

          <h2>Questions</h2>
          <p>
            If you have questions about our affiliate relationships, contact us at{' '}
            <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
              hello@frankx.ai
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
