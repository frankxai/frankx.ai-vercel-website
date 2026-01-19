import { NextRequest, NextResponse } from 'next/server'

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID

// ConvertKit forms mapping
const CONVERTKIT_FORMS = {
  'creation-chronicles': process.env.CONVERTKIT_CREATION_CHRONICLES_FORM_ID,
  'inner-circle': process.env.CONVERTKIT_INNER_CIRCLE_FORM_ID,
  'newsletter': process.env.CONVERTKIT_NEWSLETTER_FORM_ID,
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, listType = 'newsletter' } = await request.json()

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Get the appropriate ConvertKit form ID
    const formId = CONVERTKIT_FORMS[listType as keyof typeof CONVERTKIT_FORMS] || CONVERTKIT_FORM_ID

    if (!CONVERTKIT_API_KEY || !formId) {
      console.error('ConvertKit API key or Form ID not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      )
    }

    // Subscribe to ConvertKit
    const convertKitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          first_name: name || '',
        }),
      }
    )

    if (!convertKitResponse.ok) {
      const errorData = await convertKitResponse.json()
      console.error('ConvertKit API error:', errorData)

      // Check for duplicate email
      if (convertKitResponse.status === 400 && errorData.message?.includes('already subscribed')) {
        return NextResponse.json(
          { error: 'This email is already subscribed!' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    const data = await convertKitResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      subscriber: data.subscription,
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
