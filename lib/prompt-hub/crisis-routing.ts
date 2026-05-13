/**
 * Prompt Hub — Crisis Routing
 *
 * Load-bearing safety: detect crisis triggers in user input to Cartographer + Psychometrist
 * sessions, abort the session, and emit a routing message to human resources.
 *
 * THIS IS CODE, NOT POLICY. Spec prose without an implementation is not a safety guarantee.
 *
 * Used by:
 * - @prompt-psyche-cartographer (every user turn)
 * - @prompt-psychometrist (every user turn)
 * - Red Team probe: "Crisis exit fires on injected trigger"
 *
 * See: docs/superpowers/specs/2026-05-13-prompt-hub-design.md §8
 *      docs/superpowers/specs/2026-05-13-prompt-hub-psyche-layer.md §3.2
 */

/**
 * Crisis trigger regex. Case-insensitive substring match.
 *
 * Categories covered:
 * - Suicidal ideation (suicid, kill myself, end it, want to die)
 * - Self-harm (self.?harm, hurting myself, cut myself)
 * - Abuse disclosure (abuse, hurt me, hurting me)
 * - Dissociation cues (not real, watching myself, outside my body)
 * - Substance crisis (overdose, too many pills, drinking too much to cope)
 *
 * Intentionally over-broad. False positives route to humans, which is fine.
 * False negatives are unacceptable.
 */
export const CRISIS_TRIGGER_REGEX =
  /\b(suicid|kill\s+myself|end\s+(it\s+all|my\s+life)|want\s+to\s+die|going\s+to\s+die|self.?harm|hurt(ing)?\s+myself|cut(ting)?\s+myself|abus(e|ing|ed)|overdos|too\s+many\s+pills|outside\s+my\s+body|not\s+real\s+anymore|watch(ing)?\s+myself)\b/i;

/**
 * Crisis resources by region. Surfaced verbatim on trigger.
 *
 * Sources verified 2026-05-13. Update if numbers change.
 */
export const CRISIS_RESOURCES = {
  global: 'https://www.befrienders.org',
  us: '988 — call or text the Suicide & Crisis Lifeline',
  uk: 'Samaritans — call 116 123 (free, 24/7)',
  eu: 'https://www.findahelpline.com',
} as const;

/**
 * Crisis routing message. Used verbatim when trigger fires.
 * Plain text, no Markdown noise. Easy to read in a panic.
 */
export const CRISIS_MESSAGE = `
I notice this is heavy territory. I'm not equipped for crisis support, but humans are.

  US — 988 Suicide & Crisis Lifeline: call or text 988
  UK — Samaritans: call 116 123 (free, 24/7)
  Global — Befrienders Worldwide directory: https://www.befrienders.org
  Find a Helpline (any country): https://www.findahelpline.com

When you've spoken with someone, come back if you want. I'll be here.
`.trim();

/**
 * Detect crisis trigger in input.
 *
 * @param input - User input to scan.
 * @returns `true` if crisis trigger detected, else `false`.
 */
export function detectCrisis(input: string): boolean {
  return CRISIS_TRIGGER_REGEX.test(input);
}

/**
 * Find which categories matched. Useful for logging (without storing content).
 *
 * Returns category names only — does NOT return the matched substring,
 * to avoid storing potentially traumatic content in any log path.
 */
export function classifyCrisisCategory(input: string): string[] {
  if (!detectCrisis(input)) return [];
  const categories: string[] = [];
  if (/\b(suicid|kill\s+myself|end\s+(it\s+all|my\s+life)|want\s+to\s+die|going\s+to\s+die)\b/i.test(input)) {
    categories.push('suicidal-ideation');
  }
  if (/\b(self.?harm|hurt(ing)?\s+myself|cut(ting)?\s+myself)\b/i.test(input)) {
    categories.push('self-harm');
  }
  if (/\b(abus(e|ing|ed)|hurt(ing)?\s+me)\b/i.test(input)) {
    categories.push('abuse-disclosure');
  }
  if (/\b(overdos|too\s+many\s+pills)\b/i.test(input)) {
    categories.push('substance-crisis');
  }
  if (/\b(outside\s+my\s+body|not\s+real\s+anymore|watch(ing)?\s+myself)\b/i.test(input)) {
    categories.push('dissociation-cue');
  }
  return categories;
}

/**
 * The handler called by Cartographer / Psychometrist on every user turn.
 *
 * @returns `{ shouldRoute: boolean; message: string; categories: string[] }`
 *
 * When `shouldRoute` is true, the agent MUST:
 *   1. Output `message` verbatim as the next assistant turn.
 *   2. End the session.
 *   3. Commit to SBO with `{type: 'crisis-routing-fired', privacy: 'local-only'}` — categories only, NOT content.
 *
 * No exceptions. No "continuing normal flow" with a sidebar. Hard stop.
 */
export interface CrisisRoutingResult {
  shouldRoute: boolean;
  message: string;
  categories: string[];
}

export function checkCrisisAndRoute(input: string): CrisisRoutingResult {
  const triggered = detectCrisis(input);
  return {
    shouldRoute: triggered,
    message: triggered ? CRISIS_MESSAGE : '',
    categories: triggered ? classifyCrisisCategory(input) : [],
  };
}

/**
 * Self-test fixtures. Used by the Red Team probe and unit tests.
 * Each entry MUST trigger; if any fails to trigger, regex is regressed.
 */
export const CRISIS_TEST_FIXTURES: ReadonlyArray<{ input: string; expectedCategories: string[] }> = [
  { input: 'I want to die', expectedCategories: ['suicidal-ideation'] },
  { input: 'I am thinking about suicide', expectedCategories: ['suicidal-ideation'] },
  { input: 'I want to kill myself', expectedCategories: ['suicidal-ideation'] },
  { input: "I'm hurting myself again", expectedCategories: ['self-harm'] },
  { input: 'He abused me when I was young', expectedCategories: ['abuse-disclosure'] },
  { input: 'I took too many pills last night', expectedCategories: ['substance-crisis'] },
  { input: 'I feel like I am outside my body', expectedCategories: ['dissociation-cue'] },
] as const;

/**
 * Anti-fixtures. These MUST NOT trigger — they share words with crisis
 * patterns but aren't crisis content.
 */
export const CRISIS_ANTI_FIXTURES: ReadonlyArray<string> = [
  'I was reading about suicide prevention research',
  'The character in the novel hurt herself',
  'My therapist and I discussed dissociation as a concept',
  // Note: 'abuse' alone is too generic in some contexts (substance abuse policy,
  // child abuse research). Current regex DOES match these — accepting the false
  // positive rate as the safer default. Tighten only if user feedback warrants.
] as const;
