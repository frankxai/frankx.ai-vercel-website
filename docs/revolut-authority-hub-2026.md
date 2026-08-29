# Revolut Authority Hub — Netherlands 2026

**Owner:** Frank Riemer / FrankX
**Market:** Netherlands, English-language search
**Decision date:** 2026-08-27
**Canonical surface:** `/revolut`
**Status:** launch system; personal referral link excluded from public surfaces

## Executive decision

FrankX will publish a first-person, source-led decision hub for people in the Netherlands who are deciding whether Revolut fits their travel, multi-currency, and everyday-money workflow. The hub will not be a coupon page and will not publish Frank's personal referral link.

The commercial path is:

1. Launch every public CTA as a normal link to Revolut Netherlands.
2. Apply separately to Revolut's official Retail Affiliate Programme on Impact.
3. After approval, add the approved tracking URL through `NEXT_PUBLIC_REVOLUT_AFFILIATE_URL`.
4. Keep the page's disclosure and event tracking explicit in both states.

The personal campaign shown in Frank's app is a fixed **€100 reward to Frank** for each qualifying friend, currently ending **15 September 2026**. It is not a promised €100 signup bonus for the invitee. Revolut's published referral terms say a referrer must send the invitation personally, be the sole sender, refer people they know, have permission to contact them, and avoid unsolicited referrals. That makes public SEO distribution of the personal invite link incompatible with the programme terms.

## The authority model

The system is one canonical answer plus four commercial-support pages and one policy-led referral explainer:

| URL | Search job | Primary query family | Conversion job |
| --- | --- | --- | --- |
| `/revolut` | Canonical first-person verdict and routing page | revolut review netherlands 2026; is revolut worth it netherlands; why use revolut | Send qualified readers to Revolut or the right supporting guide |
| `/blog/revolut-plans-netherlands-2026` | Choose a plan without overbuying | revolut plans netherlands; standard vs plus vs premium vs metal vs ultra | Reduce plan-choice friction |
| `/blog/revolut-fees-netherlands-2026` | Understand exchange, ATM, card, and weekend costs | revolut fees netherlands; revolut weekend exchange fee; revolut travel card fees | Set correct expectations before signup |
| `/blog/is-revolut-safe-netherlands-2026` | Resolve regulation and deposit-protection questions | is revolut safe netherlands; revolut dutch iban; revolut deposit guarantee | Build evidence-based trust |
| `/blog/revolut-vs-wise-vs-bunq-netherlands-2026` | Route readers by job-to-be-done | revolut vs wise; revolut vs bunq; wise vs bunq netherlands | Capture comparison-stage demand |
| `/blog/revolut-referral-code-netherlands-2026` | Correct misleading coupon/referral claims | revolut referral code netherlands; revolut €100 referral; revolut invite reward | Earn trust; route to the normal or approved affiliate signup path |

Every supporting article links to `/revolut` once in its opening answer and once at the decision point. The hub links to each article through a visible “go deeper” collection. Supporting articles cross-link only where the next question is genuinely adjacent.

## First-hand editorial thesis

The first 120 words of the hub must answer the decision, establish firsthand use, and name the limitation:

> I use Revolut as a flexible money layer for travel, currencies, and card controls—not as a universal replacement for every financial account. In the Netherlands, the strongest reasons to consider it are the Dutch branch and IBAN, the multi-currency experience, and the ability to start on Standard without a monthly subscription. The trade-off is that exchange, ATM, card delivery, and premium-plan rules still matter. This is my decision guide, checked against Revolut's Dutch terms and regulator records on 27 August 2026.

This is the maximum safe first-person claim before Frank adds more personal evidence. The page must not invent balances, transaction counts, support experiences, savings, trips, or plan usage. Frank can strengthen the review later with dated screenshots or receipts that reveal no account numbers, balances, identity data, or private contacts.

## Query and answer architecture

### Tier 1: decision intent

- revolut review netherlands 2026
- is revolut worth it in the netherlands
- why use revolut netherlands
- best travel card netherlands 2026
- best multi currency account netherlands

### Tier 2: comparison intent

- revolut vs wise netherlands
- revolut vs bunq netherlands
- revolut vs wise vs bunq
- revolut standard vs premium netherlands
- revolut metal vs ultra netherlands

### Tier 3: risk and fee intent

- is revolut safe netherlands
- revolut dutch iban
- revolut deposit guarantee netherlands
- revolut weekend exchange fee netherlands
- revolut atm fees netherlands
- revolut card delivery fee netherlands

### Tier 4: referral intent

- revolut referral code netherlands 2026
- revolut €100 referral reward
- does revolut referral give both people money
- revolut referral requirements three purchases

The referral article wins by answering what thin coupon pages obscure: campaigns vary, the reward may go only to the referrer, the exact requirements live in the referrer's app, and public distribution can conflict with the referral terms.

## GEO and AEO construction

No special “AI search” markup is required. Google states that the same foundational SEO practices apply to AI Overviews and AI Mode. The implementation will therefore make each answer easy to extract without manufacturing schema:

