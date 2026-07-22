#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), 'utf8'))

const routeIndex = readJson('data/route-index.json')
const pageRegistry = readJson('data/site-experience/page-experience-registry.json')
const guideRegistry = readJson('data/site-experience/guide-registry.json')
const assetRegistry = readJson('data/site-experience/asset-registry.json')
const offerRegistry = readJson('data/site-experience/offer-registry.json')
const productRegistry = readJson('data/products.json')
const crossSiteRegistry = readJson('data/site-experience/cross-site-route-registry.json')

const failures = []
const routeSet = new Set(routeIndex.routes.map((route) => route.href))
const recordRoutes = pageRegistry.records.map((record) => record.route)
const recordRouteSet = new Set(recordRoutes)

if (recordRoutes.length !== recordRouteSet.size) failures.push('Page experience registry contains duplicate routes.')
for (const route of routeSet) {
  if (!recordRouteSet.has(route)) failures.push(`Missing PageExperienceRecord for ${route}`)
}
for (const route of recordRouteSet) {
  if (!routeSet.has(route)) failures.push(`PageExperienceRecord is not present in route-index: ${route}`)
}

const requiredPageFields = [
  'site',
  'route',
  'hub',
  'pageRole',
  'primaryAudience',
  'secondaryAudiences',
  'lifecycle',
  'freshness',
  'evidence',
  'copyScore',
  'assetStatus',
  'ctaStatus',
  'owner',
  'lastReview',
]
for (const record of pageRegistry.records) {
  for (const field of requiredPageFields) {
    if (!(field in record)) failures.push(`${record.route} is missing PageExperienceRecord.${field}`)
  }
}

for (const criticalHub of ['/', '/music', '/gencreator', '/learn', '/build', '/resources', '/blog']) {
  const record = pageRegistry.records.find((item) => item.route === criticalHub)
  if (!record?.experienceContract) failures.push(`${criticalHub} is missing its hub experience contract.`)
}

const guideRouteSet = new Set(guideRegistry.map((guide) => guide.route))
for (const route of routeIndex.routes.filter((item) => item.type === 'guide').map((item) => item.href)) {
  if (!guideRouteSet.has(route)) failures.push(`Missing GuideRecord for ${route}`)
}
const secondBrain = guideRegistry.find((guide) => guide.route === '/guides/agentic-obsidian-second-brain')
if (!secondBrain) failures.push('Second Brain guide is missing from GuideRecord registry.')
if ((secondBrain?.primarySources?.length ?? 0) < 2) failures.push('Second Brain guide requires primary-source records.')

const offerRouteSet = new Set(offerRegistry.map((offer) => offer.route))
if (offerRouteSet.size !== offerRegistry.length) failures.push('Offer registry contains duplicate routes.')
for (const product of productRegistry) {
  const productRoute = `/products/${product.slug}`
  if (!offerRouteSet.has(productRoute)) failures.push(`${productRoute} is missing an OfferRecord.`)
  if ((product.offer?.primaryPrice ?? product.price ?? 0) > 0) {
    failures.push(`${productRoute} contains a price outside the verified OfferRecord registry.`)
  }
}

for (const offer of offerRegistry) {
  if (offer.verifiedPrice && !offer.checkoutDestination) {
    failures.push(`${offer.id} exposes a verified price without a checkout destination.`)
  }
  if (!offer.verifiedPrice && offer.checkoutDestination) {
    failures.push(`${offer.id} exposes a checkout destination without a verified price.`)
  }
  if (!offer.lastVerification || !offer.evidence) failures.push(`${offer.id} is missing offer verification evidence.`)
}

for (const route of crossSiteRegistry) {
  if (!route.reciprocalLink || !route.audienceReason) {
    failures.push(`${route.sourceDomain}${route.sourceRoute} has an incomplete cross-site route record.`)
  }
}

const criticalPrefixes = ['components/home/', 'app/page.tsx', 'components/NavigationMega.tsx']
for (const asset of assetRegistry) {
  const isCritical = asset.consumers?.some((consumer) => criticalPrefixes.some((prefix) => consumer.startsWith(prefix)))
  if (isCritical && asset.renderStatus === 'missing') {
    failures.push(`Critical surface references a missing asset: ${asset.canonicalSource}`)
  }
}

if (failures.length > 0) {
  console.error(`[site-experience] ${failures.length} contract failure(s):`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

const missingAssetCount = assetRegistry.filter((asset) => asset.renderStatus === 'missing').length
console.log(`[site-experience] PASS: ${pageRegistry.records.length} routes, ${guideRegistry.length} guides, ${assetRegistry.length} assets`)
console.log(`[site-experience] Long-tail assets awaiting repair: ${missingAssetCount}`)
