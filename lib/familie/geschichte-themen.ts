/**
 * Geschichte (History) Topic Registry
 * Modeled after lib/research/domains.ts — static TypeScript registry
 * for build-time generation of all /familie/geschichte/[slug] pages.
 */

export interface GeschichteQuelle {
  name: string
  url?: string
  typ: 'museum' | 'archiv' | 'buch' | 'website' | 'wikipedia' | 'dokument'
}

export interface GeschichteAbschnitt {
  nummer: string // '01', '02', etc.
  titel: string
  inhalt: string[] // paragraphs
  details?: { titel: string; text: string }[] // sub-items
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
}

export interface GeschichteThema {
  slug: string
  titel: string
  untertitel: string
  kurzfassung: string // TL;DR
  farbe: 'amber' | 'slate' | 'teal' | 'cyan' | 'emerald' | 'rose'
  icon: string // Lucide icon name
  abschnitte: GeschichteAbschnitt[]
  zeitstrahl?: ZeitstrahlEintrag[]
  schlüsselfakten?: { label: string; wert: string }[]
  faq: GeschichteFAQ[]
  quellen: GeschichteQuelle[]
  familienverbindung: string // How this topic connects to our family
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
    kurzfassung: 'Die Wolgadeutschen waren deutsche Siedler, die ab 1763 auf Einladung Katharinas der Großen nach Russland kamen. Sie bauten blühende Kolonien an der Wolga auf, bewahrten ihre Sprache und Kultur über Generationen — bis Stalins Deportationserlass von 1941 alles zerstörte. Die Familie Riemer ist Teil dieser Geschichte.',
    farbe: 'amber',
    icon: 'Wheat',
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
        inhalt: [
          'Über 150 Jahre bauten die Wolgadeutschen eine eigenständige Kultur auf. Sie sprachen ihre eigenen deutschen Dialekte, betrieben Landwirtschaft — besonders Weizenanbau und Senfproduktion — und bewahrten Traditionen aus der alten Heimat.',
          'Die Kolonien waren weitgehend autonom: eigene Schulen, Kirchen, Verwaltung. Die Architektur der Dörfer erinnerte an süddeutsche Siedlungen, mitten in der russischen Steppe. Sarepta, eine Herrnhuter Siedlung, wurde berühmt für Senfölproduktion.',
          'Im 19. Jahrhundert begann sich die Lage zu verändern. Zar Alexander II. hob 1871 die Sonderprivilegien auf. Die Einführung der allgemeinen Wehrpflicht 1874 löste eine erste Auswanderungswelle aus — viele gingen nach Nord- und Südamerika, besonders nach Argentinien, Brasilien und die USA.',
        ],
      },
      {
        nummer: '03',
        titel: 'Revolution und Autonome Republik (1917–1941)',
        inhalt: [
          'Nach der Oktoberrevolution 1917 gründeten die Bolschewiki 1924 die Autonome Sozialistische Sowjetrepublik der Wolgadeutschen (ASSRdWD) mit der Hauptstadt Engels (vormals Pokrowsk). Es war die einzige deutsche autonome Republik weltweit.',
          'Die Republik hatte eigene Zeitungen, Theater, Schulen — alles auf Deutsch. Doch die Stalinzeit brachte Kollektivierung, Hungersnöte (1932-33) und politische Verfolgung. Tausende wurden als "Kulaken" oder "Spione" verhaftet.',
        ],
      },
      {
        nummer: '04',
        titel: 'Die Deportation (28. August 1941)',
        inhalt: [
          'Am 28. August 1941 — wenige Wochen nach dem deutschen Überfall auf die Sowjetunion — erließ das Präsidium des Obersten Sowjets den Erlass über die Umsiedlung der Wolgadeutschen. Die Anschuldigung: kollektive Zusammenarbeit mit dem Feind. Keinerlei Beweise, keine Gerichtsverfahren.',
          'In wenigen Wochen wurden rund 900.000 Wolgadeutsche aus ihren Häusern vertrieben. Sie durften nur mitnehmen, was sie tragen konnten. In Viehwaggons wurden sie nach Sibirien, Kasachstan und Zentralasien transportiert. Die Autonome Republik wurde aufgelöst. Ihre Dörfer, Felder und Häuser gingen an russische Siedler.',
          'Familien wurden getrennt. Männer und Frauen ab 15 Jahren wurden in die Trudarmee eingezogen. Kinder und Alte blieben in Sondersiedlungen zurück, oft ohne ausreichend Nahrung oder Unterkunft. Die Sterblichkeitsrate war verheerend.',
        ],
      },
      {
        nummer: '05',
        titel: 'Unsere Verbindung',
        inhalt: [
          'Christian Riemer, Franks Urgroßvater, wurde 1914 in Karaganda geboren — einer Stadt, die für viele deportierte Russlanddeutsche zum neuen Zuhause werden sollte. Er überlebte die Trudarmee und legte den Grundstein für die Riemer-Linie, die heute über Alexander und Witali bis zu Frank in Amsterdam reicht.',
          'Die Geschichte der Wolgadeutschen ist unsere Geschichte. Sie erklärt, warum die Familie Deutsch spricht, warum die Vorfahren in Kasachstan lebten, und warum so viele Russlanddeutsche ab den 1990er-Jahren nach Deutschland kamen.',
        ],
      },
    ],
    zeitstrahl: [
      { jahr: '1763', titel: 'Manifest Katharinas', text: 'Einladung deutscher Siedler nach Russland', ort: 'St. Petersburg', typ: 'politik' },
      { jahr: '1764–67', titel: 'Erste Siedler an der Wolga', text: '27.000+ Deutsche gründen 104 Kolonien', ort: 'Wolga-Region', typ: 'migration' },
      { jahr: '1871', titel: 'Verlust der Privilegien', text: 'Zar Alexander II. hebt Sonderrechte auf', typ: 'politik' },
      { jahr: '1874', titel: 'Allgemeine Wehrpflicht', text: 'Erste Auswanderungswelle nach Amerika', typ: 'migration' },
      { jahr: '1914', titel: 'Christian Riemer geboren', text: 'Franks Urgroßvater kommt in Karaganda zur Welt', ort: 'Karaganda', typ: 'familie' },
      { jahr: '1917', titel: 'Oktoberrevolution', text: 'Beginn der Sowjetzeit für die Wolgadeutschen', typ: 'politik' },
      { jahr: '1924', titel: 'Autonome Republik', text: 'ASSRdWD gegründet, Hauptstadt Engels', ort: 'Engels', typ: 'politik' },
      { jahr: '1932–33', titel: 'Hungersnot', text: 'Millionen sterben in der sowjetischen Hungersnot', typ: 'krieg' },
      { jahr: '28.08.1941', titel: 'Deportationserlass', text: '900.000 Wolgadeutsche zwangsumgesiedelt', typ: 'krieg' },
      { jahr: '1941–46', titel: 'Trudarmee', text: 'Zwangsarbeit für Russlanddeutsche, auch Christian Riemer', ort: 'Ural/Sibirien', typ: 'krieg' },
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
    familienverbindung: 'Christian Riemer (1914, Karaganda) war Wolgadeutscher Abstammung und Trudarmee-Überlebender. Sein Sohn Alexander, Enkel Witali und Urenkel Frank tragen dieses Erbe weiter.',
    verwandt: ['trudarmee', 'karaganda', 'riemer-linie'],
  },

  // ── Trudarmee ──────────────────────────────────────────────────────────────
  {
    slug: 'trudarmee',
    titel: 'Die Trudarmee',
    untertitel: 'Zwangsarbeit für Russlanddeutsche — 1941 bis 1946',
    kurzfassung: 'Die Trudarmee (Arbeitsarmee) war ein System der Zwangsarbeit unter NKWD-Kommando, in das Hunderttausende Russlanddeutsche während des Zweiten Weltkriegs eingezogen wurden. Christian Riemer, Franks Urgroßvater, war einer von ihnen.',
    farbe: 'slate',
    icon: 'Shield',
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
        inhalt: [
          'Die Trudarmee (russisch: Трудовая армия, wörtlich "Arbeitsarmee") war kein offizieller Militärdienst, sondern ein System der Zwangsarbeit unter dem Kommando des NKWD (Innenministerium). Russlanddeutsche — Männer ab 15 und Frauen ab 16 Jahren — wurden in Arbeitslager einberufen.',
          'Die Lager befanden sich im Ural, in Sibirien und Zentralasien. Die Arbeit war hart: Holzfällen, Bergbau, Bahnbau, Fabrikarbeit. Die Versorgung war minimal, die Winter tödlich. Viele starben an Hunger, Kälte, Krankheiten und Erschöpfung.',
        ],
      },
      {
        nummer: '02',
        titel: 'Christian Riemers Geschichte',
        inhalt: [
          'Christian Riemer, geboren 1914 in Karaganda, wurde als Russlanddeutscher in die Trudarmee eingezogen. Die genauen Umstände seiner Dienstzeit werden noch erforscht. Was wir wissen: Er überlebte — und legte damit den Grundstein für die Riemer-Familie, die heute in Deutschland und den Niederlanden lebt.',
          'Seine Geschichte steht stellvertretend für Hunderttausende, die ähnliches durchlitten. Wir sammeln Informationen und bitten die Familie, Erinnerungen zu teilen.',
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
    familienverbindung: 'Christian Riemer (1914, Karaganda) überlebte die Trudarmee. Seine genaue Dienstzeit wird noch erforscht.',
    verwandt: ['wolgadeutsche', 'karaganda'],
  },

  // ── Karaganda ──────────────────────────────────────────────────────────────
  {
    slug: 'karaganda',
    titel: 'Karaganda — Stadt in der Steppe',
    untertitel: 'Wie eine Bergbaustadt in Kasachstan zur Heimat der Riemer-Familie wurde',
    kurzfassung: 'Karaganda in Zentralkasachstan war Ziel vieler deportierter Russlanddeutscher und Geburtsort von Christian Riemer (1914). Eine Stadt, gebaut auf Kohle und erzwungener Arbeit, die dennoch Gemeinschaften hervorbrachte.',
    farbe: 'teal',
    icon: 'Mountain',
    schlüsselfakten: [
      { label: 'Gründung', wert: '1931 (Stadtrecht)' },
      { label: 'Lage', wert: 'Zentralkasachstan' },
      { label: 'Wirtschaft', wert: 'Kohlebergbau' },
      { label: 'Deutsche Bevölkerung', wert: 'Signifikant bis 1990er' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Die Stadt in der Steppe',
        inhalt: [
          'Karaganda (kasachisch: Қарағанды) liegt im Herzen der kasachischen Steppe, rund 200 Kilometer südöstlich der Hauptstadt Astana. Die Stadt entstand in den 1930er-Jahren als Zentrum des Kohlebergbaus und wuchs schnell — nicht zuletzt durch Zwangsarbeiter aus dem Gulag-System und deportierte Volksgruppen.',
          'Für viele Russlanddeutsche war Karaganda Endstation einer unfreiwilligen Reise. Hier, in der weiten Steppe Kasachstans, bauten sie neue Gemeinschaften auf. Christian Riemer wurde 1914 hier geboren — zu einer Zeit, als Karaganda noch ein kleines Bergarbeiterdorf war.',
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
    ],
    familienverbindung: 'Christian Riemer wurde 1914 in Karaganda geboren. Die Stadt war jahrzehntelang Heimat der Riemer-Vorfahren.',
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
    schlüsselfakten: [
      { label: 'Generationen', wert: '4' },
      { label: 'Ursprung', wert: 'Karaganda, Kasachstan' },
      { label: 'Heute', wert: 'Amsterdam, Niederlande' },
      { label: 'Erbe', wert: 'Wolgadeutsch' },
    ],
    abschnitte: [
      {
        nummer: '01',
        titel: 'Christian Riemer — Der Anfang',
        inhalt: [
          'Christian Riemer (geb. 1914, Karaganda) ist der älteste bekannte Vorfahre der Riemer-Linie. Wolgadeutscher Abstammung, Trudarmee-Überlebender. Er ist der Urgroßvater von Frank.',
        ],
      },
      {
        nummer: '02',
        titel: 'Alexander Riemer — Opa',
        inhalt: [
          'Alexander Riemer, Sohn von Christian, ist Franks Großvater väterlicherseits. Verheiratet mit Paulina Riemer. Deutschsprachig, lebt in Deutschland.',
        ],
      },
      {
        nummer: '03',
        titel: 'Witali Riemer — Papa',
        inhalt: [
          'Witali Riemer, Sohn von Alexander und Paulina. Verheiratet mit Dora Riemer (geb. Gorte). Durch die Ehe mit Dora verbinden sich die Riemer- und Gorte-Linien.',
        ],
      },
      {
        nummer: '04',
        titel: 'Frank Riemer — Heute',
        inhalt: [
          'Frank Riemer lebt in Amsterdam. AI Architect bei Oracle, Musik-Produzent, Creator. Er baut diesen Familie Hub, um die Geschichte der Familie festzuhalten und die Generationen zu verbinden.',
        ],
      },
    ],
    faq: [],
    quellen: [],
    familienverbindung: 'Dies ist unsere direkte Familienlinie: Christian → Alexander → Witali → Frank.',
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
