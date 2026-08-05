import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Client as NotionClient } from '@notionhq/client'

// In-memory lead buffer audit log
const leadMemoryStore: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, leadMagnetId, icp, variantId, agentInfo, source, quizResult } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    const cleanEmail = email.toLowerCase().trim()
    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: cleanEmail,
      leadMagnetId: leadMagnetId || 'general',
      icp: icp || 'General AI Explorer',
      variantId: variantId || 'A',
      source: source || (agentInfo ? 'a2a_agent' : 'web_funnel'),
      isAgent: Boolean(agentInfo),
      agentDetails: agentInfo || null,
      quizResult: quizResult || null,
      capturedAt: new Date().toISOString(),
      status: 'active',
      tags: [
        'frankx_lead',
        `lm_${leadMagnetId || 'general'}`,
        `icp_${(icp || 'general').toLowerCase().replace(/\s+/g, '_')}`,
        ...(agentInfo ? ['agent_registered', `agent_${agentInfo.name || 'unknown'}`] : [])
      ]
    }

    leadMemoryStore.push(leadRecord)
    console.log('[Lead Ingest] Lead stored in local audit log:', leadRecord)

    // Select delivery URLs based on lead magnet ID
    let downloadUrl = '/downloads/pdfs/FrankX-AI-Writing-System-2026.pdf'
    let notionUrl = 'https://frankx.notion.site/FrankX-AI-Writing-System-Template'
    let titleName = 'The Master AI Writing System'

    if (leadMagnetId === 'ai-agent-stack-primer') {
      downloadUrl = '/downloads/pdfs/FrankX-Agent-Swarm-Blueprint-2026.pdf'
      notionUrl = 'https://frankx.notion.site/FrankX-Agent-Architecture-Hub'
      titleName = 'Building Your First Autonomous AI Agent Swarm'
    } else if (leadMagnetId === 'top-50-ai-prompts') {
      downloadUrl = '/downloads/pdfs/FrankX-Top-50-AI-Prompts-2026.pdf'
      notionUrl = 'https://frankx.notion.site/FrankX-Top-50-Prompts-Vault'
      titleName = 'Top 50 Production AI Prompts'
    } else if (leadMagnetId === 'acos-playbook') {
      downloadUrl = '/downloads/pdfs/FrankX-ACOS-Playbook-2026.pdf'
      notionUrl = 'https://frankx.notion.site/FrankX-ACOS-Playbook-Workspace'
      titleName = 'The Agentic Creator OS (ACOS) Playbook'
    } else if (leadMagnetId === 'wordless-laws-book') {
      downloadUrl = '/downloads/pdfs/FrankX-The-Wordless-Laws-Book-One.pdf'
      notionUrl = 'https://frankx.notion.site/The-Wordless-Laws-Reader'
      titleName = 'The Wordless Laws: Book One'
    } else if (leadMagnetId === '5-day-agent-engine-challenge') {
      downloadUrl = '/downloads/pdfs/FrankX-5Day-Challenge-Workbook.pdf'
      notionUrl = 'https://frankx.notion.site/FrankX-5Day-Challenge-Workspace'
      titleName = '5-Day Autonomous Content Engine Challenge'
    }

    // ─── 1. RESEND DISPATCH (USES RESEND_FROM_EMAIL OR hello@frankx.ai) ───
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const senderAddress = process.env.RESEND_FROM_EMAIL || 'FrankX AI <hello@frankx.ai>'

        await resend.emails.send({
          from: senderAddress,
          to: cleanEmail,
          subject: `Your Access Unlocked: ${titleName}`,
          html: `
            <div style="font-family: Inter, sans-serif; background: #0A0D14; color: #FFFFFF; padding: 32px; border-radius: 16px;">
              <h1 style="color: #F59E0B; margin-bottom: 8px;">Access Granted: ${titleName}</h1>
              <p style="color: #D1D5DB; font-size: 16px; line-height: 1.6;">
                Welcome to FrankX AI. Your requested digital asset has been unlocked.
              </p>

              <div style="margin: 24px 0; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
                <p style="margin-bottom: 12px; font-weight: bold; color: #FFFFFF;">Your Download Links:</p>
                <a href="https://frankx.ai${downloadUrl}" style="display: inline-block; background: #F59E0B; color: #000000; font-weight: bold; padding: 12px 20px; text-decoration: none; border-radius: 8px; margin-right: 12px;">
                  Download PDF Package
                </a>
                <a href="${notionUrl}" style="display: inline-block; background: rgba(255,255,255,0.15); color: #FFFFFF; font-weight: bold; padding: 12px 20px; text-decoration: none; border-radius: 8px;">
                  Open Notion Workspace
                </a>
              </div>

              <p style="color: #6B7280; font-size: 12px; margin-top: 32px;">
                FrankX AI — Elite Creator. AI Architect. Humble Excellence.<br />
                Primary Contact: hello@frankx.ai | https://frankx.ai
              </p>
            </div>
          `,
        })
        console.log(`[Resend] Sent official email from ${senderAddress} to:`, cleanEmail)
      } catch (emailErr) {
        console.warn('[Resend Warning] Failed to send email:', emailErr)
      }
    }

    // ─── 2. BEEHIIV PUBLICATION API SYNC (IF BEEHIIV KEYS SET) ───
    if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
      try {
        const beehiivRes = await fetch(
          `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
            },
            body: JSON.stringify({
              email: cleanEmail,
              reactivate_existing: true,
              send_welcome_email: true,
              utm_source: 'frankx_lead_funnel',
              utm_medium: leadMagnetId,
              custom_fields: [
                { name: 'ICP', value: leadRecord.icp },
                { name: 'Variant', value: leadRecord.variantId },
              ],
            }),
          }
        )
        if (beehiivRes.ok) {
          console.log('[Beehiiv] Subscribed lead to Beehiiv publication:', cleanEmail)
        }
      } catch (beehiivErr) {
        console.warn('[Beehiiv Warning] Failed to sync lead to Beehiiv:', beehiivErr)
      }
    }

    // ─── 3. NOTION DATABASE SYNC (IF NOTION API KEY SET) ───
    if (process.env.NOTION_API_KEY && process.env.NOTION_LEADS_DATABASE_ID) {
      try {
        const notion = new NotionClient({ auth: process.env.NOTION_API_KEY })
        await notion.pages.create({
          parent: { database_id: process.env.NOTION_LEADS_DATABASE_ID },
          properties: {
            Email: { email: cleanEmail },
            'Lead Magnet': { title: [{ text: { content: titleName } }] },
            ICP: { select: { name: leadRecord.icp } },
            Variant: { select: { name: leadRecord.variantId } },
            Status: { select: { name: 'Active Subscriber' } },
            'Captured At': { date: { start: leadRecord.capturedAt } },
          },
        })
        console.log('[Notion] Lead synced to Notion Database:', cleanEmail)
      } catch (notionErr) {
        console.warn('[Notion Warning] Failed to sync to Notion database:', notionErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead successfully captured and registered.',
      leadId: leadRecord.id,
      delivery: {
        pdfDownloadUrl: downloadUrl,
        notionTemplateUrl: notionUrl,
        accessGranted: true,
      },
    })
  } catch (error: any) {
    console.error('[Lead Ingest Error]:', error)
    return NextResponse.json(
      { error: 'Failed to process lead capture request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/v1/lead-ingest',
    senderConfigured: Boolean(process.env.RESEND_FROM_EMAIL || 'hello@frankx.ai'),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    beehiivConfigured: Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID),
    notionConfigured: Boolean(process.env.NOTION_API_KEY && process.env.NOTION_LEADS_DATABASE_ID),
    totalCapturedLeads: leadMemoryStore.length,
    supportedFormats: ['application/json'],
    integrationsSupported: ['Resend', 'Beehiiv', 'Notion', 'Local Audit Log'],
    targetICPs: [
      'Human AI Architect / Technical Founder',
      'Human-AI Hybrid Companion / Writer',
      'High-Performance Creator',
      'Autonomous AI Agent (A2A)',
    ],
  })
}
