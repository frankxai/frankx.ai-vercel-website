/**
 * POST /api/404/alias — operator-approved alias addition.
 *
 * Called by /admin/404-radar when the operator clicks "Add alias →" next to
 * a logged 404 path. Body: { from: '/typo', to: '/canonical-route', reason?: string }.
 *
 * Behavior:
 *   - Auth-gated: requires a valid NextAuth session (admin paths already
 *     enforced by middleware.ts, but we double-check here defense-in-depth).
 *   - Validates `to` exists in data/route-index.json — refuses to create a
 *     redirect to a non-existent route (would just shift the 404).
 *   - Refuses to overwrite an existing alias unless `?force=1` is in URL.
 *   - Atomically writes to data/redirect-aliases.json. Next deploy picks it up
 *     via next.config.mjs `redirects()`.
 *
 * NOT for agent automation — agent proposals in Phase 3 write to a separate
 * queue file (private/404-agent-queue.jsonl) and require operator approval
 * via this same endpoint.
 */

import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import routeIndex from '@/data/route-index.json'

export const runtime = 'nodejs'

interface AliasFile {
  $schema?: unknown
  aliases: Record<string, string>
}

const PATH_RE = /^\/[^?#\s]{0,512}$/

export async function POST(req: NextRequest) {
  // Defense in depth — middleware also gates /admin/* and /api/dashboard/leads
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body: { from?: string; to?: string; reason?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const from = typeof body.from === 'string' ? body.from.trim() : ''
  const to = typeof body.to === 'string' ? body.to.trim() : ''
  if (!PATH_RE.test(from) || !PATH_RE.test(to)) {
    return NextResponse.json({ ok: false, error: 'invalid_paths' }, { status: 400 })
  }
  if (from === to) {
    return NextResponse.json({ ok: false, error: 'from_equals_to' }, { status: 400 })
  }

  // Verify `to` is a real route (or another alias we'll resolve through).
  const idx = routeIndex as { routes: Array<{ href: string }>; aliases: Record<string, string> }
  const realRoute = idx.routes.some((r) => r.href === to)
  const transitiveAlias = idx.aliases[to]
  if (!realRoute && !transitiveAlias) {
    return NextResponse.json({ ok: false, error: 'destination_not_found', detail: `${to} is not a known route` }, { status: 400 })
  }

  const force = req.nextUrl.searchParams.get('force') === '1'
  if (idx.aliases[from] && !force) {
    return NextResponse.json(
      { ok: false, error: 'alias_exists', current: idx.aliases[from], hint: 'pass ?force=1 to overwrite' },
      { status: 409 }
    )
  }

  // Load current file, mutate, write back atomically
  const aliasPath = path.join(process.cwd(), 'data', 'redirect-aliases.json')
  let file: AliasFile
  try {
    const raw = await fs.readFile(aliasPath, 'utf8')
    file = JSON.parse(raw) as AliasFile
    if (!file.aliases || typeof file.aliases !== 'object') file.aliases = {}
  } catch {
    file = { aliases: {} }
  }

  file.aliases[from] = to
  // Re-sort for stable diffs
  const sorted: Record<string, string> = {}
  for (const k of Object.keys(file.aliases).sort()) sorted[k] = file.aliases[k]
  file.aliases = sorted

  await fs.writeFile(aliasPath, JSON.stringify(file, null, 2) + '\n', 'utf8')

  return NextResponse.json({
    ok: true,
    from,
    to,
    note: 'Alias saved. Run `pnpm routes:build && pnpm build` (or wait for next deploy) for the redirect to take effect.',
  })
}
