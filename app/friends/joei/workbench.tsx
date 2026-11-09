'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Printer } from 'lucide-react'
import styles from './studio.module.css'

const workflows = [
  {
    command: '/story-deck', title: 'A pocketful of stories', description: 'An invitation someone can pick up and use at their own table.',
    roles: ['Pip', 'Echo', 'Moss', 'Folio', 'Sunny'],
    inputs: ['Audience and reading level', 'One theme and six approved story examples', 'Tone, format and time available'],
    outputs: ['24 story cards in three difficulty levels', 'Two sample cards for a first review', 'Print layout notes and a one-page host guide'],
    review: 'Joei tests the sample cards aloud. Check clarity, consent, cultural assumptions and print legibility before producing the full deck.',
    sample: ['A tiny turning point', 'Tell a story about a small decision that changed your day. What did you notice afterward?'],
  },
  {
    command: '/circle', title: 'Make space for a story', description: 'A prepared gathering with a clear opening and a kind close.',
    roles: ['Pip', 'Echo', 'Moss', 'Folio'],
    inputs: ['Group size and duration', 'Purpose and comfort boundaries', 'Room, materials and access needs'],
    outputs: ['A timed 60-minute run of show', 'Six screen-free story invitations', 'Listening agreement, opt-out language and host notes'],
    review: 'Joei checks the group fit, pacing and right to pass. Pilot with a small group before sharing a reusable edition.',
    sample: ['An object with a story', 'Choose an everyday object. Tell the group where it came from and why you kept it. Passing is welcome.'],
  },
  {
    command: '/speaker-kit', title: 'Find the story in your talk', description: 'A rehearsal pack a speaker can return to between sessions.',
    roles: ['Pip', 'Echo', 'Folio', 'Sunny'],
    inputs: ['Audience and speaking occasion', 'Approved personal story notes', 'Three-minute time limit and intended takeaway'],
    outputs: ['A story inventory and talk outline', 'Three rehearsal pages with timing cues', 'A feedback rubric and next-practice plan'],
    review: 'Joei verifies the speaker’s facts and meaning. The speaker approves personal details, then tests timing aloud.',
    sample: ['The moment you changed your mind', 'Name the belief you began with. Describe the moment it changed. End with what you do differently now.'],
  },
  {
    command: '/team-session', title: 'A room that listens', description: 'Preparation and follow-up for a team’s shared story.',
    roles: ['Pip', 'Echo', 'Moss', 'Folio', 'Sunny'],
    inputs: ['Team goal and group size', 'Approved context without private staff data', 'Duration, access needs and follow-up owner'],
    outputs: ['A 90-minute facilitator agenda', 'Three exercises and a slide outline', 'Anonymous feedback form and follow-up template'],
    review: 'Joei and the client approve goals, privacy and participation boundaries. The facilitator reviews all materials before the session.',
    sample: ['When our team worked well', 'Share one specific moment of good teamwork. What action made the difference, and what could the team repeat?'],
  },
] as const
const storyPrompts = [
  'Tell a story about a doorway you almost did not walk through.',
  'Tell a story about an ordinary object that holds an extraordinary memory.',
  'Tell a story about a time someone listened without trying to fix anything.',
  'Tell a story about a small act of courage nobody else noticed.',
  'Tell a story about a place that changed the way you saw yourself.',
  'Tell a story about something you learned by making a mistake.',
]

const responsibilities: Record<string, string> = { Pip: 'coordinates', Echo: 'preserves sources and voice', Moss: 'drafts activities', Folio: 'shapes the edition', Sunny: 'prepares an approved handoff' }

