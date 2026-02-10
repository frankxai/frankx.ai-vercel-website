/**
 * FrankX Embed Components
 *
 * State-of-the-art embed system for immersive media experiences.
 *
 * USAGE:
 *
 * Social Feeds:
 * ```tsx
 * import { SocialFeedEmbed } from '@/components/embeds'
 *
 * <SocialFeedEmbed
 *   posts={[
 *     { id: '123', platform: 'tiktok', title: 'Demo video' },
 *     { id: '456', platform: 'instagram', title: 'Photo post' },
 *   ]}
 *   layout="grid"
 *   columns={3}
 * />
 * ```
 *
 * AI Art Gallery:
 * ```tsx
 * import { MidjourneyGallery } from '@/components/embeds'
 *
 * <MidjourneyGallery
 *   artworks={[
 *     {
 *       id: '1',
 *       src: '/images/ai-art/piece1.png',
 *       title: 'Cosmic Neural Network',
 *       prompt: 'cosmic neural network, glowing synapses...',
 *       model: 'midjourney',
 *       category: 'Technology',
 *     },
 *   ]}
 *   layout="masonry"
 *   showPrompts
 * />
 * ```
 *
 * Universal Embeds (for MDX):
 * ```mdx
 * <YouTubeEmbed id="VIDEO_ID_HERE" title="Demo Video" />
 * <TikTokEmbed id="7123456789" />
 * <SpotifyEmbed id="4iV5W9uYEdYUVa79Axb7Rh" />
 * ```
 */

// Social Feed Components
export { SocialFeedEmbed } from './SocialFeedEmbed'
export type { SocialPost, Platform, SocialFeedEmbedProps } from './SocialFeedEmbed'

// AI Art Gallery Components
export { MidjourneyGallery } from './MidjourneyGallery'
export type { AIArtwork, MidjourneyGalleryProps } from './MidjourneyGallery'

// Universal Embed Components
export {
  UniversalEmbed,
  YouTubeEmbed,
  TikTokEmbed,
  InstagramEmbed,
  TwitterEmbed,
  SpotifyEmbed,
  VimeoEmbed,
  FigmaEmbed,
  CodePenEmbed,
  LoomEmbed,
} from './UniversalEmbed'
export type { EmbedType, UniversalEmbedProps } from './UniversalEmbed'
