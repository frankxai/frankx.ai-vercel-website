import { ImageLabClient } from './ImageLabClient'
import imageLog from '@/data/image-generation-log.json'

export const metadata = {
  title: 'Image Lab — Visual Creation Dashboard | FrankX',
  robots: { index: false, follow: false },
}

export default function ImageLabPage() {
  return <ImageLabClient log={imageLog} />
}
