import { head } from '@vercel/blob'
import type { DataRoomDocument } from './registry'
import { dataRoomDocuments } from './registry'

export type DataRoomBlobState =
  | {
      status: 'configured-missing'
      message: string
    }
  | {
      status: 'token-missing'
      message: string
    }
  | {
      status: 'uploaded'
      size: number
      uploadedAt: string
      contentType: string
      etag: string
    }
  | {
      status: 'error'
      message: string
    }

export type DataRoomBlobStateMap = Record<string, DataRoomBlobState>

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Unknown storage error'
}

export async function getDataRoomBlobState(document: DataRoomDocument): Promise<DataRoomBlobState> {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return {
      status: 'token-missing',
      message: 'BLOB_READ_WRITE_TOKEN is not configured for this environment.',
    }
  }

  try {
    const metadata = await head(document.blobPath, { token })
    return {
      status: 'uploaded',
      size: metadata.size,
      uploadedAt: metadata.uploadedAt.toISOString(),
      contentType: metadata.contentType,
      etag: metadata.etag,
    }
  } catch (error) {
    const message = getErrorMessage(error)
    if (message.toLowerCase().includes('not found')) {
      return {
        status: 'configured-missing',
        message: 'Private Blob token is configured, but this document has not been uploaded yet.',
      }
    }

    return {
      status: 'error',
      message,
    }
  }
}

export async function getDataRoomBlobStates(): Promise<DataRoomBlobStateMap> {
  const entries = await Promise.all(
    dataRoomDocuments.map(async (document) => [document.id, await getDataRoomBlobState(document)] as const)
  )

  return Object.fromEntries(entries)
}
