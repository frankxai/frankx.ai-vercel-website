'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, Check, LockKeyhole, ShieldCheck } from 'lucide-react'

type Locale = 'en' | 'de'
type ContentType = 'memory' | 'claim' | 'document' | 'emergency'

const copy = {
  en: {
    contentTypes: [
      { value: 'memory', label: 'Memory or story' },
      { value: 'claim', label: 'Lineage or life-event claim' },
      { value: 'document', label: 'Document, photo, or recording' },
      { value: 'emergency', label: 'Emergency or continuity information' },
    ],
    contentQuestion: 'What do you want to classify?',
    signalQuestion: 'Which protection signals apply?',
    signals: {
      living: 'A living person is affected',
      child: 'A child or teenager is affected',
      publicIntent: 'Public publication is intended',
    },
    localNotice: 'The result runs only in your browser. This preview does not store or send your choices.',
    recommendation: 'Recommended protection scope',
    next: 'Next safe step:',
  },
  de: {
    contentTypes: [
      { value: 'memory', label: 'Erinnerung oder Geschichte' },
      { value: 'claim', label: 'Verwandtschafts- oder Lebenslauf-Aussage' },
      { value: 'document', label: 'Dokument, Foto oder Aufnahme' },
      { value: 'emergency', label: 'Notfall- oder Vorsorgeinformation' },
    ],
    contentQuestion: 'Was möchtest du einordnen?',
    signalQuestion: 'Welche Schutzsignale gelten?',
    signals: {
      living: 'Eine lebende Person ist betroffen',
      child: 'Ein Kind oder Jugendlicher ist betroffen',
      publicIntent: 'Eine öffentliche Veröffentlichung ist beabsichtigt',
    },
    localNotice: 'Die Auswertung findet nur in deinem Browser statt. Diese Vorschau speichert und sendet keine Eingaben.',
    recommendation: 'Empfohlener Schutzbereich',
    next: 'Nächster sicherer Schritt:',
  },
} as const

function recommend(input: { contentType: ContentType; living: boolean; child: boolean; publicIntent: boolean }, locale: Locale) {
  const de = locale === 'de'

  if (input.child) {
    return {
      circle: de ? 'Nachkommen & Patenschaften' : 'Descendants & guardianship',
      tone: 'blocked' as const,
      reason: de
        ? 'Informationen über Kinder bleiben in einem geschützten, altersgerechten Kreis und dürfen nicht ins öffentliche Archiv.'
        : 'Information about children stays in a protected, age-appropriate circle and cannot enter the public archive.',
      next: de
        ? 'Elterliche oder gesetzliche Verantwortung, Zweck, Löschfrist und spätere Altersübergangsprüfung dokumentieren.'
        : 'Record parental or legal authority, purpose, deletion period, and a future age-transition review.',
    }
  }

  if (input.contentType === 'emergency') {
    return {
      circle: de ? 'Ich → Engster Kreis' : 'Self → Core circle',
      tone: 'protected' as const,
      reason: de
        ? 'Vorsorgeinformationen brauchen minimale, zweckgebundene Freigabe statt breite Familien-Sichtbarkeit.'
        : 'Continuity information needs minimal, purpose-bound release rather than broad family visibility.',
      next: de
        ? 'Notfall, Handlungsunfähigkeit und Tod als drei getrennte Protokolle einrichten.'
        : 'Configure emergency, incapacity, and death as three separate protocols.',
    }
  }

  if (input.publicIntent && input.living) {
    return {
      circle: de ? 'Publikationsprüfung' : 'Publication review',
      tone: 'blocked' as const,
      reason: de
        ? 'Lebende Personen bleiben privat, bis jede betroffene erwachsene Person zweckgebunden eingewilligt und ein Steward die Redigierung geprüft hat.'
        : 'Living people remain private until every affected adult gives purpose-specific consent and a steward reviews the redaction.',
      next: de
        ? 'Einwilligungsbelege, Rechte am Material und eine redigierte Vorschau vorbereiten. Noch nicht veröffentlichen.'
        : 'Prepare consent receipts, material rights, and a redacted preview. Do not publish yet.',
    }
  }

  if (input.contentType === 'claim') {
    return {
      circle: de ? 'Erweiterte Familie' : 'Extended family',
      tone: 'review' as const,
      reason: de
        ? 'Eine Aussage über Abstammung oder Ereignisse ist zunächst eine prüfbare Behauptung, keine Tatsache.'
        : 'A statement about lineage or an event begins as a reviewable claim, not a fact.',
      next: de
        ? 'Quelle, Unsicherheit, betroffene lebende Personen und menschlichen Reviewer erfassen.'
        : 'Record the source, uncertainty, affected living people, and a human reviewer.',
    }
  }

  return {
    circle: input.publicIntent
      ? (de ? 'Publikationsprüfung' : 'Publication review')
      : input.living
        ? (de ? 'Engster Kreis' : 'Core circle')
        : (de ? 'Erweiterte Familie' : 'Extended family'),
    tone: input.publicIntent ? ('review' as const) : ('protected' as const),
    reason: input.publicIntent
      ? (de
          ? 'Öffentlichkeit ist ein eigener Freigabeprozess, nicht die nächste Stufe eines privaten Ordners.'
          : 'Public access is a separate release process, not the next level of a private folder.')
      : (de
          ? 'Beginne im kleinsten Kreis, der den Zweck erfüllt. Erweitern ist später möglich; Rückholung ist schwer.'
          : 'Start in the smallest circle that fulfills the purpose. You can expand later; recall is difficult.'),
    next: input.publicIntent
      ? (de ? 'Rechte, Quellen, Einwilligung und Redigierung getrennt prüfen.' : 'Review rights, sources, consent, and redaction separately.')
      : (de ? 'Herkunft und beabsichtigten Zweck notieren.' : 'Record provenance and intended purpose.'),
  }
}

