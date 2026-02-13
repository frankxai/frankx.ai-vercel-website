import { isIP } from 'node:net'
import { NextRequest, NextResponse } from 'next/server'

const MAX_CONTENT_CHARS = 12000
const MAX_FETCH_CHARS = 24000
const FETCH_TIMEOUT_MS = 8000
const REQUESTS_PER_WINDOW = 20
const WINDOW_MS = 60 * 1000

const TRUSTED_NEWS_DOMAINS = new Set([
  'apnews.com',
  'bbc.com',
  'bloomberg.com',
  'economist.com',
  'ft.com',
  'npr.org',
  'reuters.com',
  'wsj.com',
])

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

interface AnalyzeRequest {
  content?: string
  sourceUrl?: string
  sourceType?: 'article' | 'post' | 'video' | 'chat' | 'other'
  context?: string
}

type RiskVerdict = 'low' | 'guarded' | 'high' | 'critical'
type ConfidenceLevel = 'low' | 'medium' | 'high'
type SignalSeverity = 'low' | 'medium' | 'high'

interface Signal {
  id: string
  label: string
  severity: SignalSeverity
  scoreImpact: number
  evidence: string[]
  description: string
}

interface ExtractedClaim {
  text: string
  confidence: ConfidenceLevel
  rationale: string
}

interface AnalysisResult {
  riskScore: number
  verdict: RiskVerdict
  confidence: ConfidenceLevel
  summary: string
}

interface LiveSourceResult {
  url: string
  domain: string
  title?: string
  fetchedText: string
  contentType: string
  status: number
}

const manipulativePatterns: Array<{
  id: string
  label: string
  description: string
  regex: RegExp
  scoreImpact: number
  severity: SignalSeverity
}> = [
  {
    id: 'urgent_emotional_language',
    label: 'Urgency + emotional trigger language',
    description: 'Content pushes immediate action through fear, outrage, or shock.',
    regex: /\b(shocking|urgent|wake up|before they delete this|cover-up|hidden truth|panic|must share now)\b/gi,
    scoreImpact: 12,
    severity: 'high',
  },
  {
    id: 'absolute_certainty',
    label: 'Absolute certainty framing',
    description: 'Statements use always/never certainty that may skip nuance.',
    regex: /\b(always|never|everyone knows|undeniable|proven once and for all|no doubt)\b/gi,
    scoreImpact: 8,
    severity: 'medium',
  },
  {
    id: 'conspiracy_framing',
    label: 'Conspiracy framing markers',
    description: 'Content implies coordinated hidden actors without evidence.',
    regex: /\b(they don'?t want you to know|mainstream media is hiding|secret agenda|deep state|global plot)\b/gi,
    scoreImpact: 14,
    severity: 'high',
  },
  {
    id: 'imitation_authority',
    label: 'Unverifiable authority references',
    description: 'Relies on unnamed experts or anonymous insiders.',
    regex: /\b(experts say|scientists proved|insiders reveal|sources confirm|a doctor said)\b/gi,
    scoreImpact: 9,
    severity: 'medium',
  },
  {
    id: 'engagement_bait',
    label: 'Engagement bait',
    description: 'Asks for shares/likes instead of evidence links.',
    regex: /\b(share this everywhere|repost this now|if this gets taken down|they will censor this)\b/gi,
    scoreImpact: 10,
    severity: 'high',
  },
]

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request)
  const limitState = enforceRateLimit(clientId)

  if (!limitState.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Please retry shortly.',
        retryAfterMs: limitState.retryAfterMs,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((limitState.retryAfterMs ?? 0) / 1000)) },
      }
    )
  }

  try {
    const body = (await request.json()) as AnalyzeRequest
    const inputContent = normalizeInput(body.content)
    const sourceUrl = body.sourceUrl?.trim()

    if (!inputContent && !sourceUrl) {
      return NextResponse.json(
        { error: 'Provide either `content` or `sourceUrl` for analysis.' },
        { status: 400 }
      )
    }

    let liveSource: LiveSourceResult | null = null
    let contentToAnalyze = inputContent

    if (sourceUrl) {
      const parsedUrl = validateSourceUrl(sourceUrl)
      if ('error' in parsedUrl) {
        const errorMessage = parsedUrl.error
        return NextResponse.json({ error: errorMessage }, { status: 400 })
      }

      liveSource = await fetchLiveSource(parsedUrl.url)
      contentToAnalyze = contentToAnalyze || liveSource.fetchedText
    }

    if (!contentToAnalyze) {
      return NextResponse.json(
        { error: 'No analyzable content was extracted. Please paste text directly.' },
        { status: 422 }
      )
    }

    const clippedContent = clipText(contentToAnalyze, MAX_CONTENT_CHARS)
    const analysis = runMisinformationAnalysis(clippedContent, liveSource?.domain)

    return NextResponse.json({
      analysisId: `guardian_${Date.now().toString(36)}`,
      analyzedAt: new Date().toISOString(),
      source: liveSource
        ? {
            mode: 'url',
            url: liveSource.url,
            domain: liveSource.domain,
            title: liveSource.title,
            status: liveSource.status,
            contentType: liveSource.contentType,
          }
        : { mode: 'text' },
      context: {
        sourceType: body.sourceType || 'other',
        userContext: body.context || null,
      },
      input: {
        characters: clippedContent.length,
        sentences: countSentences(clippedContent),
        words: clippedContent.split(/\s+/).filter(Boolean).length,
      },
      result: analysis.result,
      signals: analysis.signals,
      claims: analysis.claims,
      recommendations: analysis.recommendations,
      limitations: [
        'This system estimates misinformation risk; it does not establish objective truth.',
        'Always cross-check with primary evidence and credible independent reporting.',
      ],
      model: 'misinformation-guardian-rule-engine-v1',
    })
  } catch (error) {
    console.error('Misinformation Guardian analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/misinformation/analyze',
    capabilities: [
      'Live URL fetch + text extraction',
      'Manipulation signal detection',
      'Risk scoring with explainable evidence',
      'Actionable recommendations for verification',
    ],
    limits: {
      maxContentCharacters: MAX_CONTENT_CHARS,
      requestsPerMinute: REQUESTS_PER_WINDOW,
    },
  })
}