- Open with a 45–70 word direct answer.
- Put a dated “verified against official sources” line next to volatile claims.
- Use visible comparison tables with one criterion per row.
- Give scenario verdicts: best for, not for, and use another option when.
- Cite the exact official page beside every price, fee, licence, and protection claim.
- Separate fact, Frank's judgment, and future affiliate status.
- Publish visible FAQs; include `FAQPage` JSON-LD only when it exactly mirrors the rendered answers.
- Emit `Article`, `BreadcrumbList`, `Person`, and `Organization` entities with stable canonical IDs.
- Use large-image preview, descriptive alt text, an indexable transcript/summary for any embedded video, and equivalent mobile content.
- Keep one canonical URL per intent; do not generate city or country doorway pages.
- Surface the cluster in `sitemap.xml`, RSS/blog discovery, `llms.txt`, and `llms-full.txt` through existing repository loaders.

## Page-level answer contracts

### `/revolut`

The hub must answer, in order:

1. Is Revolut worth considering in the Netherlands?
2. Why does Frank use it?
3. Who should and should not choose it?
4. What does Standard cost, and what costs still exist?
5. Is Revolut a bank, and how are eligible deposits protected?
6. Which plan is the rational starting point?
7. When are Wise or bunq the better fit?
8. What does Frank's referral campaign actually mean?
9. What changed, when was the page checked, and where are the primary sources?

### Plan guide

Start with the routing call: use Standard until one paid-plan benefit produces more value than its monthly price. Compare the five Dutch plans as currently listed by Revolut:

- Standard: Free
- Plus: €3.99/month
- Premium: €10.99/month
- Metal: €19.99/month
- Ultra: €65/month

Do not convert plan benefits into guaranteed euro savings. Benefits, partner subscriptions, insurance eligibility, limits, and introductory prices can change; link readers to the live comparison before purchase.

### Fee guide

Explain four separate cost layers:

1. plan subscription;
2. exchange allowance and fair-usage fee;
3. weekend exchange fee;
4. ATM, delivery, international-transfer, and third-party charges.

Never claim that Revolut is universally fee-free or always uses the interbank rate without markup. For Standard in the Netherlands, the official fee page currently states a 1% weekend exchange fee and a fair-usage fee after the monthly allowance. The live app and fee sheet are the purchase-time source of truth.

### Safety guide

Answer “yes, Revolut Bank UAB is a licensed bank” and immediately scope the answer:

- Revolut Bank UAB is licensed in Lithuania and directly supervised by the European Central Bank with the Bank of Lithuania.
- It has a Netherlands branch listed in De Nederlandsche Bank's public register.
- Eligible deposits with the Netherlands branch are insured under the Lithuanian deposit guarantee scheme up to €100,000 per depositor across aggregated deposits, subject to exclusions and special cases.
- Savings held with a partner bank can have a different guarantee scheme; the product-specific terms control.
- Regulation and deposit protection do not eliminate operational, fraud, market, investment, crypto, or account-access risks.

### Comparison guide

Do not declare one universal winner. Route by primary job:

- **Revolut:** broad all-in-one app, travel/card controls, plan ladder, and multi-currency account.
- **Wise:** transparent pay-per-conversion model and international transfer/account-detail focus; the Dutch pricing page currently starts currency conversion at 0.2% depending on the route.
- **bunq:** Dutch banking workflow, multiple IBAN sub-accounts, budgeting, and plan-led features; current personal plans range from Free to Elite at €18.99/month.

Every comparison fact needs a same-day source check before publication because pricing and product packaging change frequently.

### Referral explainer

Lead with:

> Frank's current campaign can pay Frank €100 when a personally invited friend completes every in-app requirement before 15 September 2026. It does not promise the new customer €100, and this site does not publish the personal invite link because Revolut's terms require personal, permissioned invitations.

List only requirements visible in Frank's screenshot or official help content. Current screenshot evidence shows signup and identity verification, adding money, ordering a physical card, and three purchases of at least €5. Official help notes that excluded card payments can include transfers, gambling, gift cards, payment processors, and cash-like transactions. Tell the reader that the referrer's in-app campaign terms control.

## Conversion system

### Public CTA state machine

| State | Destination | Disclosure | Event property |
| --- | --- | --- | --- |
| Launch | Official Revolut Netherlands homepage | “No affiliate link is active; FrankX earns nothing from this click.” | `monetization_state: direct` |
| Affiliate approved | Revolut-provided Impact tracking URL | “FrankX may earn a commission if you open and qualify through this link, at no added cost to you.” | `monetization_state: affiliate` |

Primary event: `revolut_cta_clicked`.

Required event properties:

- `placement`: hero, plan-table, comparison, referral-explainer, footer;
- `page`: canonical path;
- `intent`: review, plans, fees, safety, comparison, referral;
- `monetization_state`: direct or affiliate.

Do not send query terms, account details, balances, campaign codes, email addresses, or any other personal data to analytics.

### 1:1 personal referral playbook

The personal campaign is a short, permissioned outreach motion, not a public content campaign:

