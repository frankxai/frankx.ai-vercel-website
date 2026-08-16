import ResearchHubLead from './research-hub-lead'
import ResearchHubClient from './research-hub-client'

export default function ResearchPage() {
  return (
    <ResearchHubClient>
      <ResearchHubLead />
    </ResearchHubClient>
  )
}
