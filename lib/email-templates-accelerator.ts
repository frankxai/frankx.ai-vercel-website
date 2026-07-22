/**
 * Accelerator / Portfolio OS application emails — plain text.
 * Mirrors Foundry: a person wrote this; no drip marketing.
 */

export interface AcceleratorApplicationInput {
  name: string
  email: string
  organization: string
  role: string
  route: string
  building: string
  why: string
  size: string
  link?: string
}

export function acceleratorApplicationReceivedEmail(input: AcceleratorApplicationInput) {
  return {
    subject: 'Your Accelerator application is in',
    plainText: `${input.name ? `${input.name} —` : 'Hey —'}

Your application for FrankX Accelerator / Portfolio OS is in. I read every one personally — usually within a few days.

What happens next:

1. I evaluate fit: program stage, whether you need diligence fabric, founder OS installs, or both — and whether a pilot can succeed without inventing a full SaaS platform on day one.
2. If it's a fit, you get a short call invite to scope a pilot (one cohort or a bounded diligence sprint).
3. If it's not a fit right now, I'll tell you straight. Open modules stay free:
   - https://github.com/frankxai/agentic-investor-os
   - https://github.com/frankxai/agentic-business-os
   - https://github.com/frankxai/Starlight-Intelligence-System

Founders looking for a single-business install should use https://frankx.ai/foundry instead.

No drip campaign follows this email. You'll hear from me about this application and nothing else.

— Frank
frankx.ai/accelerator`,
  }
}

export function acceleratorApplicationNotifyEmail(input: AcceleratorApplicationInput) {
  return {
    subject: `Accelerator application: ${input.organization || input.name}`,
    plainText: `New Accelerator / Portfolio OS application

Name:          ${input.name}
Email:         ${input.email}
Organization:  ${input.organization}
Role:          ${input.role}
Route:         ${input.route}
Program size:  ${input.size}
Link:          ${input.link || '—'}

What they run / want to build:
${input.building}

Why now:
${input.why}

Review queue: private/accelerator-applications.jsonl (local) · /tmp on Vercel`,
  }
}
