import { homepageMarkdownResponse } from '@/lib/homepage-markdown'

export const dynamic = 'force-dynamic'

export function GET() {
  return homepageMarkdownResponse('GET')
}

export function HEAD() {
  return homepageMarkdownResponse('HEAD')
}
