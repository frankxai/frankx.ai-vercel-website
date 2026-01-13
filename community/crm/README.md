# FrankX Community CRM
**Purpose**: Track audience members, customers, and community relationships

---

## What is This?

This is a lightweight CRM (Customer Relationship Management) system for tracking:
- **Audience Segments** - Who follows FrankX across platforms
- **Customer Journeys** - How people move through the funnel
- **VIP Relationships** - Power users, evangelists, key supporters
- **Community Members** - Inner Circle, Discord, email list

---

## CRM Structure

### Tier 1: General Audience
**Platform**: Email list (ConvertKit), social media followers
**Size**: 10K+ people
**Engagement**: Occasional (newsletters, social posts)
**Value**: Awareness and reach

**Track in**: `crm/audience-segments.md`

---

### Tier 2: Engaged Community
**Platform**: Newsletter subscribers who open + click, active social engagers
**Size**: 1K-2K people
**Engagement**: Regular (weekly emails, frequent replies)
**Value**: Word of mouth, feedback, early adopters

**Track in**: `crm/engaged-community.md`

---

### Tier 3: Customers
**Platform**: Anyone who's purchased a FrankX product
**Size**: 100-500 people (growing)
**Engagement**: Transactional + occasional check-ins
**Value**: Revenue, testimonials, case studies

**Track in**: `crm/customers.md`

---

### Tier 4: VIPs & Evangelists
**Platform**: Power users, affiliates, evangelists, collaborators
**Size**: 20-50 people
**Engagement**: Personal (DMs, 1-on-1s, regular check-ins)
**Value**: Word of mouth, referrals, partnerships

**Track in**: `crm/vip-list.md`

---

### Tier 5: Inner Circle
**Platform**: Premium community members (Discord, private channels)
**Size**: 10-30 people (exclusive)
**Engagement**: Daily (live sessions, direct access to Frank)
**Value**: Deep connection, co-creation, high LTV

**Track in**: `crm/inner-circle.md`

---

## Data We Track

### Basic Profile
- **Name**: Full name
- **Handle/Email**: Primary contact method
- **Platform**: Where we connected
- **Date Added**: When they joined our world
- **Source**: How they found FrankX (SEO, social, referral, etc.)

### Engagement Data
- **Engagement Level**: Tier 1-5 (see above)
- **Last Interaction**: Date and type
- **Interaction History**: Key touchpoints
- **Content Interests**: AI, music, spirituality, tech, etc.
- **Product Interests**: Vibe OS, Creator OS, Inner Circle, etc.

### Relationship Data
- **Stage**: Awareness → Consideration → Customer → Advocate
- **Lifetime Value (LTV)**: Total $ spent
- **Referrals**: Number of people they've referred
- **Testimonial**: Have they provided social proof?
- **Case Study**: Potential for success story?

### Personalization Data
- **Creator Type**: Musician, writer, developer, coach, etc.
- **AI Experience**: Beginner, intermediate, advanced
- **Goals**: What they're trying to achieve
- **Pain Points**: What they struggle with
- **Win Moments**: Successes we've helped them achieve

---

## CRM Workflows

### New Subscriber (Tier 1)
1. **Capture**: Subscribe via frankx.ai, social, or lead magnet
2. **Welcome**: Automated email with Creative AI Toolkit
3. **Segment**: Tag based on signup source and interests
4. **Nurture**: Weekly Creation Chronicles newsletter
5. **Engage**: Monitor opens, clicks, replies

### Engaged Community (Tier 2)
1. **Identify**: 3+ email opens in last month OR social engagement
2. **Personalize**: Send targeted content based on interests
3. **Invite**: Offer to join private community or early access
4. **Survey**: Ask about goals, challenges, ideal products
5. **Move**: Push toward Tier 3 (customer) with relevant offer

### New Customer (Tier 3)
1. **Welcome**: Personal email from Frank within 24h
2. **Onboard**: Ensure they get value immediately
3. **Check-in**: Follow up at 7 days, 30 days, 90 days
4. **Testimonial Request**: Ask for feedback/review at 30 days
5. **Upsell**: Offer next-level product when appropriate

### VIP Cultivation (Tier 4)
1. **Identify**: High engagement + evangelism + multiple purchases
2. **Recognize**: Send personal thank you gift/note
3. **Access**: Offer early access to new products
4. **Collaborate**: Invite to co-create content or features
5. **Reward**: Affiliate program, special perks, recognition

