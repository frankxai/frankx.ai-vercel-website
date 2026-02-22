'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Music2, BarChart3, Disc3, ListMusic, Rocket, TrendingUp,
  Heart, Play, ExternalLink, AlertCircle, CheckCircle2,
  ArrowUpRight, Star, Zap, Flame,
} from 'lucide-react'

// -- Types ------------------------------------------------------------------

interface TrackRow {
  id: string
  title: string
  genre: string[]
  plays: number
  likes: number
  duration: string
  sunoId: string
  sunoUrl: string
  section: string
  tags: string[]
  engagementRate: number
  rank: number
  tier: 'breakout' | 'strong' | 'growing' | 'new'
}

interface AlbumRow {
  id: string
  title: string
  subtitle: string
  genre: string
  color: string
  price: number
  status: string
  trackCount: number
  totalPlays: number
  totalLikes: number
  engagementRate: number
  playlistUrl: string | null
  lemonSqueezyProductId: string | null
  coverImage: string | null
}

interface PlaylistRow {
  name: string
  songs: number
  url: string
  tracksIndexed: number
  totalPlays: number
}

interface GenreRow {
  genre: string
  count: number
  plays: number
}

interface DashboardData {
  stats: {
    totalTracks: number
    indexedTracks: number
    followers: number
    totalPlays: number
    totalLikes: number
    playlists: number
    albums: number
    profileUrl: string
  }
  trackAnalytics: TrackRow[]
  genreDistribution: GenreRow[]
  albumAnalytics: AlbumRow[]
  playlistAnalytics: PlaylistRow[]
  distroKidCandidates: TrackRow[]
  totalTracksInInventory: number
  totalPlaylists: number
}

// -- Tab navigation ---------------------------------------------------------

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'albums', label: 'Albums', icon: Disc3 },
  { id: 'playlists', label: 'Playlists', icon: ListMusic },
  { id: 'insights', label: 'Insights', icon: TrendingUp },
  { id: 'distrokid', label: 'DistroKid', icon: Rocket },
] as const

type TabId = (typeof tabs)[number]['id']

// -- Helpers ----------------------------------------------------------------

const tierColors: Record<string, string> = {
  breakout: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  strong: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  growing: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  new: 'bg-white/10 text-white/60 border-white/20',
}

const albumColorMap: Record<string, string> = {
  amber: 'text-amber-400',
  rose: 'text-rose-400',
  violet: 'text-violet-400',
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
}