export function JoeiWorkbench() {
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    const restore = () => {
      const command = new URL(window.location.href).searchParams.get('command')
      const index = workflows.findIndex(item => item.command === command)
      setSelected(index >= 0 ? index : 0)
    }
    restore()
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [])
  function selectWorkflow(index: number) {
    setSelected(index)
    setCopyStatus('')
    const url = new URL(window.location.href)
    url.searchParams.set('command', workflows[index].command)
    window.history.replaceState(null, '', url)
  }
  const [copyStatus, setCopyStatus] = useState('')
  const [storyStatus, setStoryStatus] = useState('')
  const [promptIndex, setPromptIndex] = useState(0)
  const workflow = workflows[selected]
  const brief = `${workflow.command}\n\nYou are preparing a draft for Joei’s review. This is a portable creative brief; do not claim to activate tools or agents you do not have.\n\nGoal: ${workflow.description}\n\nProposed team: ${workflow.roles.join(', ')}. ${workflow.roles.map(role => `${role} ${responsibilities[role]}`).join('; ')}.\n\nRequired inputs:\n${workflow.inputs.map(input => `- ${input}`).join('\n')}\n\nDeliverables:\n${workflow.outputs.map(output => `- ${output}`).join('\n')}\n\nReview gate: ${workflow.review}\n\nAsk for missing required inputs. Use only supplied, approved source material. Mark assumptions and invented examples. Preserve Joei’s voice; never invent client facts or personal stories. Show a small sample first. Pause for Joei’s approval before producing a final edition. Do not publish, contact clients or spend money.`

  async function copy(text: string, target: 'brief' | 'story') {
    const update = target === 'brief' ? setCopyStatus : setStoryStatus
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      update(target === 'brief' ? 'Brief copied. Paste it into your preferred AI tool.' : 'Story invitation copied.')
    } catch {
      update(target === 'brief' ? 'Copy unavailable. Open “Read the full portable brief”, select its text and copy manually.' : 'Copy unavailable. Select the invitation on the card and copy manually.')
    }
  }

  return (
    <div className={styles.workbench}>
      <div className={styles.commands} aria-label="Choose a proposed workflow">{workflows.map((item, i) => <button type="button" key={item.command} aria-pressed={selected === i} className={selected === i ? styles.selected : ''} onClick={() => selectWorkflow(i)}><code>{item.command}</code></button>)}</div>
      <p className={styles.srOnly} role="status" aria-live="polite">Selected {workflow.command}: {workflow.title}. {workflow.outputs.join('; ')}.</p>
      <div className={styles.plan}>
        <div className={styles.planTitle}><div><p className={styles.eyebrow}>Brief preview</p><h3>{workflow.title}</h3><p>{workflow.description}</p></div><span className={styles.localBadge}>Local demo</span></div>
        <div className={styles.roleRow} aria-label="Proposed assistant assignments">{['Pip', 'Echo', 'Moss', 'Folio', 'Sunny'].map(role => <span key={role} className={workflow.roles.some(active => active === role) ? styles.activeRole : styles.idleRole}>{workflow.roles.some(active => active === role) && <Check size={13} aria-hidden="true" />}{role}<span className={styles.srOnly}>{workflow.roles.some(active => active === role) ? ' assigned in the proposed brief' : ' not assigned'}</span></span>)}</div>
        <div className={styles.planColumns}><div><h4>You bring</h4><ul>{workflow.inputs.map(input => <li key={input}>{input}</li>)}</ul></div><div><h4>The draft contains</h4><ul>{workflow.outputs.map(output => <li key={output}>{output}</li>)}</ul></div></div>
        <div className={styles.reviewGate}><strong>Joei’s review gate</strong><p>{workflow.review}</p></div>
        <div className={styles.sample}><span className={styles.eyebrow}>Illustrative sample · written for this proposal</span><h4>{workflow.sample[0]}</h4><p>{workflow.sample[1]}</p></div>
        <div className={styles.copyRow}><button type="button" className={styles.primary} onClick={() => copy(brief, 'brief')}><Copy size={16} aria-hidden="true" /> Copy this brief</button><p role="status" aria-live="polite">{copyStatus}</p></div>
        <details className={styles.brief}><summary>Read the full portable brief</summary><pre tabIndex={0}>{brief}</pre></details>
      </div>
      <div className={styles.storyPlay}>
        <div><p className={styles.eyebrow}>Try a tiny story</p><h3>One invitation.<br />Your own words.</h3><p>No account, generation or submission. Choose a prompt and tell the story to someone beside you.</p></div>
        <div className={styles.printCard} id="joei-print-card"><span>Joei’s story studio · sample invitation</span><p>{storyPrompts[promptIndex]}</p><small>You can pass. You choose what to share.</small></div>
        <div className={styles.storyActions}><button type="button" className={styles.secondary} onClick={() => { setPromptIndex((promptIndex + 1) % storyPrompts.length); setStoryStatus('') }}>Another invitation</button><button type="button" className={styles.secondary} onClick={() => copy(storyPrompts[promptIndex], 'story')}><Copy size={15} aria-hidden="true" /> Copy</button><a className={styles.secondary} href="/downloads/joei-story-sparks.html" target="_blank" rel="noopener noreferrer"><Printer size={15} aria-hidden="true" /> Open print deck</a></div>
        <p className={styles.storyStatus} role="status" aria-live="polite">{storyStatus}</p>
      </div>
    </div>
  )
}
