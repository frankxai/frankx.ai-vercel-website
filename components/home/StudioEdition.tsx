'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { homepageFeaturedRelease as record } from '@/data/homepage-featured-release'
import { FeaturedTrackPlayer } from './FeaturedTrackPlayer'
import { trackEvent } from '@/lib/analytics'
import { gsap } from 'gsap'
import './studio-edition.css'

const work =
  '/blog/black-friday-2026-higgsfield-elevenlabs-ai-stack#same-brief-four-image-engines'
const photos = '/images/home/screen-test'
const takes = [
  {
    id: 'openai',
    label: 'GPT Image',
    title: 'The frame I kept',
    note: 'The camera and microphone both read clearly. The canal window gives the room depth.',
    alt: 'Omega between a film camera and a microphone in a blue and amber screening room.',
  },
  {
    id: 'claude',
    label: 'Claude',
    title: 'The layout study',
    note: 'A cone of light and a strip of film carry the scene. Claude composed this version without a generated background.',
    alt: 'Omega on a graphic stage with a filmstrip and an illustrated spotlight.',
  },
  {
    id: 'gemini',
    label: 'Gemini',
    title: 'The cleaner stage',
    note: 'The window opens up the room. The microphone sits too close to the other objects.',
    alt: 'Omega on a teal stage with a microphone in front of tall canal windows.',
  },
  {
    id: 'grok',
    label: 'Grok',
    title: 'The night exposure',
    note: 'The amber light gives this version its mood. The camera gets lost in shadow.',
    alt: 'Omega in a dark canal-side studio with a pool of amber light.',
  },
]

export function StudioEdition() {
  const [selected, setSelected] = useState(0)
  const picture = useRef<HTMLDivElement>(null)
  const take = takes[selected]
  function changeTake(i: number) {
    if (i === selected) return
    setSelected(i)
    if (
      picture.current &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      gsap.fromTo(
        picture.current,
        { scale: 1.035 },
        {
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: true,
          clearProps: 'transform',
        },
      )
    }
  }
  return (
    <div className="fx-edition">
      <section className="fx-opening" aria-labelledby="fx-title">
        <div className="fx-hero-art">
          <Image
            src={photos + '/stage.webp'}
            alt="A film camera, FRANK-Ω and a microphone on the same stage."
            fill
            priority
            sizes="(max-width: 720px) 100vw, 60vw"
          />
        </div>
        <div className="fx-opening-copy">
          <p className="fx-kicker">
            Frank Riemer <span>/</span> Amsterdam
          </p>
          <h1 id="fx-title">
            Picture
            <br />
            <em>&amp; sound.</em>
          </h1>
          <p className="fx-intro">
            I judge a video by its sound first. A rough frame with a good voice
            keeps me watching.
          </p>
          <a className="fx-button" href="#screen-test">
            Compare the four takes <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="fx-folio">
          Studio field note <span>26 November 2026</span>
        </p>
      </section>
      <section
        className="fx-test"
        id="screen-test"
        aria-labelledby="fx-test-title"
      >
        <div className="fx-test-heading">
          <p className="fx-kicker">From the edit</p>
          <h2 id="fx-test-title">
            One scene,
            <br />
            <em>four takes.</em>
          </h2>
          <p>
            I kept Omega, the camera and the microphone in the brief. Changing
            the room changed which one you noticed first.
          </p>
        </div>
        <div className="fx-takes">
          <div className="fx-take-photo">
            <div ref={picture}>
              <Image
                src={photos + '/' + take.id + '.webp'}
                alt={take.alt}
                fill
                sizes="(max-width: 720px) 100vw, 50vw"
              />
            </div>
          </div>
          <div
            className="fx-controls"
            role="group"
            aria-label="Compare image treatments"
          >
            {takes.map((item, i) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={i === selected}
                onClick={() => changeTake(i)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div aria-live="polite" className="fx-caption">
            <strong>{take.title}</strong>
            <p>{take.note}</p>
          </div>
          <Link href={work} className="fx-link">
            Read the full screen test <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="fx-shelf" aria-label="Elsewhere in the studio">
        <article className="fx-story" data-studio-story>
          <p className="fx-kicker">Character workshop</p>
          <h2>
            Would you recognise him
            <br />
            <em>in the next frame?</em>
          </h2>
          <p>
            Hair, beard, glasses. A different camera angle can make the same
            miniature look like someone else. The storyboard guide starts with
            the photographs and shows the six prompts I used.
          </p>
          <Link className="fx-link" href="/guides/mini-me-storyboard">
            Open the storyboard guide <span aria-hidden="true">↗</span>
          </Link>
        </article>
        {record.audioUrl ? (
          <FeaturedTrackPlayer track={record} />
        ) : (
          <article className="fx-listen">
            <Image
              src={record.imageUrl}
              width={160}
              height={160}
              alt="Violin on a wooden floor, the cover of Star Show Us"
            />
            <div>
              <p className="fx-kicker">On the turntable</p>
              <h2>{record.title}</h2>
              <p>Violin, jazz and a house pulse. {record.duration}.</p>
              <a className="fx-link" href={record.sunoUrl}>
                Listen on Suno ↗
              </a>
            </div>
          </article>
        )}
        <nav className="fx-deeper" aria-label="Explore Frank’s work">
          <Link
            href="/ai-architecture"
            onClick={() =>
              trackEvent('hero_cta_click', { type: 'ai_architecture' })
            }
          >
            Architecture ↗
          </Link>
          <Link
            href="/ecosystem"
            onClick={() => trackEvent('hero_cta_click', { type: 'ecosystem' })}
          >
            Ecosystem ↗
          </Link>
          <Link href="/music-lab">Music lab ↗</Link>
          <Link href="/library">Reading notes ↗</Link>
        </nav>
      </section>
    </div>
  )
}
