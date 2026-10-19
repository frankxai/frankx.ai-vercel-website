# Security Setup Guide - FrankX.AI

Complete guide for securing your PDF delivery system, analytics dashboards, and lead data.

---

## 🔒 Security Overview

### What We're Protecting

1. **Analytics Dashboards** - PDF views, downloads, engagement metrics
2. **Lead Data (PII)** - User emails, names, companies, roles
3. **Email Delivery** - PDF delivery via Resend API
4. **Rate Limiting** - Protection against spam and abuse

### Security Measures Implemented

- ✅ **Authentication** - NextAuth.js credentials-based login
- ✅ **Authorization** - Middleware protecting sensitive routes
- ✅ **Rate Limiting** - Upstash rate limiting on email endpoints
- ✅ **Input Validation** - Email validation and sanitization
- ✅ **Persistent Storage** - Vercel KV instead of ephemeral files
- ✅ **Password Hashing** - Bcrypt with 10 salt rounds
- ✅ **CSRF Protection** - Built into NextAuth.js
- ✅ **CSV Injection Prevention** - Sanitization for exports

---

## 📋 Quick Start (5 Minutes)

### 1. Generate Admin Password Hash

```bash
cd "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"

# Generate password hash (use a strong password!)
node scripts/generate-password-hash.mjs "YourStrongPassword123!"
```

Copy the output hash.

### 2. Set Environment Variables Locally

Create `.env.local`:

```bash
# Authentication
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@frankx.ai"
ADMIN_PASSWORD_HASH="$2a$10$YourHashFromStep1"

# Vercel KV (will be auto-configured in production)
# Leave empty for local dev - file-based fallback will work

# Email (optional for local testing)
RESEND_API_KEY="re_your_api_key_here"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 3. Set Environment Variables in Vercel

**Go to**: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXTAUTH_SECRET` | Generated secret from step 2 | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://frankx.ai` | Production |
| `ADMIN_EMAIL` | `admin@frankx.ai` | All |
| `ADMIN_PASSWORD_HASH` | Hash from step 1 | All |
| `RESEND_API_KEY` | Your Resend API key | All |

### 4. Add Vercel KV Storage

**In Vercel Dashboard**:
1. Go to Storage tab
2. Click "Create Database"
3. Select "KV" (Redis)
4. Choose region (closest to your users)
5. Click "Create"

Vercel automatically injects KV environment variables (`KV_URL`, `KV_REST_API_URL`, etc.).

### 5. Deploy

```bash
git add .
git commit -m "feat: Add authentication and persistent storage"
git push origin main
```

Vercel will automatically deploy with new security measures.

---

## 🔐 Authentication System

### How It Works

1. **Login Page**: `/auth/signin`
2. **Protected Routes**: `/dashboard/*`, `/api/dashboard/*`, `/api/leads/*`
3. **Middleware**: Redirects unauthenticated users to login
4. **Session**: JWT-based, 30-day expiration

### Accessing Dashboard

**After deployment**:
1. Visit `https://frankx.ai/dashboard/pdf-analytics`
2. Redirected to `https://frankx.ai/auth/signin`
3. Enter credentials (email and password from environment)
4. Access granted to all dashboard routes

### Changing Admin Credentials

**Email**:
```bash
# Update ADMIN_EMAIL in Vercel environment variables
```

**Password**:
```bash
# 1. Generate new hash
node scripts/generate-password-hash.mjs "NewPassword123!"

# 2. Update ADMIN_PASSWORD_HASH in Vercel
# 3. Redeploy (or environment variables auto-refresh)
```

---

## 💾 Vercel KV Storage

### Why We Use It

**Problem**: File-based storage (`/data/pdf-views.json`) is ephemeral on Vercel. Every deployment wipes data.

**Solution**: Vercel KV (Redis-compatible) persists data permanently.

### Data Structure

