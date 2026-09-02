// Waitlist intent labels.
//
// /waitlist?intent=<id> is the only paid destination the diagnostic can produce, so an
// intent the page cannot label is a silent dead end: the visitor lands on a generic form
// with no sign it received what they clicked. Keeping the map here rather than inline in
// the page lets the contract test assert that every id the graph can route to has a label.
//
// Ids are the `registryId` of a product node, which is also the row id in
// starlight/graph/products.graph.json. Course ids predate the graph and are kept because
// existing links use them.

export const WAITLIST_INTENT_LABELS: Record<string, string> = {
  // Product rows in the knowledge-to-offer graph.
  'creative-ai-toolkit': 'Creative AI Toolkit',
  'creation-chronicles': 'Creation Chronicles',
  'ai-architect-academy': 'AI Architect Academy',
  // Pre-existing course intents.
  'course-conscious-ai-foundations': 'Conscious AI Foundations',
  'course-agent-architecture-systems': 'Agent Architecture Systems',
  'course-creator-business-systems': 'Creator Business Systems',
}
