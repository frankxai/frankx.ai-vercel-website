import { redirect } from 'next/navigation'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Waitlist | FrankX',
  description: 'FrankX is in waitlist mode — no purchases right now.',
  path: '/checkout/cancel',
})

// Legacy checkout cancel URL. The site is currently in waitlist-only mode
// (no sales infrastructure live). Redirect to the canonical waitlist surface.
export default function CheckoutCancel() {
  redirect('/waitlist')
}
