import { NextResponse } from 'next/server'
import { HARDWARE_FAQ, HARDWARE_PLATFORMS, HARDWARE_REVIEWED_AT, SETUP_PROFILES, WORKLOAD_FIT } from '@/data/hardware-intelligence'

export const revalidate = 86400

export async function GET() {
  return NextResponse.json({
    schemaVersion: '1.0.0',
    reviewedAt: HARDWARE_REVIEWED_AT,
    methodology: {
      pricePolicy: 'European planning bands observed around the review date; verify VAT, seller, stock, delivery, and warranty at checkout.',
      modelFitPolicy: 'Conservative editorial planning bands; exact fit depends on quantization, context cache, runtime, batching, and concurrency.',
      memoryPolicy: 'Separate devices expose separate memory pools unless a supported distributed runtime explicitly shards a named model.',
    },
    platforms: HARDWARE_PLATFORMS,
    setups: SETUP_PROFILES,
    workloadFit: WORKLOAD_FIT,
    faq: HARDWARE_FAQ,
  })
}
