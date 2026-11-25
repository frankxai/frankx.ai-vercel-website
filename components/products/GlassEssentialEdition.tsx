import { glassEssentialPreview } from '@/lib/products/glass-essential-preview'
import GlassEditionInspector from './GlassEditionInspector'

export default function GlassEssentialEdition({ listingPrice }: { listingPrice?: string }) {
  return (
    <GlassEditionInspector listingPrice={listingPrice}>
      <iframe
        title="Interactive Glass Core workspace specimen"
        sandbox="allow-scripts"
        loading="lazy"
        referrerPolicy="no-referrer"
        srcDoc={glassEssentialPreview}
        className="h-[33rem] w-full rounded-2xl border-0 bg-[#101820] sm:h-[29rem]"
      />
    </GlassEditionInspector>
  )
}
