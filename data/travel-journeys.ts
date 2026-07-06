// Travel Hub — curated work-and-travel routes for digital nomads, written through
// Frank's lens. Each entry pairs a destination with a recurring cultural/art anchor
// in a specific remaining-2026 month, plus the work setup, museums + art, hidden
// corners, and beautiful experiences worth the flight.
//
// Voice note: user-facing strings avoid the spiritual-slop word "journey" (see
// lib/voice/frankx-voice.ts banned list) — we say "trip", "stay", "route", "month".
// Event windows below were verified against official sources in June 2026; where a
// future date is not yet officially fixed, the `window` says so and `url` points to
// the official source to confirm.

export interface TravelEvent {
  name: string
  /** e.g. "18–20 June 2026" or "Typically late October — confirm at the link" */
  window: string
  type: 'festival' | 'art' | 'culture' | 'food' | 'tech' | 'music' | 'seasonal'
  /** Why this matters for a working creator/architect, not a generic blurb */
  why: string
  /** Official source — only verified links */
  url?: string
}

export interface StayVariant {
  /** "Long weekend" | "Two weeks" | "A month" */
  length: string
  /** What you optimise for at this length */
  focus: string
}

export interface TravelExperience {
  title: string
  kind: 'museum' | 'art' | 'secret' | 'beautiful'
  detail: string
}

export interface WorkSetup {
  /** e.g. "CEST (UTC+2)" */
  timezone: string
  /** Practical overlap note for EU/US-facing work */
  overlap: string
  connectivity: string
  /** Real, well-known spaces given as examples */
  coworking: string[]
  /** Honest mid-range nomad estimate, framed as a range */
  monthlyCostUsd: string
  bestFor: string
}

export interface TravelJourney {
  slug: string
  city: string
  country: string
  region: 'Europe' | 'Asia' | 'Americas' | 'Africa'
  /** "June 2026" */
  month: string
  /** 6..12 — drives chronological sort */
  monthIndex: number
  title: string
  subtitle: string
  /** Accent register — travel is the warm/soul spectrum */
  spectrum: 'soul'
  /** Primary recommended length */
  stayLength: string
  /** One-line glanceable hook for cards */
  hook: string
  tldr: string
  whyNow: string
  workSetup: WorkSetup
  events: TravelEvent[]
  museumsAndArt: TravelExperience[]
  deepSecrets: TravelExperience[]
  beautifulExperiences: TravelExperience[]
  stayVariants: StayVariant[]
  /** A sample week of work + explore */
  rhythm: string[]
  bestFor: string[]
  faq: { q: string; a: string }[]
}

