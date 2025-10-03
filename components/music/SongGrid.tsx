import SongCard, { SongRecord } from './SongCard'

// Re-export SongRecord for convenience
export type { SongRecord }

interface SongGridProps {
  songs: SongRecord[]
  limit?: number
}

export default function SongGrid({ songs, limit }: SongGridProps) {
  const displayed = limit ? songs.slice(0, limit) : songs

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayed.map((song) => (
        <SongCard key={song.title} song={song} />
      ))}
    </div>
  )
}
