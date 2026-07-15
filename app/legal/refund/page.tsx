import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy — FrankX',
  description: 'Refund and cancellation policy for FrankX digital products and services.',
}

export default function RefundPage() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <h1 className="text-3xl font-bold text-white mb-2">Refund Policy</h1>
      <p className="text-zinc-500 text-sm mb-8">Effective: [DATE] &bull; Last updated: March 2026</p>

      <Section title="Digital Products (Downloads)">
        <p>Under the EU Consumer Rights Directive, you have a 14-day right of withdrawal for online purchases. However, for digital products with immediate delivery, this right is waived when you:</p>
        <ol>
          <li>Give explicit consent to begin the download/access immediately</li>
          <li>Acknowledge that you lose your right of withdrawal</li>
        </ol>
        <p>This consent is requested during checkout. If you did not waive this right, you may request a refund within 14 days of purchase.</p>
      </Section>

      <Section title="Subscriptions">
        <p>Monthly subscriptions can be cancelled at any time. Cancellation takes effect at the end of your current billing period. No partial refunds are issued for the remaining days of a billing period.</p>
        <p>Annual subscriptions may be refunded within 14 days of purchase or renewal if you have not significantly used the service during that period.</p>
      </Section>

      <Section title="Courses and Workshops">
        <p>Online courses may be refunded within 14 days of purchase if you have accessed less than 25% of the course content. Beyond 25% access, no refund is available.</p>
        <p>Live workshops and events may be refunded up to 7 days before the scheduled date.</p>
      </Section>

      <Section title="Consulting and Coaching">
        <p>Consulting sessions may be rescheduled up to 24 hours before the scheduled time. Cancellations with less than 24 hours notice are non-refundable.</p>
      </Section>

      <Section title="How to Request a Refund">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 mt-3">
          <p className="text-zinc-300 font-medium mb-2">Contact us at:</p>
          <p><a href="mailto:frank@frankx.ai" className="text-violet-400">frank@frankx.ai</a></p>
          <p className="mt-3 text-zinc-500 text-xs">Please include your order number, the product purchased, and the reason for your refund request. We aim to respond within 2 business days.</p>
        </div>
      </Section>

      <Section title="Refund Processing">
        <p>Approved refunds are processed within 5-10 business days. The refund will be issued to the original payment method used for the purchase.</p>
      </Section>

      <Section title="Exceptions">
        <p>We reserve the right to refuse refund requests that we reasonably believe are made in bad faith, including but not limited to: repeated purchases and refund requests, or evidence that the product was fully consumed before requesting a refund.</p>
      </Section>

      <Section title="Your Consumer Rights">
        <p>This refund policy does not affect your statutory consumer rights under Dutch and EU law. If you believe your consumer rights have been violated, you may contact the{' '}
          <a href="https://www.consuwijzer.nl" target="_blank" rel="noopener noreferrer" className="text-violet-400">
            ConsuWijzer
          </a>{' '}
          (Dutch consumer information portal) or use the{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-violet-400">
            EU Online Dispute Resolution platform
          </a>.
        </p>
      </Section>

      <p className="text-zinc-600 text-xs mt-12">Last updated: March 2026</p>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-zinc-200 mb-3">{title}</h2>
      <div className="text-zinc-400 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
