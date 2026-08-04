import { permanentRedirect } from 'next/navigation'

export default function LegacyACOSAgentsPage() {
  permanentRedirect('/agents')
}
