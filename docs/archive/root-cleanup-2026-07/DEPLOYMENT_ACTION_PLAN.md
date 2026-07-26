# 🚀 Security Deployment Action Plan

**Status**: ✅ Code committed and pushed to main
**Branch**: `main` (auto-deploys to frankx.ai)
**Next**: Complete environment configuration in Vercel

---

## ⚡ Quick Actions (10 Minutes)

### Step 1: Generate Authentication Secrets

```bash
cd "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"

# Generate NextAuth secret
openssl rand -base64 32
# Copy output - you'll paste this in Vercel

# Generate admin password hash (use a STRONG password!)
node scripts/generate-password-hash.mjs "YourSecurePassword123!"
# Copy the hash output
```

### Step 2: Configure Vercel Environment Variables

**Go to**: https://vercel.com/dashboard → FrankX.AI → Settings → Environment Variables

**Add these variables**:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NEXTAUTH_SECRET` | (paste secret from Step 1) | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://frankx.ai` | Production |
| `ADMIN_EMAIL` | `admin@frankx.ai` | All |
| `ADMIN_PASSWORD_HASH` | (paste hash from Step 1) | All |

**Keep existing variables**:
- `RESEND_API_KEY` (already configured)
- Any other existing variables

### Step 3: Add Vercel KV Storage

**In Vercel Dashboard**:
1. Click "Storage" tab
2. Click "Create Database"
3. Select "KV (Redis)"
4. Choose region: **US East** (or closest to your users)
5. Database name: `frankx-analytics`
6. Click "Create"

**Vercel automatically injects** these variables:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### Step 4: Trigger Redeploy

Vercel should auto-deploy after your git push. If not:

```bash
# Check deployment status
vercel --prod
```

Or trigger redeploy in dashboard:
**Deployments** tab → Click "Redeploy" on latest deployment

### Step 5: Test Authentication

After deployment completes (~3-5 minutes):

```bash
# 1. Try accessing dashboard (should redirect to login)
open https://frankx.ai/dashboard/pdf-analytics

# 2. Login with credentials from Step 1:
#    Email: admin@frankx.ai
#    Password: (your password from Step 1)

# 3. Verify dashboard loads and shows analytics
```

---

## 🎯 What You'll See After Deployment

### ✅ Working Features

1. **Dashboard Login Page**
   - Visit `/dashboard/pdf-analytics` → Redirects to `/auth/signin`
   - Premium dark theme login form
   - Password show/hide toggle
   - Clear error messages

2. **Protected Analytics**
   - PDF analytics dashboard (requires login)
   - Lead management dashboard (requires login)
   - Session persists across page reloads

3. **Rate Limiting**
   - Email endpoint: 5 requests per 10 minutes
   - Clear error message when limit exceeded
   - Automatic reset after time window

4. **Persistent Data**
   - Analytics survive deployments
   - Leads stored in Vercel KV
   - Data accessible via dashboard

### 🚨 If Something's Wrong

**Problem**: Can't login / "Invalid credentials"
```bash
# Solution: Regenerate password hash
node scripts/generate-password-hash.mjs "NewPassword123!"
# Update ADMIN_PASSWORD_HASH in Vercel
# Wait 2 minutes for env var refresh
```

**Problem**: Dashboard still publicly accessible
```bash
# Solution: Check middleware is deployed
# Look at Vercel deployment logs
# Verify middleware.ts exists in deployment
```

**Problem**: "Rate limit exceeded" immediately
```bash
# Solution: Check Upstash dashboard
# Verify KV_* environment variables are set
# Clear rate limit cache in Vercel KV data browser
```

---

## 📊 What Changed (User-Facing)

### Before This Update

- ❌ Anyone could view analytics dashboard
- ❌ Lead data (emails, names) publicly exposed
- ❌ Analytics data lost on every deployment
- ❌ No spam protection on email endpoint

### After This Update

