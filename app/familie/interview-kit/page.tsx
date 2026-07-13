import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Interview-Kit · Privates Familienportal',
  description: 'Einwilligungsbewusste Gesprächsvorbereitung für Familienerinnerungen.',
  robots: { index: false, follow: false, nocache: true },
}

export default function InterviewKitPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Interview-Kit · Würde vor Vollständigkeit"
      title="Das beste Familieninterview fühlt sich wie ein Gespräch an, nicht wie eine Vernehmung."
      description="Vor Aufnahmebeginn werden Zweck, erlaubter Kreis, sensible Themen und Widerruf geklärt. Die Person kann Fragen auslassen, die Aufnahme pausieren und spätere Nutzung getrennt freigeben."
      note="Vorlagen sind bereit. Aufnahmen, Transkripte und Einwilligungen werden erst im verschlüsselten Familienmandanten angelegt."
      modules={[
        { title: 'Vor dem Gespräch', description: 'Zweck erklären, freiwillige Teilnahme bestätigen, erlaubte Nutzung festhalten.', state: 'bereit' },
        { title: 'Lebenswege & Wendepunkte', description: 'Offene Fragen zu Orten, Menschen, Entscheidungen und weitergegebenem Wissen.', state: 'bereit' },
        { title: 'Sensible Erinnerungen', description: 'Pausen, Überspringen, Nachprüfung und eingeschränkte Kreise ausdrücklich ermöglichen.', state: 'bereit' },
        { title: 'Nach dem Gespräch', description: 'Transkript prüfen lassen und Zitate, Zusammenfassung sowie Veröffentlichung einzeln freigeben.', state: 'bereit' },
      ]}
    />
  )
}
