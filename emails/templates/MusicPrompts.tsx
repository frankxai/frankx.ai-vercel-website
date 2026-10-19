/**
 * Music Prompts waitlist note — FrankX.AI v3.1
 *
 * Sent when someone subscribes to music-lab list.
 * Subject: "You're on the list for the 5 Suno prompts"
 */

import * as React from 'react'
import { Text, Link } from '@react-email/components'
import {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  EmailButton,
  HighlightBox,
  SignatureBlock,
  t,
} from '../components/Layout'

const TRACKS = [
  { title: 'The Awakening', genre: 'African / World', url: 'https://suno.com/song/8374d2ad-9142-4900-9028-a1e805688407' },
  { title: 'Vibe O S', genre: 'Hip Hop / Bass', url: 'https://suno.com/song/9cbad174-9276-427f-9aed-1ba00c7db3db' },
  { title: 'Golden Age of Intelligence', genre: 'EDM / Epic', url: 'https://suno.com/song/d1ad41a9-9239-454d-bc2c-a187f42ac30b' },
  { title: 'Trust in Yourself', genre: 'Pop Punk / Symphonic', url: 'https://suno.com/song/66572f21-2682-41f3-9051-86446e9b9bd7' },
  { title: 'Lumina', genre: 'Rock / Soul', url: 'https://suno.com/song/1fc13c04-a7b3-427d-bff0-cac92ee524ae' },
]

interface MusicPromptsProps {
  recipientName: string
  /** Unused: the guide isn't ready, so this note links to the launch list instead. */
  downloadUrl?: string
}

export function MusicPromptsEmail({ recipientName }: MusicPromptsProps) {
  return (
    <EmailLayout preview="The guide is coming. You'll get a note when it's ready.">
      <GlassCard accent={t.accentGreen}>
        <EmailHeading>You're on the list, {recipientName}.</EmailHeading>

        <EmailText>
          The guide with five Suno prompts isn't ready yet. You'll get a note when it is.
        </EmailText>

        <HighlightBox label="Tracks in the guide" color={t.accentGreen}>
          {TRACKS.map((track) => (
            <Text key={track.title} style={{ fontFamily: t.font, fontSize: '14px', color: t.textPrimary, margin: '0 0 8px 0', lineHeight: '1.5' }}>
              <Link href={track.url} style={{ color: t.accentCyan, textDecoration: 'none', fontWeight: 600 }}>{track.title}</Link>
              <br />
              <span style={{ fontSize: '13px', color: t.textDim }}>{track.genre}</span>
            </Text>
          ))}
        </HighlightBox>

        <EmailText muted>The Suno Prompt Library is on the launch list.</EmailText>

        <EmailButton href="https://frankx.ai/waitlist?intent=suno-prompt-library" variant="secondary">Join the launch list</EmailButton>

        <SignatureBlock />
      </GlassCard>
    </EmailLayout>
  )
}

export default MusicPromptsEmail
