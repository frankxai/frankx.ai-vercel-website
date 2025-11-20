'use client'

import React from 'react'

interface SunoEmbedProps {
  songId: string
  title?: string
  className?: string
  height?: number
}

export function SunoEmbed({
  songId,
  title,
  className = '',
  height = 150
}: SunoEmbedProps) {
  // Extract clean song ID from various URL formats
  const cleanId = songId.includes('suno.com')
    ? songId.split('/').filter(Boolean).pop()?.split('?')[0]
    : songId

  return (
    <div className={`suno-embed-container ${className}`}>
      {title && (
        <div className="text-sm font-medium mb-2 text-slate-300">
          🎵 {title}
        </div>
      )}
      <iframe
        src={`https://suno.com/embed/${cleanId}`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
        className="rounded-lg border border-slate-700"
        title={title || 'Suno track'}
      />
    </div>
  )
}