1. Make a list of at most five people Frank actually knows who have already expressed interest in Revolut, travel money, or a second card.
2. Ask permission to send the link; do not cold-message or bulk-send.
3. State clearly that Frank receives the €100 reward and the friend receives whatever offer—if any—their onboarding screen shows.
4. Copy the in-app deadline and requirements exactly; do not promise qualification.
5. Send one reminder only if invited and if the person has asked for help.
6. Delete the working list after the campaign and do not place names or progress in site analytics.

## Official asset ledger

| Asset | Source | Use | Decision |
| --- | --- | --- | --- |
| Standard gradient card on folded fabric | Revolut press kit, Google Drive file `1-m1g27dvkAm_CIyyCA51DZX0trahV_qs` | Editorial hero/supporting visual with source attribution | Approved for the editorial hub; no implied endorsement |
| Revolut logo | Revolut press kit Logos folder | Small source-identification mark only if needed | Defer; the wordmark is unnecessary in the first build |
| “Revolut Your Way In (Travel)” | Official Revolut YouTube, video `N0Vhg6W979Y` | Optional official brand-film embed, labelled 2022 and not treated as a current product demo | Embed below the decision content, not in the first viewport |
| Current official YouTube channel | `https://www.youtube.com/@Revolut` | Link readers to the latest official uploads | Approved |
| Frank's campaign screenshot | Private user evidence supplied 2026-08-27 | Validate the current €100/deadline/requirements statement | Do not publish; status-bar and personal campaign context remain private |
| Impact affiliate creative | Delivered by Revolut after approval | Conversion banners or co-branded landing page | Do not use until approved and supplied |

The page must include: “Revolut product image © Revolut, sourced from the official Revolut press kit. FrankX is an independent editorial site and is not endorsed by Revolut.”

## Distribution plan

### Launch sequence

1. Publish hub, plans, fees, safety, comparison, and referral explainer together so the internal-link graph is complete on crawl one.
2. Submit the updated sitemap in Google Search Console and Bing Webmaster Tools.
3. Send the new URLs through IndexNow if the existing production integration is present; otherwise add it as a separate, reviewed change.
4. Publish one founder-led LinkedIn post: “Why I use Revolut—and the €100 referral detail most coupon pages hide.” Link to the canonical hub, not the personal invite.
5. Publish two short follow-ups: plan-choice rule and weekend-fee rule.
6. Add one newsletter block that routes readers by use case.

### Refresh cadence

- **Monthly:** prices, exchange limits, ATM limits, regulation footer, affiliate status.
- **After any Revolut app notice:** referral explainer and change log.
- **Quarterly:** comparison facts for Wise and bunq, SERP titles, internal link performance.
- **Every six months:** full first-hand re-test and screenshot/evidence refresh.

## Measurement and winning thresholds

Measure by intent quality, not raw traffic:

| Signal | 90-day target | Interpretation |
| --- | --- | --- |
| Non-brand impressions across cluster | 10,000+ | Google understands the topical graph |
| Top-20 queries | 25+ | Long-tail coverage is working |
| Top-10 queries | 8+ | Pages have earned decision-stage visibility |
| Hub organic CTR | 4%+ | Title and promise match the SERP |
| Hub-to-support click rate | 15%+ | Routing architecture answers real next questions |
| Qualified Revolut CTA rate | 3–8% | The page converts without coupon deception |
| Citation/referral visits from AI assistants | Upward monthly trend | Answer blocks are being reused or cited |

Do not optimize around the temporary €100 amount. The durable asset is an independently useful Netherlands decision system that can monetize through the official affiliate programme.

## Primary source register

All volatile claims must be rechecked immediately before merge.

- Revolut Netherlands pricing plans: https://www.revolut.com/en-NL/our-pricing-plans/
- Revolut Netherlands Standard fees: https://www.revolut.com/en-NL/legal/standard-fees/
- Revolut Netherlands travel money card: https://www.revolut.com/en-NL/travel/travel-money-card/
- Revolut Netherlands euro bank account: https://www.revolut.com/en-NL/multi-currency-account/euro-bank-account/
- Revolut Netherlands deposit insurance: https://www.revolut.com/en-NL/legal/deposit-insurance-information/
- Revolut referral terms: https://www.revolut.com/en-NL/legal/referrals-terms/
- Revolut referral conditions help: https://help.revolut.com/help/referrals/more-help-with-referrals/referrals-new/what-are-the-conditions-of-the-referral-campaign/
- Revolut affiliate programme: https://www.revolut.com/en-US/become-a-revolut-affiliate/
- DNB public register entry: https://www.dnb.nl/en/public-register/information-detail/?registerCode=WFTKF&relationNumber=R183723
- Bank of Lithuania register entry: https://www.lb.lt/en/sfi-financial-market-participants/revolut-bank-uab
- Wise Netherlands pricing: https://wise.com/nl/pricing/
- bunq plan list: https://help.bunq.com/articles/what-plans-are-available
- Google AI search guidance: https://developers.google.com/search/docs/appearance/ai-features
- Google high-quality reviews guidance: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- Google structured-data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Bing AI Performance announcement: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
