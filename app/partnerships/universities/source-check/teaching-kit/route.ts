import { teachingKit } from '../case'

export const dynamic = 'force-static'

export function GET() {
  return new Response(teachingKit(), { headers: {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Content-Disposition': 'attachment; filename="frankx-source-check-teaching-kit.md"',
  } })
}