export default function FamilyPrivacyPlanner({ locale = 'en' }: { locale?: Locale }) {
  const labels = copy[locale]
  const [contentType, setContentType] = useState<ContentType>('memory')
  const [living, setLiving] = useState(true)
  const [child, setChild] = useState(false)
  const [publicIntent, setPublicIntent] = useState(false)
  const result = useMemo(
    () => recommend({ contentType, living, child, publicIntent }, locale),
    [contentType, living, child, publicIntent, locale]
  )

  const signals = [
    { id: 'living', label: labels.signals.living, checked: living, set: setLiving },
    { id: 'child', label: labels.signals.child, checked: child, set: setChild },
    { id: 'public', label: labels.signals.publicIntent, checked: publicIntent, set: setPublicIntent },
  ]

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1214] lg:grid-cols-[.92fr_1.08fr]" lang={locale}>
      <form className="space-y-7 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor={`content-type-${locale}`} className="text-sm font-semibold text-stone-200">{labels.contentQuestion}</label>
          <select id={`content-type-${locale}`} value={contentType} onChange={(event) => setContentType(event.target.value as ContentType)} className="mt-3 min-h-12 w-full rounded-xl border border-white/15 bg-[#151c1e] px-4 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-300">
            {labels.contentTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
        </div>
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-semibold text-stone-200">{labels.signalQuestion}</legend>
          {signals.map((signal) => (
            <label key={signal.id} className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm text-stone-300 transition hover:border-white/20">
              <span>{signal.label}</span>
              <input type="checkbox" checked={signal.checked} onChange={(event) => signal.set(event.target.checked)} className="h-5 w-5 accent-emerald-300" />
            </label>
          ))}
        </fieldset>
        <p className="text-xs leading-5 text-stone-600">{labels.localNotice}</p>
      </form>

      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10" aria-live="polite">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${result.tone === 'blocked' ? 'bg-rose-400/10 text-rose-200' : result.tone === 'review' ? 'bg-amber-300/10 text-amber-200' : 'bg-emerald-300/10 text-emerald-200'}`}>
            {result.tone === 'blocked' ? <AlertTriangle className="h-3.5 w-3.5" aria-hidden /> : result.tone === 'review' ? <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> : <LockKeyhole className="h-3.5 w-3.5" aria-hidden />}
            {labels.recommendation}
          </div>
          <h3 className="mt-7 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">{result.circle}</h3>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-300">{result.reason}</p>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="flex items-start gap-3 text-sm leading-6 text-stone-400"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden /><span><strong className="text-stone-200">{labels.next}</strong> {result.next}</span></p>
        </div>
      </div>
    </div>
  )
}