function normalizeInput(content: string | undefined): string {
  if (!content) return ''
  return content.replace(/\s+/g, ' ').trim()
}

function clipText(value: string, maxChars: number): string {
  if (value.length <= maxChars) return value
  return value.slice(0, maxChars)
}

function countSentences(content: string): number {
  return content.split(/[.!?]+\s+/).filter((part) => part.trim().length > 0).length
}

function runMisinformationAnalysis(content: string, domain?: string) {
  const signals: Signal[] = []
  let riskScore = 28

  for (const pattern of manipulativePatterns) {
    const matches = content.match(pattern.regex)
    if (!matches || matches.length === 0) continue

    signals.push({
      id: pattern.id,
      label: pattern.label,
      description: pattern.description,
      severity: pattern.severity,
      scoreImpact: pattern.scoreImpact,
      evidence: unique(matches.map((match) => match.toLowerCase())).slice(0, 4),
    })

    riskScore += pattern.scoreImpact + Math.min(matches.length - 1, 3)
  }

  const hasOutboundLinks = /(https?:\/\/[^\s)]+)|(www\.[^\s)]+)/i.test(content)
  if (!hasOutboundLinks) {
    signals.push({
      id: 'no_citations_detected',
      label: 'No citations detected',
      description: 'Claims appear without direct links to supporting evidence.',
      severity: 'medium',
      scoreImpact: 10,
      evidence: ['No URLs or citation-like references found in analyzed text'],
    })
    riskScore += 10
  }

  const allCapsWords = content.match(/\b[A-Z]{4,}\b/g) || []
  if (allCapsWords.length >= 4) {
    signals.push({
      id: 'all_caps_pressure',
      label: 'All-caps pressure cues',
      description: 'High-emphasis typography can indicate emotional pressure tactics.',
      severity: 'medium',
      scoreImpact: 7,
      evidence: unique(allCapsWords).slice(0, 5),
    })
    riskScore += 7
  }

  if (content.length < 420) {
    signals.push({
      id: 'short_context',
      label: 'Limited context',
      description: 'Short excerpts can increase uncertainty and misinterpretation risk.',
      severity: 'low',
      scoreImpact: 5,
      evidence: [`Only ${content.length} characters analyzed`],
    })
    riskScore += 5
  }

  if (domain) {
    if (TRUSTED_NEWS_DOMAINS.has(domain)) {
      signals.push({
        id: 'known_news_domain',
        label: 'Known editorial domain',
        description: 'Source domain is associated with established editorial standards.',
        severity: 'low',
        scoreImpact: -12,
        evidence: [domain],
      })
      riskScore -= 12
    } else {
      signals.push({
        id: 'unknown_domain',
        label: 'Unknown domain trust level',
        description: 'Domain is not in the current baseline trust set.',
        severity: 'low',
        scoreImpact: 4,
        evidence: [domain],
      })
      riskScore += 4
    }
  }

  riskScore = clamp(riskScore, 0, 100)

  const claims = extractClaims(content)
  const verdict = mapVerdict(riskScore)
  const confidence = mapConfidence(content.length, signals.length)

  const recommendations = buildRecommendations(riskScore, signals, Boolean(domain))
  const summary = buildSummary(verdict, riskScore, signals.length)

  return {
    result: { riskScore, verdict, confidence, summary } satisfies AnalysisResult,
    signals: signals.sort((a, b) => b.scoreImpact - a.scoreImpact),
    claims,
    recommendations,
  }
}

