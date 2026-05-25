import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

function readJson(filename: string) {
  const filePath = path.join(DATA_DIR, filename)
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function writeJson(filename: string, data: unknown) {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// GET /api/admin/youtube?type=annotations|clips|vault
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') || 'vault'

  switch (type) {
    case 'annotations':
      return NextResponse.json(readJson('video-annotations.json'))
    case 'clips':
      return NextResponse.json(readJson('clip-queue.json'))
    case 'vault':
      return NextResponse.json(readJson('video-vault-100.json'))
    default:
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  }
}

// POST /api/admin/youtube
// body: { type: 'annotation' | 'clip' | 'video', data: ... }
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, data } = body

  if (!type || !data) {
    return NextResponse.json({ error: 'Missing type or data' }, { status: 400 })
  }

  switch (type) {
    case 'annotation': {
      const annotations = readJson('video-annotations.json') as Array<{ videoId: string }>
      const idx = annotations.findIndex((a) => a.videoId === data.videoId)
      if (idx >= 0) {
        annotations[idx] = { ...data, updatedAt: new Date().toISOString() }
      } else {
        annotations.push({ ...data, updatedAt: new Date().toISOString() })
      }
      writeJson('video-annotations.json', annotations)
      return NextResponse.json({ success: true, count: annotations.length })
    }

    case 'clip': {
      const clips = readJson('clip-queue.json') as Array<{ id: string }>
      const clipId = data.id || `clip-${Date.now()}`
      const existingIdx = clips.findIndex((c) => c.id === clipId)
      const clipData = {
        ...data,
        id: clipId,
        updatedAt: new Date().toISOString(),
        createdAt: data.createdAt || new Date().toISOString(),
      }
      if (existingIdx >= 0) {
        clips[existingIdx] = clipData
      } else {
        clips.push(clipData)
      }
      writeJson('clip-queue.json', clips)
      return NextResponse.json({ success: true, id: clipId })
    }

    case 'video': {
      const vault = readJson('video-vault-100.json') as Array<{ id: string }>
      // Check for duplicate
      if (vault.some((v) => v.id === data.id)) {
        return NextResponse.json({ error: 'Video already exists in vault' }, { status: 409 })
      }
      vault.push({
        ...data,
        embeddable: true,
        tags: data.tags || [],
      })
      writeJson('video-vault-100.json', vault)
      return NextResponse.json({ success: true, total: vault.length })
    }

    default:
      return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  }
}

// DELETE /api/admin/youtube
// body: { type: 'clip', id: string }
export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { type, id } = body

  if (type === 'clip') {
    const clips = readJson('clip-queue.json') as Array<{ id: string }>
    const filtered = clips.filter((c) => c.id !== id)
    writeJson('clip-queue.json', filtered)
    return NextResponse.json({ success: true, remaining: filtered.length })
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
}
