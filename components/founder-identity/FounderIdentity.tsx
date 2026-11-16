import type { ReactNode, CSSProperties } from 'react'
import Image from 'next/image'
import manifestJson from '@/data/founder-identity.release.json'
import { resolvePublicRendition, validatePackageContent } from '@/lib/founder-identity/contracts'
import type { FounderBrand, PackageContent, Placement, ReleaseManifest } from '@/lib/founder-identity/contracts'
import styles from './founder-identity.module.css'

const manifest = manifestJson as ReleaseManifest

/** Only immutable, explicitly released local renditions reach public HTML. */
export function FounderArtwork({ brand, assetId, placement }: { brand: FounderBrand; assetId?: string; placement: Placement }) {
  const asset = resolvePublicRendition(manifest, assetId, brand.id, placement)
  if (!asset) return null
  return <Image src={asset.src} width={asset.width} height={asset.height} alt={asset.alt}
    sizes={placement === 'presence' ? '(max-width: 700px) 100vw, 480px' : '96px'}
    className={styles.artwork} loading="lazy" />
}

type IdentityProps = { brand: FounderBrand; assetId?: string; className?: string }

export function FounderSignature({ brand, assetId, className = '' }: IdentityProps) {
  return <aside className={`${styles.root} ${styles.signature} ${className}`} data-founder-brand={brand.id} aria-label={`${brand.name} founder`}>
    <FounderArtwork brand={brand} assetId={assetId} placement="signature" />
    <div><p className={styles.name}>{brand.founderName}</p><p className={styles.role}>{brand.role}</p>
      <a className={styles.link} href={brand.storyHref}>{brand.storyLabel}<span aria-hidden="true"> ↗</span></a></div>
  </aside>
}

type PresenceProps = IdentityProps & { title: string; children: ReactNode; id: string }

export function FounderPresence(props: PresenceProps) {
  const asset = resolvePublicRendition(manifest, props.assetId, props.brand.id, 'presence')
  return <FounderPresenceFrame {...props} artwork={asset ? <FounderArtwork brand={props.brand} assetId={props.assetId} placement="presence" /> : null} />
}

/** Internal composition; a caller cannot inject an unapproved image through FounderPresence. */
function FounderPresenceFrame({ brand, title, children, id, artwork, className = '' }: PresenceProps & { artwork: ReactNode }) {
  const hasArt = Boolean(artwork)
  return <section id={id} aria-labelledby={`${id}-title`} data-founder-brand={brand.id}
    className={`${styles.root} ${styles.presence} ${hasArt ? styles.withArt : ''} ${className}`}>
    <div className={styles.presenceCopy}><p className={styles.eyebrow}>{brand.founderName} · {brand.role}</p>
      <h2 id={`${id}-title`} className={styles.title}>{title}</h2><div className={styles.copy}>{children}</div>
      <a className={styles.link} href={brand.storyHref}>{brand.storyLabel}<span aria-hidden="true"> ↗</span></a></div>
    {hasArt ? <figure className={styles.figure}>{artwork}<figcaption>Mini Frank · illustrated founder likeness</figcaption></figure> : null}
  </section>
}

export function PackageGuide({ brand, content, assetId }: { brand: FounderBrand; content: PackageContent; assetId?: string }) {
  if (validatePackageContent(content).length) return null
  const status = { available: 'Available', preview: 'Preview', waitlist: 'Waitlist', application: 'Application' }[content.availability]
  return <aside className={`${styles.root} ${styles.package}`} data-founder-brand={brand.id} aria-label={`Guide to ${content.name}`}>
    <FounderSignature brand={brand} assetId={assetId} />
    <div className={styles.packageBody}><p className={styles.eyebrow}>Before you choose · {status}</p>
      {content.audience ? <p className={styles.copy}>{content.audience}</p> : null}
      {content.includes.length ? <><h3 className={styles.smallHeading}>What the package lists</h3><ul>{content.includes.map(item => <li key={item}>{item}</li>)}</ul></> : null}
      <h3 className={styles.smallHeading}>Scope and availability</h3><ul>{content.limitations.map(item => <li key={item}>{item}</li>)}</ul>
      {content.price ? <p className={styles.price}>{content.price.display} · {content.price.cadence}{content.price.taxNote ? <small>{content.price.taxNote}</small> : null}</p> : null}
      <a className={styles.link} href={content.detailsHref}>Read the package details<span aria-hidden="true"> ↗</span></a>
    </div>
  </aside>
}

export function TrustAndOwnership({ brand, children }: { brand: FounderBrand; children?: ReactNode }) {
  return <aside className={`${styles.root} ${styles.trust}`} data-founder-brand={brand.id} aria-label="Founder accountability and terms">
    <p className={styles.name}>{brand.founderName} · {brand.name}</p><p className={styles.copy}>{brand.description}</p>{children}
    <nav className={styles.trustLinks} aria-label={`${brand.name} business and legal information`}>
      <a href={brand.contactHref}>Contact Frank</a>{brand.trustLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
    </nav>
  </aside>
}

export function CrossBrandAttribution({ brand }: { brand: FounderBrand }) {
  return <p className={`${styles.root} ${styles.attribution}`} data-founder-brand={brand.id}>By <a href={brand.storyHref}>{brand.founderName}</a> · {brand.name}</p>
}

export type FounderTheme = CSSProperties & { '--founder-accent'?: string; '--founder-surface'?: string; '--founder-text'?: string; '--founder-muted'?: string }
