import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Offene Fragen · Privates Familienportal',
  description: 'Geschützte Forschungsschlange für ungelöste Familienfragen.',
  robots: { index: false, follow: false, nocache: true },
}

export default function OffeneFragenPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Forschung · offene Fragen"
      title="Ungewissheit bekommt einen Platz, keinen erfundenen Abschluss."
      description="Offene Fragen werden mit betroffenen Personen, Quellenlage, Zuständigkeit und nächstem sicheren Schritt geführt. Ohne privaten Adapter zeigt diese Oberfläche bewusst keine Fälle."
      modules={[
        { title: 'Eingang', description: 'Neue Fragen und Hinweise warten zunächst in Quarantäne.' },
        { title: 'In Prüfung', description: 'Ein Steward ordnet Quellen, Widersprüche und betroffene lebende Personen.' },
        { title: 'Disputiert', description: 'Abweichende Erinnerungen bleiben nebeneinander sichtbar und dürfen nicht still überschrieben werden.' },
        { title: 'Geklärt', description: 'Ein Ergebnis wird mit Begründung, Quellen und verbleibender Unsicherheit abgeschlossen.' },
      ]}
    />
  )
}
