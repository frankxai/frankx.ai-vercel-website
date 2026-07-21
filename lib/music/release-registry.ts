import approvalsFile from '../../data/music/release-approvals.json' with { type: 'json' }

import { loadCatalog, type CatalogSong } from '../music-video/catalog.ts'

export const RELEASE_GATES = [
  'selection',
  'rights',
  'master',
  'artwork',
  'copy',
  'publish',
  'homepage',
] as const

export type ReleaseGate = (typeof RELEASE_GATES)[number]
export type GovernanceState = 'legacy-unreviewed' | 'governed'

export type ReleaseDecision =
  | { status: 'pending' }
  | {
      status: 'approved'
      authority: 'human'
      by: string
      at: string
      revision: number
      note?: string
    }
  | {
      status: 'rejected'
      authority: 'human'
      by: string
      at: string
      revision: number
      reason: string
    }

export interface ApprovalLedgerRecord {
  revision: number
  gates: Record<ReleaseGate, ReleaseDecision>
}

export interface ApprovalLedgerFile {
  schemaVersion: number
  records: Record<string, ApprovalLedgerRecord>
}

export interface AssetManifest {
  sourceAudio: string | null
  masterAudio: string | null
  streamingAudio: string | null
  beatgrid: string | null
  coverDefault: string | null
  coverSquare: string | null
  coverLandscape: string | null
  coverPortrait: string | null
  videoShort: string | null
  videoSquare: string | null
  videoFull: string | null
  canvas: string | null
  lyricVideo: string | null
}

export interface CanonicalRelease {
  song: CatalogSong
  governance: GovernanceState
  revision: number | null
  gates: Record<ReleaseGate, ReleaseDecision>
  assets: AssetManifest
}

export interface RegistryValidationInput {
  catalog?: readonly CatalogSong[]
  approvals?: ApprovalLedgerFile
}

export const releaseApprovalLedger = approvalsFile as unknown as ApprovalLedgerFile

const asAsset = (value: string): string | null => value.trim() || null
const isPositiveInteger = (value: number | null): value is number =>
  Number.isInteger(value) && (value ?? 0) > 0
const isPresent = (value: string): boolean => value.trim().length > 0

function emptyGates(): Record<ReleaseGate, ReleaseDecision> {
  return Object.fromEntries(
    RELEASE_GATES.map((gate) => [gate, { status: 'pending' }]),
  ) as Record<ReleaseGate, ReleaseDecision>
}

function deriveAssets(song: CatalogSong): AssetManifest {
  return {
    sourceAudio: asAsset(song.audioPath),
    masterAudio: asAsset(song.masterAudioPath),
    streamingAudio: asAsset(song.streamingAudioUrl),
    beatgrid: asAsset(song.beatgridPath),
    coverDefault: asAsset(song.coverPath),
    coverSquare: asAsset(song.cover1x1Path) ?? asAsset(song.coverPath),
    coverLandscape: asAsset(song.cover16x9Path),
    coverPortrait: asAsset(song.cover9x16Path),
    videoShort: asAsset(song.videoShortPath),
    videoSquare: asAsset(song.videoSquarePath),
    videoFull: asAsset(song.videoFullPath),
    canvas: asAsset(song.canvasPath),
    lyricVideo: asAsset(song.lyricVideoPath),
  }
}

function joinRegistry(
  catalog: readonly CatalogSong[],
  approvals: ApprovalLedgerFile,
): CanonicalRelease[] {
  return catalog.map((song) => {
    const approval = approvals.records[song.songId]
    const governed =
      isPositiveInteger(song.revision) &&
      approval !== undefined &&
      approval.revision === song.revision

    return {
      song,
      governance: governed ? 'governed' : 'legacy-unreviewed',
      revision: governed ? song.revision : null,
      gates: governed && approval ? approval.gates : emptyGates(),
      assets: deriveAssets(song),
    }
  })
}

function approvedAtRevision(
  decision: ReleaseDecision,
  revision: number | null,
): boolean {
  return (
    revision !== null &&
    decision.status === 'approved' &&
    decision.authority === 'human' &&
    decision.revision === revision
  )
}

function hasCurrentApprovals(
  release: CanonicalRelease,
  gates: readonly ReleaseGate[],
): boolean {
  return gates.every((gate) => approvedAtRevision(release.gates[gate], release.revision))
}

function releasedBy(song: CatalogSong, at: Date): boolean {
  if (!song.releasedDate) return false
  const releasedAt = Date.parse(`${song.releasedDate}T00:00:00Z`)
  return Number.isFinite(releasedAt) && releasedAt <= at.getTime()
}

export function isPublicRelease(release: CanonicalRelease, at = new Date()): boolean {
  if (release.governance !== 'governed' || release.song.status !== 'released') {
    return false
  }

  if (
    !releasedBy(release.song, at) ||
    !isPresent(release.song.takeId) ||
    !isPresent(release.song.masterId) ||
    release.assets.masterAudio === null ||
    release.assets.streamingAudio === null ||
    release.assets.coverSquare === null
  ) {
    return false
  }

  return hasCurrentApprovals(release, [
    'selection',
    'rights',
    'master',
    'artwork',
    'copy',
    'publish',
  ])
}

