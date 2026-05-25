import Link from 'next/link'

interface RelatedVideo {
  id: string
  title: string
  author: string
  duration: string
}

interface RelatedVideosProps {
  videos: RelatedVideo[]
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        Watch in Video Vault
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/watch#${video.id}`}
            className="group flex items-center gap-4 rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-16 h-12 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center flex-none">
              <svg className="w-6 h-6 text-white/20 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" strokeWidth="2" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/80 group-hover:text-emerald-400 transition-colors truncate">
                {video.title}
              </p>
              <p className="text-xs text-white/40">
                {video.author} &middot; {video.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
