import { NextResponse } from 'next/server'
import leadMagnets from '@/data/lead-magnets.json'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const leadMagnet = leadMagnets.find((lm) => lm.id === id || lm.slug === id)

  if (!leadMagnet) {
    return NextResponse.json(
      { error: 'Lead magnet asset not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    id: leadMagnet.id,
    title: leadMagnet.title,
    subtitle: leadMagnet.subtitle,
    category: leadMagnet.category,
    icp: leadMagnet.icp,
    delivery: {
      pdfUrl: `https://frankx.ai${leadMagnet.pdfUrl}`,
      notionWorkspaceUrl: leadMagnet.notionUrl,
      downloadDirect: true,
      format: leadMagnet.format,
      stats: leadMagnet.stats
    },
    message: 'Access token validated. Resource ready for download.'
  })
}
