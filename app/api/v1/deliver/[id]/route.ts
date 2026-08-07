import { NextResponse } from 'next/server'
import leadMagnets from '@/data/lead-magnets.json'

const SITE = 'https://frankx.ai'

type LeadMagnet = {
  id: string
  title: string
  subtitle: string
  category: string
  icp: string
  format: string[]
  slug: string
  status: string
  pdfUrl?: string
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const magnet = (leadMagnets as LeadMagnet[]).find((m) => m.id === id || m.slug === id)

  if (!magnet) {
    return NextResponse.json({ error: 'Lead magnet not found' }, { status: 404 })
  }
  if (magnet.status !== 'published' || !magnet.pdfUrl) {
    return NextResponse.json({ error: 'This resource is not available yet' }, { status: 409 })
  }

  return NextResponse.json({
    id: magnet.id,
    title: magnet.title,
    subtitle: magnet.subtitle,
    category: magnet.category,
    icp: magnet.icp,
    format: magnet.format,
    pdfUrl: `${SITE}${magnet.pdfUrl}`,
    requestAccess: `${SITE}/api/v1/lead-ingest`,
  })
}
