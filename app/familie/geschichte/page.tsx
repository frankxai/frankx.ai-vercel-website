import type { Metadata } from 'next'
import { PrivateFamilyWorkspace } from '@/components/familie/PrivateFamilyWorkspace'
import { researchTopics } from '@/lib/familie/private-portal-content'

export const metadata: Metadata = {
  title: 'Familiengeschichte · Privates Familienportal',
  description: 'Quellengebundene Geschichten und Forschungsthemen im geschützten Familienkreis.',
  robots: { index: false, follow: false, nocache: true },
}

export default function GeschichteHubPage() {
  return (
    <PrivateFamilyWorkspace
      eyebrow="Familiengeschichte · Quellen vor Erzählung"
      title="Geschichte bleibt nachvollziehbar, mehrstimmig und korrigierbar."
      description="Der öffentliche Code enthält nur Arbeitsmethoden. Konkrete Familiengeschichten erscheinen erst nach privater Verbindung, Quellenprüfung und einer eigenen Freigabe für den jeweiligen Kreis."
      modules={researchTopics.map((topic) => ({
        title: topic.eyebrow,
        description: topic.description,
        state: 'bereit' as const,
        href: `/familie/geschichte/${topic.slug}`,
      }))}
    />
  )
}
