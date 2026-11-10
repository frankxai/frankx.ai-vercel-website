import { WAITLIST_PRODUCTS } from '@/lib/demand-capture/products'
import { createWaitlistRoute } from '@/lib/demand-capture/waitlist-route'
import { emailRatelimit } from '@/lib/ratelimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const route = createWaitlistRoute({
  products: WAITLIST_PRODUCTS,
  limit: (key) => emailRatelimit.limit(key),
})

export const POST = route.POST
export const GET = route.GET
export const OPTIONS = route.OPTIONS