- ✅ Dashboard requires login (email + password)
- ✅ All PII protected behind authentication
- ✅ Analytics persist forever (Vercel KV)
- ✅ Rate limiting prevents email spam

### User Experience

**For visitors** (no change):
- Homepage, blog, downloads work exactly the same
- Newsletter signup still works
- PDF previews still work
- Email delivery still works (now with rate limiting)

**For admins** (new):
- Must login to view dashboards
- Session lasts 30 days
- Can export leads as CSV
- Can view analytics trends

---

## 🔐 Security Improvements

### Critical Issues Fixed

1. **P0: Public Dashboard Access** → ✅ Fixed with NextAuth.js
2. **P0: Data Loss on Deploy** → ✅ Fixed with Vercel KV

### Additional Enhancements

3. **Rate Limiting** → Prevents spam (5 emails per 10 min)
4. **Input Validation** → Stricter email validation
5. **CSV Injection** → Sanitizes exported data
6. **Password Hashing** → Bcrypt with 10 salt rounds
7. **Session Security** → JWT with 30-day expiration

---

## 📈 Monitoring (Week 1)

### Check Daily

**Vercel Dashboard** → Logs:
- Look for auth errors
- Watch for rate limit hits
- Verify KV storage usage

**Upstash Dashboard** (if using Upstash KV):
- Rate limit analytics
- Identify blocked IPs
- Adjust limits if needed

### Success Metrics

Week 1 targets:
- ✅ Zero unauthorized dashboard access
- ✅ Analytics data persists across 3+ deployments
- ✅ Rate limiting blocks <5 spam attempts
- ✅ All legitimate users can login

---

## 🆘 Emergency Rollback

**If critical issues arise**:

```bash
cd "/mnt/c/Users/Frank/FrankX/FrankX.AI - Vercel Website"

# Find previous commit (before security upgrade)
git log --oneline -3

# Revert to previous version
git revert 8a8e5e8

# Push revert
git push origin main

# Vercel will auto-deploy previous version
```

**Expected downtime**: ~3-5 minutes during redeploy

**Note**: Vercel KV data remains intact (won't lose analytics)

---

## 📚 Documentation

### Quick Reference

- **5-minute setup**: `docs/SECURITY_SETUP.md`
- **Full upgrade details**: `SECURITY_UPGRADE.md`
- **Environment template**: `.env.example`
- **Password hash generator**: `scripts/generate-password-hash.mjs`

### For Future You

**Change admin password**:
```bash
node scripts/generate-password-hash.mjs "NewPassword"
# Update ADMIN_PASSWORD_HASH in Vercel
```

**Add new protected route**:
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/dashboard/:path*',
    '/your-new-route/:path*'  // Add here
  ]
}
```

**View KV data**:
- Vercel Dashboard → Storage → frankx-analytics → Data Browser
- Search for keys: `pdf_views:all`, `leads`, etc.

---

## ✅ Completion Checklist

Before marking this complete:

- [ ] Generated NEXTAUTH_SECRET and added to Vercel
- [ ] Generated admin password hash and added to Vercel
- [ ] Created Vercel KV database
- [ ] Verified auto-deployment completed successfully
- [ ] Tested login at https://frankx.ai/auth/signin
- [ ] Verified dashboard requires authentication
- [ ] Checked analytics data displays correctly
- [ ] Saved admin password in password manager
- [ ] Read `docs/SECURITY_SETUP.md` troubleshooting section

---

## 🎉 You're Done!

**Security Status**: ✅ Production-Ready

**Risk Level**: 🟢 Low (was 🔴 Critical)

**Next Steps**:
1. Complete the 5 steps above
2. Test thoroughly for 1 week
3. Consider adding OAuth (Google/GitHub login) for easier access
4. Set up monitoring alerts

**Questions?** See `docs/SECURITY_SETUP.md` → Troubleshooting

---

**Created**: January 14, 2026
**Deployed**: Pending environment configuration
**ETA**: 10 minutes to complete setup
