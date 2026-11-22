export interface AlchemyFilm {
  id: string
  title: string
  credit: string
  runtime: string
  format: 'Short' | 'Film'
  subject: string
  cue: string
  source: { title: string; url: string }
}

export const films: AlchemyFilm[] = [
  {
    id: 'B1ny-1H2Bww', title: 'Indigo Oxidation at work!', credit: 'Austin Tie Dye Co',
    runtime: '0:51', format: 'Short', subject: 'Dye chemistry',
    cue: 'Follow one fold of cloth as it meets the air. The returning blue marks the last visible part of a redox cycle.',
    source: { title: 'Read the electrochemistry of indigo', url: 'https://doi.org/10.1016/S0013-4686(02)00028-2' },
  },
  {
    id: 'CPBjZPOFylc', title: 'Using electricity to grow metal crystals', credit: 'NileRed',
    runtime: '2:02', format: 'Short', subject: 'Crystal growth',
    cue: 'Look at the outermost tips of the tin. New branches form while the older metal stays in place. A microscope can tell us more about their structure.',
    source: { title: 'Inspect electron micrographs of tin dendrites', url: 'https://www.mdpi.com/2075-4701/12/7/1201' },
  },
  {
    id: '7AgfEGJRIQA', title: 'Memory metal (Nitinol)', credit: 'BaronOfSweden',
    runtime: '0:13', format: 'Short', subject: 'Shape memory',
    cue: 'Trace the bend before the wire recovers. The motion is visible. Identifying the crystal phase takes a different measurement.',
    source: { title: 'Read Sandia’s phase diagram', url: 'https://www.sandia.gov/files/sierra/SM_LAME_5_30/main/models/shape_memory_alloy.html' },
  },
  {
    id: 'OdacNmB8zbY', title: 'Melting bismuth', credit: 'NileRed Extra',
    runtime: '1:00', format: 'Short', subject: 'Phase change',
    cue: 'Watch for the first part of the surface that flows. Bismuth keeps its elemental identity across the change from solid to liquid.',
    source: { title: 'Look up bismuth’s melting point', url: 'https://periodic-table.rsc.org/element/83/bismuth' },
  },
  {
    id: 'uwDHi2KNM4s', title: 'Egyptian blue on the Parthenon sculptures', credit: 'The British Museum',
    runtime: '5:40', format: 'Film', subject: 'Conservation',
    cue: 'Watch the shift from the carved surface to the detector image. Then open Figure 5 of the later study and look for the proposed border on the mantle.',
    source: { title: 'Inspect Figure 5 in Antiquity', url: 'https://doi.org/10.15184/aqy.2023.130' },
  },
  {
    id: 'yWXPV3bsC2c', title: 'MatterGen: A generative model for materials design', credit: 'Microsoft Research',
    runtime: '5:11', format: 'Film', subject: 'AI for materials',
    cue: 'Listen for the property a designer can request. The later paper follows a candidate into the lab, where the team can measure what was actually made.',
    source: { title: 'Read the experimental validation in Nature', url: 'https://doi.org/10.1038/s41586-025-08628-5' },
  },
  {
    id: '2Gc2YYPow6c', title: 'Alchemy on the Cutting Edge', credit: 'Smithsonian Libraries and Archives',
    runtime: '1:18:18', format: 'Film', subject: 'History of science',
    cue: 'Hear historian and chemist Lawrence Principe read alchemy on its own terms. Keep one manuscript open alongside the lecture to see how a copyist recorded the work.',
    source: { title: 'Examine British Library Or 13006', url: 'https://www.qdl.qa/archive/81055/vdc_100000003591.0x000001' },
  },
]

export function watchUrl(film: AlchemyFilm) {
  return film.format === 'Short' ? `https://www.youtube.com/shorts/${film.id}` : `https://www.youtube.com/watch?v=${film.id}`
}
