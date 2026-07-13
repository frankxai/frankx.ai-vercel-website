import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Mitmachen · Privates Familienportal',
  description: 'Sicherer Vorschlagsweg für Erinnerungen, Quellen und Korrekturen.',
  robots: { index: false, follow: false, nocache: true },
}

export default function MitmachenPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Mitmachen · Vorschlagen statt überschreiben"
      title="Jeder Hinweis beginnt als prüfbarer Vorschlag."
      description="Beiträge verändern den Familienbestand nicht direkt. Der spätere sichere Eingang trennt Nachricht, Quelle, Einwilligung und Veröffentlichung und hält jede Entscheidung nachvollziehbar fest."
      note="Der Upload bleibt geschlossen, bis Einmal-Link, Malware-Prüfung, Mandantenzuordnung und Steward-Warteschlange vollständig verbunden sind."
      modules={[
        { title: 'Erinnerung erzählen', description: 'Eine persönliche Erinnerung mit gewünschtem Kreis und Widerrufsmöglichkeit vorschlagen.' },
        { title: 'Quelle beisteuern', description: 'Ein Dokument oder Foto über einen zeitlich begrenzten, geprüften Upload einreichen.' },
        { title: 'Angabe korrigieren', description: 'Eine betroffene Person kann Fehler melden und eine widersprechende Version dokumentieren.' },
        { title: 'Verbindung vorschlagen', description: 'Eine mögliche Beziehung wird als Behauptung erfasst, niemals automatisch als Tatsache.' },
      ]}
    />
  )
}
