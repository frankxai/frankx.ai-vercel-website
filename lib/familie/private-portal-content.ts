export const familySourceClassification = 'public-shell-no-family-records' as const

export type ResearchTopic = {
  slug: string
  eyebrow: string
  title: string
  description: string
  questions: readonly string[]
  nextSteps: readonly string[]
}

export const researchTopics: readonly ResearchTopic[] = [
  {
    slug: 'quellen-pruefen',
    eyebrow: 'Quellenarbeit',
    title: 'Eine Erinnerung wird nicht automatisch zur Tatsache.',
    description:
      'Dieser Arbeitsbereich führt Familienbehauptungen, Originalquellen, Unsicherheit und menschliche Freigaben getrennt.',
    questions: [
      'Wer hat die Aussage gemacht und in welchem Zusammenhang?',
      'Gibt es ein Dokument, Foto, eine Aufnahme oder eine zweite unabhängige Quelle?',
      'Welche lebenden Personen sind von der Aussage betroffen?',
    ],
    nextSteps: [
      'Behauptung als Entwurf erfassen',
      'Quelle getrennt hochladen und einstufen',
      'Einwilligung und Steward-Prüfung anfordern',
    ],
  },
  {
    slug: 'orte-und-wege',
    eyebrow: 'Orte & Wege',
    title: 'Migration wird als belegte Route dokumentiert.',
    description:
      'Orte, Zeiträume, Namensvarianten und Reiseabschnitte bleiben mit ihren Quellen und Unsicherheiten verbunden.',
    questions: [
      'Welche Schreibweisen oder Transliterationen sind überliefert?',
      'Welche Ortsgrenzen und Bezeichnungen galten im jeweiligen Zeitraum?',
      'Welche Stationen sind belegt und welche nur Familienüberlieferung?',
    ],
    nextSteps: [
      'Ortsnamen normalisieren, Originalschreibweise behalten',
      'Jeden Routenabschnitt mit Quelle oder Unsicherheit markieren',
      'Öffentliche Darstellung separat freigeben',
    ],
  },
  {
    slug: 'erinnerungen-bewahren',
    eyebrow: 'Mündliche Geschichte',
    title: 'Stimmen werden bewahrt, ohne Zustimmung zu überspringen.',
    description:
      'Interviews bleiben im vereinbarten Kreis. Zitate, Zusammenfassungen und spätere Veröffentlichung erhalten jeweils eigene Freigaben.',
    questions: [
      'Wer darf die Aufnahme hören oder das Transkript lesen?',
      'Welche Themen sollen bewusst privat bleiben?',
      'Darf eine Zusammenfassung später mit weiteren Familienkreisen geteilt werden?',
    ],
    nextSteps: [
      'Einwilligung vor dem Gespräch festhalten',
      'Originalaufnahme und Transkript getrennt schützen',
      'Freigabe für Zitate und Veröffentlichung einzeln prüfen',
    ],
  },
] as const

export function getResearchTopic(slug: string): ResearchTopic | undefined {
  return researchTopics.find((topic) => topic.slug === slug)
}
