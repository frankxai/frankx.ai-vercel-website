// Offline operator tool. Input is one engagement's minimized status card on stdin.
// No client content, provider calls, messages, payments or cross-client lookup.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const states = {
  appointment: ['none', 'scheduled', 'cancelled', 'held'],
  payment: ['none', 'pending', 'paid', 'refunded'],
  memo: ['none', 'draft', 'approved', 'delivered'],
}
const flags = ['receiptMatches', 'contextApproved', 'notesApproved', 'followUpAgreed', 'newScopeRequested', 'learningRequested']
const modules = {
  qualify: ['Qualify the brief', 'Record decision, owner, deadline and evidence available. Use only the client-approved brief. Refer a broad build request for scoping.'],
  prepare: ['Prepare the meeting', 'Use the restricted engagement folder. Assemble the redacted input, baseline, alternatives and missing evidence into a one-page agenda.'],
  research: ['Review architecture evidence', 'Start with approved references. For model routing, use the FrankX Architecture Workbench read-only model route review after confirming payer, retention and region. Record source, date, observation and uncertainty.'],
  notes: ['Extract decisions and actions', 'Use approved session notes. Draft decision, owner, action, due date, pass condition and reversal condition. Mark unresolved contradictions for Frank.'],
  followUp: ['Draft a follow-up', 'Use the human-approved memo. Draft the decision, next test and agreed checkpoint. Frank checks the recipient and releases the message.'],
  proposal: ['Scope a proposal', 'Use the client-requested next job. Draft boundaries, deliverable, owner, exclusions and acceptance. Frank approves terms and price.'],
  progress: ['Review client progress', 'At the agreed checkpoint record acted, revised, deferred or unknown. Include dated evidence provided by the owner.'],
  learn: ['Suggest a learning exercise', 'Select one relevant open Academy pattern. Ask the learner to rerun it on a synthetic case and name the failure condition.'],
  measure: ['Update funnel evidence', 'Export stage counts and founder minutes only. Deduplicate by engagement in the restricted ledger. Record declined and unknown outcomes separately.'],
}

export function planReview(card) {
  if (!card || typeof card !== 'object' || Array.isArray(card)) throw Error('Expected one status card')
  const allowed = new Set([...Object.keys(states), ...flags])
  if (Object.keys(card).some(key => !allowed.has(key))) throw Error('Unexpected field: use a minimized status card')
  for (const [key, values] of Object.entries(states)) {
    if (!values.includes(card[key])) throw Error('Invalid ' + key)
  }
  for (const flag of flags) {
    if (card[flag] !== undefined && typeof card[flag] !== 'boolean') throw Error('Invalid ' + flag)
  }
  const tasks = []
  let stage
  if (card.appointment === 'cancelled' || card.payment === 'refunded') {
    stage = 'review cancellation or refund'
  } else if (['scheduled', 'held'].includes(card.appointment) && card.payment === 'paid' && card.receiptMatches) {
    if (card.appointment === 'scheduled') {
      stage = 'confirmed'
      if (card.contextApproved) tasks.push('prepare', 'research')
    } else {
      stage = 'session held'
      if (card.notesApproved && card.memo === 'none') tasks.push('notes')
      if (card.memo === 'draft') stage = 'memo awaiting human review'
      if (card.memo === 'approved') stage = 'memo ready for human delivery'
      if (card.memo === 'delivered') {
        stage = 'delivered'
        if (card.followUpAgreed) tasks.push('followUp', 'progress')
        if (card.newScopeRequested) tasks.push('proposal')
        if (card.learningRequested) tasks.push('learn')
      }
    }
  } else if (card.appointment !== 'none' || card.payment !== 'none' || card.memo !== 'none') {
    stage = 'reconcile provider records'
  } else {
    stage = 'inquiry'
    if (card.contextApproved) tasks.push('qualify')
  }
  tasks.push('measure')
  return { stage, tasks: tasks.map(id => ({ id, title: modules[id][0], instruction: modules[id][1], release: 'human' })) }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    console.log(JSON.stringify(planReview(JSON.parse(readFileSync(0, 'utf8'))), null, 2))
  } catch (err) {
    // JSON parse errors may quote private input. Output only our own validation messages.
    console.error(err instanceof SyntaxError ? 'Invalid JSON status card' : err.message)
    process.exitCode = 1
  }
}
