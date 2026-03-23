import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const SOCIAL_QUEUE_PATH = join(process.cwd(), 'data', 'social-queue.json')

function loadQueue() {
  if (!existsSync(SOCIAL_QUEUE_PATH)) return { queue: [], config: {} }
  try {
    return JSON.parse(readFileSync(SOCIAL_QUEUE_PATH, 'utf-8'))
  } catch {
    return { queue: [], config: {} }
  }
}

export async function GET() {
  try {
    const data = loadQueue()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to load social queue:', error)
    return NextResponse.json({ error: 'Failed to load social queue' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, id, updates } = body

    const data = loadQueue()

    if (action === 'update-status' && id && updates?.status) {
      const item = data.queue.find((q: { id: string }) => q.id === id)
      if (item) {
        item.status = updates.status
        if (updates.platform && item.platforms[updates.platform]) {
          item.platforms[updates.platform].status = updates.status
        }
        writeFileSync(SOCIAL_QUEUE_PATH, JSON.stringify(data, null, 2))
        return NextResponse.json({ success: true, item })
      }
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Failed to update social queue:', error)
    return NextResponse.json({ error: 'Failed to update social queue' }, { status: 500 })
  }
}