### Inner Circle (Tier 5)
1. **Application**: Vet carefully (fit, energy, commitment)
2. **Onboard**: Personal welcome call with Frank
3. **Integrate**: Add to private Discord/Slack channels
4. **Engage**: Daily interaction, weekly live sessions
5. **Co-create**: Involve in product development decisions

---

## Tools We Use

### Email Marketing: ConvertKit
- Tag-based segmentation
- Automated sequences
- Broadcast newsletters
- Landing pages + forms

### Community: Discord
- Inner Circle private channels
- Public community (future)
- Voice/video for live sessions
- Integration with Whop/Patreon

### Analytics: PostHog
- Track user journeys
- Conversion funnels
- Product analytics
- Session recordings

### Payments: Whop + Patreon
- Customer data (purchases, subscriptions)
- Affiliate tracking
- Membership tiers
- Recurring revenue

### Manual Tracking: Markdown Files (This Folder)
- VIP list with personal notes
- Dream 100 relationship tracking
- Key customer case studies
- Partnership opportunities

---

## Weekly CRM Routine

### Monday: Review & Plan (30 min)
- [ ] Review new subscribers from last week
- [ ] Check customer onboarding progress
- [ ] Identify VIPs who need personal outreach
- [ ] Plan this week's email + content

### Wednesday: Engage (45 min)
- [ ] Reply to all customer emails
- [ ] Send 3-5 personal check-ins to VIPs
- [ ] Update engagement data in CRM
- [ ] Tag new subscribers based on activity

### Friday: Analyze & Optimize (30 min)
- [ ] Review email open/click rates
- [ ] Check conversion funnel metrics
- [ ] Identify drop-off points
- [ ] Plan experiments for next week

---

## Metrics We Track

### Audience Growth
- Email list growth rate (goal: +5% monthly)
- Social follower growth (goal: +10% monthly)
- Website traffic (goal: +15% monthly)

### Engagement
- Email open rate (goal: >40%)
- Email click rate (goal: >10%)
- Reply rate (goal: >2%)
- Social engagement rate (goal: >5%)

### Conversion
- Lead → Customer rate (goal: >5%)
- Customer → VIP rate (goal: >10%)
- VIP → Inner Circle rate (goal: >20%)

### Retention
- Customer churn rate (goal: <5% monthly for subscriptions)
- Email unsubscribe rate (goal: <0.5%)
- Product repurchase rate (goal: >30%)

### Revenue
- Average order value (AOV)
- Customer lifetime value (LTV)
- Monthly recurring revenue (MRR)
- Annual recurring revenue (ARR)

---

## Files in This Folder

```
crm/
├── README.md (this file)
├── audience-segments.md (Tier 1 tracking)
├── engaged-community.md (Tier 2 tracking)
├── customers.md (Tier 3 tracking)
├── vip-list.md (Tier 4 tracking)
├── inner-circle.md (Tier 5 tracking)
├── email-sequences.md (Automated workflows)
└── case-studies.md (Customer success stories)
```

---

## Integration with Other Systems

### ← Dream 100
When a Dream 100 relationship warms up and they join the audience, move them to CRM tracking.

### ↔ Monetization
CRM data informs which products to create, which platforms to use, which price points work.

### → Content Strategy
CRM insights drive what content to create (blog topics, music styles, product features).

### ⟲ Feedback Loop
- Survey customers → Build products they want
- Track engagement → Create content that resonates
- Monitor churn → Fix product/experience gaps

---

## Privacy & Ethics

**We Respect Privacy:**
- Only collect data necessary for relationship management
- Never sell or share personal information
- Offer easy unsubscribe/data deletion
- Use data to provide value, not manipulate

**We Build Trust:**
- Transparent about how we use data
- Personal touch, not mass automation
- Value-first approach, not pushy sales
- Long-term relationships, not one-time transactions

---

## Next Actions

1. **Set up ConvertKit tags** for audience segmentation (Priority 1)
2. **Create VIP list** with first 20 names (Priority 1)
3. **Write customer check-in templates** (Priority 2)
4. **Set up PostHog funnels** for conversion tracking (Priority 2)
5. **Block weekly CRM time** on calendar (Priority 1)

---

**Remember**: CRM is about relationships, not just data. Every person in this system is a real human with dreams, challenges, and goals. Treat them as such. Build genuine connections, provide real value, and the business results will follow.
