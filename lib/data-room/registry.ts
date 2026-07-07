import registryJson from '@/data/admin/data-room-registry.json'

export type DataRoomDocumentType = 'pdf' | 'pptx' | 'markdown-source'
export type DataRoomAccessClass = 'internal-private'

export type DataRoomDocument = {
  id: string
  title: string
  description: string
  type: DataRoomDocumentType
  contentType: string
  filename: string
  sourcePath: string
  blobPath: string
  accessClass: DataRoomAccessClass
  publicSafe: false
  sha256: string
  sizeBytes: number
  recommendedRoute: string
}

export type DataRoomRegistry = {
  schema: 'frankx.adminDataRoom.v1'
  updatedAt: string
  confidentiality: 'private-internal'
  storageProvider: 'vercel-blob-private'
  sourceRootEnv: 'DATA_ROOM_SOURCE_ROOT'
  defaultSourceRootHint: string
  documents: DataRoomDocument[]
}

export const dataRoomRegistry = registryJson as DataRoomRegistry
export const dataRoomDocuments = dataRoomRegistry.documents

export function getDataRoomDocument(documentId: string): DataRoomDocument | undefined {
  return dataRoomDocuments.find((document) => document.id === documentId)
}

export function formatDataRoomBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** exponent
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`
}

export function getDataRoomStats() {
  const totalBytes = dataRoomDocuments.reduce((sum, document) => sum + document.sizeBytes, 0)
  const pdfCount = dataRoomDocuments.filter((document) => document.type === 'pdf').length
  const deckCount = dataRoomDocuments.filter((document) => document.type === 'pptx').length
  const sourceCount = dataRoomDocuments.filter((document) => document.type === 'markdown-source').length

  return {
    documentCount: dataRoomDocuments.length,
    privateCount: dataRoomDocuments.filter((document) => document.accessClass === 'internal-private').length,
    publicSafeCount: dataRoomDocuments.filter((document) => document.publicSafe).length,
    pdfCount,
    deckCount,
    sourceCount,
    totalBytes,
  }
}

export function getDispositionMode(document: DataRoomDocument, forceDownload: boolean): 'inline' | 'attachment' {
  if (forceDownload || document.type === 'pptx') return 'attachment'
  return 'inline'
}