function extractClaims(content: string): ExtractedClaim[] {
  const sentenceCandidates = content
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 45 && sentence.length <= 260)

  const claims = sentenceCandidates
    .filter((sentence) =>
      /\b(is|are|will|did|has|have|caused|proves|shows|confirms|banned|killed|infected)\b/i.test(sentence)
    )
    .slice(0, 5)
    .map((sentence) => {
      const hasNumericSupport = /\d/.test(sentence)
      return {
        text: sentence,
        confidence: hasNumericSupport ? 'medium' : 'low',
        rationale: hasNumericSupport
          ? 'Contains measurable detail but still needs source verification.'
          : 'Claim-like statement without measurable evidence in text.',
      } satisfies ExtractedClaim
    })

  if (claims.length > 0) return claims

  return [
    {
      text: 'No explicit claim sentence extracted from the provided content.',
      confidence: 'low',
      rationale: 'Paste a longer passage for better claim extraction quality.',
    },
  ]
}

function buildRecommendations(riskScore: number, signals: Signal[], hasDomain: boolean): string[] {
  const recs: string[] = []

  if (riskScore >= 55) {
    recs.push('Pause sharing until at least two independent, high-credibility sources confirm core claims.')
    recs.push('Trace each major claim to a primary source (official report, dataset, direct statement).')
  }

  if (signals.some((s) => s.id === 'no_citations_detected')) {
    recs.push('Request evidence links before treating this as reliable information.')
  }

  if (signals.some((s) => s.id === 'conspiracy_framing')) {
    recs.push('Separate verifiable facts from speculative motive narratives.')
  }

  if (!hasDomain) {
    recs.push('Add source URL to enable domain-level context checks in the next pass.')
  }

  if (recs.length === 0) {
    recs.push('Continue monitoring updates and check publication date for recency drift.')
    recs.push('Validate that quoted statistics are consistent with official sources.')
  }

  return unique(recs).slice(0, 6)
}

