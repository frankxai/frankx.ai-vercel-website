'use client'

import { useState, useEffect } from 'react'
import { Download, CheckCircle } from 'lucide-react'

interface DownloadProgressProps {
  url: string
  fileName: string
  onComplete?: () => void
  className?: string
}

export default function DownloadProgress({
  url,
  fileName,
  onComplete,
  className = ''
}: DownloadProgressProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const startDownload = async () => {
    setIsDownloading(true)
    setProgress(0)

    try {
      const response = await fetch(url)
      const reader = response.body?.getReader()
      const contentLength = parseInt(response.headers.get('content-length') || '0')

      if (!reader) {
        throw new Error('Failed to read response')
      }

      let receivedLength = 0
      const chunks: Uint8Array[] = []

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        chunks.push(value)
        receivedLength += value.length

        if (contentLength > 0) {
          const percentage = Math.round((receivedLength / contentLength) * 100)
          setProgress(percentage)
        }
      }

      // Create blob and download
      const blob = new Blob(chunks as BlobPart[])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)

      setProgress(100)
      setIsComplete(true)
      onComplete?.()
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback to simple download
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setIsComplete(true)
      onComplete?.()
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className={className}>
      {!isDownloading && !isComplete && (
        <button
          onClick={startDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
        >
          <Download size={20} />
          <span>Download PDF</span>
        </button>
      )}

      {isDownloading && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Downloading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle size={20} />
          <span className="font-medium">Download complete!</span>
        </div>
      )}
    </div>
  )
}
