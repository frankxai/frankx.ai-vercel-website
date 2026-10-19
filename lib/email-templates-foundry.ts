/**
 * Foundry application emails — plain text, no marketing chrome.
 * Matches the Inner Circle waitlist aesthetic: a person wrote this.
 */

export interface FoundryApplicationInput {
  name: string
  email: string
  company: string
  building: string
  why: string
  stage: string
  link?: string
}

/** Confirmation to the applicant. Plain text by design. */
export function foundryApplicationReceivedEmail(input: FoundryApplicationInput) {
  return {
    subject: 'Your Foundry application is in',
    plainText: `${input.name ? `${input.name} —` : 'Hey —'}

Your application for a Foundry install is in. I read every one personally — usually within a few days, sometimes faster.

What happens next:

1. I evaluate fit: the business, the stage, and whether the operating system genuinely compounds for what you're building. Priority goes to sustainable, healthcare, and meaningful products.
2. If it's a fit, you get a short call invite to scope the install.
3. If it's not a fit right now, I'll tell you straight — and the open-source template is yours either way: https://github.com/frankxai/agentic-business-os

No drip campaign follows this email. You'll hear from me about your application and nothing else.

— Frank
frankx.ai/foundry`,
  }
}

/** Internal notification to Frank. */
export function foundryApplicationNotifyEmail(input: FoundryApplicationInput) {
  return {
    subject: `Foundry application: ${input.company || input.name}`,
    plainText: `New Foundry application

Name:     ${input.name}
Email:    ${input.email}
Company:  ${input.company}
Stage:    ${input.stage}
Link:     ${input.link || '—'}

What they're building:
${input.building}

Why it matters:
${input.why}

Review queue: private/foundry-applications.jsonl (local) · /tmp on Vercel`,
  }
}
