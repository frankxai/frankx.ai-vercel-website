import 'server-only'

import fs from 'fs'
import path from 'path'

export type CommunityPlatform = {
  platform: string
  category: string
  evidenceStatus: string
  primaryUseCase: string
  publicPricing2026: string
  webMobileModel: string
  brandedAppModel: string
  visualCustomizationCeiling: string
  informationArchitectureCustomization: string
  apiWebhooksSdkHeadless: string
  aiMcpAgentIntegration: string
  dataExportAndOwnership: string
  developerAccountOwnership: string
  monetizationAndFees: string
  migrationRisk: string
  maturity: string
  bestFit100kCreator: string
  verdict: string
  primarySourceUrls: string[]
  lastVerified: string
}

const MATRIX_PATH = path.join(
  process.cwd(),
  'public/downloads/community-platform-matrix-2026.csv'
)

const MATRIX_HEADERS = [
  'platform',
  'category',
  'evidence_status',
  'primary_use_case',
  'public_pricing_2026',
  'web_mobile_model',
  'branded_app_model',
  'visual_customization_ceiling',
  'information_architecture_customization',
  'api_webhooks_sdk_headless',
  'ai_mcp_agent_integration',
  'data_export_and_ownership',
  'developer_account_ownership',
  'monetization_and_fees',
  'migration_risk',
  'maturity',
  'best_fit_100k_creator',
  'verdict',
  'primary_source_urls',
  'last_verified',
] as const

function parseCsv(source: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]

    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        value += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        value += character
      }
      continue
    }

    if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(value)
      value = ''
    } else if (character === '\n') {
      row.push(value.replace(/\r$/, ''))
      rows.push(row)
      row = []
      value = ''
    } else {
      value += character
    }
  }

  if (value || row.length > 0) {
    row.push(value.replace(/\r$/, ''))
    rows.push(row)
  }

  if (quoted) {
    throw new Error('Community platform matrix contains an unterminated quoted field.')
  }

  return rows.filter((candidate) => candidate.some(Boolean))
}

function splitSources(value: string) {
  return value
    .split('|')
    .map((source) => source.trim())
    .filter(Boolean)
}

export function getCommunityPlatforms(): CommunityPlatform[] {
  const rows = parseCsv(fs.readFileSync(MATRIX_PATH, 'utf8'))
  const [header, ...records] = rows

  if (JSON.stringify(header) !== JSON.stringify(MATRIX_HEADERS)) {
    throw new Error(
      `Community platform matrix schema mismatch. Expected: ${MATRIX_HEADERS.join(', ')}.`
    )
  }

  const seenPlatforms = new Set<string>()

  return records.map((record, index) => {
    if (record.length !== MATRIX_HEADERS.length) {
      throw new Error(
        `Community platform row ${index + 2} has ${record.length} columns instead of ${MATRIX_HEADERS.length}.`
      )
    }

    const [platform, category, evidenceStatus] = record
    if (!platform || !category || !evidenceStatus || !record[10] || !record[17] || !record[18]) {
      throw new Error(`Community platform row ${index + 2} is missing a required evidence field.`)
    }
    if (seenPlatforms.has(platform)) {
      throw new Error(`Community platform matrix contains duplicate platform "${platform}".`)
    }
    seenPlatforms.add(platform)

    const primarySourceUrls = splitSources(record[18])
    for (const source of primarySourceUrls) {
      let parsed: URL
      try {
        parsed = new URL(source)
      } catch {
        throw new Error(`Community platform "${platform}" contains invalid source URL "${source}".`)
      }
      if (parsed.protocol !== 'https:') {
        throw new Error(`Community platform "${platform}" source URLs must use HTTPS.`)
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record[19])) {
      throw new Error(`Community platform "${platform}" has an invalid verification date.`)
    }

    return {
      platform,
      category,
      evidenceStatus,
      primaryUseCase: record[3],
      publicPricing2026: record[4],
      webMobileModel: record[5],
      brandedAppModel: record[6],
      visualCustomizationCeiling: record[7],
      informationArchitectureCustomization: record[8],
      apiWebhooksSdkHeadless: record[9],
      aiMcpAgentIntegration: record[10],
      dataExportAndOwnership: record[11],
      developerAccountOwnership: record[12],
      monetizationAndFees: record[13],
      migrationRisk: record[14],
      maturity: record[15],
      bestFit100kCreator: record[16],
      verdict: record[17],
      primarySourceUrls,
      lastVerified: record[19],
    }
  })
}
