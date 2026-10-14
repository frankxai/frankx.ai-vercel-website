import Link from 'next/link'
import { handleState } from '@/lib/demand-capture/handler'
import type { WaitlistState } from '@/lib/demand-capture/types'
import { WaitlistForm } from '@/lib/demand-capture/WaitlistForm'
import { waitlistProduct } from '@/lib/waitlist/products'
import './waitlist.css'

/** Server component, so first paint carries the honest count state when the store answers. */
export async function ProductWaitlist({ productId, productName }: { productId: string; productName: string }) {
  const product = waitlistProduct(productId)
  let initialState: WaitlistState | undefined
  if (product) {
    try {
      initialState = (await handleState(product)).body
    } catch {
      initialState = undefined
    }
  }

  return (
    <div className="waitlist">
      <WaitlistForm
        productId={productId}
        productName={productName}
        placeholder="you@example.com"
        initialState={initialState}
      />
      <p className="wl-note mt-4">
        <Link href="/privacy" className="underline decoration-slate-600 underline-offset-2">
          Privacy details
        </Link>
      </p>
    </div>
  )
}
