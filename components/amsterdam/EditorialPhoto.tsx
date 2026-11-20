import Image from 'next/image'
import type { AmsterdamPhoto } from '@/content/amsterdam/editorial'
import styles from './edition.module.css'

export default function EditorialPhoto({ photo, sizes, preload = false }: {
  photo: AmsterdamPhoto
  sizes: string
  preload?: boolean
}) {
  return (
    <figure className={styles.photo}>
      <div className={styles.photoFrame}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} preload={preload} />
      </div>
      <figcaption>
        <span>{photo.place}</span>
        <a href={photo.source}>{photo.credit} · CC0</a>
      </figcaption>
    </figure>
  )
}
