'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Space } from '@/data/ecosystems'

// Dynamically import maplibre-gl on the client side only to avoid SSR issues
const MapComponent = ({ spaces }: { spaces: Space[] }) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('all')

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    // Import maplibre-gl inside useEffect
    // @ts-ignore
    import('maplibre-gl').then((maplibregl) => {
      // Import CSS dynamically
      // @ts-ignore
      import('maplibre-gl/dist/maplibre-gl.css')

      // Center of Amsterdam
      const center: [number, number] = [4.9041, 52.3676]

      const map = new maplibregl.Map({
        container: mapContainer.current!,
        style: {
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
              ],
              tileSize: 256,
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: center,
        zoom: 12.2,
        maxZoom: 16,
        minZoom: 10
      })

      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

      // Track markers to filter or remove them
      const markers: any[] = []

      // Access model color tokens matching design.md / taste.md
      const modelColors: Record<string, string> = {
        'Free': '#5fc98e',       // Free: green
        'Free + paid': '#5fc98e',
        'Hourly': '#e6b566',     // Day pass / hourly: gold
        'Pay-per-use': '#e6b566',
        'Day pass': '#e6b566',
        'Mixed': '#e6b566',
        'Member': '#8fa0b5',     // Member: steel blue
        'Club': '#c67f9e',       // Club: magenta
      }

      // Add pins for spaces with coordinates
      spaces.forEach((space) => {
        if (space.latitude === null || space.longitude === null) return

        const el = document.createElement('div')
        el.className = 'ecosystem-marker-pin group cursor-pointer relative'
        el.style.width = '14px'
        el.style.height = '14px'
        el.style.borderRadius = '50%'
        
        // Color based on access model
        const color = modelColors[space.model] || '#8fa0b5'
        el.style.backgroundColor = color
        el.style.border = '2px solid #0a0a0b'
        el.style.boxShadow = `0 0 6px ${color}`
        el.style.transition = 'all 0.15s ease-in-out'

        // Inner circle element for pulse/hover effect
        const inner = document.createElement('div')
        inner.className = 'absolute inset-0 rounded-full scale-0 transition-transform duration-200 group-hover:scale-150'
        inner.style.border = `1px solid ${color}`
        inner.style.backgroundColor = 'transparent'
        el.appendChild(inner)

        // Custom Popups styled like Void / Obsidian
        const popupContent = `
          <div class="p-3 text-zinc-200 font-sans max-w-[220px]">
            <span class="text-[10px] uppercase font-bold tracking-wider opacity-60">${space.district}</span>
            <h4 class="text-sm font-semibold mt-0.5 text-white">${space.name}</h4>
            <p class="text-xs text-zinc-400 mt-1.5 leading-relaxed">${space.notes.substring(0, 80)}${space.notes.length > 80 ? '...' : ''}</p>
            <div class="mt-2.5 flex items-center justify-between">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700 bg-zinc-800/40 text-zinc-300" style="border-color: ${color}44; color: ${color};">${space.model}</span>
              <span class="text-[11px] font-mono text-zinc-400">${space.price}</span>
            </div>
          </div>
        `

        const popup = new maplibregl.Popup({
          offset: 15,
          closeButton: false,
          className: 'custom-obsidian-popup'
        }).setHTML(popupContent)

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([space.longitude, space.latitude])
          .setPopup(popup)
          .addTo(map)

        // Custom interactions
        el.addEventListener('click', () => {
          setSelectedSpace(space)
          map.easeTo({
            center: [space.longitude!, space.latitude!],
            zoom: 14.5,
            duration: 1000
          })
        })

        markers.push({ marker, space })
      })

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [spaces])

  return (
    <div className="relative rounded-2xl border border-white/[0.08] bg-[#101012] overflow-hidden">
      {/* Map view port */}
      <div ref={mapContainer} className="w-full h-[400px] md:h-[550px]" />

      {/* Selected Space Panel */}
      {selectedSpace && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-[#0a0a0b]/95 backdrop-blur-md border border-white/[0.08] rounded-xl p-5 shadow-2xl animate-fade-in z-10">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">{selectedSpace.district}</span>
              <h3 className="text-lg font-semibold text-white mt-1 leading-tight">{selectedSpace.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedSpace(null)}
              className="text-zinc-500 hover:text-white p-1"
              aria-label="Close panel"
            >
              &times;
            </button>
          </div>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{selectedSpace.notes}</p>
          <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Access Model</span>
              <span className="text-sm font-semibold text-zinc-300">{selectedSpace.model}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Price Point</span>
              <span className="text-sm font-mono text-emerald-400 font-semibold">{selectedSpace.price}</span>
            </div>
          </div>
          {selectedSpace.address && (
            <div className="mt-3 text-xs text-zinc-500 italic">
              Address: {selectedSpace.address}
            </div>
          )}
        </div>
      )}

      {/* Inline Map Styles */}
      <style jsx global>{`
        .custom-obsidian-popup .maplibregl-popup-content {
          background-color: #0a0a0b;
          color: #e9e5da;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
          padding: 0;
        }
        .custom-obsidian-popup .maplibregl-popup-tip {
          border-top-color: #0a0a0b;
          border-bottom-color: #0a0a0b;
        }
        /* Mobile-first and reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .ecosystem-marker-pin {
            transition: none !important;
          }
          .custom-obsidian-popup {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// Disable SSR for Maplibre rendering
const EcosystemMap = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[550px] bg-[#101012] border border-white/[0.08] rounded-2xl flex items-center justify-center text-zinc-500 font-mono text-sm">
      <span className="animate-pulse">Loading Cartography...</span>
    </div>
  )
})

export default EcosystemMap
