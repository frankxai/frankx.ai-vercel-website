import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Stammbaum · Privates Familienportal',
  description: 'Geschützter Arbeitsbereich für Beziehungen, Quellen und Einwilligungen.',
  robots: { index: false, follow: false, nocache: true },
}

export default function StammbaumPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Stammbaum · geschützter Arbeitsbereich"
      title="Beziehungen sind Behauptungen, bis Quellen und Menschen sie tragen."
      description="Der private Stammbaum wird aus überprüfbaren Behauptungen aufgebaut. Verwandtschaft, Zugriffsrechte und Veröffentlichung bleiben drei getrennte Entscheidungen."
      modules={[
        {
          title: 'Behauptungen & Beziehungen',
          description: 'Entwürfe, Widersprüche und offene Verbindungen mit Status statt voreiliger Wahrheiten.',
        },
        {
          title: 'Quellen & Herkunft',
          description: 'Dokumente, Fotos, Interviews und Fundstellen bleiben mit jeder Aussage verknüpft.',
        },
        {
          title: 'Einwilligung lebender Personen',
          description: 'Eine Beziehung kann privat bestätigt sein, ohne öffentlich sichtbar zu werden.',
        },
        {
          title: 'GEDCOM- und Familienexport',
          description: 'Ein vollständiger, portabler Export wird erst aus dem privaten Family-OS-Mandanten erzeugt.',
        },
      ]}
    />
  )
}
