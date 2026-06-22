import { NextRequest, NextResponse } from 'next/server'

/**
 * Password gate for /mind-palace (the 3D memory palace, proxied from frankx-palace).
 *
 * - Set MIND_PALACE_PASSWORD in the environment to open the gate.
 * - If the env var is unset the gate fails closed (shows the prompt, accepts nothing) so
 *   the palace is never publicly exposed by accident.
 * - Auth is a SHA-256(password) cookie scoped to /mind-palace, 30-day expiry.
 *
 * Only /mind-palace is matched; the rest of frankx.ai is untouched (see `config.matcher`).
 */

const COOKIE = 'mp_access'
const PASSWORD = process.env.MIND_PALACE_PASSWORD || ''

export const config = {
  matcher: ['/mind-palace', '/mind-palace/:path*'],
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function promptPage(status: number, message = ''): NextResponse {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mind Palace — private</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
    background:#07070b; color:#e8e8ee; font:16px/1.5 ui-sans-serif,system-ui,sans-serif; }
  .card { width:min(92vw,360px); padding:32px; border:1px solid rgba(255,255,255,.08);
    border-radius:16px; background:rgba(255,255,255,.03); backdrop-filter:blur(8px); text-align:center; }
  h1 { font-size:18px; font-weight:600; margin:0 0 4px; }
  p { margin:0 0 20px; color:#9aa0ad; font-size:13px; }
  input { width:100%; box-sizing:border-box; padding:11px 13px; border-radius:10px;
    border:1px solid rgba(255,255,255,.12); background:#0e0e15; color:#fff; font-size:15px; }
  button { width:100%; margin-top:12px; padding:11px; border:0; border-radius:10px;
    background:#7da3ff; color:#06060a; font-weight:600; font-size:15px; cursor:pointer; }
  .err { color:#ff8a8a; font-size:12px; min-height:16px; margin-top:10px; }
</style></head>
<body><form class="card" method="POST">
  <h1>Mind Palace</h1>
  <p>This room is private. Enter the password to continue.</p>
  <input type="password" name="password" autocomplete="current-password" autofocus required />
  <button type="submit">Enter</button>
  <div class="err">${message}</div>
</form></body></html>`
  return new NextResponse(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  })
}

export async function middleware(req: NextRequest) {
  // Fail closed when no password is configured — never expose the palace by default.
  if (!PASSWORD) return promptPage(503, 'Gate not configured.')

  const expected = await sha256Hex(PASSWORD)
  const token = req.cookies.get(COOKIE)?.value

  if (token === expected) return NextResponse.next()

  if (req.method === 'POST') {
    const form = await req.formData()
    const submitted = String(form.get('password') || '')
    if (submitted && (await sha256Hex(submitted)) === expected) {
      const res = NextResponse.redirect(new URL(req.nextUrl.pathname, req.url))
      res.cookies.set(COOKIE, expected, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/mind-palace',
        maxAge: 60 * 60 * 24 * 30,
      })
      return res
    }
    return promptPage(401, 'Wrong password.')
  }

  return promptPage(401)
}
