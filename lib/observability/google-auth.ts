import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export interface GoogleServiceAccountCredentials {
  client_email: string
  private_key: string
  project_id?: string
}

let cachedToken: {
  accessToken: string
  expiresAt: number
  scopesKey: string
} | null = null

/**
 * Loads service account credentials from supported environment locations:
 * 1. GOOGLE_APPLICATION_CREDENTIALS (file path)
 * 2. GOOGLE_SERVICE_ACCOUNT_JSON (JSON string)
 * 3. GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY
 */
export function getServiceAccountCredentials(): GoogleServiceAccountCredentials | null {
  // 1. Direct env vars
  if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
    return {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      project_id: process.env.GOOGLE_PROJECT_ID,
    }
  }

  // 2. JSON string in env var
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const parsed = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key.replace(/\\n/g, '\n'),
          project_id: parsed.project_id,
        }
      }
    } catch {
      console.warn('[GoogleAuth] Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON')
    }
  }

  // 3. File path in GOOGLE_APPLICATION_CREDENTIALS or default credentials location
  const candidatePaths = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.join(process.cwd(), 'private', 'google-credentials.json'),
    path.join(process.cwd(), 'google-credentials.json'),
  ].filter(Boolean) as string[]

  for (const credPath of candidatePaths) {
    try {
      if (fs.existsSync(credPath)) {
        const raw = fs.readFileSync(credPath, 'utf-8')
        const parsed = JSON.parse(raw)
        if (parsed.client_email && parsed.private_key) {
          return {
            client_email: parsed.client_email,
            private_key: parsed.private_key.replace(/\\n/g, '\n'),
            project_id: parsed.project_id,
          }
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null
}

/**
 * Returns true if valid service account credentials can be resolved.
 */
export function hasGoogleCredentials(): boolean {
  return getServiceAccountCredentials() !== null
}

/**
 * Base64url encode helper
 */
function base64url(data: string | Buffer): string {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, 'utf-8')
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Obtains an OAuth2 bearer access token using native Node crypto RS256 JWT assertion.
 */
export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const credentials = getServiceAccountCredentials()
  if (!credentials) return null

  const scopesKey = scopes.slice().sort().join(' ')
  const now = Math.floor(Date.now() / 1000)

  // Use cached token if still valid for at least 5 minutes
  if (cachedToken && cachedToken.scopesKey === scopesKey && cachedToken.expiresAt > now + 300) {
    return cachedToken.accessToken
  }

  try {
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    }

    const payload = {
      iss: credentials.client_email,
      scope: scopes.join(' '),
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }

    const encodedHeader = base64url(JSON.stringify(header))
    const encodedPayload = base64url(JSON.stringify(payload))
    const signatureInput = `${encodedHeader}.${encodedPayload}`

    const signer = crypto.createSign('RSA-SHA256')
    signer.update(signatureInput)
    signer.end()

    const signature = signer.sign(credentials.private_key)
    const encodedSignature = base64url(signature)

    const jwt = `${signatureInput}.${encodedSignature}`

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }).toString(),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('[GoogleAuth] Token exchange failed:', res.status, errorText)
      return null
    }

    const data = (await res.json()) as { access_token: string; expires_in: number }
    cachedToken = {
      accessToken: data.access_token,
      expiresAt: now + (data.expires_in || 3600),
      scopesKey,
    }

    return data.access_token
  } catch (err) {
    console.error('[GoogleAuth] Error generating token:', err)
    return null
  }
}
