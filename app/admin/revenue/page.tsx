import type { Metadata } from 'next'
import { RevenueClient } from './RevenueClient'
import templates from '@/data/templates.json'
import deployData from '@/data/deploy-targets.json'
import { getAllAffiliates, getDeployPlatforms } from '@/lib/affiliates/affiliate-manager'

export const metadata: Metadata = {
  title: 'Revenue Dashboard — Admin | FrankX',
  robots: { index: false, follow: false },
}

export default function RevenueDashboardPage() {
  const affiliates = getAllAffiliates()
  const deployPlatforms = getDeployPlatforms()

  // Compute summary stats
  const totalTemplates = templates.length
  const activeTemplates = templates.filter(
    (t) => t.lemonSqueezy?.variantId
  ).length
  const totalRevenuePotential = templates.reduce((sum, t) => sum + t.price, 0)
  const avgPrice = Math.round(totalRevenuePotential / totalTemplates)
  const blueprintCount = (deployData as { blueprints?: unknown[] }).blueprints?.length ?? 0

  const categoryBreakdown = templates.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const tierBreakdown = templates.reduce(
    (acc, t) => {
      acc[t.tier] = (acc[t.tier] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <RevenueClient
      templates={templates}
      affiliates={affiliates}
      deployPlatforms={deployPlatforms}
      stats={{
        totalTemplates,
        activeTemplates,
        totalRevenuePotential,
        avgPrice,
        blueprintCount,
        categoryBreakdown,
        tierBreakdown,
      }}
    />
  )
}