export function validateReleaseRegistry({
  catalog = loadCatalog(),
  approvals = releaseApprovalLedger,
}: RegistryValidationInput = {}): string[] {
  const errors: string[] = []
  const songById = new Map<string, CatalogSong>()
  const slugOwner = new Map<string, string>()
  const takeOwner = new Map<string, string>()
  const masterOwner = new Map<string, string>()

  if (approvals.schemaVersion !== 1) {
    errors.push(`release approvals schemaVersion must be 1; received ${approvals.schemaVersion}`)
  }

  const claimUnique = (
    kind: string,
    value: string,
    songId: string,
    owners: Map<string, string>,
  ) => {
    if (!isPresent(value)) return
    const owner = owners.get(value)
    if (owner) errors.push(`${kind} "${value}" is shared by ${owner} and ${songId}`)
    else owners.set(value, songId)
  }

  for (const song of catalog) {
    if (songById.has(song.songId)) errors.push(`duplicate song_id "${song.songId}"`)
    else songById.set(song.songId, song)

    claimUnique('canonical_slug', song.canonicalSlug, song.songId, slugOwner)
    claimUnique('take_id', song.takeId, song.songId, takeOwner)
    claimUnique('master_id', song.masterId, song.songId, masterOwner)

    if (song.masterId && (!song.takeId || !song.masterAudioPath)) {
      errors.push(
        `${song.songId}: master_id requires both take_id and master_audio_path`,
      )
    }

    if (song.revision !== null) {
      if (!isPositiveInteger(song.revision)) {
        errors.push(`${song.songId}: revision must be a positive integer`)
      }
      for (const [field, value] of [
        ['ledger_id', song.ledgerId],
        ['work_id', song.workId],
        ['primary_artist', song.primaryArtist],
        ['canonical_slug', song.canonicalSlug],
      ] as const) {
        if (!isPresent(value)) errors.push(`${song.songId}: governed row requires ${field}`)
      }
      if (!approvals.records[song.songId]) {
        errors.push(`${song.songId}: governed row requires a human approval ledger record`)
      }
    }
  }

  for (const [songId, record] of Object.entries(approvals.records)) {
    const song = songById.get(songId)
    if (!song) {
      errors.push(`${songId}: approval ledger record does not resolve to catalog.csv`)
      continue
    }
    if (!isPositiveInteger(song.revision)) {
      errors.push(`${songId}: approval ledger record requires a positive catalog revision`)
    } else if (record.revision !== song.revision) {
      errors.push(
        `${songId}: approval revision ${record.revision} does not match catalog revision ${song.revision}`,
      )
    }

    const presentGates = Object.keys(record.gates)
    for (const gate of RELEASE_GATES) {
      const decision = record.gates[gate]
      if (!decision) {
        errors.push(`${songId}: missing ${gate} decision`)
        continue
      }
      if (!['pending', 'approved', 'rejected'].includes(decision.status)) {
        errors.push(`${songId}: ${gate} has invalid status "${String(decision.status)}"`)
        continue
      }
      if (decision.status === 'pending') continue

      if (decision.authority !== 'human') {
        errors.push(`${songId}: ${gate} may only be decided by a human authority`)
      }
      if (!isPresent(decision.by)) errors.push(`${songId}: ${gate} decision requires by`)
      if (!Number.isFinite(Date.parse(decision.at))) {
        errors.push(`${songId}: ${gate} decision requires a valid ISO date`)
      }
      if (decision.revision !== record.revision) {
        errors.push(`${songId}: ${gate} decision is stale for revision ${record.revision}`)
      }
      if (decision.status === 'rejected' && !isPresent(decision.reason)) {
        errors.push(`${songId}: rejected ${gate} decision requires a reason`)
      }
    }

    for (const gate of presentGates) {
      if (!RELEASE_GATES.includes(gate as ReleaseGate)) {
        errors.push(`${songId}: unknown approval gate "${gate}"`)
      }
    }
  }

  return errors
}

function getValidatedRegistry(): CanonicalRelease[] {
  const catalog = loadCatalog()
  const errors = validateReleaseRegistry({ catalog, approvals: releaseApprovalLedger })
  if (errors.length > 0) {
    throw new Error(`Music release registry is invalid:\n- ${errors.join('\n- ')}`)
  }
  return joinRegistry(catalog, releaseApprovalLedger)
}

export function getRelease(songId: string): CanonicalRelease | undefined {
  return getValidatedRegistry().find((release) => release.song.songId === songId)
}

export function getGovernedReleases(): CanonicalRelease[] {
  return getValidatedRegistry().filter((release) => release.governance === 'governed')
}

export function getPublicReleases(at = new Date()): CanonicalRelease[] {
  return getValidatedRegistry().filter((release) => isPublicRelease(release, at))
}

export function getHomepageEligibleReleases(at = new Date()): CanonicalRelease[] {
  return getPublicReleases(at).filter((release) =>
    hasCurrentApprovals(release, ['homepage']),
  )
}
