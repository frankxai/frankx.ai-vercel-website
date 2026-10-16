import JsonLd, { buildFAQPageData } from '@/components/seo/JsonLd'
import { extractFAQFromBody } from '../../scripts/generate-schema.mjs'

/**
 * Emits FAQPage JSON-LD from the same body extractor the blog schema
 * generator uses, so the structured answers stay on the visible FAQ.
 */
export default function BodyFaqSchema({ source, id }: { source: string; id?: string }) {
  const faqs = extractFAQFromBody(source)
  if (faqs.length === 0) return null
  return <JsonLd type="FAQPage" data={buildFAQPageData(faqs)} id={id} />
}