function StatCard({ value, label, icon: Icon, accent }: { value: string | number; label: string; icon: typeof Music2; accent?: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${accent || 'text-white/40'}`} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/40 mt-1">{label}</p>
    </div>
  )
}

// -- Overview Tab -----------------------------------------------------------

function OverviewTab({ data }: { data: DashboardData }) {
  const { stats, trackAnalytics, genreDistribution } = data
  const inventoryCoverage = Math.round((data.totalTracksInInventory / stats.totalTracks) * 100)
  const totalPlays = trackAnalytics.reduce((s, t) => s + t.plays, 0)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={stats.totalTracks} label="Total on Suno" icon={Music2} accent="text-emerald-400" />
        <StatCard value={data.totalTracksInInventory} label="Indexed Tracks" icon={Disc3} accent="text-cyan-400" />
        <StatCard value={totalPlays.toLocaleString()} label="Total Plays" icon={Play} accent="text-violet-400" />
        <StatCard value={stats.followers} label="Followers" icon={Heart} accent="text-rose-400" />
      </div>

      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${inventoryCoverage < 50 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
        {inventoryCoverage < 50 ? <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        <p className="text-sm text-white/70">
          <strong className="text-white">{inventoryCoverage}% indexed</strong> &mdash; {data.totalTracksInInventory} of {stats.totalTracks} tracks.
          {inventoryCoverage < 50 && ' Run Coworker scrape to index remaining tracks.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Top Tracks by Plays</h3>
          <div className="space-y-2">
            {trackAnalytics.slice(0, 10).map((t) => (
              <div key={t.id} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                <span className="text-sm font-mono text-white/30 w-6">#{t.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t.title}</p>
                  <p className="text-xs text-white/40">{t.genre.join(', ')}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-white">{t.plays}</p>
                  <p className="text-xs text-white/40">{t.engagementRate.toFixed(1)}% eng</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tierColors[t.tier]}`}>
                  {t.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Genre Performance</h3>
          <div className="space-y-2">
            {genreDistribution.slice(0, 12).map((g) => (
              <div key={g.genre} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{g.genre}</p>
                  <p className="text-xs text-white/40">{g.count} tracks</p>
                </div>
                <div className="w-32 bg-white/5 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (g.plays / (genreDistribution[0]?.plays || 1)) * 100)}%` }}
                  />
                </div>
                <span className="text-sm text-white/60 w-16 text-right">{g.plays} plays</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// -- Albums Tab -------------------------------------------------------------

function AlbumsTab({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={data.albumAnalytics.length} label="Albums" icon={Disc3} accent="text-violet-400" />
        <StatCard
          value={data.albumAnalytics.reduce((s, a) => s + a.trackCount, 0)}
          label="Total Album Tracks"
          icon={Music2}
          accent="text-cyan-400"
        />
        <StatCard
          value={data.albumAnalytics.reduce((s, a) => s + a.totalPlays, 0).toLocaleString()}
          label="Album Plays"
          icon={Play}
          accent="text-emerald-400"
        />
        <StatCard
          value={data.albumAnalytics.filter((a) => !a.lemonSqueezyProductId).length}
          label="Need LS Product"
          icon={AlertCircle}
          accent="text-amber-400"
        />
      </div>

      <div className="space-y-4">
        {data.albumAnalytics.map((album) => (
          <div key={album.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className={`text-lg font-semibold ${albumColorMap[album.color] || 'text-white'}`}>
                    {album.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${album.status === 'draft' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    {album.status}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-1">{album.subtitle} &mdash; {album.genre}</p>
              </div>
              <p className="text-lg font-semibold text-white">${album.price}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-white">{album.trackCount}</p>
                <p className="text-xs text-white/40">Tracks</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{album.totalPlays}</p>
                <p className="text-xs text-white/40">Total plays</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{album.totalLikes}</p>
                <p className="text-xs text-white/40">Total likes</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{album.engagementRate.toFixed(1)}%</p>
                <p className="text-xs text-white/40">Engagement</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {!album.coverImage && (
                <span className="text-xs px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Needs cover art
                </span>
              )}
              {!album.lemonSqueezyProductId && (
                <span className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Create LS product
                </span>
              )}
              {album.playlistUrl && (
                <a href={album.playlistUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors inline-flex items-center gap-1">
                  Suno playlist <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Albums to Develop Next</h3>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-medium">Japanese Rock Collection</p>
              <p>High engagement niche with anime/J-rock crossover appeal.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-medium">Arcanea Universe Expanded</p>
              <p>Multiple Arcanea-tagged tracks spanning DnB, deep house, punk, hip hop.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-medium">Dance Floor Essentials</p>
              <p>Club-ready DnB, UK garage, and funk tracks with consistent plays.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-white font-medium">Latin Heat</p>
              <p>Latin tech house / reggaeton tracks showing early promise.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- Playlists Tab ----------------------------------------------------------

function PlaylistsTab({ data }: { data: DashboardData }) {
  const totalPlaylistSongs = data.playlistAnalytics.reduce((s, p) => s + p.songs, 0)
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard value={data.totalPlaylists} label="Playlists" icon={ListMusic} accent="text-violet-400" />
        <StatCard value={totalPlaylistSongs} label="Total Songs in Playlists" icon={Music2} accent="text-cyan-400" />
        <StatCard value={data.playlistAnalytics.filter((p) => p.tracksIndexed > 0).length} label="With Indexed Tracks" icon={CheckCircle2} accent="text-emerald-400" />
      </div>

      <div className="space-y-3">
        {data.playlistAnalytics
          .sort((a, b) => b.songs - a.songs)
          .map((pl) => (
            <div key={pl.name} className="flex items-center gap-4 bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4">
              <div className="flex-1">
                <p className="font-medium text-white">{pl.name}</p>
                <p className="text-sm text-white/40">
                  {pl.songs} songs on Suno &middot; {pl.tracksIndexed} indexed &middot; {pl.totalPlays} plays
                </p>
              </div>
              <div className="w-24">
                <div className="bg-white/5 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${pl.songs > 0 ? Math.min(100, (pl.tracksIndexed / pl.songs) * 100) : 0}%` }}
                  />
                </div>
                <p className="text-xs text-white/30 mt-1 text-center">
                  {pl.songs > 0 ? Math.round((pl.tracksIndexed / pl.songs) * 100) : 0}%
                </p>
              </div>
              <a
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-white/50" />
              </a>
            </div>
          ))}
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Playlist Strategy</h3>
        <ul className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <span><strong className="text-white">Golden Frequencies</strong> &mdash; Already an album. Best-structured collection with healing/meditation theme.</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <span><strong className="text-white">Arcanean Choir</strong> &mdash; Fantasy/orchestral collection. Expand into full Arcanea Universe LP.</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <span><strong className="text-white">Instrumental Magic</strong> &mdash; Pure instrumentals. Good for background music licensing on BeatStars.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

// -- Insights Tab -----------------------------------------------------------

function InsightsTab({ data }: { data: DashboardData }) {
  const { trackAnalytics } = data
  const breakoutTracks = trackAnalytics.filter((t) => t.tier === 'breakout')
  const highEngagement = [...trackAnalytics].sort((a, b) => b.engagementRate - a.engagementRate).slice(0, 8)
  const avgPlays = trackAnalytics.length > 0
    ? Math.round(trackAnalytics.reduce((s, t) => s + t.plays, 0) / trackAnalytics.length)
    : 0

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value={breakoutTracks.length} label="Breakout Tracks (100+)" icon={Flame} accent="text-emerald-400" />
        <StatCard value={trackAnalytics.filter((t) => t.tier === 'strong').length} label="Strong (50-99)" icon={TrendingUp} accent="text-cyan-400" />
        <StatCard value={avgPlays} label="Avg Plays/Track" icon={BarChart3} accent="text-violet-400" />
        <StatCard
          value={`${Math.round(trackAnalytics.reduce((s, t) => s + t.engagementRate, 0) / Math.max(1, trackAnalytics.length))}%`}
          label="Avg Engagement"
          icon={Heart}
          accent="text-rose-400"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Why Top Songs Perform</h3>
          <div className="space-y-4 text-sm">
            <div className="border-l-2 border-emerald-500 pl-4">
              <p className="font-medium text-white">The Awakening (134 plays)</p>
              <p className="text-white/60">African/world music &mdash; unique genre on Suno with low competition. Short duration encourages full listens.</p>
            </div>
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="font-medium text-white">Vibe O S (128 plays, 24 likes)</p>
              <p className="text-white/60">Signature track with brand tie-in. Female hip hop vocal is distinctive. Product cross-reference drives repeat plays.</p>
            </div>
            <div className="border-l-2 border-violet-500 pl-4">
              <p className="font-medium text-white">Golden Age of Intelligence (119 plays)</p>
              <p className="text-white/60">EDM + metalcore genre blend is rare. Connected to book content for cross-promotion.</p>
            </div>
            <div className="border-l-2 border-rose-500 pl-4">
              <p className="font-medium text-white">Trust in Yourself (70 plays, 49% engagement)</p>
              <p className="text-white/60">Highest engagement rate. Pop punk + symphonic resonates emotionally. Motivational title drives saves/likes.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Highest Engagement Rate</h3>
          <div className="space-y-2">
            {highEngagement.map((t, i) => (
              <div key={t.id} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-3">
                <span className="text-sm font-mono text-white/30 w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{t.title}</p>
                  <p className="text-xs text-white/40">{t.genre.join(', ')}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-emerald-400">{t.engagementRate.toFixed(1)}%</p>
                  <p className="text-xs text-white/40">{t.likes}/{t.plays}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Patterns</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium text-emerald-400 mb-2">What Works</p>
            <ul className="space-y-1.5 text-white/60">
              <li>Genre-blending (pop punk + symphonic, african + world)</li>
              <li>Strong vocal hooks with emotional titles</li>
              <li>Shorter tracks (2-3 min) get more full plays</li>
              <li>Cross-promotion with products/content</li>
              <li>Unique genres with low competition on Suno</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-cyan-400 mb-2">Growth Areas</p>
            <ul className="space-y-1.5 text-white/60">
              <li>Tech house cluster needs breakout track</li>
              <li>Japanese/anime rock &mdash; high engagement, small catalog</li>
              <li>Latin tracks showing early promise</li>
              <li>Multilingual tracks add diversity</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-amber-400 mb-2">Action Items</p>
            <ul className="space-y-1.5 text-white/60">
              <li>Create more genre-fusion tracks (proven formula)</li>
              <li>Expand Japanese rock series</li>
              <li>Connect top tracks to blog content</li>
              <li>Full catalog scrape will reveal hidden performers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- DistroKid Tab ----------------------------------------------------------

function DistroKidTab({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">DistroKid Distribution Strategy</h3>
        <p className="text-sm text-white/60 mb-4">
          DistroKid ($22/year) is the only major distributor allowing AI music with disclosure. Distributes to Spotify, Apple Music, YouTube Music, Amazon, TikTok, 150+ platforms.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            AI disclosure required
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Suno paid = commercial license
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
            Add human elements for stronger copyright
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recommended Singles (Top 15)</h3>
        <p className="text-sm text-white/50 mb-4">Ranked by composite score: 60% plays + 40% engagement rate</p>
        <div className="space-y-2">
          {data.distroKidCandidates.map((t, i) => (
            <div key={t.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4">
              <span className="text-lg font-bold text-white/20 w-8">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{t.title}</p>
                <p className="text-sm text-white/40">{t.genre.join(' / ')} &middot; {t.duration}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{t.plays}</p>
                  <p className="text-xs text-white/30">plays</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-emerald-400">{t.engagementRate.toFixed(1)}%</p>
                  <p className="text-xs text-white/30">eng</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tierColors[t.tier]}`}>
                  {t.tier}
                </span>
                {t.sunoId && (
                  <a
                    href={`https://suno.com/song/${t.sunoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-white/40" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Release Strategy</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">1</div>
            <div>
              <p className="font-medium text-white">Week 1: Lead Singles (3 tracks)</p>
              <p className="text-white/60">Trust in Yourself, The Awakening, Vibe O S. Establish presence across Pop, World, and Hip Hop.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">2</div>
            <div>
              <p className="font-medium text-white">Week 3: Genre Expansion (4 tracks)</p>
              <p className="text-white/60">Golden Age of Intelligence, Lumina, Starlight Delight, Arcanea. Cover 4 different streaming categories.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-xs shrink-0">3</div>
            <div>
              <p className="font-medium text-white">Week 5: First EP</p>
              <p className="text-white/60">Release a themed EP (6 tracks). Strongest combined metrics for algorithm visibility.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">4</div>
            <div>
              <p className="font-medium text-white">Week 7: Golden Frequencies Album</p>
              <p className="text-white/60">9-track healing frequencies album targeting meditation/ambient playlists on Spotify.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- Main Component ---------------------------------------------------------

export function MusicDashboardClient({ data }: { data: DashboardData }) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const totalPlays = data.trackAnalytics.reduce((s, t) => s + t.plays, 0)

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Music Dashboard</h1>
            <p className="text-white/50 mt-1">
              {data.totalTracksInInventory} indexed &middot; {data.stats.totalTracks} total on Suno &middot; {totalPlays.toLocaleString()} plays
            </p>
          </div>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            View public page <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'albums' && <AlbumsTab data={data} />}
        {activeTab === 'playlists' && <PlaylistsTab data={data} />}
        {activeTab === 'insights' && <InsightsTab data={data} />}
        {activeTab === 'distrokid' && <DistroKidTab data={data} />}
      </div>
    </div>
  )
}
