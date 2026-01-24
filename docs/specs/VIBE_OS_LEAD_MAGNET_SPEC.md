# Vibe OS Lead Magnet Experience Spec

## Current State Analysis

### What Exists
| Component | Status | Location |
|-----------|--------|----------|
| Lead magnet page | ✅ Deployed | `/downloads/preview/vibe-os` |
| Email modal | ✅ Created | `VibeOSEmailModal.tsx` |
| Guide HTML | ✅ Exists | `/pdf-templates/vibe-os-guide.html` |
| Email API | ✅ Working | `/api/send-pdf` |
| Product page | ✅ Premium | `/products/vibe-os` |

### Issues Identified
1. **PDF 404**: Old page tries to load `/pdfs/vibe-os-guide.pdf` (doesn't exist)
2. **Auth errors**: 500 on `/api/auth/session` (non-critical, likely NextAuth config)
3. **No actual PDF**: Only HTML template exists
4. **Build propagation**: New deploy may take time to propagate

---

## Experience Flow Map

```
┌─────────────────────────────────────────────────────────────────┐
│                      DISCOVERY PATHS                             │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
  /products/vibe-os        /downloads           Search/Social
  (Full Product)           (Downloads Hub)       (Direct Link)
        │                       │                       │
        │                       ▼                       │
        │              /downloads/preview/vibe-os ◄─────┘
        │                  (Lead Magnet Page)
        │                       │
        │         ┌─────────────┼─────────────┐
        │         ▼             ▼             ▼
        │    [Preview]    [Get Email]    [Download]
        │         │             │             │
        │         │             ▼             │
        │         │      Email Modal          │
        │         │             │             │
        │         │             ▼             │
        │         │      /api/send-pdf        │
        │         │             │             │
        │         │             ▼             │
        │         │      Resend Email         │
        │         │      + Lead Storage       │
        │         │                           │
        │         └─────────────┬─────────────┘
        │                       │
        │                       ▼
        │              USER HAS GUIDE
        │                       │
        ├───────────────────────┤
        ▼                       ▼
  Upgrade CTA             Nurture Sequence
  (on page)               (email follow-up)
        │                       │
        └───────────────────────┘
                    │
                    ▼
            /products/vibe-os
              (Purchase)
```

---

## Friction Points to Eliminate

### High Priority
1. **PDF doesn't exist** → Convert HTML to actual PDF OR update page to clearly use HTML
2. **Preview load time** → Optimize HTML guide for faster iframe loading
3. **Email-only friction** → Add instant download option (no email required)

### Medium Priority
4. **No social proof** → Add download count, testimonials
5. **No urgency** → Add limited-time bonus or scarcity element
6. **Weak upgrade path** → Stronger CTA after download/email

### Lower Priority
7. **No tracking** → Add analytics events for funnel optimization
8. **No A/B testing** → Set up variant testing infrastructure
9. **No thank you page** → Create dedicated success page

---

## Spec: Frictionless Lead Magnet v2

### Design Principles
1. **Zero friction for preview** - See everything without email
2. **Value-first exchange** - Email gets EXTRA value, not access
3. **Immediate gratification** - Instant download, instant preview
4. **Clear upgrade path** - From free to paid should feel natural

### User Journeys

#### Journey A: "Just Browsing"
```
Landing → Preview Guide (full) → Leave OR → Get Email for Bonuses
```

#### Journey B: "Ready to Learn"
```
Landing → Preview → Download PDF → Read → Upgrade to Full Vibe OS
```

#### Journey C: "Lead Capture"
```
Landing → Click "Get Email" → Submit → Receive Guide + Nurture Sequence
```

### New Page Structure

```tsx
<LeadMagnetPage>
  <Header>
    <BackLink />
    <ProductLink />
  </Header>

  <Hero>
    <Badge>Free Download</Badge>
    <Title>Vibe OS Quickstart Guide</Title>
    <Subtitle>The framework behind 500+ AI songs</Subtitle>
    <Stats>10 min · 15 pages · 10 prompts</Stats>
    <CTAButtons>
      <DownloadNow /> {/* No email required */}
      <GetViaemail /> {/* Extra bonuses */}
    </CTAButtons>
  </Hero>

  <WhatsInside>
    <FeatureCard icon="music">10 Starter Prompts</FeatureCard>
    <FeatureCard icon="palette">Emotion Mapping Intro</FeatureCard>
    <FeatureCard icon="zap">Quick-Start Workflow</FeatureCard>
  </WhatsInside>

  <SocialProof>
    <DownloadCount>2,500+ downloads</DownloadCount>
    <Testimonials />
  </SocialProof>

  <Preview>
    <WindowChrome />
    <iframe src="/pdf-templates/vibe-os-guide.html" />
  </Preview>

  <BonusSection>
    <Title>Get Email for Exclusive Bonuses</Title>
    <Bonuses>
      <Bonus>🎁 5 Advanced Genre Prompts (email only)</Bonus>
      <Bonus>🎵 Sample Pack: 10 Production Templates</Bonus>
      <Bonus>📧 Weekly Suno Tips Newsletter</Bonus>
    </Bonuses>
    <EmailForm />
  </BonusSection>

  <UpgradeCTA>
    <Title>Ready for the Full System?</Title>
    <Description>50+ prompts, emotion mapping, release playbooks...</Description>
    <Link to="/products/vibe-os">Get Full Vibe OS</Link>
  </UpgradeCTA>
</LeadMagnetPage>
```

---

## Technical Implementation

### Phase 1: Fix Critical Issues (Now)
- [ ] Update HTML path to match actual file location
- [ ] Add instant download button (no email)
- [ ] Fix or remove PDF viewer fallback error

### Phase 2: Enhance Value Exchange (Next)
- [ ] Create email-only bonus content
- [ ] Set up nurture email sequence in Resend
- [ ] Add download counter to page

### Phase 3: Optimize Conversion (Later)
- [ ] Add testimonials/social proof section
- [ ] Implement A/B testing for CTAs
- [ ] Create dedicated thank-you page
- [ ] Add conversion tracking events

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `page.tsx` | Modify | Add instant download, fix paths |
| `VibeOSEmailModal.tsx` | Enhance | Add bonus mention |
| `/api/send-pdf/route.ts` | Review | Ensure HTML delivery works |
| `vibe-os-guide.html` | Optimize | Faster loading, better mobile |
| `NEW: email-templates/` | Create | Nurture sequence templates |

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| Page views | ? | Track |
| Email captures | ? | 20% of visitors |
| Direct downloads | ? | 40% of visitors |
| Upgrade to product | ? | 5% of leads |
| Email open rate | ? | 50%+ |

---

## Agent/AI Optimization

### For AI Discovery
- Clear FAQ section with common questions
- Structured data for rich snippets
- TL;DR summary in first 100 words
- Question-based headings

### For Agent Integration
- Clean API responses from `/api/send-pdf`
- Downloadable format (HTML/PDF)
- Programmatic access path consideration

---

## Next Actions

1. **Immediate**: Wait for Vercel deploy, verify new page
2. **Today**: Add instant download button, fix any path issues
3. **This week**: Create bonus content, set up nurture sequence
4. **Later**: A/B test, add social proof, optimize conversion