function buildSummary(verdict: RiskVerdict, score: number, signalCount: number): string {
  if (verdict === 'critical') {
    return `Critical risk (${score}/100): multiple high-risk misinformation markers detected across ${signalCount} signals.`
  }
  if (verdict === 'high') {
    return `High risk (${score}/100): several manipulation or evidence-quality issues detected.`
  }
  if (verdict === 'guarded') {
    return `Guarded risk (${score}/100): mixed quality signals; verify before relying or sharing.`
  }
  return `Low risk (${score}/100): no major manipulation pattern dominates, but verification is still recommended.`
}

function mapVerdict(score: number): RiskVerdict {
  if (score >= 76) return 'critical'
  if (score >= 56) return 'high'
  if (score >= 36) return 'guarded'
  return 'low'
}

function mapConfidence(contentLength: number, signalCount: number): ConfidenceLevel {
  if (contentLength >= 1800 && signalCount >= 3) return 'high'
  if (contentLength >= 700) return 'medium'
  return 'low'
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items))
}

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIp || 'anonymous'
}

function enforceRateLimit(clientId: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now()

  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key)
    }
  }

  const existing = rateLimitStore.get(clientId)
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientId, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (existing.count >= REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: existing.resetAt - now }
  }

  rateLimitStore.set(clientId, { ...existing, count: existing.count + 1 })
  return { allowed: true }
}

function validateSourceUrl(rawUrl: string): { ok: true; url: URL } | { ok: false; error: string } {
  try {
    const parsed = new URL(rawUrl)

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { ok: false, error: 'Only http/https URLs are supported.' }
    }

    const hostname = parsed.hostname.toLowerCase()
    if (isBlockedHostname(hostname)) {
      return { ok: false, error: 'This hostname is not allowed for live fetch.' }
    }

    return { ok: true, url: parsed }
  } catch {
    return { ok: false, error: 'Invalid URL format.' }
  }
}

function isBlockedHostname(hostname: string): boolean {
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal')
  ) {
    return true
  }

  const ipType = isIP(hostname)
  if (ipType === 4) return isPrivateIPv4(hostname)
  if (ipType === 6) return isPrivateIPv6(hostname)

  return false
}

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split('.').map((part) => Number(part))

  if (a === 10) return true
  if (a === 127) return true
  if (a === 0) return true
  if (a === 169 && b === 254) return true
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true

  return false
}

function isPrivateIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase()
  return (
    normalized === '::1' ||
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe80')
  )
}

async function fetchLiveSource(url: URL): Promise<LiveSourceResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'FrankX Misinformation Guardian/1.0 (+https://frankx.ai)',
      },
      redirect: 'follow',
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Source returned status ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || 'text/plain'
    if (!/text\/html|text\/plain|application\/json|application\/ld\+json/i.test(contentType)) {
      throw new Error('Unsupported content type for live analysis')
    }

    const rawText = await response.text()
    const clippedRaw = clipText(rawText, MAX_FETCH_CHARS)

    const extracted = extractReadableText(clippedRaw, contentType)
    if (!extracted.text.trim()) {
      throw new Error('No readable text extracted from source')
    }

    return {
      url: url.toString(),
      domain: url.hostname.toLowerCase(),
      title: extracted.title,
      fetchedText: extracted.text,
      contentType,
      status: response.status,
    }
  } finally {
    clearTimeout(timeout)
  }
}

function extractReadableText(raw: string, contentType: string): { text: string; title?: string } {
  if (/application\/json|application\/ld\+json/i.test(contentType)) {
    try {
      const parsed = JSON.parse(raw)
      const jsonText = JSON.stringify(parsed)
      return { text: jsonText }
    } catch {
      return { text: raw }
    }
  }

  if (/text\/html/i.test(contentType)) {
    const titleMatch = raw.match(/<title[^>]*>(.*?)<\/title>/i)
    const title = titleMatch?.[1]?.replace(/\s+/g, ' ').trim()

    const withoutScripts = raw
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ')
      .trim()

    return { text: withoutScripts, title }
  }

  return { text: raw.replace(/\s+/g, ' ').trim() }
}