```typescript
// PDF Views
pdf_views:vibe-os → Array<PDFView>
pdf_views:soulbook → Array<PDFView>
pdf_views:all → Array<PDFView> (global)

// PDF Downloads
pdf_downloads:vibe-os → Array<PDFDownload>
pdf_downloads:all → Array<PDFDownload>

// Leads
leads → Array<Lead>
```

### Managing Data

**View data** (Vercel Dashboard):
- Go to Storage → Your KV Database → Data Browser
- Search by key: `pdf_views:all`, `leads`, etc.

**Clear data** (use with caution):
```typescript
import { clearAllAnalytics } from '@/lib/kv'

// In API route or script
await clearAllAnalytics()
```

---

## 🚦 Rate Limiting

### Configured Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/send-pdf` (Email) | 5 requests | 10 minutes |
| `/api/analytics/*` | 100 requests | 1 minute |
| `/api/leads/*` | 10 requests | 1 hour |

### How It Works

- **Identifier**: Client IP address (from `x-forwarded-for` header)
- **Algorithm**: Sliding window (Upstash Ratelimit)
- **Response**: `429 Too Many Requests` when limit exceeded
- **Reset**: Automatic after time window

### Adjusting Limits

Edit `lib/ratelimit.ts`:

```typescript
export const emailRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 m'), // Change 5 → 10
  analytics: true,
  prefix: 'ratelimit:email'
})
```

---

## 🛡️ Input Validation

### Email Validation

Stricter than simple regex:
- RFC 5322 compliant pattern
- Local part ≤ 64 characters
- Domain ≤ 255 characters
- Must have at least one dot in domain

```typescript
import { isValidEmail } from '@/lib/validation'

if (!isValidEmail(email)) {
  return { error: 'Invalid email address' }
}
```

### CSV Injection Prevention

For dashboard CSV exports:

```typescript
import { sanitizeCSVCell } from '@/lib/validation'

const csv = leads.map(lead => ({
  Name: sanitizeCSVCell(lead.name),  // Escapes =+-@ prefixes
  Email: sanitizeCSVCell(lead.email)
}))
```

### XSS Prevention

Sanitizes user input:

```typescript
import { sanitizeText } from '@/lib/validation'

const safeName = sanitizeText(userInput, 100)  // Max 100 chars, removes <>
```

---

## 📊 Protected Routes

### Dashboard Routes (Require Auth)

- `/dashboard/pdf-analytics` - Main analytics dashboard
- `/dashboard/leads` - Lead management
- `/dashboard/weekly-stats` - Weekly summary

### API Routes (Require Auth)

- `/api/dashboard/analytics` - Returns analytics summary
- `/api/dashboard/leads` - Returns lead data
- `/api/dashboard/weekly-stats` - Returns weekly stats
- `/api/leads/*` - Lead management operations

### Public Routes (No Auth Required)

- `/api/send-pdf` - PDF email delivery (rate-limited)
- `/api/analytics/track-view` - Track PDF view
- `/api/analytics/track-download` - Track download
- All frontend pages (homepage, blog, downloads, etc.)

---

## 🧪 Testing Security

### Test Authentication

```bash
# 1. Start dev server
npm run dev

# 2. Try accessing dashboard without login
open http://localhost:3000/dashboard/pdf-analytics
# Should redirect to /auth/signin

# 3. Login with credentials
# Email: admin@frankx.ai
# Password: (your configured password)

# 4. Verify dashboard access granted
```

### Test Rate Limiting

```bash
# Send 6+ email requests rapidly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/send-pdf \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","name":"Test","pdfTitle":"Guide","pdfUrl":"#","guideSlug":"test","sessionId":"123"}'
done

# 6th request should return 429 Too Many Requests
```

### Test Input Validation

```bash
# Invalid email should be rejected
curl -X POST http://localhost:3000/api/send-pdf \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","name":"Test","pdfTitle":"Guide","pdfUrl":"#","guideSlug":"test","sessionId":"123"}'

# Should return 400 Bad Request: "Invalid email or input data"
```

