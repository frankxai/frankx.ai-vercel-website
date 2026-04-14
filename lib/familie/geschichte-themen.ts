/**
 * Geschichte (History) Topic Registry
 * Modeled after lib/research/domains.ts — static TypeScript registry
 * for build-time generation of all /familie/geschichte/[slug] pages.
 */

// ── Confidence / Research Status System ──────────────────────────────────────
// Every claim gets a confidence level so readers know what's verified vs hypothetical

export type Forschungsstatus =
  | 'verifiziert'     // 🟢 Confirmed by archive, document, or academic source
  | 'überlieferung'   // 🟡 Reported by family members, not independently verified
  | 'hypothese'       // 🔍 Based on research patterns, not confirmed
  | 'unbekannt'       // 🔴 Unknown, needs research

export const forschungsstatusConfig: Record<Forschungsstatus, {
  label: string
  icon: string
  farbe: string
  beschreibung: string
}> = {
  verifiziert: {
    label: 'Verifiziert',
    icon: '🟢',
    farbe: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    beschreibung: 'Durch Archiv, Dokument oder akademische Quelle bestätigt',
  },
  überlieferung: {
    label: 'Familienüberlieferung',
    icon: '🟡',
    farbe: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    beschreibung: 'Von Familienmitgliedern berichtet, nicht dokumentarisch bestätigt',
  },
  hypothese: {
    label: 'Hypothese',
    icon: '🔍',
    farbe: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    beschreibung: 'Basiert auf Recherche und Mustern, nicht bestätigt',
  },
  unbekannt: {
    label: 'Unbekannt',
    icon: '🔴',
    farbe: 'text-red-400 bg-red-500/10 border-red-500/20',
    beschreibung: 'Noch zu erforschen — Hilfe willkommen',
  },
}

// ── Interfaces ───────────────────────────────────────────────────────────────

export interface GeschichteQuelle {
  name: string
  url?: string
  typ: 'museum' | 'archiv' | 'buch' | 'website' | 'wikipedia' | 'dokument'
}

export interface GeschichteAbschnitt {
  nummer: string // '01', '02', etc.
  titel: string
  inhalt: string[] // paragraphs
  status?: Forschungsstatus // confidence level for this section
  details?: { titel: string; text: string; status?: Forschungsstatus }[]
}

export interface GeschichteFAQ {
  frage: string
  antwort: string
}

export interface ZeitstrahlEintrag {
  jahr: string
  titel: string
  text: string
  ort?: string
  typ: 'migration' | 'krieg' | 'politik' | 'familie' | 'kultur'
  status?: Forschungsstatus
}

