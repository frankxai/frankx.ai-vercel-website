import { NextRequest, NextResponse } from 'next/server'
import {
  getAllSubscribers,
  getSubscribersBySource,
  getSubscribersByTag,
  getActiveSubscribers,
  createSubscriber,
  getSubscriberStats
} from '@/lib/email-sequences/subscribers'
import { enrollInSequence, scheduleSequenceForSubscriber } from '@/lib/email-sequences/scheduler'
import type { SubscriberSource } from '@/types/email-sequences'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') as SubscriberSource | null
    const tag = searchParams.get('tag')
    const activeOnly = searchParams.get('active') === 'true'
    const stats = searchParams.get('stats') === 'true'
    
    if (stats) {
      const statistics = getSubscriberStats()
      return NextResponse.json({ stats: statistics })
    }
    
    let subscribers
    
    if (source) {
      subscribers = getSubscribersBySource(source)
    } else if (tag) {
      subscribers = getSubscribersByTag(tag)
    } else if (activeOnly) {
      subscribers = getActiveSubscribers()
    } else {
      subscribers = getAllSubscribers()
    }
    
    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error('[API] Get subscribers error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, source, tags, enrollInWelcome } = body
    
    if (!email || !source) {
      return NextResponse.json(
        { error: 'Email and source are required' },
        { status: 400 }
      )
    }
    
    // Create subscriber
    const subscriber = createSubscriber({
      email,
      firstName,
      lastName,
      status: 'active',
      source,
      tags: tags || []
    })
    
    // Auto-enroll in welcome sequence if requested
    if (enrollInWelcome) {
      scheduleSequenceForSubscriber(subscriber, 'welcome-series')
    }
    
    return NextResponse.json({ subscriber }, { status: 201 })
  } catch (error) {
    console.error('[API] Create subscriber error:', error)
    
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: 'Subscriber with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create subscriber' },
      { status: 500 }
    )
  }
}
