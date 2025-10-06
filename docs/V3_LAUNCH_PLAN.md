# V3 Launch Plan - Simplified & Focused
**Date:** 2025-10-06
**Owner:** Frank + Agent Team
**Branch:** v3
**Goal:** Production-ready v3 with Intelligence Systems + Vibe OS

## Core Strategy

### Brand Architecture (SIMPLIFIED)
1. **FrankX Intelligence Systems** - Main offering (Prompt Packs + Tool Recommendations + Future n8n/Zapier automations)
2. **Vibe OS** - Distinct brand for music/vibes (kept as-is per Frank's request)

### Technical Stack (MINIMAL)
- **NO Supabase Auth** - Just database for email capture
- **Resend** - Email delivery only
- **Vercel** - Hosting + simple DB (KV or Postgres)
- **No complex authentication** - Keep it simple for MVP

---

## Immediate V3 Fixes (This Session)

### 1. TypeScript Build Errors
- [x] Fixed SectionHeading component to accept `id` prop
- [ ] Verify build completes successfully

### 2. Homepage Updates
**Current State:** V3HomePage.tsx exists with good structure
**Updates Needed:**
- [ ] Update positioning to highlight "Intelligence Systems" primary, "Vibe OS" secondary
- [ ] Add video/MP4 section for Frank's content
- [ ] Add direct link to /music page from hero
- [ ] Add Suno profile link

### 3. Music Page Updates
- [ ] Add prominent Suno profile link
- [ ] Showcase 500+ songs clearly
- [ ] Make it easy to link from homepage

### 4. Email Capture (SIMPLIFIED)
- [ ] Simple email form (no auth)
- [ ] Store in Vercel KV or simple JSON for MVP
- [ ] Integrate Resend for welcome emails
- [ ] No complicated sequences yet

---

## Production Checklist

### Critical Path (Must Have)
- [ ] Build passes without errors
- [ ] Homepage loads fast (< 2s)
- [ ] Music page has Suno link
- [ ] Email capture works
- [ ] Mobile responsive
- [ ] SEO metadata correct

### Nice to Have (Can Add Later)
- [ ] Complex email automation
- [ ] User dashboards
- [ ] Payment integration
- [ ] Advanced analytics

---

## Positioning

Frank is:
- Oracle AI Architect
- Musician/Creator (500+ Suno songs)
- Co-creator of diverse AI solutions

Products:
1. **Intelligence Systems** (Primary)
   - Prompt Packs
   - Tool Recommendations
   - Future: n8n/Zapier automations

2. **Vibe OS** (Distinct)
   - Music creation system
   - Suno workflows
   - Frequency/consciousness focus

---

## Next Steps

1. Fix remaining build errors
2. Update homepage with clearer messaging
3. Add music page enhancements
4. Set up simple email capture
5. Deploy to production

---

**Frank's Suno Profile:** [To be added to /music page]
**Homepage Video:** [MP4 location TBD - suggest hero section or after personas]
