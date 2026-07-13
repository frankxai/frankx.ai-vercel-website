import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'

export const metadata: Metadata = {
  title: 'Vorsorge & Notfall · Privates Familienportal',
  description: 'Getrennte, menschlich freizugebende Abläufe für Notfall, Handlungsunfähigkeit und Tod.',
  robots: { index: false, follow: false, nocache: true },
}

export default function ContinuityPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Vorsorge · menschlich freigegeben"
      title="Notfall, Handlungsunfähigkeit und Tod sind drei verschiedene Protokolle."
      description="Kein Timer und kein KI-Agent darf allein Zugriff freigeben. Minimalzugriff, Rechtsgrundlage, Guardian-Quorum, Wartefrist, Widerruf und Audit werden je Ereignis getrennt geprüft."
      note="Dieser Bereich zeigt nur die Schutzarchitektur. Reale Notfallinformationen und Dokumente gehören in den verschlüsselten Mandanten und benötigen einen geprüften Wiederherstellungstest."
      modules={[
        { title: 'Notfallpaket', description: 'Minimaler, zeitlich begrenzter Lesezugriff für eine konkret verifizierte Notsituation.' },
        { title: 'Handlungsunfähigkeit', description: 'Delegierter Zugang auf Grundlage geprüfter Vollmachten und klar begrenzter Aufgaben.' },
        { title: 'Nachlass & Tod', description: 'Verifizierter Nachweis, Abkühlphase und menschliches Quorum vor jeder Freigabe.' },
        { title: 'Wiederherstellungsübung', description: 'Regelmäßiger Test von Kontakten, Schlüsseln, Exporten, Widerruf und Audit ohne echte Freigabe.' },
      ]}
    />
  )
}