---

## 🚨 Security Best Practices

### Passwords

- ✅ Minimum 12 characters
- ✅ Mix of uppercase, lowercase, numbers, symbols
- ✅ Never commit passwords to git
- ✅ Rotate every 90 days
- ✅ Use password manager

### API Keys

- ✅ Different keys for dev/staging/production
- ✅ Rotate if exposed
- ✅ Use least-privilege access
- ✅ Monitor usage in provider dashboards

### Environment Variables

- ✅ Never commit `.env.local` to git
- ✅ Use Vercel's encrypted environment storage
- ✅ Audit who has access to Vercel project
- ✅ Use environment-specific values

### Monitoring

**Weekly checks**:
- Review Vercel function logs for suspicious patterns
- Check rate limit analytics in Upstash dashboard
- Audit lead data for anomalies
- Verify email send counts in Resend dashboard

---

## 📁 Security Files Reference

| File | Purpose |
|------|---------|
| `lib/auth.ts` | NextAuth.js configuration |
| `lib/kv.ts` | Vercel KV client & functions |
| `lib/ratelimit.ts` | Rate limiting configuration |
| `lib/validation.ts` | Input validation & sanitization |
| `middleware.ts` | Route protection |
| `app/auth/signin/page.tsx` | Login page |
| `app/api/auth/[...nextauth]/route.ts` | Auth API handler |
| `scripts/generate-password-hash.mjs` | Password hash generator |

---

## 🔄 Migration from Old System

If you have existing data in `/data/*.json` files:

### 1. Export Old Data

```bash
# Copy files before they're wiped
cp data/pdf-views.json backup/
cp data/pdf-downloads.json backup/
cp data/leads.json backup/
```

### 2. Import to Vercel KV

Create `scripts/migrate-to-kv.mjs`:

```javascript
import { kv } from '@vercel/kv'
import fs from 'fs'

const views = JSON.parse(fs.readFileSync('backup/pdf-views.json'))
const downloads = JSON.parse(fs.readFileSync('backup/pdf-downloads.json'))
const leads = JSON.parse(fs.readFileSync('backup/leads.json'))

await kv.set('pdf_views:all', views)
await kv.set('pdf_downloads:all', downloads)
await kv.set('leads', leads)

console.log('✅ Migration complete!')
```

Run after Vercel KV is configured:
```bash
node scripts/migrate-to-kv.mjs
```

---

## ❓ Troubleshooting

### "Invalid credentials" on login

- Verify `ADMIN_EMAIL` matches what you're entering
- Regenerate password hash: `node scripts/generate-password-hash.mjs new-password`
- Update `ADMIN_PASSWORD_HASH` in Vercel
- Redeploy or wait for env var refresh

### "Rate limit exceeded" too quickly

- Check `lib/ratelimit.ts` configuration
- Increase limits if legitimate traffic
- Verify Upstash KV is connected (check Vercel logs)

### KV data not persisting

- Verify Vercel KV is created and connected
- Check environment variables in Vercel dashboard
- Look for KV-related errors in function logs
- Ensure `@vercel/kv` package is installed

### Dashboard redirects to login even after signing in

- Clear browser cookies
- Check NEXTAUTH_SECRET is consistent across deploys
- Verify NEXTAUTH_URL matches your domain
- Check browser console for errors

---

## 📞 Support

**Documentation**:
- NextAuth.js: https://next-auth.js.org/
- Vercel KV: https://vercel.com/docs/storage/vercel-kv
- Upstash Ratelimit: https://upstash.com/docs/oss/sdks/ts/ratelimit/overview

**Logs & Monitoring**:
- Vercel Logs: Dashboard → Project → Logs
- Upstash Dashboard: https://console.upstash.com/
- Resend Logs: https://resend.com/logs

---

**Status**: ✅ Production-Ready Security Implementation

**Last Updated**: January 14, 2026
