/**
 * Music Prompts Lead Magnet — FrankX.AI v3.1
 *
 * Sent when someone subscribes to music-lab list.
 * Subject: "Your 5 studio prompts — ready to use"
 */

import * as React from 'react'
import { Text, Link } from '@react-email/components'
import {
  EmailLayout,
  GlassCard,
  EmailHeading,
  EmailText,
  EmailButton,
  MascotSpeech,
  HighlightBox,
  SectionLabel,
  SignatureBlock,
  t,
} from '../components/Layout'

const TRACKS = [
  { title: 'The Awakening', stat: '142 plays', genre: 'African / World', url: 'https://suno.com/song/8374d2ad-9142-4900-9028-a1e805688407' },
  { title: 'Vibe O S', stat: '128 plays', genre: 'Hip Hop / Bass', url: 'https://suno.com/song/9cbad174-9276-427f-9aed-1ba00c7db3db' },
  { title: 'Golden Age of Intelligence', stat: '119 plays', genre: 'EDM / Epic', url: 'https://suno.com/song/d1ad41a9-9239-454d-bc2c-a187f42ac30b' },
  { title: 'Trust in Yourself', stat: '34 likes', genre: 'Pop Punk / Symphonic', url: 'https://suno.com/song/66572f21-2682-41f3-9051-86446e9b9bd7' },
  { title: 'Lumina', stat: '108 plays', genre: 'Rock / Soul', url: 'https://suno.com/song/1fc13c04-a7b3-427d-bff0-cac92ee524ae' },
]

interface MusicPromptsProps {
  recipientName: string
  downloadUrl: string
}

export function MusicPromptsEmail({ recipientName, downloadUrl }: MusicPromptsProps) {
  return (
    <EmailLayout preview="The exact prompts behind 500+ plays on Suno AI. Download your 5 free prompts now.">
      <GlassCard accent={t.accentGreen}>
        <MascotSpeech mood="chill" message={`5 prompts from the studio, ${recipientName}. Make something fire.`} />

        <EmailHeading>Your 5 Suno prompts are ready.</EmailHeading>

        <EmailText>
          These are the exact prompts behind my top-performing tracks. 500+ combined plays, refined over 500+ songs.
        </EmailText>

        <EmailText muted>
          Each one includes a breakdown of <strong style={{ color: t.accentGreen }}>why it works</strong> and <strong style={{ color: t.accentGreen }}>variations to try</strong>. Copy, paste, create.
        </EmailText>

        <EmailButton href={downloadUrl}>Download Your 5 Prompts</EmailButton>

        <HighlightBox label="Tracks Included" color={t.accentGreen}>
          {TRACKS.map((track) => (
            <Text key={track.title} style={{ fontFamily: t.font, fontSize: '14px', color: t.textPrimary, margin: '0 0 8px 0', lineHeight: '1.5' }}>
              <Link href={track.url} style={{ color: t.accentCyan, textDecoration: 'none', fontWeight: 600 }}>{track.title}</Link>
              <br />
              <span style={{ fontSize: '13px', color: t.textDim }}>{track.genre} &middot; {track.stat}</span>
            </Text>
          ))}
        </HighlightBox>

        <SignatureBlock />
      </GlassCard>
    </EmailLayout>
  )
}

export default MusicPromptsEmail
