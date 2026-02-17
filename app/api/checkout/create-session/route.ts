import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { productId, productName, price } = await request.json()

    const checkoutUrl = `https://frankx.lemonsqueezy.com/checkout/buy/${productId}`

    return NextResponse.json({ 
      checkoutUrl,
      sessionId: `sess_${Date.now()}`
    })
  } catch (error) {
    console.error('[Checkout] Create session error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
