export const amsterdamPath = '/amsterdam'
export const fieldNoteSlug = 'what-an-ai-demo-should-leave-behind'
export const fieldNotePath = '/blog/' + fieldNoteSlug

export function amsterdamDraftIsVisible() {
  return process.env.VERCEL_ENV === 'preview'
    || (!process.env.VERCEL_ENV && process.env.NODE_ENV === 'development')
}

export const amsterdamPhotos = {
  reguliersgracht: {
    src: '/images/amsterdam/reguliersgracht.webp',
    width: 1600,
    height: 1200,
    alt: 'Red-brick bridge, canal houses and their reflections on the Reguliersgracht in winter.',
    place: 'Reguliersgracht, January 2022',
    credit: 'Fons Heijnsbroek',
    source: 'https://commons.wikimedia.org/wiki/File:Amsterdam_free_canal_photo_with_brick_old_bridge,_location_Reguliersgracht_01-2022,_Fons_Heijnbroek.jpg',
  },
  oosterdok: {
    src: '/images/amsterdam/oosterdok.webp',
    width: 1600,
    height: 1200,
    alt: 'Dredging boats in the Oosterdok with the green copper roof of NEMO across the water.',
    place: 'Oosterdok, June 2013',
    credit: 'Fons Heijnsbroek',
    source: 'https://commons.wikimedia.org/wiki/File:2013.06_-_%27Municipal_dredge_boats_in_the_Oosterdok_Dockland_water%27%2C_with_the_Nemo_technical_museum_to_the_right%3B_urban_photography_by_Fons_Heijnsbroek%2C_Amsterdam_city%2C_The_Netherlands_%2810334746414%29.jpg',
  },
} as const

export type AmsterdamPhoto = (typeof amsterdamPhotos)[keyof typeof amsterdamPhotos]

export const universityPath = '/partnerships/universities'
export const universityInquiryPath = universityPath + '?via=amsterdam#join'
export const sourceCheckPath = universityPath + '/source-check'