export const travelJourneys: TravelJourney[] = [
  {
    slug: 'barcelona-june',
    city: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    month: 'June 2026',
    monthIndex: 6,
    title: 'Barcelona in June: a studio by the Mediterranean',
    subtitle: 'Two weeks where the work day ends at the beach and the night belongs to Sónar.',
    spectrum: 'soul',
    stayLength: 'Two weeks',
    hook: 'Ship by day, Sónar by night — Europe’s creative-tech festival lands 18–20 June.',
    tldr:
      'Base in Barcelona for the back half of June. CEST keeps you in step with the whole European day and gives you a clean afternoon overlap with the US East coast. Sónar (18–20 June) turns the city into the year’s densest gathering of music, art, and creative technology. Gaudí in the morning, deep work after lunch, sea at golden hour.',
    whyNow:
      'June is the sweet spot before the August heat and crowds. Long daylight, warm sea, and Sónar — the festival that has shaped electronic music and creative tech since 1994 — anchoring the middle of the month. The city is awake but not yet overrun.',
    workSetup: {
      timezone: 'CEST (UTC+2)',
      overlap: 'Full European working day, plus a 3–4 hour afternoon overlap with US East coast.',
      connectivity: 'Fast, near-universal fibre; reliable 5G. Cafés expect laptops.',
      coworking: ['Betahaus (Vila de Gràcia)', 'OneCoWork (Marina Port Vell)', 'Aticco (Eixample)'],
      monthlyCostUsd: '$2,400–3,400 mid-range (studio + coworking + food)',
      bestFor: 'EU-facing teams and anyone who wants a real city with a beach attached.',
    },
    events: [
      {
        name: 'Sónar Barcelona 2026',
        window: '18–20 June 2026, Fira Gran Via',
        type: 'music',
        why: 'Three days of music by night and Sónar+D by day — the side of the festival about AI, design, and the future of creative tools. The closest thing to a creative-technology pilgrimage in Europe.',
        url: 'https://sonar.es/en',
      },
      {
        name: 'OFFSónar',
        window: 'Runs in parallel, Poble Espanyol',
        type: 'music',
        why: 'The daytime sister parties for when the main programme is not enough. Optional, intense, memorable.',
        url: 'https://offsonar.co/',
      },
    ],
    museumsAndArt: [
      { title: 'Fundació Joan Miró', kind: 'museum', detail: 'On Montjuïc, light-filled, and rarely crowded before noon. Miró’s own foundation, built to his brief.' },
      { title: 'MACBA', kind: 'art', detail: 'Contemporary art in a Richard Meier building whose plaza is the city’s skateboarding heart. Go for the building as much as the shows.' },
      { title: 'MNAC', kind: 'museum', detail: 'The National Art Museum of Catalonia in the Palau Nacional — Romanesque frescoes rescued from Pyrenean churches, and the best free view of the city from its steps.' },
    ],
    deepSecrets: [
      { title: 'Bunkers del Carmel', kind: 'secret', detail: 'Civil-war anti-aircraft platform turned the best 360° sunset in the city. Bring a bottle, arrive an hour before dusk, skip the tourist-packed Park Güell view.' },
      { title: 'Sant Pau Recinte Modernista', kind: 'secret', detail: 'A former hospital that is more beautiful than most cathedrals, ten minutes from the Sagrada Família and a fraction of the queue.' },
      { title: 'El Xampanyet, Born', kind: 'secret', detail: 'A 1929 tiled bar pouring its own cava and anchovies. No reservations, elbows out, worth it.' },
    ],
    beautifulExperiences: [
      { title: 'Dawn swim at Barceloneta', kind: 'beautiful', detail: 'The beach belongs to locals before 9am. Swim, coffee, then open the laptop.' },
      { title: 'Gràcia’s plazas at night', kind: 'beautiful', detail: 'The old village squares fill with people and vermouth. The antidote to the Ramblas.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Sónar + one museum + one sunset. Fly in Thursday, leave Sunday wrecked and happy.' },
      { length: 'Two weeks', focus: 'The recommended length: a real work rhythm, the festival, and time to know one neighbourhood well.' },
      { length: 'A month', focus: 'Add day trips — Girona, the Costa Brava coves, a Penedès wine afternoon — and let the city become routine.' },
    ],
    rhythm: [
      'Morning: swim or a museum before the heat, then a coffee-shop work block.',
      'Midday: long lunch, the Spanish way — the afternoon overlap with the US starts after.',
      'Afternoon: deep-work block in a coworking space with air conditioning.',
      'Evening: tapas in Gràcia or, mid-month, the festival until far too late.',
    ],
    bestFor: [
      'EU-timezone workers who want sun without leaving the working day behind',
      'Anyone in music, design, or creative AI who should see Sónar once',
      'First-time nomads — Barcelona is forgiving and well-connected',
    ],
    faq: [
      { q: 'Do I need a Sónar ticket to make the trip worth it?', a: 'No. June Barcelona stands on its own. But if you work anywhere near creative tech, time the trip to 18–20 June and get the Sónar+D pass — it is the daytime, ideas-led half of the festival.' },
      { q: 'Is June too hot to work?', a: 'No. June is warm, not punishing — that is August. Mornings and evenings are pleasant; midday is for air-conditioned deep work, which suits the Spanish schedule anyway.' },
      { q: 'How is the timezone for US work?', a: 'CEST gives you a clean afternoon overlap with US East coast (their morning). EU work fits the whole day.' },
      { q: 'Where should I base myself?', a: 'Gràcia for village calm, Eixample for central and walkable, Poblenou for beach-and-startup energy. Avoid the Gothic Quarter for a longer stay — charming but loud and touristic.' },
      { q: 'Is two weeks enough?', a: 'It is the right amount to find a rhythm, catch the festival, and not burn out. A month rewards you with day trips up the Costa Brava.' },
    ],
  },
  {
    slug: 'copenhagen-july',
    city: 'Copenhagen',
    country: 'Denmark',
    region: 'Europe',
    month: 'July 2026',
    monthIndex: 7,
    title: 'Copenhagen in July: jazz on every corner',
    subtitle: 'Ten days in the design capital while a thousand free concerts spill into the streets.',
    spectrum: 'soul',
    stayLength: 'Ten days',
    hook: 'Long northern light, harbour swims, and the Copenhagen Jazz Festival, 3–12 July.',
    tldr:
      'Ten days in the world’s design capital during the Copenhagen Jazz Festival (3–12 July), when roughly a thousand concerts — most of them free — fill squares, courtyards, and canalsides. Long daylight, swimmable harbour, and Louisiana, one of the finest museums anywhere, a train ride north.',
    whyNow:
      'July is peak northern summer: light until almost midnight, water clean enough to swim in the middle of the city, and the jazz festival turning the whole place into a stage. Danes are on holiday and the city feels generous.',
    workSetup: {
      timezone: 'CEST (UTC+2)',
      overlap: 'Full European day; afternoon overlap with US East coast.',
      connectivity: 'Among the best in the world — fibre everywhere, fast 5G, English universal.',
      coworking: ['SOHO (Vesterbro)', 'Talent Garden Rainmaking', 'Matrikel1 (central)'],
      monthlyCostUsd: '$3,200–4,500 mid-range — Copenhagen is not cheap, but the quality is high',
      bestFor: 'Designers and product people who want the bar for taste set very high.',
    },
    events: [
      {
        name: 'Copenhagen Jazz Festival 2026',
        window: '3–12 July 2026, citywide',
        type: 'music',
        why: 'Around 1,000 concerts across 100+ venues, many free and outdoors on squares and along the canals. You will stumble into music walking to lunch.',
        url: 'https://jazz.dk/en/copenhagen-jazz-festival-2026/frontpage/',
      },
    ],
    museumsAndArt: [
      { title: 'Louisiana Museum of Modern Art', kind: 'museum', detail: '35 minutes north by train in Humlebæk — modern art, a sculpture park, and a café terrace over the Øresund toward Sweden. Plan a full day; many call it the most beautiful museum in the world.' },
      { title: 'SMK (National Gallery)', kind: 'museum', detail: 'Danish and European masters in a grand-but-calm building. The light-filled sculpture street alone is worth the visit.' },
      { title: 'Ny Carlsberg Glyptotek', kind: 'museum', detail: 'Antiquities and a winter-garden conservatory under a glass dome. The café inside the palms is a working-day reset.' },
    ],
    deepSecrets: [
      { title: 'La Banchina, Refshaleøen', kind: 'secret', detail: 'A tiny harbour wine bar and sauna with a swimming ladder straight into the water. Sauna, swim, natural wine, repeat.' },
      { title: 'Assistens Cemetery', kind: 'secret', detail: 'Where locals picnic and sunbathe among the graves of Kierkegaard and Hans Christian Andersen. Peaceful, green, very Danish.' },
      { title: 'Reffen street-food yard', kind: 'secret', detail: 'On the old industrial waterfront — dozens of stalls, sunset over the water, none of the old-town markup.' },
    ],
    beautifulExperiences: [
      { title: 'Harbour bath at Islands Brygge', kind: 'beautiful', detail: 'Swim in the centre of a capital city in clean water. Then work from a café on the quay.' },
      { title: 'Cycle everywhere', kind: 'beautiful', detail: 'Rent a bike for the whole stay. Copenhagen is built for it; you will think differently about cities afterward.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Festival + Louisiana + one harbour swim. Dense and lovely.' },
      { length: 'Ten days', focus: 'The recommended length: enough festival, a few museums, and a real cycling routine.' },
      { length: 'A month', focus: 'Add Malmö (35 minutes over the bridge to Sweden) and a quieter second neighbourhood.' },
    ],
    rhythm: [
      'Morning: cycle to a café, work block while the city wakes slowly.',
      'Midday: harbour swim and an open-sandwich lunch.',
      'Afternoon: deep-work overlap window with the US, in a coworking space.',
      'Evening: follow the sound — a free courtyard concert and natural wine by the water.',
    ],
    bestFor: [
      'Designers and product builders who want taste calibrated upward',
      'Jazz and live-music lovers',
      'Anyone who wants a walkable, cycle-first city in its best season',
    ],
    faq: [
      { q: 'Is Copenhagen too expensive for a nomad?', a: 'It is the priciest stop on this list. Offset it: cook from the excellent supermarkets, use the free festival concerts, and cycle instead of taxis. The quality of everything is high enough to justify a shorter, richer stay.' },
      { q: 'Do I need festival tickets?', a: 'Many of the ~1,000 concerts are free and outdoors. Buy tickets only for specific headline shows you care about.' },
      { q: 'What about the weather?', a: 'July is the warmest, brightest month — long days, swimmable water. Pack a light layer; northern summer can still surprise you.' },
      { q: 'Is ten days the right length?', a: 'Yes. It covers a good slice of the festival, the key museums, and lets a cycling rhythm settle without the cost of a full month.' },
      { q: 'How is the timezone?', a: 'CEST — the same clean European day plus a US East-coast afternoon overlap as Barcelona.' },
    ],
  },
  {
    slug: 'edinburgh-august',
    city: 'Edinburgh',
    country: 'United Kingdom',
    region: 'Europe',
    month: 'August 2026',
    monthIndex: 8,
    title: 'Edinburgh in August: a month inside the world’s largest arts festival',
    subtitle: 'Three weeks where every room in the city is a stage and the work fits between shows.',
    spectrum: 'soul',
    stayLength: 'Three weeks',
    hook: 'The Festival Fringe runs all August (7–31) — thousands of shows, one walkable city.',
    tldr:
      'Spend three weeks in Edinburgh during August, when the Festival Fringe (7–31 August) makes it the largest arts festival on earth — thousands of comedy, theatre, and music shows across hundreds of venues, most of them a short walk apart. A long stay is the only way to do it justice: work the mornings, see three shows a day, walk a medieval city between them.',
    whyNow:
      'For one month a year Edinburgh becomes the centre of live performance worldwide. The Fringe runs alongside the Edinburgh International Festival and the Book Festival. There is no off-season equivalent; if you want this, August is the only door.',
    workSetup: {
      timezone: 'BST (UTC+1)',
      overlap: 'Whole UK/EU day; a generous morning-into-afternoon overlap with US East coast.',
      connectivity: 'Solid fibre and 5G; English-speaking; easy to set up fast.',
      coworking: ['CodeBase (UK’s largest tech hub)', 'Spaces (Lochrin Square)', 'Café-working at the city’s many independents'],
      monthlyCostUsd: '$3,000–4,500 in August — book early; festival demand spikes rents',
      bestFor: 'Writers, performers, and anyone whose work feeds on live ideas and conversation.',
    },
    events: [
      {
        name: 'Edinburgh Festival Fringe 2026',
        window: '7–31 August 2026, citywide',
        type: 'festival',
        why: 'The world’s largest performing-arts festival. Thousands of shows; tickets are cheap and many are free. The serendipity — wandering into a tiny room and seeing something extraordinary — is the whole point.',
        url: 'https://www.edfringe.com/',
      },
      {
        name: 'Edinburgh International Festival',
        window: 'August, alongside the Fringe',
        type: 'culture',
        why: 'The curated, high-art counterpart — opera, classical, and serious theatre — for nights you want the considered version.',
        url: 'https://www.eif.co.uk/',
      },
    ],
    museumsAndArt: [
      { title: 'Scottish National Gallery', kind: 'museum', detail: 'Free, central, and superb — Titian to the Scottish colourists. A calm hour between shows.' },
      { title: 'Fruitmarket Gallery', kind: 'art', detail: 'Sharp contemporary shows by the station, with one of the best art bookshops in the country.' },
      { title: 'National Museum of Scotland', kind: 'museum', detail: 'Free, vast, and genuinely brilliant — Dolly the cloned sheep, a roof terrace with a castle view most people miss.' },
    ],
    deepSecrets: [
      { title: 'Dean Village', kind: 'secret', detail: 'A former milling village in a river gorge, five minutes from the festival chaos and a century away in feel.' },
      { title: 'Arthur’s Seat at dawn', kind: 'secret', detail: 'An extinct volcano in the middle of the city. Climb it before the shows start for the clearest head and best view you will get all month.' },
      { title: 'The Sheep Heid Inn', kind: 'secret', detail: 'One of Scotland’s oldest pubs, with a Victorian skittles alley, tucked in the village of Duddingston behind the hill.' },
    ],
    beautifulExperiences: [
      { title: 'Free Fringe roulette', kind: 'beautiful', detail: 'Pick shows by title alone for one afternoon. The misses are funny; the hits are the stories you tell for years.' },
      { title: 'Calton Hill at golden hour', kind: 'beautiful', detail: 'The postcard skyline, monuments, and the best light in the city — a short climb, no ticket.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'A taste — five or six shows and one hill. You will immediately want to come back for longer.' },
      { length: 'Three weeks', focus: 'The recommended length: enough to pace yourself, find favourite venues, and still work properly.' },
      { length: 'A month', focus: 'The full festival arc plus recovery days and a day trip to the Highlands or the coast.' },
    ],
    rhythm: [
      'Morning: climb Arthur’s Seat or work a quiet block before the city wakes.',
      'Late morning: focused work — the best overlap with US mornings.',
      'Afternoon: two shows, a long walk between them.',
      'Evening: a late comedy show, then a pub with actors decompressing.',
    ],
    bestFor: [
      'Writers, comedians, and performers — and the people who love them',
      'Anyone whose creative work runs on live input and conversation',
      'Long-stay nomads who want one unrepeatable month a year',
    ],
    faq: [
      { q: 'Is August the only time to visit Edinburgh?', a: 'No — Edinburgh is beautiful year-round and far calmer off-season. But the Fringe only happens in August, and that is the reason this trip exists. For quiet history, come in spring instead.' },
      { q: 'Will the festival ruin my ability to work?', a: 'Only if you let it. Protect your mornings, work the US-overlap window, and treat shows as the reward. Three weeks gives enough slack to do both.' },
      { q: 'How do I choose shows from thousands?', a: 'Mix it: book two or three reviewed shows you care about, then leave room for free-Fringe serendipity. The unplanned ones are usually the best memories.' },
      { q: 'How expensive is it?', a: 'August is the peak — book accommodation months ahead. Show tickets themselves are cheap, and a lot of the Fringe is free.' },
      { q: 'Is three weeks too long?', a: 'For August in Edinburgh, no. The festival rewards depth, and you will want recovery days. A month is even better if you can.' },
    ],
  },
  {
    slug: 'mexico-city-september',
    city: 'Mexico City',
    country: 'Mexico',
    region: 'Americas',
    month: 'September 2026',
    monthIndex: 9,
    title: 'Mexico City in September: a month in the nomad capital of the Americas',
    subtitle: 'Independence fireworks, the best weather of the year, and US working hours that just line up.',
    spectrum: 'soul',
    stayLength: 'A month',
    hook: 'El Grito on 15 September, perfect weather, and a timezone built for US-facing work.',
    tldr:
      'A full month in Mexico City — the strongest base in the Americas for a US-facing nomad. September brings the year’s best weather (green, mild, the rainy season easing) and the Independence celebrations: El Grito on the night of 15 September, fireworks over the Zócalo, the whole city in the streets. Roma Norte and Condesa give you serious coffee, coworking, and a museum density few cities match.',
    whyNow:
      'September is when the city is greenest and most alive, capped by Independence Day. CST overlaps the entire US working day, so a month here barely disrupts US-facing work while completely changing your life outside it.',
    workSetup: {
      timezone: 'CST (UTC−6)',
      overlap: 'Overlaps the full US working day — the best US-facing base outside the US itself.',
      connectivity: 'Good fibre in Roma/Condesa/Polanco; carry a backup eSIM for the occasional flaky building.',
      coworking: ['Público (Roma Norte)', 'Homework (Condesa)', 'WeWork (Reforma & Polanco)'],
      monthlyCostUsd: '$1,800–3,000 — high quality of life for the money',
      bestFor: 'US-facing workers, food obsessives, and anyone who wants a month, not a week.',
    },
    events: [
      {
        name: 'Mexican Independence — El Grito',
        window: 'Night of 15 September, into 16 September',
        type: 'culture',
        why: 'The President re-enacts the 1810 cry for independence from the National Palace balcony; the Zócalo fills with hundreds of thousands, fireworks, and music. The single biggest civic night of the Mexican year.',
      },
    ],
    museumsAndArt: [
      { title: 'Museo Nacional de Antropología', kind: 'museum', detail: 'One of the great museums of the world. The Aztec and Maya halls reframe how you see the continent. Give it a full day; you will still rush.' },
      { title: 'Museo Frida Kahlo (Casa Azul)', kind: 'museum', detail: 'Kahlo’s cobalt-blue house in Coyoacán, left as she lived. Book timed tickets online well ahead — walk-ups do not get in.' },
      { title: 'Museo Soumaya & Museo Jumex', kind: 'art', detail: 'Two contrasting collections side by side in Polanco — Soumaya’s mirrored sculpture of a building, Jumex’s sharp contemporary shows. Free or cheap.' },
    ],
    deepSecrets: [
      { title: 'Xochimilco at dawn', kind: 'secret', detail: 'Take a trajinera through the canals early, before the party boats — herons, chinampa farms, mist on the water. The opposite of the weekend crowds.' },
      { title: 'Mercado de Medellín', kind: 'secret', detail: 'A working market in Roma where the city actually shops — Caribbean and South American stalls, the best cheap lunch you will eat.' },
      { title: 'Biblioteca Vasconcelos', kind: 'secret', detail: 'A vast “megabiblioteca” of floating bookshelves and a whale skeleton suspended in the air. A surreal, free place to work for an afternoon.' },
    ],
    beautifulExperiences: [
      { title: 'Sunday in Chapultepec', kind: 'beautiful', detail: 'The huge city park, the castle on the hill, families everywhere. Reforma closes to cars for cyclists each Sunday morning.' },
      { title: 'A long comida in Condesa', kind: 'beautiful', detail: 'The midday meal is the main one. Find a tree-shaded terrace and let it run two hours.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Anthropology museum, Casa Azul, tacos, one big night. A scouting trip that turns into a plan.' },
      { length: 'Two weeks', focus: 'A real neighbourhood rhythm, the major museums, and Independence night if timed right.' },
      { length: 'A month', focus: 'The recommended length: settle in Roma or Condesa, take Spanish classes, day-trip to Teotihuacán and Puebla.' },
    ],
    rhythm: [
      'Morning: slow start, coffee in Roma, a market or museum before the afternoon rain.',
      'Midday: the long comida — the meal that anchors the day.',
      'Afternoon into evening: the US working day is wide open from here; deep-work block.',
      'Night: mezcal, live music, or just the city’s endless street life.',
    ],
    bestFor: [
      'US-facing remote workers — the timezone is the headline feature',
      'Food and museum obsessives',
      'Anyone ready to commit a month and learn a little Spanish',
    ],
    faq: [
      { q: 'Is September a good time, with the rainy season?', a: 'Yes. September rain is usually a short, heavy afternoon burst that clears fast and keeps the city green and cool. Plan indoor or museum afternoons and you will barely notice it. The trade-off is the best weather and Independence Day.' },
      { q: 'How is the timezone for work?', a: 'CST (UTC−6) overlaps the entire US working day. For EU-facing work it is harder — EU afternoon is your early morning — so this stop favours US-aligned work.' },
      { q: 'Is it safe?', a: 'Roma, Condesa, Polanco, and Coyoacán are walkable and busy day and night. Use the same judgment as any large capital, take registered taxis or rideshare at night, and you will be fine.' },
      { q: 'Where should I stay?', a: 'Roma Norte for cafés and nightlife, Condesa for leafy calm, Polanco for upscale and quiet. All three are nomad-friendly and well-connected.' },
      { q: 'Do I need to book Casa Azul ahead?', a: 'Yes — timed tickets sell out days in advance. Book online before you arrive; do not rely on the door.' },
    ],
  },
  {
    slug: 'tokyo-october',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    month: 'October 2026',
    monthIndex: 10,
    title: 'Tokyo in October: deep focus and digital art',
    subtitle: 'Two weeks in the best-weather month, where a quiet timezone becomes a feature.',
    spectrum: 'soul',
    stayLength: 'Two weeks',
    hook: 'Crisp autumn, teamLab Borderless, and a timezone that protects your focus.',
    tldr:
      'Two weeks in Tokyo in October — arguably the city’s finest month: clear, mild, the punishing summer humidity gone and the autumn colour beginning. JST overlaps neither the US nor Europe in business hours, which is exactly the point: this is the deep-focus stop, where the world goes quiet while you work and the city opens up when you stop. teamLab Borderless at Azabudai Hills is open year-round and unlike anything else on this list.',
    whyNow:
      'October is the comfortable window between summer humidity and winter — ideal for the endless walking Tokyo rewards. The lack of timezone overlap is a feature: schedule async, protect long maker-blocks, and let the city be your reward.',
    workSetup: {
      timezone: 'JST (UTC+9)',
      overlap: 'Minimal live overlap with US/EU — best run async. Early mornings catch EU end-of-day.',
      connectivity: 'Among the most reliable on earth; pocket-wifi or eSIM everywhere; conbini ATMs and 24/7 everything.',
      coworking: ['The Hive Jinnan (Shibuya)', 'Fabbit', 'WeWork (many central locations)'],
      monthlyCostUsd: '$2,800–4,500 — less than its reputation suggests if you eat local',
      bestFor: 'Makers who want long, uninterrupted focus and a reward that never repeats.',
    },
    events: [
      {
        name: 'teamLab Borderless, Azabudai Hills',
        window: 'Open year-round (opened February 2025)',
        type: 'art',
        why: 'A digital-art museum with no map and no fixed route — artworks flow between rooms and react to you. The clearest glimpse of where immersive, generative art is heading. Book timed entry online.',
        url: 'https://www.teamlab.art/e/tokyo/',
      },
      {
        name: 'Tokyo International Film Festival',
        window: 'Typically late October — confirm dates at the link',
        type: 'culture',
        why: 'Asia’s major film festival turns the Hibiya/Ginza area into a screening hub. Optional, but a good reason to be in town this fortnight.',
        url: 'https://2026.tiff-jp.net/en/',
      },
    ],
    museumsAndArt: [
      { title: 'Mori Art Museum', kind: 'museum', detail: 'Contemporary art on the 53rd floor of Roppongi Hills, with a city observation deck on the same ticket. Open late — a good evening after a work day.' },
      { title: 'Nezu Museum', kind: 'museum', detail: 'Asian antiquities in a Kengo Kuma building, but the strolling garden behind it is the real artwork — a hidden pocket of calm in Aoyama.' },
      { title: 'teamLab Borderless', kind: 'art', detail: 'Covered above — give it a full evening, wear comfortable shoes, and go in with no plan. The point is to get lost.' },
    ],
    deepSecrets: [
      { title: 'Golden Gai, Shinjuku', kind: 'secret', detail: 'Six alleys of tiny bars, each seating six or seven people. Find one that welcomes newcomers, order a whisky, and talk to strangers.' },
      { title: 'Yanaka', kind: 'secret', detail: 'An old low-rise neighbourhood that survived the war and the bubble — temples, cats, a sloping shopping street, the Tokyo of a century ago.' },
      { title: 'Standing sushi at the edge of Tsukiji', kind: 'secret', detail: 'The outer market still hums after the wholesale move. Eat standing, early, where the locals do.' },
    ],
    beautifulExperiences: [
      { title: 'Walk one train line end to end', kind: 'beautiful', detail: 'Pick a line, get off at every interesting station. Tokyo rewards aimless walking like no other city.' },
      { title: 'Autumn at the Imperial gardens', kind: 'beautiful', detail: 'The East Gardens are free and beginning to turn colour in late October — a quiet morning before work.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Jet-lagged and overwhelmed in the best way — one ward, teamLab, too much food. A reconnaissance trip.' },
      { length: 'Two weeks', focus: 'The recommended length: enough to beat the jet lag, find a routine, and explore beyond the obvious wards.' },
      { length: 'A month', focus: 'Add a Shinkansen run to Kyoto for the autumn colour, and let Tokyo’s neighbourhoods reveal themselves slowly.' },
    ],
    rhythm: [
      'Early morning: catch EU end-of-day async, then a long maker-block while the West sleeps.',
      'Midday: ramen or a conbini lunch, a short walk.',
      'Afternoon: the city is yours — a museum, a neighbourhood, a long wander.',
      'Evening: izakaya, Golden Gai, or teamLab. The reward for a focused day.',
    ],
    bestFor: [
      'Makers and deep-work people who want the world to go quiet',
      'Anyone curious about the frontier of immersive and generative art',
      'Async-first teams and solo builders shipping long projects',
    ],
    faq: [
      { q: 'Won’t the timezone wreck my work?', a: 'Only if your work needs live overlap with the US or EU. If it can run async, JST is a gift — your maker-hours fall while the West is offline. Catch EU end-of-day in your early morning and keep the rest for focus.' },
      { q: 'Is Tokyo as expensive as people say?', a: 'Less than its reputation. Eat at conbini, standing bars, and ramen counters and daily costs are reasonable; accommodation is the main expense. Book a serviced apartment for a fortnight.' },
      { q: 'Is October really the best month?', a: 'It is among the best — mild, clear, low humidity, autumn colour starting. May is the other contender. Avoid August humidity and the rainy June.' },
      { q: 'Do I need to book teamLab ahead?', a: 'Yes — entry is timed and popular slots sell out. Book online before you go.' },
      { q: 'How do I handle the language?', a: 'Tokyo is navigable with translation apps, English signage on transit, and patience. Learn a few polite phrases; it goes a long way.' },
    ],
  },
  {
    slug: 'lisbon-november',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    month: 'November 2026',
    monthIndex: 11,
    title: 'Lisbon in November: the AI architect’s month',
    subtitle: 'Three weeks in Europe’s nomad capital, timed to the biggest tech conference on the continent.',
    spectrum: 'soul',
    stayLength: 'Three weeks',
    hook: 'Web Summit lands 9–12 November — the one stop on this list built for our audience.',
    tldr:
      'Three weeks in Lisbon, the established capital of European remote work, timed to Web Summit (9–12 November) — the largest tech conference in Europe and the most directly relevant event on this list for AI architects, builders, and founders. Mild Atlantic autumn, a strong WET timezone for US-facing mornings, deep value, and Sintra a short train away once the conference crowds clear.',
    whyNow:
      'November pairs the off-season calm and lower prices with the year’s most useful gathering for this audience. Web Summit fills the city with the people you actually want to meet; the rest of the month is yours to work, walk, and recover.',
    workSetup: {
      timezone: 'WET (UTC+0)',
      overlap: 'Lines up with the UK; gives a long, generous overlap with US East-coast mornings.',
      connectivity: 'Strong fibre and 5G; a mature nomad infrastructure of cafés and coworking.',
      coworking: ['Second Home Lisboa (Mercado da Ribeira)', 'Heden', 'LACS / Cowork Central'],
      monthlyCostUsd: '$2,200–3,400 — the best value of any Western European capital',
      bestFor: 'AI builders, founders, and anyone whose network is worth flying for.',
    },
    events: [
      {
        name: 'Web Summit 2026',
        window: '9–12 November 2026, Altice Arena & FIL, Parque das Nações',
        type: 'tech',
        why: 'Europe’s largest tech conference — tens of thousands of founders, operators, and investors. For an AI architect or builder, four days of the most concentrated relevant networking on the calendar.',
        url: 'https://websummit.com/',
      },
    ],
    museumsAndArt: [
      { title: 'MAAT', kind: 'museum', detail: 'The Museum of Art, Architecture and Technology on the riverfront — a wave-form building you can walk over, with sharp shows on exactly the intersection this audience lives in.' },
      { title: 'Calouste Gulbenkian Museum', kind: 'museum', detail: 'One collector’s extraordinary range — ancient Egypt to Lalique — in a modernist building set in a garden. Calm, superb, never crowded.' },
      { title: 'Belém cultural quarter', kind: 'art', detail: 'The Berardo Collection and the Coaches Museum cluster near the monastery and the original pastéis de Belém. A full half-day along the river.' },
    ],
    deepSecrets: [
      { title: 'LX Factory', kind: 'secret', detail: 'A former industrial complex under the bridge, now studios, a vertigo-inducing bookshop, and restaurants. Work from a café here for a day.' },
      { title: 'Sintra off-season', kind: 'secret', detail: 'The palaces and misty forests an hour out, without the summer queues. Go on a weekday after Web Summit clears; November mist makes it better, not worse.' },
      { title: 'A miradouro circuit', kind: 'secret', detail: 'Lisbon is a city of viewpoints. String together Graça, Senhora do Monte, and Santa Catarina at dusk — the locals’ sunset, with a beer from a kiosk.' },
    ],
    beautifulExperiences: [
      { title: 'Tram 28 early', kind: 'beautiful', detail: 'The historic tram through Alfama before the tourists board — rattling, steep, cinematic.' },
      { title: 'Fado in a small Alfama room', kind: 'beautiful', detail: 'Skip the dinner-show factories. Find a tiny room where the waiter sings and the room goes silent.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Web Summit only — fly in for the conference, stay through the weekend, see one viewpoint and one pastel de nata.' },
      { length: 'Three weeks', focus: 'The recommended length: conference plus a real work rhythm, the museums, and Sintra once the crowds leave.' },
      { length: 'A month', focus: 'Add a few days in Porto or the Algarve, and let Lisbon become home base for the late autumn.' },
    ],
    rhythm: [
      'Morning: café work block — the long US-morning overlap is your most valuable window.',
      'Midday: lunch by the river, a tram, or a viewpoint.',
      'Conference days (9–12 Nov): all-in at Web Summit; protect nothing else.',
      'Evenings: small-room fado, a miradouro at dusk, or dinner with people met at the summit.',
    ],
    bestFor: [
      'AI architects, founders, and builders — Web Summit is the reason to time it now',
      'Value-conscious nomads who still want a Western European capital',
      'Anyone whose career compounds through the right introductions',
    ],
    faq: [
      { q: 'Is Web Summit worth structuring a trip around?', a: 'For this audience, yes. It is the densest gathering of founders, operators, and investors in Europe. Even if you skip the talks, the side events and hallway conversations justify the four days. Book accommodation early — the city fills up.' },
      { q: 'Is November too late in the year for Lisbon?', a: 'No. Lisbon’s Atlantic climate stays mild — cooler and wetter than summer, but walkable and far cheaper and calmer. The light in autumn is beautiful.' },
      { q: 'How is the timezone?', a: 'WET (UTC+0) aligns with the UK and gives a long overlap with US East-coast mornings — one of the best timezones on this list for transatlantic work.' },
      { q: 'Where should I base myself?', a: 'Príncipe Real and Santos for calm and central, Alfama for atmosphere (and hills), Parque das Nações if you want to be near the Web Summit venue during the conference.' },
      { q: 'What if I cannot get a Web Summit ticket?', a: 'The city is overrun with free fringe and side events that week — many of the best conversations happen outside the venue. And the rest of the three weeks stands on its own regardless.' },
    ],
  },
  {
    slug: 'cape-town-december',
    city: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    month: 'December 2026',
    monthIndex: 12,
    title: 'Cape Town in December: summer while the north freezes',
    subtitle: 'A month at the start of the southern summer, with an EU-friendly timezone and deep value.',
    spectrum: 'soul',
    stayLength: 'A month',
    hook: 'Escape the northern winter — summer, Table Mountain, Zeitz MOCAA, and First Thursdays.',
    tldr:
      'A month in Cape Town as the southern-hemisphere summer begins — the inversion that makes it the perfect December escape from a frozen north. SAST (UTC+2) lines up neatly with the European working day, so EU-facing work continues uninterrupted while your evenings and weekends fill with mountain, ocean, wine, and one of the great contemporary-art museums of the continent. On the first Thursday of the month, the inner-city galleries throw their doors open late and free.',
    whyNow:
      'December is early southern summer: long days, swimmable beaches, the city at its liveliest before the peak-holiday rush. For anyone in the northern winter, the timezone-and-seasons trade is unbeatable — keep your EU hours, lose the cold.',
    workSetup: {
      timezone: 'SAST (UTC+2)',
      overlap: 'Aligns with the European working day; a clean morning overlap with EU, evenings free.',
      connectivity: 'Good fibre in the city and Atlantic Seaboard; keep a backup plan for load-shedding power cuts (most coworking spaces have generators).',
      coworking: ['Workshop17 (V&A Waterfront)', 'Inner City Ideas Cartel', 'Cube Workspace'],
      monthlyCostUsd: '$1,800–3,200 — exceptional value for the quality of life',
      bestFor: 'EU-facing workers escaping winter who want mountains and ocean after the work day.',
    },
    events: [
      {
        name: 'First Thursdays Cape Town',
        window: 'First Thursday of December (and every month), inner city',
        type: 'art',
        why: 'Galleries and creative spaces around Bree and Loop streets stay open late and free; the city walks between them with street food and live music. The best single night to take the pulse of the local art scene.',
        url: 'https://www.first-thursdays.co.za/city/cape-town',
      },
      {
        name: 'Start of southern summer',
        window: 'All December',
        type: 'seasonal',
        why: 'Long daylight, warm ocean on the False Bay side, and the city outdoors. The season is the event.',
      },
    ],
    museumsAndArt: [
      { title: 'Zeitz MOCAA', kind: 'museum', detail: 'The largest museum of contemporary African art, carved out of a converted grain silo on the waterfront — the building alone, with its honeycomb atrium, is worth the ticket.' },
      { title: 'Norval Foundation', kind: 'museum', detail: 'Contemporary art and a sculpture garden against the mountain in Tokai, with a restaurant and a wetland walk. A half-day out of the centre.' },
      { title: 'First Thursdays gallery walk', kind: 'art', detail: 'Covered above — the monthly free crawl through the inner-city galleries is the living version of the museums.' },
    ],
    deepSecrets: [
      { title: 'Bo-Kaap at first light', kind: 'secret', detail: 'The brightly painted Cape Malay quarter on the slope, photographed by everyone but quiet at dawn. Walk it early, then a Cape Malay lunch later.' },
      { title: 'Kalk Bay', kind: 'secret', detail: 'A working harbour village on the False Bay line — book shops, a tidal pool, fish and chips on the quay. Take the scenic train down the coast.' },
      { title: 'Lion’s Head at sunrise', kind: 'secret', detail: 'A steeper, quieter climb than Table Mountain, with a 360° payoff. Locals do the full-moon climb; the dawn one is calmer.' },
    ],
    beautifulExperiences: [
      { title: 'Cable car up Table Mountain', kind: 'beautiful', detail: 'Go on a clear, wind-free morning — check the webcam first. The whole peninsula laid out below.' },
      { title: 'Constantia wine afternoon', kind: 'beautiful', detail: 'The oldest wine region in the southern hemisphere, twenty minutes from the city. A long lunch among the vines.' },
    ],
    stayVariants: [
      { length: 'Long weekend', focus: 'Table Mountain, Zeitz MOCAA, one beach, one wine estate. A teaser that pulls you back.' },
      { length: 'Two weeks', focus: 'The city, the Cape peninsula drive, and a First Thursday if timed right.' },
      { length: 'A month', focus: 'The recommended length: a real summer base, the Winelands, and a few days on the Garden Route.' },
    ],
    rhythm: [
      'Morning: a climb or a beach swim, then the EU-overlap work block.',
      'Midday: lunch on the Atlantic Seaboard or at a market.',
      'Afternoon: finish EU-facing work as Europe wraps its day.',
      'Evening: sundowners on the coast — the city’s daily ritual — or a First Thursday gallery walk.',
    ],
    bestFor: [
      'EU-facing workers escaping the northern winter',
      'Outdoor people — mountain, ocean, and wine in one city',
      'Value-seekers who want a month of high quality of life for the money',
    ],
    faq: [
      { q: 'What about load-shedding and power cuts?', a: 'Plan for it. Most coworking spaces and better accommodation run generators or battery backups; check before booking, keep devices charged, and treat it as a manageable quirk rather than a dealbreaker. Connectivity in the city core is otherwise good.' },
      { q: 'How is the timezone for work?', a: 'SAST (UTC+2) aligns with the European working day, giving a clean morning overlap with the EU and free evenings. It is one of the best stops here for EU-facing work — and for escaping winter at the same time.' },
      { q: 'Is December a good time to visit?', a: 'It is early southern summer — warm, long days, the city alive. The very peak holiday weeks (late December) get busy and pricier on the coast, so a December that leans early is ideal.' },
      { q: 'Is it safe?', a: 'Apply big-city judgment: the Atlantic Seaboard, City Bowl, and southern suburbs are where nomads base, use rideshare at night, and stay aware. Most visitors have a wonderful, trouble-free month.' },
      { q: 'Where should I base myself?', a: 'Sea Point and Green Point for walkable Atlantic Seaboard living, the City Bowl for central and close to galleries, Constantia if you want quiet and the Winelands on your doorstep.' },
    ],
  },
]

export function getAllJourneySlugs(): string[] {
  return travelJourneys.map((j) => j.slug)
}

export function getJourneyBySlug(slug: string): TravelJourney | undefined {
  return travelJourneys.find((j) => j.slug === slug)
}

const sortedJourneys = [...travelJourneys].sort((a, b) => a.monthIndex - b.monthIndex)

/** Chronological — June (6) → December (12). */
export function getJourneysByMonth(): TravelJourney[] {
  return [...sortedJourneys]
}
