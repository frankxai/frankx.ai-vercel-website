# Re-engagement Series Email Templates

5-email sequence to win back inactive subscribers (30+ days no opens).

---

## Email 1: "Still interested?" (Day 30)

**Subject:** Quick question about your AI journey

**Preheader:** Haven't heard from you in a while - everything okay?

**Body:**

{{firstName}},

Haven't seen you around lately.

You signed up {{days_since_signup}} days ago {{source_context}}, but I haven't seen any opens in the last month.

**Quick check-in:**

Still interested in AI architecture and systems design? Or did my emails miss the mark?

If you're still building, here's what you missed this month:

**New This Month:**
- [Production LLM Agents on OCI - Part 3](/blog/production-llm-agents-oci-part-3-operating-model) - Operating model for enterprise agents
- [Multi-Agent Orchestration Patterns](/blog/multi-agent-orchestration) - Beyond simple chains
- [Golden Path Framework](/soulbook/golden-path) - Now includes AI architecture worksheets

**Not interested anymore?** No worries. [Unsubscribe here]({{unsubscribe_url}}) and I'll stop bothering you.

**Still interested?** Hit reply and let me know what you want to see more of.

— Frank

P.S. If you're just busy (I get it), no need to reply. You'll keep getting emails. But if my content isn't helping, let's not waste your time.

---

## Email 2: "Here's what worked for others" (Day 37)

**Subject:** 3 resources that got the most replies

**Preheader:** Maybe these will be more helpful

**Body:**

{{firstName}},

Still haven't heard from you, but I wanted to try one more thing.

Here are the 3 resources that got the most "holy shit, this is exactly what I needed" replies from subscribers like you:

**1. [Multi-Agent System Design Checklist](https://frankx.ai/resources/multi-agent-checklist.pdf)**
Free PDF. 47 questions to ask before building your first agent system. Prevents 80% of common mistakes.

**2. [The 7-Day AI Architecture Challenge](/challenge)**
Free email course. One architecture pattern per day for 7 days. Hands-on exercises. Real code examples.

**3. [Soulbook Framework](/soulbook)**
Free self-development system. Not AI-related, but helps with the clarity and systems thinking needed to architect complex systems.

**If none of these help**, that's fine. [Unsubscribe]({{unsubscribe_url}}) and no hard feelings.

**If one of these clicks**, hit reply and let me know which one. I'll send more like it.

— Frank

---

## Email 3: "Last chance - what went wrong?" (Day 44)

**Subject:** Was it something I said?

**Preheader:** Genuinely curious what didn't work

**Body:**

{{firstName}},

This is the last email unless you engage.

I'm not trying to guilt trip you. I'm genuinely curious:

**What went wrong?**

Was it:
- ❌ Content too technical?
- ❌ Content not technical enough?
- ❌ Too many emails?
- ❌ Wrong topics?
- ❌ You found better resources?
- ❌ Something else?

Hit reply with one word and I'll adjust. Or don't, and I'll stop emailing.

The goal isn't to keep you subscribed. It's to figure out if I'm building the right thing.

If 1,000 people sign up and 800 ghost me, I'm building wrong. Your feedback helps me fix it.

— Frank

P.S. If you're just busy and still want emails, ignore this and you'll stay subscribed. This is only for people who actively don't want my content.

---

## Email 4: "Final value bomb" (Day 51)

**Subject:** One last resource before I go

**Preheader:** My best work, free, no strings attached

**Body:**

{{firstName}},

Okay, this is genuinely the last one.

Before I stop emailing, I want to give you my best work - no strings attached:

**[The Complete AI Architecture Playbook](/resources/architecture-playbook)**

It's 120 pages covering:
- Multi-agent system design patterns
- Production deployment strategies
- Cost optimization techniques
- Real-world case studies from Oracle
- Decision frameworks for choosing tools

**Normally $97. Free for you. No email required.**

Just click, download, use it.

If it helps, great. If not, no worries. Either way, this is the last email unless you click something or reply.

— Frank

P.S. If you download and it's useful, reply and let me know. I'll re-subscribe you to a more targeted list based on what you're working on.

---

## Email 5: "We'll miss you" (Day 58)

**Subject:** Goodbye (and thanks for giving it a shot)

**Preheader:** You're being unsubscribed

**Body:**

{{firstName}},

You haven't opened an email in 58 days, so I'm unsubscribing you.

**No hard feelings.** You gave it a shot, it didn't work, that's fine.

**If this was a mistake** (spam folder, too busy, etc.), you can [re-subscribe here](https://frankx.ai/subscribe).

**If you want targeted content instead** (just AI architecture, just music production, just Soulbook), reply with the topic and I'll put you on a different list.

Thanks for giving my content a chance, even if it wasn't the right fit.

— Frank  
frankx.ai

P.S. This is the only email sequence that auto-unsubscribes. If you're on other lists (product purchases, etc.), you'll stay on those.

---

## Sequence Configuration

**Trigger**: 30 days no opens (any email)

**Targeting**:
- ✅ Active status (not already unsubscribed)
- ✅ Completed welcome series (received all 5 emails)
- ✅ Zero opens in last 30 days
- ❌ Exclude purchasers (they get different nurture)

**Schedule**:
| Email | Delay from Previous | Total Days Inactive |
|-------|---------------------|---------------------|
| 1 | 0 (trigger) | 30 |
| 2 | 7 days | 37 |
| 3 | 7 days | 44 |
| 4 | 7 days | 51 |
| 5 | 7 days | 58 |

**Actions**:
- Email 1: Tag `re-engagement-started`
- Email 2-4: No action
- Email 5: **Auto-unsubscribe** + tag `auto-unsubscribed-inactive`

**Performance Goals**:
- 15% re-engagement rate (open Email 1-4)
- 5% click-through rate
- 2% conversion to product
- 85% auto-unsubscribe (healthy list cleanup)

**A/B Test Ideas**:
- Subject lines: Question vs statement vs curiosity
- Tone: Casual vs professional vs brutally honest
- Value offer: Free resources vs discount vs personalization
- Frequency: 7 days vs 10 days vs 14 days between emails

---

## Anti-Patterns to Avoid

❌ **Guilt tripping**: "We'll really miss you!" (fake emotion)  
✅ **Honest**: "You haven't opened anything, so I'm stopping"

❌ **Desperate**: "Please don't leave!" (needy)  
✅ **Confident**: "If it's not working, let's not waste your time"

❌ **Spam tactics**: "LAST CHANCE!!!" (manipulative)  
✅ **Respectful**: "This is the last email unless you engage"

❌ **Ignoring behavior**: Keep emailing forever (bad sender reputation)  
✅ **Data-driven**: Auto-unsubscribe after 58 days zero engagement
