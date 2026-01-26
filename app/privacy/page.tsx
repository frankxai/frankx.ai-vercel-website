import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Privacy Policy | FrankX.ai',
  description: 'How FrankX.ai collects, uses, and protects your personal information.',
  path: '/privacy',
})

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#030712] py-24">
      <article className="mx-auto max-w-3xl px-6 text-white/80">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl">Privacy Policy</h1>
        <p className="mb-10 text-sm text-white/55">Last updated: January 26, 2026</p>

        <div className="space-y-8 text-sm leading-relaxed [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white/90 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-1">

          <p>
            FrankX.ai (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at{' '}
            <strong className="text-white">https://frankx.ai</strong>. This Privacy Policy explains
            what information we collect, how we use it, and your rights regarding that information.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide</h3>
          <ul>
            <li><strong className="text-white/90">Email address</strong> — when you subscribe to our newsletter or download resources</li>
            <li><strong className="text-white/90">Name, company, and role</strong> — when you fill out lead forms or assessments</li>
            <li><strong className="text-white/90">Payment information</strong> — processed by Gumroad (we do not store payment card details)</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li><strong className="text-white/90">Usage data</strong> — pages visited, time on site, referral source</li>
            <li><strong className="text-white/90">Device information</strong> — browser type, operating system, screen resolution</li>
            <li><strong className="text-white/90">IP address</strong> — used for analytics and security (not stored long-term)</li>
            <li><strong className="text-white/90">Cookies</strong> — see Section 4 below</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To send newsletters and product updates you opted into</li>
            <li>To deliver digital products you purchased</li>
            <li>To improve our website, content, and products</li>
            <li>To analyze aggregate usage patterns (anonymized)</li>
            <li>To respond to inquiries you send us</li>
          </ul>
          <p>
            We do <strong className="text-white">not</strong> sell, rent, or share your personal
            information with third parties for their marketing purposes.
          </p>

          <h2>3. Third-Party Services</h2>
          <p>We use the following services that may process your data:</p>

          <h3>Infrastructure &amp; Analytics</h3>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white">Service</th>
                  <th className="px-4 py-3 font-semibold text-white">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-white">Data Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="px-4 py-2">Vercel</td><td className="px-4 py-2">Hosting, CDN, edge functions</td><td className="px-4 py-2">Server logs, IP address</td></tr>
                <tr><td className="px-4 py-2">Vercel KV &amp; Blob</td><td className="px-4 py-2">Data storage, file hosting</td><td className="px-4 py-2">User-submitted content</td></tr>
                <tr><td className="px-4 py-2">Upstash</td><td className="px-4 py-2">Rate limiting, abuse prevention</td><td className="px-4 py-2">IP address (short-term)</td></tr>
                <tr><td className="px-4 py-2">Plausible Analytics</td><td className="px-4 py-2">Privacy-friendly analytics</td><td className="px-4 py-2">Anonymized usage data (no cookies)</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Email &amp; Payments</h3>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white">Service</th>
                  <th className="px-4 py-3 font-semibold text-white">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-white">Data Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="px-4 py-2">Resend</td><td className="px-4 py-2">Transactional email delivery</td><td className="px-4 py-2">Email address, name</td></tr>
                <tr><td className="px-4 py-2">Gumroad</td><td className="px-4 py-2">Payment processing, product delivery</td><td className="px-4 py-2">Payment details, email, purchase history</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Embedded Content</h3>
          <p className="mb-3">
            Some pages include embedded content from third-party platforms. When you interact with
            embedded content (e.g., play a video or music track), these services may collect data
            about you according to their own privacy policies:
          </p>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white">Service</th>
                  <th className="px-4 py-3 font-semibold text-white">Content Type</th>
                  <th className="px-4 py-3 font-semibold text-white">May Collect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr><td className="px-4 py-2">YouTube</td><td className="px-4 py-2">Video tutorials</td><td className="px-4 py-2">Viewing history, cookies</td></tr>
                <tr><td className="px-4 py-2">Spotify</td><td className="px-4 py-2">Music samples</td><td className="px-4 py-2">Listening data, cookies</td></tr>
                <tr><td className="px-4 py-2">Suno</td><td className="px-4 py-2">AI-generated music</td><td className="px-4 py-2">Playback data</td></tr>
                <tr><td className="px-4 py-2">Vimeo</td><td className="px-4 py-2">Video content</td><td className="px-4 py-2">Viewing history, cookies</td></tr>
                <tr><td className="px-4 py-2">Twitter/X</td><td className="px-4 py-2">Social posts</td><td className="px-4 py-2">Browsing data, cookies</td></tr>
                <tr><td className="px-4 py-2">TikTok</td><td className="px-4 py-2">Short-form video</td><td className="px-4 py-2">Viewing data, device info</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Embeds are loaded only when you click to play them. We use a &quot;click to load&quot;
            pattern to minimize third-party tracking until you choose to interact.
          </p>

          <p className="mt-4">Each third-party service operates under its own privacy policy. We encourage you to review them.</p>

          <h2 id="cookies">4. Cookies</h2>
          <p>
            <strong className="text-white">Essential cookies:</strong> Required for the website to function
            (session management, cookie consent preference). These are set automatically and cannot be
            disabled without breaking core functionality.
          </p>
          <p>
            <strong className="text-white">Analytics:</strong> We use Plausible Analytics, which
            is cookie-free and GDPR-compliant by design. No tracking cookies are set for analytics.
          </p>
          <p>
            <strong className="text-white">Embedded content cookies:</strong> When you click to load
            embedded content (YouTube, Spotify, etc.), those platforms may set their own cookies.
            These load only after you interact with the embed, not on initial page load.
          </p>
          <p>
            <strong className="text-white">Affiliate cookies:</strong> When you click affiliate links,
            third-party services may set cookies to track referrals. These are governed by the
            third-party&apos;s cookie policy.
          </p>
          <p className="mt-4">
            You can manage your cookie preferences using the banner at the bottom of the page, or by
            adjusting your browser settings to block or delete cookies.
          </p>

          <h2>5. Your Rights</h2>

          <h3>Under GDPR (EU/EEA residents)</h3>
          <ul>
            <li><strong className="text-white/90">Access</strong> — request a copy of your data</li>
            <li><strong className="text-white/90">Rectification</strong> — correct inaccurate data</li>
            <li><strong className="text-white/90">Erasure</strong> — request deletion of your data</li>
            <li><strong className="text-white/90">Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong className="text-white/90">Objection</strong> — object to processing based on legitimate interest</li>
            <li><strong className="text-white/90">Withdraw consent</strong> — at any time, without affecting prior processing</li>
          </ul>

          <h3>Under CCPA (California residents)</h3>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to request deletion</li>
            <li>Right to opt out of the sale of personal information (we do not sell your data)</li>
            <li>Right to non-discrimination for exercising your rights</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>
            We retain your email and account data for as long as you maintain your subscription or account.
            You can unsubscribe at any time using the link in any email. Upon request, we will delete your
            data within 30 days.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We use industry-standard measures to protect your data, including HTTPS encryption,
            secure hosting on Vercel, and access controls for administrative systems. No method of
            transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under 16. We do not knowingly collect personal
            information from children. If you believe a child has provided us with personal information,
            please contact us and we will delete it.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be posted on this page with
            an updated &quot;Last updated&quot; date. Continued use of the site after changes constitutes
            acceptance.
          </p>

          <h2>10. Contact</h2>
          <p>
            For privacy-related requests, data access, or deletion requests, contact us at:{' '}
            <a href="mailto:hello@frankx.ai" className="text-emerald-400 hover:text-emerald-300 underline">
              hello@frankx.ai
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}
