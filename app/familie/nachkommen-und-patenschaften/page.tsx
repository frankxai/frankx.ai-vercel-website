import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Nachkommen & Patenschaften · Privates Familienportal',
  description: 'Besonders geschützter Bereich für Minderjährige, Nachkommen und Patenschaften.',
  robots: { index: false, follow: false, nocache: true },
}

export default function DescendantsAndGodchildrenPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Nachkommen & Patenschaften · guardian-geführt"
      title="Kinder brauchen Schutzräume, keine öffentlichen Profile."
      description="Dieser Kreis ist für Nachkommen, Nichten, Neffen und Patenkinder gedacht. Er verwaltet altersgerechte Erinnerungen, Lernwege und später übergebbare Familienkenntnisse—unter Verantwortung der Sorgeberechtigten."
      note="Es werden weder Namen noch Profile Minderjähriger im Website-Code gespeichert. Ein späteres Profil entsteht nur mit Sorgeberechtigten, enger Zweckbindung und altersgerechter Mitwirkung."
      modules={[
        { title: 'Guardian-Freigabe', description: 'Sorgeberechtigte bestimmen Zweck, Sichtbarkeit, Dauer und erlaubte Mitwirkende.' },
        { title: 'Altersgerechter Wissensraum', description: 'Geschichten, Fähigkeiten und Lernpfade werden nach Reifegrad statt bloß nach Verwandtschaft geöffnet.' },
        { title: 'Patenrolle', description: 'Eine Patenschaft schafft eine unterstützende Beziehung, aber keine automatische Daten- oder Entscheidungsbefugnis.' },
        { title: 'Übergang zur Selbstbestimmung', description: 'Mit wachsender Reife werden Einblick, Mitwirkung, Export und Widerruf schrittweise an die Person übergeben.' },
      ]}
    />
  )
}
