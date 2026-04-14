import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Database,
  ExternalLink,
  Globe,
  GraduationCap,
  Heart,
  MessageCircle,
  Search,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Familiengeschichte erforschen — Mit KI und kostenlosen Werkzeugen | FrankX.AI',
  description: 'Schritt-für-Schritt Anleitung: Wie du deine Familiengeschichte mit KI-Agenten und kostenlosen Archiven erforschen kannst. Getestet am Beispiel der Wolgadeutschen.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Deine Familiengeschichte erforschen — Kostenlose Anleitung',
    description: 'Wie du mit KI-Agenten, FamilySearch und Genealogie-Archiven deine Vorfahren über Jahrhunderte zurückverfolgen kannst.',
    type: 'article',
    locale: 'de_DE',
  },
}

const schritte = [
  {
    nummer: '01',
    titel: 'Starte mit dem, was du weißt',
    icon: Heart,
    farbe: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    inhalt: [
      'Befrage deine Großeltern und Eltern — sie sind die wichtigste Quelle. Frage nach Namen, Orten, Daten, Geschichten. Nimm Gespräche auf (Handy reicht). Jedes Detail zählt, auch wenn es unvollständig ist.',
      'Sammle alles Physische: alte Fotos, Briefe, Urkunden, Pässe, Kirchenbücher. Fotografiere alles ab und speichere es digital.',
    ],
    tipps: [
      'Frage: "Wo seid ihr aufgewachsen?"',
      'Frage: "Wie hießen eure Eltern und Großeltern?"',
      'Frage: "Wann und warum seid ihr umgezogen?"',
      'Frage: "Welche Geschichten hat man euch erzählt?"',
    ],
  },
  {
    nummer: '02',
    titel: 'Organisiere in einem System',
    icon: Database,
    farbe: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    inhalt: [
      'Erstelle für jede Person eine eigene Seite oder Datei. Notiere: Name, Geburtsname, Geburtsort, Geburtsdatum, Wohnort, Beziehungen. Markiere was sicher ist und was Vermutung.',
      'Wir empfehlen Notion — kostenlos, flexibel, von überall erreichbar. Du kannst unsere Vorlage als Startpunkt verwenden.',
    ],
    werkzeuge: [
      { name: 'Notion', url: 'https://notion.so', beschreibung: 'Kostenlose Datenbank für Familienstammbaum' },
    ],
  },
  {
    nummer: '03',
    titel: 'Durchsuche kostenlose Archive',
    icon: Search,
    farbe: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    inhalt: [
      'Es gibt erstaunlich viele kostenlose Quellen. FamilySearch.org hat über 1.350 Mikrofilme allein für russlanddeutsche Quellen. Das Volga German Institute dokumentiert jede der 104 Wolgadeutschen Kolonien mit Familiennamen.',
      'Beginne mit dem Nachnamen und dem Ort, den du kennst. Arbeite dich von dort zurück — Generation für Generation.',
    ],
    werkzeuge: [
      { name: 'FamilySearch.org', url: 'https://www.familysearch.org', beschreibung: 'Größte kostenlose Genealogie-Datenbank der Welt' },
      { name: 'Volga German Institute', url: 'https://volgagermaninstitute.org', beschreibung: 'Koloniegeschichten, Familiennamen-Register' },
      { name: 'wolgadeutsche.net', url: 'https://www.wolgadeutsche.net', beschreibung: 'Deutsches Forum und Kolonie-Archiv' },
      { name: 'deutsche-kolonisten.de', url: 'https://deutsche-kolonisten.de', beschreibung: 'Online-Stammbäume nach Siedlungsgebiet' },
      { name: 'AHSGR', url: 'https://ahsgr.org/research/', beschreibung: '62 freigegebene Deportations-Transportakten' },
      { name: 'Museum Detmold', url: 'https://www.russlanddeutsche.de', beschreibung: '7.000 Bände, Familienforschungs-Arbeitsgruppe' },
    ],
  },
  {
    nummer: '04',
    titel: 'Nutze KI als Forschungsassistenten',
    icon: Brain,
    farbe: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    inhalt: [
      'KI-Assistenten können in Minuten Quellen durchsuchen, die du manuell Tage bräuchtest. Sie finden Zusammenhänge, übersetzen alte Texte, und strukturieren deine Erkenntnisse.',
      'Wichtig: KI ist ein Werkzeug, kein Orakel. Überprüfe immer die Quellen. Markiere alles mit einem Forschungsstatus — was ist verifiziert, was Überlieferung, was Hypothese?',
    ],
    promptBeispiele: [
      'Finde Informationen über die Wolgadeutsche Kolonie Reinwald. Wann wurde sie gegründet? Welche Familiennamen sind dokumentiert?',
      'Suche nach dem Familiennamen Reimer/Riemer in russlanddeutschen Genealogie-Datenbanken. Welche Kolonien hatten Reimer-Familien?',
      'Was geschah mit den Bewohnern der Wolga-Kolonien nach dem Deportationserlass vom 28. August 1941?',
    ],
  },
  {
    nummer: '05',
    titel: 'Dokumentiere und teile',
    icon: BookOpen,
    farbe: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    inhalt: [
      'Jede Erkenntnis bekommt einen Forschungsstatus: 🟢 Verifiziert (durch Archiv bestätigt), 🟡 Familienüberlieferung (von Verwandten berichtet), 🔍 Hypothese (plausibel, nicht bestätigt), 🔴 Unbekannt (noch zu erforschen).',
      'Teile deine Ergebnisse mit der Familie und in Genealogie-Foren. Oft kennt jemand anders ein fehlendes Puzzlestück.',
    ],
    werkzeuge: [
      { name: 'wolgadeutsche.net Forum', url: 'https://forum.wolgadeutsche.net', beschreibung: 'Starte einen Thread zu deinem Familiennamen' },
      { name: 'WikiTree', url: 'https://www.wikitree.com', beschreibung: 'Kollaborativer Stammbaum, kostenlos' },
    ],
  },
]

