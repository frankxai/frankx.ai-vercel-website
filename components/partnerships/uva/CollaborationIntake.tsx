'use client'

import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { audiences, buildCollaborationMessage, type AudienceId } from '@/content/partnerships/university-collaboration'
import s from './collaboration.module.css'

export default function CollaborationIntake({ audience, onAudienceChange, challenge }: { audience: AudienceId; onAudienceChange: (value: AudienceId) => void; challenge: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [ackSent, setAckSent] = useState(false)
  const outcome = useRef<HTMLDivElement>(null)
  const selected = audiences.find(item => item.id === audience)!

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const message = String(data.get('message') || '').trim()
    if (!name || !message) { setError('Add your name and a short description of what you would like to explore.'); setStatus('error'); return }
    setStatus('sending')
    setError('')
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 30000)
    try {
      const response = await fetch('/api/intake', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({
          intent: 'partnership', name, email: String(data.get('email') || '').trim(),
          company: String(data.get('company') || '').trim(),
          message: buildCollaborationMessage(audience, String(data.get('format')), challenge, message),
          source: window.location.pathname, website: String(data.get('website') || ''), consent: data.get('consent') === 'on',
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your inquiry could not be confirmed. Please try again or email Frank directly.')
      setAckSent(Boolean(result.ackSent))
      setStatus('done')
      form.reset()
      requestAnimationFrame(() => outcome.current?.focus())
    } catch (err) {
      setError(err instanceof Error && err.name !== 'AbortError' ? err.message : 'Delivery could not be confirmed. Your text is still here. Contact frank@frankx.ai before retrying to avoid a duplicate.')
      setStatus('error')
    } finally { window.clearTimeout(timer) }
  }

  return <div id="join" className={s.intake} tabIndex={-1}>
    <div className={s.intakeIntro}><p className={s.eyebrow}>A direct conversation</p><h3>Bring your question.<br />We’ll shape the next step.</h3><p>Tell Frank what you want to explore. This inquiry expresses interest. University applications, enrolment and funding require separate institutional processes.</p><div className={s.nextDetail}><span className={s.eyebrow}>Useful to include</span><p>{selected.bring}</p><span className={s.eyebrow}>What happens next</span><p>{selected.next}</p></div><a className={s.external} href="mailto:frank@frankx.ai?subject=University%20collaboration">Or email frank@frankx.ai <ArrowRight size={15} aria-hidden="true" /></a><p className={s.caption}>Please leave out confidential research, personal student records and credentials.</p></div>
    {status === 'done' ? <div ref={outcome} tabIndex={-1} className={s.intakeSuccess} role="status"><Check size={28} aria-hidden="true" /><h3>Your inquiry reached Frank.</h3><p>Frank will review the fit and respond personally. {ackSent ? 'A confirmation email has also been sent.' : 'Keep this page as your confirmation.'}</p><button className={s.secondary} onClick={() => setStatus('idle')}>Write another inquiry</button></div> : <form onSubmit={submit} className={s.intakeForm} aria-label="University collaboration inquiry" aria-busy={status === 'sending'}>
      <fieldset disabled={status === 'sending'}><legend className={s.srOnly}>Your collaboration inquiry</legend>
        <div className={s.formRow}><label htmlFor="collab-role">Your role<select id="collab-role" value={audience} onChange={event => onAudienceChange(event.target.value as AudienceId)}>{audiences.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label><label htmlFor="collab-format">Starting point<select id="collab-format" name="format" defaultValue="Shape a challenge"><option>Shape a challenge</option><option>Guest lecture</option><option>Research collaboration</option><option>Fellowship or programme</option><option>Mentoring or technical support</option><option>Joint funding exploration</option></select></label></div>
        <div className={s.formRow}><label htmlFor="collab-name">Name<input id="collab-name" name="name" autoComplete="name" required maxLength={200} /></label><label htmlFor="collab-email">Email<input id="collab-email" name="email" type="email" autoComplete="email" required maxLength={200} /></label></div>
        <label htmlFor="collab-company">University or organisation <span>(optional)</span><input id="collab-company" name="company" autoComplete="organization" maxLength={200} /></label>
        <p className={s.selectedChallenge}>Selected challenge: <strong>{challenge}</strong> <a href="#pilot">Change</a></p>
        <label htmlFor="collab-message">What would you like to explore?<textarea id="collab-message" name="message" required maxLength={3500} rows={5} placeholder="Your question, the people involved and a useful next step…" /></label>
        <div className={s.honeypot} aria-hidden="true"><label htmlFor="collab-website">Website<input id="collab-website" name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
        <label className={s.consent}><input type="checkbox" name="consent" required /><span>I consent to FrankX storing this inquiry to respond. No marketing subscription. <a href="/privacy">Privacy policy</a>.</span></label>
        {status === 'error' && <p className={s.formError} role="alert">{error}</p>}
        <button type="submit" className={s.primary}>{status === 'sending' ? <><Loader2 className={s.spin} size={16} aria-hidden="true" />Sending inquiry…</> : <>Send inquiry to Frank <ArrowRight size={16} aria-hidden="true" /></>}</button>
      </fieldset>
    </form>}
  </div>
}
