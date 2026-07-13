import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Selbst forschen · Privates Familienportal',
  description: 'Methodischer Leitfaden für verantwortungsvolle Familienforschung.',
  robots: { index: false, follow: false, nocache: true },
}

export default function ForscheSelbstPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Selbst forschen · Methodik"
      title="Erst die Frage schärfen. Dann die Quelle suchen."
      description="Die Forschungsroute führt von einer klaren Frage über Namensvarianten, Ortskontext und Primärquellen bis zu einer transparenten Bewertung. KI unterstützt beim Ordnen, nicht beim Erfinden fehlender Belege."
      modules={[
        { title: 'Forschungsfrage', description: 'Eine überprüfbare Frage mit Zeitraum, Ort und betroffenen Personen formulieren.', state: 'bereit' },
        { title: 'Suchvarianten', description: 'Originalschreibweisen, Transliterationen und historische Ortsnamen dokumentieren.', state: 'bereit' },
        { title: 'Quellenleiter', description: 'Originaldokumente, zeitnahe Aufzeichnungen und spätere Erzählungen getrennt bewerten.', state: 'bereit' },
        { title: 'Forschungsnotiz', description: 'Suchweg, Negativfunde, Widersprüche und nächste Schritte so festhalten, dass andere anschließen können.', state: 'bereit' },
      ]}
    />
  )
}