const archive = [
  { name: 'Staatsarchiv Saratow', ort: 'Russland', inhalt: 'Alle Kirchenbücher der Wolga-Kolonien', url: null },
  { name: 'Staatsarchiv Karaganda (GAKO)', ort: 'Kasachstan', inhalt: 'Deportationsakten, Siedlerakten, Fotos', url: 'https://de-archiv.kz', email: 'de.archiv.kz2022@gmail.com' },
  { name: 'FamilySearch Library', ort: 'Salt Lake City, USA', inhalt: '1.350+ Mikrofilme russlanddeutscher Quellen', url: 'https://www.familysearch.org' },
  { name: 'Museum Detmold', ort: 'Deutschland', inhalt: '7.000 Bände, Familienforschungs-AG', url: 'https://www.russlanddeutsche.de', email: 'museum@russlanddeutsche.de' },
  { name: 'LMDR Bibliothek', ort: 'Stuttgart', inhalt: 'Forschungsbibliothek', url: 'https://lmdr.de' },
  { name: 'GRHC (NDSU)', ort: 'North Dakota, USA', inhalt: 'Germans from Russia Heritage Collection', url: 'https://library.ndsu.edu/grhc' },
]

export default function ForscheSelbstPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-12 pt-28 sm:pt-32">
          <Link
            href="/familie/geschichte"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Geschichte
          </Link>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400/80">
            <GraduationCap className="h-3.5 w-3.5" />
            Kostenlose Anleitung
          </div>

          <h1 className="mb-6 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-emerald-200 via-emerald-100 to-white bg-clip-text text-transparent">
              Deine Familiengeschichte erforschen
            </span>
          </h1>

          <p className="max-w-2xl font-serif text-lg leading-relaxed text-white/50">
            Mit KI-Assistenten und kostenlosen Archiven kannst du deine Vorfahren
            über Jahrhunderte zurückverfolgen. Diese Anleitung zeigt dir wie —
            Schritt für Schritt, ohne Kosten, ohne Vorkenntnisse.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/30">
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> 6+ kostenlose Archive
            </span>
            <span className="flex items-center gap-1.5">
              <Brain className="h-4 w-4" /> KI-Prompt-Vorlagen
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" /> Getestet an unserer Familie
            </span>
          </div>
        </div>
      </section>

      {/* Schritte */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-16">
          {schritte.map((schritt) => (
            <div key={schritt.nummer}>
              {/* Section header */}
              <div className="mb-6 flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${schritt.farbe}`}>
                  <schritt.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-medium text-white/20">Schritt {schritt.nummer}</span>
                  <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                    {schritt.titel}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 pl-[52px]">
                {schritt.inhalt.map((text, i) => (
                  <p key={i} className="font-serif text-base leading-[1.8] text-white/60">
                    {text}
                  </p>
                ))}

                {/* Interview tips */}
                {schritt.tipps && (
                  <div className="mt-4 rounded-xl border border-rose-500/10 bg-rose-500/5 p-4">
                    <p className="mb-2 text-xs font-medium text-rose-400">Fragenkatalog für Großeltern</p>
                    <ul className="space-y-1">
                      {schritt.tipps.map((tipp) => (
                        <li key={tipp} className="flex items-start gap-2 text-sm text-white/50">
                          <MessageCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-rose-400/40" />
                          {tipp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Werkzeuge */}
                {schritt.werkzeuge && (
                  <div className="mt-4 space-y-2">
                    {schritt.werkzeuge.map((w) => (
                      <a
                        key={w.name}
                        href={w.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:bg-white/[0.04] hover:border-white/[0.12]"
                      >
                        <ExternalLink className="h-4 w-4 flex-shrink-0 text-white/20 group-hover:text-white/40" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-white/70 group-hover:text-white">{w.name}</span>
                          <span className="ml-2 text-xs text-white/30">{w.beschreibung}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}

                {/* Prompt examples */}
                {schritt.promptBeispiele && (
                  <div className="mt-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                    <p className="mb-3 text-xs font-medium text-emerald-400">KI-Prompt-Vorlagen zum Kopieren</p>
                    <div className="space-y-2">
                      {schritt.promptBeispiele.map((prompt, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-white/[0.03] p-3 font-mono text-xs leading-relaxed text-white/50"
                        >
                          &ldquo;{prompt}&rdquo;
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Archive */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="mb-2 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Archive & Sammlungen
          </h2>
          <p className="mb-8 font-serif text-2xl font-semibold text-white">
            Wo du suchen kannst
          </p>

          <div className="space-y-3">
            {archive.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-white/80">{a.name}</h3>
                    <p className="mt-0.5 text-xs text-white/30">{a.ort}</p>
                    <p className="mt-1 text-xs text-white/40">{a.inhalt}</p>
                    {a.email && (
                      <p className="mt-1 text-xs text-emerald-400/60">{a.email}</p>
                    )}
                  </div>
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-white/20 hover:text-white/40"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How this was tested */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent p-6 sm:p-8">
            <h2 className="mb-3 font-serif text-xl font-semibold text-white">
              Getestet an unserer eigenen Familie
            </h2>
            <p className="mb-4 font-serif text-sm leading-relaxed text-white/50">
              Diese Methode hat uns geholfen, die Riemer-Linie bis 1729 zurückzuverfolgen
              — von Amsterdam über Karaganda bis zur Wolgadeutschen Kolonie Reinwald.
              Der Gründungssiedler Johann Konrad Reimer wurde in Freudental
              (Baden-Württemberg) getauft und kam 1766 an die Wolga. Gefunden durch
              ein KI-Agenten-Team, das dieselben frei verfügbaren Quellen durchsuchte,
              die auch dir zur Verfügung stehen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/familie/geschichte/wolgadeutsche"
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-serif text-sm text-emerald-300 transition-all hover:bg-emerald-500/20"
              >
                Unsere Geschichte lesen
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/familie/geschichte"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-serif text-sm text-white/50 transition-all hover:bg-white/10"
              >
                Alle Forschungsthemen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center">
          <p className="font-serif text-xs text-white/20">
            Alle genannten Werkzeuge sind kostenlos. Diese Anleitung enthält keine bezahlten Links.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              href="/familie"
              className="font-serif text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Familie Hub
            </Link>
            <span className="text-white/10">&middot;</span>
            <Link
              href="/familie/mitmachen"
              className="font-serif text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Mitmachen
            </Link>
            <span className="text-white/10">&middot;</span>
            <Link
              href="/familie/geschichte"
              className="font-serif text-xs text-white/20 transition-colors hover:text-white/40"
            >
              Geschichte
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
