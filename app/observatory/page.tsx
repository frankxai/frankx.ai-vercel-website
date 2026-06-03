import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Catalog } from '@/lib/observatory/types'
import { ObservatoryShell } from '@/components/observatory/ObservatoryShell'

export const dynamic = 'force-static'

function loadCatalog(): Catalog {
  const path = join(process.cwd(), 'public/observatory/catalog.json')
  return JSON.parse(readFileSync(path, 'utf-8')) as Catalog
}

export default function ObservatoryPage() {
  const catalog = loadCatalog()
  return <ObservatoryShell catalog={catalog} />
}
