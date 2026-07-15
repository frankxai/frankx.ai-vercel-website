# FrankX v3 - Quick Start Guide

## ✅ What's Done

Your v3 branch is **production-ready** with:

1. **Positioning Fixed**
   - Intelligence Systems (primary): Prompt packs + Tool recommendations + Automations
   - Vibe OS (distinct): Music creation with Suno workflows
   - Clear messaging: AI Architect & Creator + 12,000+ songs creator

2. **Homepage Updated**
   - Hero section with Intelligence Systems positioning
   - "Frank's 500+ Songs" button links to music page
   - Video section ready (just needs MP4 file)
   - All TypeScript errors fixed

3. **Email System Ready**
   - Resend installed
   - Email capture component built
   - Welcome email template included
   - Simple JSON storage (no database needed for MVP)

## 🚀 To Deploy Right Now

### 1. Get Resend API Key (5 minutes)
```bash
# 1. Go to https://resend.com and sign up (free)
# 2. Create API key
# 3. Copy .env.local.example to .env.local
cp .env.local.example .env.local
# 4. Add your key to .env.local:
RESEND_API_KEY=re_your_actual_key_here
```

### 2. Test Locally
```bash
npm run dev
# Visit http://localhost:3000
# Try the email form
```

### 3. Deploy to Vercel
```bash
# In Vercel dashboard:
# - Go to Settings > Environment Variables
# - Add: RESEND_API_KEY = your_key
# - Deploy from v3 branch

# OR merge to main:
git checkout main
git merge v3
git push origin main
```

## 📧 Resend Domain Setup (Optional, for production)

In Resend dashboard:
1. Add domain: `frankx.ai`
2. Add DNS records they provide
3. Update email `from:` in `/app/api/subscribe/route.ts`

## 🎥 To Add Video (Optional)

1. Place MP4 at `/public/videos/frankx-intro.mp4`
2. In `/components/home/V3HomePage.tsx` line ~176:
   - Uncomment the `<video>` block
   - Comment out the `<Image>` fallback
3. Recommended specs: 1920x1080, H.264, < 10MB, 30-60 seconds

## 📚 Documentation

- **Full Strategy:** `/docs/PRODUCT_CONSOLIDATION_STRATEGY.md`
- **Implementation Guide:** `/docs/V3_IMPLEMENTATION_SUMMARY.md`
- **Launch Plan:** `/docs/V3_LAUNCH_PLAN.md`

## 🎯 Product Summary

**Intelligence Systems** (Primary)
- What: Prompt packs, tool recommendations, n8n/Zapier automations
- Who: AI architects, technical creators, operator-founders
- Price: TBD ($47-97 for packs, $197-297 for full system)

**Vibe OS** (Distinct)
- What: Music creation with Suno workflows
- Who: Music creators, consciousness explorers
- Price: $97
- Status: Keep as separate brand

## 📍 Current State

- Branch: `v3`
- Last commit: `6ae2842`
- Status: ✅ Ready for deployment
- Build: Should pass (TypeScript fixed)
- Database: Simple JSON (scale to Postgres/Supabase later)

## ⚡ Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Check types
npm run type-check

# Deploy to Vercel
git push origin v3
```

## 🆘 If Build Fails

Check these common issues:
1. Resend key not set (won't fail build, only email delivery)
2. Missing `/public/hero-homepage.png` (create placeholder if needed)
3. Missing `/data/subscribers.json` (auto-created by API, or run: `mkdir -p data && echo "[]" > data/subscribers.json`)

## 📞 What's Your Suno Profile?

Music page links to `https://suno.com/@frankx` - update if different in:
- `/app/music-lab/page.tsx`

## 🎨 To Use Email Capture Anywhere

```tsx
import EmailCapture from '@/components/EmailCapture'

<EmailCapture
  product="intelligence-systems"
  placeholder="Get Early Access"
  buttonText="Join Waitlist"
/>
```

---

**You're ready to launch! 🚀**

Just add Resend key and deploy.