export interface GeschichteThema {
  slug: string
  titel: string
  untertitel: string
  kurzfassung: string // TL;DR
  farbe: 'amber' | 'slate' | 'teal' | 'cyan' | 'emerald' | 'rose'
  icon: string // Lucide icon name
  öffentlich: boolean // true = indexed by Google, false = noindex
  gesamtstatus: Forschungsstatus // overall confidence level for this topic
  abschnitte: GeschichteAbschnitt[]
  zeitstrahl?: ZeitstrahlEintrag[]
  schlüsselfakten?: { label: string; wert: string }[]
  faq: GeschichteFAQ[]
  quellen: GeschichteQuelle[]
  familienverbindung: string
  familienverbindungStatus: Forschungsstatus
  verwandt: string[] // Related topic slugs
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPICS
// ─────────────────────────────────────────────────────────────────────────────

export const geschichteThemen: GeschichteThema[] = [
  // ── Wolgadeutsche ──────────────────────────────────────────────────────────
  {
    slug: 'wolgadeutsche',
    titel: 'Die Wolgadeutschen',
    untertitel: 'Von der Einladung Katharinas bis zur Deportation — 180 Jahre an der Wolga',
    kurzfassung: 'Die Wolgadeutschen waren deutsche Siedler, die ab 1763 auf Einladung Katharinas der Großen nach Russland kamen. Sie bauten blühende Kolonien an der Wolga auf, bewahrten ihre Sprache und Kultur über Generationen — bis Stalins Deportationserlass von 1941 alles zerstörte.',
    farbe: 'amber',
    icon: 'Wheat',
    öffentlich: true,
    gesamtstatus: 'verifiziert',
    schlüsselfakten: [
      { label: 'Siedlungsbeginn', wert: '1763' },
      { label: 'Kolonien an der Wolga', wert: '104+' },
      { label: 'Deutsche in Russland (1914)', wert: '~1.8 Mio.' },
      { label: 'Deportiert (1941)', wert: '~900.000' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Die Einladung Katharinas der Großen (1763)',
        status: 'verifiziert',
        inhalt: [
          'Am 22. Juli 1763 erließ Katharina die Große, selbst eine deutsche Prinzessin aus Anhalt-Zerbst, ein Manifest, das Ausländer nach Russland einlud. Das Versprechen war verlockend: kostenloses Land an der Wolga, Religionsfreiheit, Befreiung vom Militärdienst für 30 Jahre, und Selbstverwaltung in eigenen Kolonien.',
          'Tausende Deutsche — vor allem aus Hessen, der Pfalz, Sachsen und dem Rheinland — folgten dem Ruf. Viele flohen vor den Nachwirkungen des Siebenjährigen Krieges, Armut und religiöser Verfolgung. Die Reise war lang und gefährlich: über Lübeck oder andere Häfen nach St. Petersburg, dann über Moskau bis an die Wolga.',
          'Die ersten Siedler kamen 1764 an. Bis 1767 waren über 27.000 Deutsche an der Wolga angekommen. Sie gründeten 104 Kolonien auf beiden Seiten des Flusses — die Wiesenseite (Bergseite) und die Wiesenseite.',
        ],
        details: [
          { titel: 'Das Manifest', text: 'Katharinas Manifest vom 22. Juli 1763 versprach Land, Steuerfreiheit für 30 Jahre, Religionsfreiheit und Befreiung vom Militärdienst.' },
          { titel: 'Herkunftsgebiete', text: 'Hessen, Pfalz, Sachsen, Rheinland, Baden, Württemberg, Bayern — vorwiegend protestantisch und katholisch.' },
          { titel: 'Die Reise', text: 'Monate auf dem Weg: Über Lübeck nach St. Petersburg, dann landeinwärts. Viele starben unterwegs an Krankheiten.' },
        ],
      },
      {
        nummer: '02',
        titel: 'Blütezeit an der Wolga (1764–1914)',
        status: 'verifiziert',
        inhalt: [
          'Über 150 Jahre bauten die Wolgadeutschen eine eigenständige Kultur auf. Sie sprachen ihre eigenen deutschen Dialekte, betrieben Landwirtschaft — besonders Weizenanbau und Senfproduktion — und bewahrten Traditionen aus der alten Heimat.',
          'Die Kolonien waren weitgehend autonom: eigene Schulen, Kirchen, Verwaltung. Die Architektur der Dörfer erinnerte an süddeutsche Siedlungen, mitten in der russischen Steppe. Sarepta, eine Herrnhuter Siedlung, wurde berühmt für Senfölproduktion.',
          'Im 19. Jahrhundert begann sich die Lage zu verändern. Zar Alexander II. hob 1871 die Sonderprivilegien auf. Die Einführung der allgemeinen Wehrpflicht 1874 löste eine erste Auswanderungswelle aus — viele gingen nach Nord- und Südamerika, besonders nach Argentinien, Brasilien und die USA.',
        ],
      },
      {
        nummer: '03',
        titel: 'Revolution und Autonome Republik (1917–1941)',
        status: 'verifiziert',
        inhalt: [
          'Nach der Oktoberrevolution 1917 gründeten die Bolschewiki 1924 die Autonome Sozialistische Sowjetrepublik der Wolgadeutschen (ASSRdWD) mit der Hauptstadt Engels (vormals Pokrowsk). Es war die einzige deutsche autonome Republik weltweit.',
          'Die Republik hatte eigene Zeitungen, Theater, Schulen — alles auf Deutsch. Doch die Stalinzeit brachte Kollektivierung, Hungersnöte (1932-33) und politische Verfolgung. Tausende wurden als "Kulaken" oder "Spione" verhaftet.',
        ],
      },
      {
        nummer: '04',
        titel: 'Die Deportation (28. August 1941)',
        status: 'verifiziert',
        inhalt: [
          'Am 28. August 1941 — wenige Wochen nach dem deutschen Überfall auf die Sowjetunion — erließ das Präsidium des Obersten Sowjets den Erlass über die Umsiedlung der Wolgadeutschen. Die Anschuldigung: kollektive Zusammenarbeit mit dem Feind. Keinerlei Beweise, keine Gerichtsverfahren.',
          'In wenigen Wochen wurden rund 900.000 Wolgadeutsche aus ihren Häusern vertrieben. Sie durften nur mitnehmen, was sie tragen konnten. In Viehwaggons wurden sie nach Sibirien, Kasachstan und Zentralasien transportiert. Die Autonome Republik wurde aufgelöst. Ihre Dörfer, Felder und Häuser gingen an russische Siedler.',
          'Familien wurden getrennt. Männer und Frauen ab 15 Jahren wurden in die Trudarmee eingezogen. Kinder und Alte blieben in Sondersiedlungen zurück, oft ohne ausreichend Nahrung oder Unterkunft. Die Sterblichkeitsrate war verheerend.',
        ],
      },
      {
        nummer: '05',
        titel: 'Nachkriegszeit und Aussiedlung (1945–heute)',
        status: 'verifiziert',
        inhalt: [
          'Nach Kriegsende blieben die Russlanddeutschen in der Verbannung. Bis 1955 lebten sie unter Sondersiedlung — Bewegungsfreiheit eingeschränkt, keine Rückkehr an die Wolga erlaubt. Erst 1964 wurde die Pauschalanschuldigung der Kollaboration offiziell zurückgenommen.',
          'Ab den 1970er-Jahren begannen Russlanddeutsche, die Ausreise nach Deutschland zu beantragen. Nach dem Fall der Sowjetunion 1991 setzte eine massive Aussiedlungswelle ein. Zwischen 1990 und 2005 kamen über 2 Millionen Russlanddeutsche als Spätaussiedler nach Deutschland.',
          'Heute leben schätzungsweise 2,5 bis 3 Millionen Russlanddeutsche und ihre Nachkommen in Deutschland. Ihre Geschichte wird in Museen, Archiven und Gemeinden bewahrt — und in Familien wie unserer weitererzählt.',
        ],
      },
    ],
    zeitstrahl: [
      { jahr: '1763', titel: 'Manifest Katharinas', text: 'Einladung deutscher Siedler nach Russland', ort: 'St. Petersburg', typ: 'politik' },
      { jahr: '1764–67', titel: 'Erste Siedler an der Wolga', text: '27.000+ Deutsche gründen 104 Kolonien', ort: 'Wolga-Region', typ: 'migration' },
      { jahr: '1871', titel: 'Verlust der Privilegien', text: 'Zar Alexander II. hebt Sonderrechte auf', typ: 'politik' },
      { jahr: '1874', titel: 'Allgemeine Wehrpflicht', text: 'Erste Auswanderungswelle nach Amerika', typ: 'migration' },
      { jahr: '1917', titel: 'Oktoberrevolution', text: 'Beginn der Sowjetzeit für die Wolgadeutschen', typ: 'politik' },
      { jahr: '1924', titel: 'Autonome Republik', text: 'ASSRdWD gegründet, Hauptstadt Engels', ort: 'Engels', typ: 'politik' },
      { jahr: '1932–33', titel: 'Hungersnot', text: 'Millionen sterben in der sowjetischen Hungersnot', typ: 'krieg' },
      { jahr: '28.08.1941', titel: 'Deportationserlass', text: '900.000 Wolgadeutsche zwangsumgesiedelt', typ: 'krieg' },
      { jahr: '1941–46', titel: 'Trudarmee', text: 'Zwangsarbeit für Hunderttausende Russlanddeutsche', ort: 'Ural/Sibirien', typ: 'krieg' },
      { jahr: '1955', titel: 'Ende der Sondersiedlung', text: 'Russlanddeutsche dürfen Siedlungen verlassen', typ: 'politik' },
      { jahr: '1964', titel: 'Teilrehabilitation', text: 'Pauschalanschuldigung zurückgenommen, aber keine Rückkehr erlaubt', typ: 'politik' },
      { jahr: 'Ab 1990', titel: 'Aussiedlung nach Deutschland', text: 'Hunderttausende kommen als Spätaussiedler nach Deutschland', typ: 'migration' },
    ],
    faq: [
      {
        frage: 'Was bedeutet "Wolgadeutsche"?',
        antwort: 'Wolgadeutsche sind die Nachkommen deutscher Siedler, die ab 1763 auf Einladung Katharinas der Großen in die Wolga-Region Russlands kamen. Sie bewahrten ihre deutsche Sprache und Kultur über fast 200 Jahre.',
      },
      {
        frage: 'Warum wurden die Wolgadeutschen deportiert?',
        antwort: 'Nach dem deutschen Überfall auf die Sowjetunion 1941 beschuldigte Stalin die Wolgadeutschen pauschal der Kollaboration mit Nazi-Deutschland. Ohne Beweise oder Gerichtsverfahren wurden rund 900.000 Menschen nach Sibirien und Zentralasien deportiert.',
      },
      {
        frage: 'Was war die Trudarmee?',
        antwort: 'Die Trudarmee (Arbeitsarmee) war ein System der Zwangsarbeit, in das Russlanddeutsche zwischen 1941 und 1946 eingezogen wurden. Männer und Frauen ab 15 Jahren mussten unter extremen Bedingungen in Lagern arbeiten. Die Sterblichkeitsrate war hoch.',
      },
      {
        frage: 'Wie ist die Familie Riemer mit den Wolgadeutschen verbunden?',
        antwort: 'Christian Riemer, Franks Urgroßvater, wurde 1914 in Karaganda (Kasachstan) geboren und war Wolgadeutscher Abstammung. Er überlebte die Trudarmee. Sein Sohn Alexander, Enkel Witali und Urenkel Frank setzen die Riemer-Linie fort.',
      },
      {
        frage: 'Was sind Spätaussiedler?',
        antwort: 'Spätaussiedler sind deutschstämmige Menschen aus der ehemaligen Sowjetunion und Osteuropa, die nach 1993 nach Deutschland einwanderten. Aufgrund ihres deutschen Erbes haben sie ein Recht auf die deutsche Staatsbürgerschaft.',
      },
      {
        frage: 'Wie kann ich mehr über meine Vorfahren erfahren?',
        antwort: 'Wichtige Ressourcen: FamilySearch.org (kostenlos), das Museum für russlanddeutsche Kulturgeschichte in Detmold, wolgadeutsche.net, und die Archive der Landsmannschaft der Deutschen aus Russland (LMDR).',
      },
    ],
    quellen: [
      { name: 'Museum für russlanddeutsche Kulturgeschichte, Detmold', url: 'https://www.russlanddeutsche.de', typ: 'museum' },
      { name: 'Wolgadeutsche.net — Community-Archiv & Genealogie', url: 'https://www.wolgadeutsche.net', typ: 'website' },
      { name: 'Landsmannschaft der Deutschen aus Russland (LMDR)', url: 'https://www.lmdr.de', typ: 'website' },
      { name: 'Bundesarchiv — Dokumente zur Geschichte der Russlanddeutschen', url: 'https://www.bundesarchiv.de', typ: 'archiv' },
      { name: 'Wikipedia: Wolgadeutsche', url: 'https://de.wikipedia.org/wiki/Wolgadeutsche', typ: 'wikipedia' },
      { name: 'Wikipedia: Autonome Sozialistische Sowjetrepublik der Wolgadeutschen', url: 'https://de.wikipedia.org/wiki/Autonome_Sozialistische_Sowjetrepublik_der_Wolgadeutschen', typ: 'wikipedia' },
      { name: 'Wikipedia: Trudarmee', url: 'https://de.wikipedia.org/wiki/Trudarmee', typ: 'wikipedia' },
      { name: 'FamilySearch.org — Genealogie-Datenbank', url: 'https://www.familysearch.org', typ: 'website' },
      { name: 'Memorial International — Archiv politischer Repressionen', typ: 'archiv' },
      { name: '"Und ringsumher ist öde Steppe" — Dokumentarische Literatur zur Trudarmee', typ: 'buch' },
    ],
    familienverbindung: 'Die Familien Riemer und Schneider sind Teil der Wolgadeutschen Geschichte. Urgroßvater Christian Riemer (1914, Karaganda) überlebte die Trudarmee. Urgroßeltern Franz und Amalia Schneider stammen ebenfalls aus diesem Umfeld. Vieles wird noch erforscht — möglicherweise führt die Riemer-Linie zurück zur Kolonie Reinwald an der Wolga.',
    familienverbindungStatus: 'überlieferung',
    verwandt: ['trudarmee', 'karaganda', 'riemer-linie'],
  },

  // ── Trudarmee ──────────────────────────────────────────────────────────────
  {
    slug: 'trudarmee',
    titel: 'Die Trudarmee',
    untertitel: 'Zwangsarbeit für Russlanddeutsche — 1941 bis 1946',
    kurzfassung: 'Die Trudarmee (Arbeitsarmee) war ein System der Zwangsarbeit unter NKWD-Kommando, in das Hunderttausende Russlanddeutsche während des Zweiten Weltkriegs eingezogen wurden.',
    farbe: 'slate',
    icon: 'Shield',
    öffentlich: true,
    gesamtstatus: 'verifiziert',
    schlüsselfakten: [
      { label: 'Zeitraum', wert: '1941–1946' },
      { label: 'Eingezogene', wert: '~316.000' },
      { label: 'Sterblichkeitsrate', wert: 'bis zu 25%' },
      { label: 'Alter der Eingezogenen', wert: '15–55 Jahre' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Was war die Trudarmee?',
        status: 'verifiziert',
        inhalt: [
          'Die Trudarmee (russisch: Трудовая армия, wörtlich "Arbeitsarmee") war kein offizieller Militärdienst, sondern ein System der Zwangsarbeit unter dem Kommando des NKWD (Innenministerium). Russlanddeutsche — Männer ab 15 und Frauen ab 16 Jahren — wurden in Arbeitslager einberufen.',
          'Die Lager befanden sich im Ural, in Sibirien und Zentralasien. Die Arbeit war hart: Holzfällen, Bergbau, Bahnbau, Fabrikarbeit. Die Versorgung war minimal, die Winter tödlich. Viele starben an Hunger, Kälte, Krankheiten und Erschöpfung.',
        ],
      },
      {
        nummer: '02',
        titel: 'Wer war betroffen?',
        status: 'verifiziert',
        inhalt: [
          'Betroffen waren vor allem Russlanddeutsche zwischen 15 und 55 Jahren. Ab September 1941 wurden Männer eingezogen, ab Oktober 1942 auch Frauen. Insgesamt wurden schätzungsweise 316.000 Menschen in die Trudarmee mobilisiert.',
          'Die Sterblichkeitsrate war erschreckend hoch — in manchen Lagern starben bis zu 25% der Insassen. Ursachen waren Hunger, Kälte, Krankheiten und Erschöpfung durch die schwere körperliche Arbeit.',
        ],
      },
    ],
    zeitstrahl: [
      { jahr: 'Sep 1941', titel: 'Erste Mobilisierung', text: 'Russlanddeutsche Männer werden eingezogen', typ: 'krieg' },
      { jahr: 'Okt 1942', titel: 'Frauen eingezogen', text: 'Auch Frauen ab 16 Jahren müssen in die Trudarmee', typ: 'krieg' },
      { jahr: '1943', titel: 'Höchste Sterblichkeit', text: 'Hungerwinter in den Arbeitslagern', typ: 'krieg' },
      { jahr: '1946', titel: 'Formelle Auflösung', text: 'Trudarmee aufgelöst, aber Sondersiedlung bleibt', typ: 'politik' },
    ],
    faq: [
      {
        frage: 'Unterschied zwischen Trudarmee und Gulag?',
        antwort: 'Der Gulag war ein Lagersystem für politische und kriminelle Gefangene. Die Trudarmee war spezifisch für als "unzuverlässig" eingestufte ethnische Gruppen — hauptsächlich Russlanddeutsche. Die Bedingungen waren ähnlich schlecht, aber die Trudarmee war formal kein Strafsystem.',
      },
      {
        frage: 'Wurden die Trudarmee-Opfer rehabilitiert?',
        antwort: '1964 wurde die Pauschalanschuldigung der Kollaboration zurückgenommen. Eine vollständige Rehabilitierung erfolgte erst 1991 mit dem russischen Rehabilitierungsgesetz. Viele Überlebende und Nachkommen warten bis heute auf vollständige Anerkennung.',
      },
    ],
    quellen: [
      { name: 'Wikipedia: Trudarmee', url: 'https://de.wikipedia.org/wiki/Trudarmee', typ: 'wikipedia' },
      { name: 'Memorial International — Archiv', typ: 'archiv' },
      { name: 'Bundesarchiv — Russlanddeutsche Dokumente', url: 'https://www.bundesarchiv.de', typ: 'archiv' },
      { name: '"Und ringsumher ist öde Steppe"', typ: 'buch' },
    ],
    familienverbindung: 'Christian Riemer (1914, Karaganda) überlebte die Trudarmee. Auch andere Vorfahren der Riemer- und Schneider-Familien könnten betroffen gewesen sein. Die genauen Umstände werden noch erforscht.',
    familienverbindungStatus: 'überlieferung',
    verwandt: ['wolgadeutsche', 'karaganda'],
  },

  // ── Karaganda ──────────────────────────────────────────────────────────────
  {
    slug: 'karaganda',
    titel: 'Karaganda — Stadt in der Steppe',
    untertitel: 'Wie eine Bergbaustadt in Kasachstan zur Heimat vieler Russlanddeutscher wurde',
    kurzfassung: 'Karaganda in Zentralkasachstan war Ziel vieler deportierter Russlanddeutscher. Eine Stadt, gebaut auf Kohle und erzwungener Arbeit, die dennoch Gemeinschaften hervorbrachte.',
    farbe: 'teal',
    icon: 'Mountain',
    öffentlich: true,
    gesamtstatus: 'verifiziert',
    schlüsselfakten: [
      { label: 'Gründung', wert: '1931 (Stadtrecht)' },
      { label: 'Lage', wert: 'Zentralkasachstan' },
      { label: 'Wirtschaft', wert: 'Kohlebergbau' },
      { label: 'Deutsche (1989)', wert: '143.000' },
      { label: 'Anteil (1940er)', wert: 'bis 70%' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Die Stadt in der Steppe',
        status: 'verifiziert',
        inhalt: [
          'Karaganda (kasachisch: Қарағанды) liegt im Herzen der kasachischen Steppe, rund 200 Kilometer südöstlich der Hauptstadt Astana. Die Stadt entstand in den 1930er-Jahren als Zentrum des Kohlebergbaus und wuchs schnell — nicht zuletzt durch Zwangsarbeiter aus dem Gulag-System und deportierte Volksgruppen.',
          'Rund 70.000 Russlanddeutsche wurden während der Deportation 1941-42 in die Region Karaganda umgesiedelt. In den 1940er-Jahren waren bis zu 70% der Einwohner Karagandas ethnische Deutsche. Laut Volkszählung von 1989 lebten 143.000 Russlanddeutsche in Karaganda.',
        ],
      },
      {
        nummer: '02',
        titel: 'Deutsche Gemeinschaft in Karaganda',
        status: 'verifiziert',
        inhalt: [
          'Deutsche lebten konzentriert in Karaganda-Stadt, Temirtau, Saran und Schachtinsk. In Temirtau gab es das einzige deutsche Dramatheater in Kasachstan. In Dolinka/Dolinskoye existierte eine deutsche Dorfverwaltung mit einer vierjährigen Kirchenschule.',
          'Ab 1956, als Deutsche etwas Bewegungsfreiheit erhielten, zogen viele in Städte, in denen Verwandte bereits lebten. Die Möglichkeit, Hochdeutsch oder Plattdeutsch zu sprechen, und vertraute Bräuche schufen Zusammenhalt.',
          'Nach 1990 setzte die Massenauswanderung nach Deutschland ein. Bis 1999 war die deutsche Bevölkerung Karagandas um 60% auf 57.200 gesunken. Dörfer, in denen Deutsche konzentriert lebten, wurden von ethnischen Kasachen übernommen.',
        ],
      },
    ],
    faq: [
      {
        frage: 'Warum lebten Deutsche in Kasachstan?',
        antwort: 'Deutsche kamen auf zwei Wegen nach Kasachstan: als freiwillige Siedler im 19. Jahrhundert und — in weit größerer Zahl — als Zwangsdeportierte nach Stalins Erlass von 1941. Karaganda war eines der Hauptziele.',
      },
    ],
    quellen: [
      { name: 'Wikipedia: Karaganda', url: 'https://de.wikipedia.org/wiki/Qaraghandy', typ: 'wikipedia' },
      { name: 'Wikipedia: Deutsche in Kasachstan', url: 'https://de.wikipedia.org/wiki/Russlanddeutsche_in_Kasachstan', typ: 'wikipedia' },
      { name: 'GAMEO — Karaganda', url: 'https://gameo.org/index.php?title=Karaganda_(Kazakhstan)', typ: 'website' },
      { name: 'Staatsarchiv Karaganda (GAKO)', url: 'https://de-archiv.kz/en/issledovaniya/obzor-arhivnyh-dokumentov-po-istorii-nemcev-v-karagandinskoj-oblasti', typ: 'archiv' },
    ],
    familienverbindung: 'Christian Riemer wurde 1914 in Karaganda geboren. Die Stadt war jahrzehntelang Heimat der Riemer-Vorfahren.',
    familienverbindungStatus: 'überlieferung',
    verwandt: ['wolgadeutsche', 'trudarmee', 'riemer-linie'],
  },

  // ── Riemer-Linie ───────────────────────────────────────────────────────────
  {
    slug: 'riemer-linie',
    titel: 'Die Riemer-Linie',
    untertitel: 'Von Karaganda nach Amsterdam — vier Generationen',
    kurzfassung: 'Die Riemer-Linie führt von Christian Riemer in Karaganda über Alexander und Witali bis zu Frank in Amsterdam. Eine Geschichte von Überleben, Migration und Neuanfang.',
    farbe: 'cyan',
    icon: 'Route',
    öffentlich: false,
    gesamtstatus: 'überlieferung',
    schlüsselfakten: [
      { label: 'Dokumentiert seit', wert: '1729' },
      { label: 'Herkunft', wert: 'Freudental, BaWü' },
      { label: 'Wolga-Kolonie', wert: 'Reinwald (1766)' },
      { label: 'Heute', wert: 'Amsterdam' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Herkunft: Freudental & Kolonie Reinwald',
        status: 'verifiziert',
        inhalt: [
          'Der Name Reimer/Riemer ist in der Kolonie Reinwald (heute Staritskoye, Saratow Oblast) dokumentiert. Johann Konrad Reimer, getauft am 6. Mai 1729 in Freudental (35 km nördlich von Stuttgart, Baden-Württemberg), gehörte zu den Gründungssiedlern Reinwalds.',
          'Er kam am 14. Juli 1766 in Reinwald an — eine der 104 deutschen Kolonien an der Wolga, gegründet auf Einladung Katharinas der Großen. Im Census von 1767 ist seine Familie als Haushalt Nr. 17 verzeichnet.',
          'Im Census von 1798 erscheint Konrad Reimer (40 Jahre) mit seiner Frau Katharina Steinbrecher (38 Jahre) und den Kindern Heinrich, Karl, Martin, Katharina und Maria Sophia.',
        ],
        details: [
          { titel: 'Kolonie Reinwald', text: 'Gegründet 14. Juli 1766 als lutherische Kolonie. Heute: Staritskoye, 51.56°N 46.50°E. 2.931 Einwohner 1931, davon 2.923 deutschsprachig.', status: 'verifiziert' },
          { titel: 'Reimer ≈ Riemer', text: 'Schreibvarianten desselben Familiennamens. Herkunft: mittelhochdeutsch "riemaere" (Riemenmacher). Beide Schreibweisen sind in den Kolonieregistern dokumentiert.', status: 'verifiziert' },
          { titel: 'Freudental, BaWü', text: 'Johann Konrad Reimer wurde in der Evangelischen Kirche Freudental getauft. Über Dänemark (Schleswig-Holstein) und Russland kam er an die Wolga.', status: 'verifiziert' },
        ],
      },
      {
        nummer: '02',
        titel: 'Christian Riemer (1914, Karaganda)',
        status: 'überlieferung',
        inhalt: [
          'Christian Riemer, geboren 1914 in Karaganda, ist der älteste namentlich bekannte Vorfahre unserer direkten Linie. Wolgadeutscher Abstammung, Trudarmee-Überlebender. Er ist der Urgroßvater von Frank.',
          'Die genaue Verbindung zwischen den Reinwald-Reimers (dokumentiert bis 1798) und Christian Riemer in Karaganda (1914) ist noch nicht lückenlos erforscht. Zwischen 1798 und 1914 liegen über 100 Jahre — in denen Umsiedlungen, Namensänderungen und Deportationen die Spuren verwischen.',
        ],
      },
      {
        nummer: '03',
        titel: 'Alexander & Paulina Riemer — Großeltern',
        status: 'überlieferung',
        inhalt: [
          'Alexander Riemer, Sohn von Christian, ist Franks Großvater väterlicherseits. Verheiratet mit Paulina Riemer (geb. Schneider), Tochter von Franz und Amalia Schneider. Beide deutschsprachig, leben in Deutschland.',
        ],
      },
      {
        nummer: '04',
        titel: 'Witali & Dora Riemer — Eltern',
        status: 'überlieferung',
        inhalt: [
          'Witali Riemer, Sohn von Alexander und Paulina. Verheiratet mit Dora Riemer (geb. Gorte). Durch die Ehe mit Dora verbinden sich die Riemer- und Gorte-Linien.',
        ],
      },
      {
        nummer: '05',
        titel: 'Frank Riemer — Heute (Amsterdam)',
        status: 'überlieferung',
        inhalt: [
          'Frank Riemer lebt in Amsterdam. AI Architect, Musik-Produzent, Creator. Er baut diesen Familie Hub, um die Geschichte der Familie festzuhalten und die Generationen zu verbinden.',
        ],
      },
    ],
    zeitstrahl: [
      { jahr: '1729', titel: 'Johann Konrad Reimer getauft', text: 'Evangelische Kirche Freudental, Baden-Württemberg', ort: 'Freudental', typ: 'familie', status: 'verifiziert' },
      { jahr: '1766', titel: 'Ankunft in Reinwald', text: 'Gründungssiedler der Kolonie, Haushalt Nr. 17', ort: 'Reinwald (Wolga)', typ: 'migration', status: 'verifiziert' },
      { jahr: '1798', titel: 'Konrad Reimer im Census', text: 'Mit Frau Katharina Steinbrecher und 5 Kindern', ort: 'Reinwald', typ: 'familie', status: 'verifiziert' },
      { jahr: '1914', titel: 'Christian Riemer geboren', text: 'In Karaganda, Kasachstan', ort: 'Karaganda', typ: 'familie', status: 'überlieferung' },
      { jahr: '1941–46', titel: 'Trudarmee', text: 'Christian Riemer überlebt die Zwangsarbeit', typ: 'krieg', status: 'überlieferung' },
      { jahr: 'Ab 1990', titel: 'Aussiedlung', text: 'Riemer-Familie kommt nach Deutschland', typ: 'migration', status: 'überlieferung' },
      { jahr: 'Heute', titel: 'Frank in Amsterdam', text: 'AI Architect, baut den Familie Hub', ort: 'Amsterdam', typ: 'familie', status: 'verifiziert' },
    ],
    faq: [
      {
        frage: 'Ist Riemer und Reimer der gleiche Name?',
        antwort: 'Ja. Beide sind Schreibvarianten desselben Familiennamens, abgeleitet vom mittelhochdeutschen "riemaere" (Riemenmacher). In den Kolonieregistern kommen beide Schreibweisen vor.',
      },
      {
        frage: 'Was ist die Lücke zwischen 1798 und 1914?',
        antwort: 'Zwischen dem letzten dokumentierten Reinwald-Census (1798, Konrad Reimer) und der Geburt von Christian Riemer in Karaganda (1914) liegen über 100 Jahre. In dieser Zeit gab es Umsiedlungen innerhalb Russlands, die Gründung von Tochterkolonien, und politische Umwälzungen. Diese Lücke zu schließen ist eines unserer wichtigsten Forschungsziele.',
      },
    ],
    quellen: [
      { name: 'Volga German Institute — Reinwald', url: 'https://volgagermaninstitute.org/colonies/reinwald', typ: 'website' },
      { name: 'volgagermans.org — Reimer Surname', url: 'https://www.volgagermans.org/who-are-volga-germans/origins/surnames/reimer', typ: 'website' },
      { name: 'wolgadeutsche.net — Forum: Reimer aus Reinwald', url: 'http://forum.wolgadeutsche.net/viewtopic.php?f=165&t=3391', typ: 'website' },
      { name: 'FamilySearch — 1834 Census Reinwald', url: 'https://www.familysearch.org/en/search/catalog/822206', typ: 'archiv' },
      { name: 'AHSGR Surname Charts', url: 'https://ahsgr.org/research/surname-charts/', typ: 'archiv' },
    ],
    familienverbindung: 'Dies ist unsere direkte Familienlinie. Die Verbindung Reimer (Reinwald, 1766) → Christian Riemer (Karaganda, 1914) ist wahrscheinlich, aber die Lücke 1798–1914 ist noch nicht geschlossen.',
    familienverbindungStatus: 'überlieferung',
    verwandt: ['wolgadeutsche', 'karaganda', 'gorte-linie'],
  },

  // ── Gorte-Linie ────────────────────────────────────────────────────────────
  {
    slug: 'gorte-linie',
    titel: 'Die Gorte-Linie',
    untertitel: 'Franks mütterlicherseits — David und Dorothea Gorte',
    kurzfassung: 'Die Gorte-Linie umfasst Franks Großeltern mütterlicherseits: David Gorte und Dorothea Gorte (geb. Prager). Durch die Ehe ihrer Tochter Dora mit Witali Riemer verbinden sich Gorte und Riemer.',
    farbe: 'amber',
    icon: 'Heart',
    öffentlich: false,
    gesamtstatus: 'überlieferung',
    schlüsselfakten: [
      { label: 'Großeltern', wert: 'David & Dorothea' },
      { label: 'Brücke', wert: 'Dora (geb. Gorte)' },
      { label: 'Verbindung', wert: 'Heirat Gorte-Riemer' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'David & Dorothea Gorte',
        inhalt: [
          'David und Dorothea Gorte (geb. Prager) sind Franks Großeltern mütterlicherseits. Deutschsprachig, lebend. Ihre Geschichte wird noch gesammelt — wir laden die Familie ein, Erinnerungen und Details zu teilen.',
        ],
      },
      {
        nummer: '02',
        titel: 'Dora — Die Brücke',
        inhalt: [
          'Dora Riemer, geboren als Dora Gorte, ist die Tochter von David und Dorothea. Durch ihre Ehe mit Witali Riemer verbindet sie die beiden Familienlinien. Sie ist buchstäblich die Brücke zwischen Gorte und Riemer.',
        ],
      },
    ],
    faq: [],
    quellen: [],
    familienverbindung: 'David und Dorothea Gorte sind Franks Großeltern mütterlicherseits. Ihre Tochter Dora verbindet die Gorte- und Riemer-Linien.',
    familienverbindungStatus: 'überlieferung',
    verwandt: ['riemer-linie'],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getGeschichteThema(slug: string): GeschichteThema | undefined {
  return geschichteThemen.find((t) => t.slug === slug)
}

export function getAllGeschichteSlugs(): string[] {
  return geschichteThemen.map((t) => t.slug)
}
