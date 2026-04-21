/* Trilingual data: English / Deutsch / Hrvatski
 * Each country keyed by its Natural Earth "name" (as in countries-50m.json).
 * Landmarks and UI strings are also trilingual.
 */

export type Lang = "en" | "de" | "hr"
export type LocalizedString = Record<Lang, string>

export interface CountryWord extends LocalizedString {
  key: string
}

export interface CountryInfo {
  name: LocalizedString
  capital: LocalizedString
  fact: LocalizedString
  word?: CountryWord
}

export interface Place {
  id: string
  coord: [number, number]
  country_key: string
  name: LocalizedString
  blurb: LocalizedString
}

export const LANGS: Lang[] = ["en", "de", "hr"]
export const LANG_LABELS: Record<Lang, string> = { en: "English", de: "Deutsch", hr: "Hrvatski" }

export const I18N: Record<string, LocalizedString> = {
  brand:        { en: "Atlas — Explore the World", de: "Atlas — Entdecke die Welt",        hr: "Atlas — Istraži svijet" },
  plate:        { en: "Plate I",                    de: "Tafel I",                          hr: "Ploča I." },
  country:      { en: "Country",                    de: "Land",                              hr: "Država" },
  landmark:     { en: "Landmark",                   de: "Wahrzeichen",                       hr: "Znamenitost" },
  capital:      { en: "Capital",                    de: "Hauptstadt",                        hr: "Glavni grad" },
  word_of_place:{ en: "Word of the place",          de: "Wort des Ortes",                    hr: "Riječ mjesta" },
  places_to_explore:{ en: "Places to explore",      de: "Orte zum Entdecken",                hr: "Mjesta za istražiti" },
  reset:        { en: "Reset view",                 de: "Ansicht zurücksetzen",              hr: "Vrati pogled" },
  autospin:     { en: "Auto-spin",                  de: "Auto-Drehung",                      hr: "Auto-vrtnja" },
  surprise:     { en: "Surprise me",                de: "Überrasch mich",                    hr: "Iznenadi me" },
  quiz:         { en: "Play: Find the country",     de: "Spiel: Finde das Land",             hr: "Igra: Pronađi državu" },
  quit_quiz:    { en: "End game",                    de: "Spiel beenden",                     hr: "Završi igru" },
  find:         { en: "Find",                        de: "Finde",                             hr: "Pronađi" },
  score:        { en: "Score",                       de: "Punkte",                            hr: "Bodovi" },
  streak:       { en: "Streak",                      de: "Serie",                             hr: "Niz" },
  round:        { en: "Round",                       de: "Runde",                             hr: "Runda" },
  correct:      { en: "Correct!",                    de: "Richtig!",                          hr: "Točno!" },
  wrong:        { en: "Not quite — that was",        de: "Nicht ganz — das war",              hr: "Nije baš — to je bila" },
  next:         { en: "Next",                        de: "Weiter",                            hr: "Dalje" },
  done_title:   { en: "Round complete",              de: "Runde beendet",                     hr: "Runda završena" },
  done_score:   { en: "You scored",                  de: "Du hast",                           hr: "Osvojio si" },
  done_of:      { en: "of",                          de: "von",                               hr: "od" },
  play_again:   { en: "Play again",                  de: "Nochmal spielen",                   hr: "Igraj ponovno" },
  fly_here:     { en: "Fly here",                    de: "Hinfliegen",                        hr: "Leti ovamo" },
  near:         { en: "Nearby",                      de: "In der Nähe",                       hr: "U blizini" },
  listen:       { en: "Listen",                      de: "Hören",                             hr: "Slušaj" },
  show_all:     { en: "Show all languages",          de: "Alle Sprachen zeigen",              hr: "Prikaži sve jezike" },
  hint_line:    {
    en: "drag to spin · scroll to zoom · click a country",
    de: "ziehen zum drehen · scrollen zum zoomen · Land anklicken",
    hr: "povuci za vrtnju · skrolaj za zum · klikni državu",
  },
  charting:     { en: "Charting the world", de: "Die Welt wird gezeichnet", hr: "Crtam svijet" },
};

// Country data: name{lang}, capital{lang}, fact{lang}, word{lang} (one kid-vocab word per country).
// Keyed by the exact Natural Earth name (countries-50m.json → properties.name).
export const COUNTRIES: Record<string, CountryInfo> = {
  "France": {
    name: { en: "France", de: "Frankreich", hr: "Francuska" },
    capital: { en: "Paris", de: "Paris", hr: "Pariz" },
    fact: {
      en: "France is shaped a bit like a hexagon — six sides!",
      de: "Frankreich hat fast die Form eines Sechsecks — sechs Seiten!",
      hr: "Francuska ima oblik šesterokuta — šest stranica!",
    },
    word: { key: "bread", en: "bread", de: "Brot", hr: "kruh" },
  },
  "Germany": {
    name: { en: "Germany", de: "Deutschland", hr: "Njemačka" },
    capital: { en: "Berlin", de: "Berlin", hr: "Berlin" },
    fact: {
      en: "Germany has more than 1,500 different kinds of sausage.",
      de: "In Deutschland gibt es über 1.500 verschiedene Wurstsorten.",
      hr: "U Njemačkoj postoji više od 1.500 vrsta kobasica.",
    },
    word: { key: "forest", en: "forest", de: "Wald", hr: "šuma" },
  },
  "Italy": {
    name: { en: "Italy", de: "Italien", hr: "Italija" },
    capital: { en: "Rome", de: "Rom", hr: "Rim" },
    fact: {
      en: "Italy looks like a boot kicking a rock (Sicily).",
      de: "Italien sieht aus wie ein Stiefel, der einen Stein kickt (Sizilien).",
      hr: "Italija izgleda kao čizma koja udara kamen (Siciliju).",
    },
    word: { key: "pizza", en: "pizza", de: "Pizza", hr: "pizza" },
  },
  "Spain": {
    name: { en: "Spain", de: "Spanien", hr: "Španjolska" },
    capital: { en: "Madrid", de: "Madrid", hr: "Madrid" },
    fact: {
      en: "Lunch in Spain can happen as late as 3 p.m.!",
      de: "In Spanien isst man manchmal erst um 15 Uhr zu Mittag!",
      hr: "U Španjolskoj se ručak može jesti čak u 15 sati!",
    },
    word: { key: "sun", en: "sun", de: "Sonne", hr: "sunce" },
  },
  "Portugal": {
    name: { en: "Portugal", de: "Portugal", hr: "Portugal" },
    capital: { en: "Lisbon", de: "Lissabon", hr: "Lisabon" },
    fact: {
      en: "Most of the world's cork comes from Portugal.",
      de: "Der meiste Kork der Welt kommt aus Portugal.",
      hr: "Većina pluta na svijetu dolazi iz Portugala.",
    },
    word: { key: "ocean", en: "ocean", de: "Ozean", hr: "ocean" },
  },
  "United Kingdom": {
    name: { en: "United Kingdom", de: "Vereinigtes Königreich", hr: "Ujedinjeno Kraljevstvo" },
    capital: { en: "London", de: "London", hr: "London" },
    fact: {
      en: "There are no native snakes in Ireland — legend says St. Patrick shooed them away.",
      de: "In Irland gibt es keine Schlangen — die Sage sagt, St. Patrick habe sie vertrieben.",
      hr: "U Irskoj nema zmija — legenda kaže da ih je sveti Patrik otjerao.",
    },
    word: { key: "tea", en: "tea", de: "Tee", hr: "čaj" },
  },
  "Ireland": {
    name: { en: "Ireland", de: "Irland", hr: "Irska" },
    capital: { en: "Dublin", de: "Dublin", hr: "Dublin" },
    fact: {
      en: "Ireland is called the Emerald Isle because it's so green.",
      de: "Irland heißt auch die Grüne Insel, weil es so grün ist.",
      hr: "Irsku zovu Smaragdnim otokom jer je vrlo zelena.",
    },
    word: { key: "green", en: "green", de: "grün", hr: "zelena" },
  },
  "Iceland": {
    name: { en: "Iceland", de: "Island", hr: "Island" },
    capital: { en: "Reykjavík", de: "Reykjavík", hr: "Reykjavík" },
    fact: {
      en: "Iceland has volcanoes AND glaciers — fire and ice.",
      de: "Island hat Vulkane UND Gletscher — Feuer und Eis.",
      hr: "Island ima vulkane I ledenjake — vatra i led.",
    },
    word: { key: "ice", en: "ice", de: "Eis", hr: "led" },
  },
  "Norway": {
    name: { en: "Norway", de: "Norwegen", hr: "Norveška" },
    capital: { en: "Oslo", de: "Oslo", hr: "Oslo" },
    fact: {
      en: "In summer in Norway the sun never fully sets.",
      de: "In Norwegen geht die Sonne im Sommer nie ganz unter.",
      hr: "U Norveškoj ljeti sunce nikad potpuno ne zalazi.",
    },
    word: { key: "mountain", en: "mountain", de: "Berg", hr: "planina" },
  },
  "Sweden": {
    name: { en: "Sweden", de: "Schweden", hr: "Švedska" },
    capital: { en: "Stockholm", de: "Stockholm", hr: "Stockholm" },
    fact: {
      en: "Sweden has a hotel made entirely of ice, rebuilt every winter.",
      de: "In Schweden gibt es ein Hotel ganz aus Eis, das jeden Winter neu gebaut wird.",
      hr: "Švedska ima hotel u potpunosti od leda koji se svake zime ponovno gradi.",
    },
    word: { key: "snow", en: "snow", de: "Schnee", hr: "snijeg" },
  },
  "Finland": {
    name: { en: "Finland", de: "Finnland", hr: "Finska" },
    capital: { en: "Helsinki", de: "Helsinki", hr: "Helsinki" },
    fact: {
      en: "Finland has 188,000 lakes. That's a lot of lakes.",
      de: "Finnland hat 188.000 Seen. Das sind viele Seen.",
      hr: "Finska ima 188.000 jezera. To je puno jezera.",
    },
    word: { key: "lake", en: "lake", de: "See", hr: "jezero" },
  },
  "Denmark": {
    name: { en: "Denmark", de: "Dänemark", hr: "Danska" },
    capital: { en: "Copenhagen", de: "Kopenhagen", hr: "Kopenhagen" },
    fact: {
      en: "LEGO was invented in Denmark in 1932.",
      de: "LEGO wurde 1932 in Dänemark erfunden.",
      hr: "LEGO je izmišljen u Danskoj 1932. godine.",
    },
    word: { key: "toy", en: "toy", de: "Spielzeug", hr: "igračka" },
  },
  "Netherlands": {
    name: { en: "Netherlands", de: "Niederlande", hr: "Nizozemska" },
    capital: { en: "Amsterdam", de: "Amsterdam", hr: "Amsterdam" },
    fact: {
      en: "A third of the Netherlands is below sea level.",
      de: "Ein Drittel der Niederlande liegt unter dem Meeresspiegel.",
      hr: "Trećina Nizozemske je ispod razine mora.",
    },
    word: { key: "bicycle", en: "bicycle", de: "Fahrrad", hr: "bicikl" },
  },
  "Belgium": {
    name: { en: "Belgium", de: "Belgien", hr: "Belgija" },
    capital: { en: "Brussels", de: "Brüssel", hr: "Bruxelles" },
    fact: {
      en: "Belgium makes over 220,000 tonnes of chocolate a year.",
      de: "Belgien produziert jährlich über 220.000 Tonnen Schokolade.",
      hr: "Belgija proizvodi preko 220.000 tona čokolade godišnje.",
    },
    word: { key: "chocolate", en: "chocolate", de: "Schokolade", hr: "čokolada" },
  },
  "Switzerland": {
    name: { en: "Switzerland", de: "Schweiz", hr: "Švicarska" },
    capital: { en: "Bern", de: "Bern", hr: "Bern" },
    fact: {
      en: "Switzerland has four official languages.",
      de: "Die Schweiz hat vier Amtssprachen.",
      hr: "Švicarska ima četiri službena jezika.",
    },
    word: { key: "cheese", en: "cheese", de: "Käse", hr: "sir" },
  },
  "Austria": {
    name: { en: "Austria", de: "Österreich", hr: "Austrija" },
    capital: { en: "Vienna", de: "Wien", hr: "Beč" },
    fact: {
      en: "The Sound of Music was filmed in Austria's Alps.",
      de: "'The Sound of Music' wurde in den österreichischen Alpen gedreht.",
      hr: "Film 'Moje pjesme, moji snovi' snimljen je u austrijskim Alpama.",
    },
    word: { key: "music", en: "music", de: "Musik", hr: "glazba" },
  },
  "Poland": {
    name: { en: "Poland", de: "Polen", hr: "Poljska" },
    capital: { en: "Warsaw", de: "Warschau", hr: "Varšava" },
    fact: {
      en: "Poland has a forest where trees grow in curvy J-shapes.",
      de: "In Polen gibt es einen Wald mit J-förmig gebogenen Bäumen.",
      hr: "Poljska ima šumu gdje stabla rastu u zakrivljenom J-obliku.",
    },
    word: { key: "river", en: "river", de: "Fluss", hr: "rijeka" },
  },
  "Czechia": {
    name: { en: "Czechia", de: "Tschechien", hr: "Češka" },
    capital: { en: "Prague", de: "Prag", hr: "Prag" },
    fact: {
      en: "Prague's astronomical clock is over 600 years old.",
      de: "Prags astronomische Uhr ist über 600 Jahre alt.",
      hr: "Praški astronomski sat star je preko 600 godina.",
    },
    word: { key: "castle", en: "castle", de: "Schloss", hr: "dvorac" },
  },
  "Croatia": {
    name: { en: "Croatia", de: "Kroatien", hr: "Hrvatska" },
    capital: { en: "Zagreb", de: "Zagreb", hr: "Zagreb" },
    fact: {
      en: "Croatia has 1,244 islands along its sparkling coast.",
      de: "Kroatien hat 1.244 Inseln entlang seiner funkelnden Küste.",
      hr: "Hrvatska ima 1.244 otoka duž svoje svjetlucave obale.",
    },
    word: { key: "sea", en: "sea", de: "Meer", hr: "more" },
  },
  "Serbia": {
    name: { en: "Serbia", de: "Serbien", hr: "Srbija" },
    capital: { en: "Belgrade", de: "Belgrad", hr: "Beograd" },
    fact: {
      en: "The Danube flows right through Serbia's capital.",
      de: "Die Donau fließt mitten durch Serbiens Hauptstadt.",
      hr: "Dunav teče kroz samu serbsku prijestolnicu.",
    },
    word: { key: "river", en: "river", de: "Fluss", hr: "rijeka" },
  },
  "Bosnia and Herz.": {
    name: { en: "Bosnia and Herzegovina", de: "Bosnien und Herzegowina", hr: "Bosna i Hercegovina" },
    capital: { en: "Sarajevo", de: "Sarajevo", hr: "Sarajevo" },
    fact: {
      en: "Sarajevo is where East and West have met for centuries.",
      de: "In Sarajevo treffen sich Ost und West seit Jahrhunderten.",
      hr: "U Sarajevu se stoljećima susreću Istok i Zapad.",
    },
    word: { key: "bridge", en: "bridge", de: "Brücke", hr: "most" },
  },
  "Slovenia": {
    name: { en: "Slovenia", de: "Slowenien", hr: "Slovenija" },
    capital: { en: "Ljubljana", de: "Ljubljana", hr: "Ljubljana" },
    fact: {
      en: "More than half of Slovenia is covered in forest.",
      de: "Mehr als die Hälfte Sloweniens ist von Wald bedeckt.",
      hr: "Više od polovice Slovenije prekriveno je šumom.",
    },
    word: { key: "bee", en: "bee", de: "Biene", hr: "pčela" },
  },
  "Greece": {
    name: { en: "Greece", de: "Griechenland", hr: "Grčka" },
    capital: { en: "Athens", de: "Athen", hr: "Atena" },
    fact: {
      en: "Greece has more than 6,000 islands.",
      de: "Griechenland hat über 6.000 Inseln.",
      hr: "Grčka ima više od 6.000 otoka.",
    },
    word: { key: "olive", en: "olive", de: "Olive", hr: "maslina" },
  },
  "Turkey": {
    name: { en: "Turkey", de: "Türkei", hr: "Turska" },
    capital: { en: "Ankara", de: "Ankara", hr: "Ankara" },
    fact: {
      en: "Turkey sits on TWO continents: Europe and Asia.",
      de: "Die Türkei liegt auf ZWEI Kontinenten: Europa und Asien.",
      hr: "Turska leži na DVA kontinenta: Europi i Aziji.",
    },
    word: { key: "carpet", en: "carpet", de: "Teppich", hr: "tepih" },
  },
  "Russia": {
    name: { en: "Russia", de: "Russland", hr: "Rusija" },
    capital: { en: "Moscow", de: "Moskau", hr: "Moskva" },
    fact: {
      en: "Russia spans 11 time zones — the most of any country.",
      de: "Russland erstreckt sich über 11 Zeitzonen — mehr als jedes andere Land.",
      hr: "Rusija se proteže kroz 11 vremenskih zona — najviše od svih zemalja.",
    },
    word: { key: "bear", en: "bear", de: "Bär", hr: "medvjed" },
  },
  "Ukraine": {
    name: { en: "Ukraine", de: "Ukraine", hr: "Ukrajina" },
    capital: { en: "Kyiv", de: "Kyjiw", hr: "Kijev" },
    fact: {
      en: "Ukraine is the biggest country entirely in Europe.",
      de: "Die Ukraine ist das größte Land, das ganz in Europa liegt.",
      hr: "Ukrajina je najveća zemlja koja se u cijelosti nalazi u Europi.",
    },
    word: { key: "wheat", en: "wheat", de: "Weizen", hr: "pšenica" },
  },
  "Egypt": {
    name: { en: "Egypt", de: "Ägypten", hr: "Egipat" },
    capital: { en: "Cairo", de: "Kairo", hr: "Kairo" },
    fact: {
      en: "The Nile is the longest river on Earth.",
      de: "Der Nil ist der längste Fluss der Erde.",
      hr: "Nil je najdulja rijeka na Zemlji.",
    },
    word: { key: "pyramid", en: "pyramid", de: "Pyramide", hr: "piramida" },
  },
  "Morocco": {
    name: { en: "Morocco", de: "Marokko", hr: "Maroko" },
    capital: { en: "Rabat", de: "Rabat", hr: "Rabat" },
    fact: {
      en: "Morocco has a blue city called Chefchaouen.",
      de: "Marokko hat eine blaue Stadt namens Chefchaouen.",
      hr: "Maroko ima plavi grad koji se zove Chefchaouen.",
    },
    word: { key: "desert", en: "desert", de: "Wüste", hr: "pustinja" },
  },
  "Kenya": {
    name: { en: "Kenya", de: "Kenia", hr: "Kenija" },
    capital: { en: "Nairobi", de: "Nairobi", hr: "Nairobi" },
    fact: {
      en: "Kenya has a national park right next to its capital.",
      de: "Kenia hat einen Nationalpark direkt neben der Hauptstadt.",
      hr: "Kenija ima nacionalni park tik uz svoju prijestolnicu.",
    },
    word: { key: "lion", en: "lion", de: "Löwe", hr: "lav" },
  },
  "South Africa": {
    name: { en: "South Africa", de: "Südafrika", hr: "Južnoafrička Republika" },
    capital: { en: "Pretoria", de: "Pretoria", hr: "Pretoria" },
    fact: {
      en: "South Africa has THREE capital cities.",
      de: "Südafrika hat DREI Hauptstädte.",
      hr: "Južna Afrika ima TRI glavna grada.",
    },
    word: { key: "elephant", en: "elephant", de: "Elefant", hr: "slon" },
  },
  "India": {
    name: { en: "India", de: "Indien", hr: "Indija" },
    capital: { en: "New Delhi", de: "Neu-Delhi", hr: "New Delhi" },
    fact: {
      en: "India has 22 official languages.",
      de: "Indien hat 22 Amtssprachen.",
      hr: "Indija ima 22 službena jezika.",
    },
    word: { key: "tiger", en: "tiger", de: "Tiger", hr: "tigar" },
  },
  "China": {
    name: { en: "China", de: "China", hr: "Kina" },
    capital: { en: "Beijing", de: "Peking", hr: "Peking" },
    fact: {
      en: "The Great Wall of China is over 21,000 km long.",
      de: "Die Chinesische Mauer ist über 21.000 km lang.",
      hr: "Kineski zid dugačak je preko 21.000 km.",
    },
    word: { key: "dragon", en: "dragon", de: "Drache", hr: "zmaj" },
  },
  "Mongolia": {
    name: { en: "Mongolia", de: "Mongolei", hr: "Mongolija" },
    capital: { en: "Ulaanbaatar", de: "Ulan-Bator", hr: "Ulan Bator" },
    fact: {
      en: "Mongolia has more horses than people.",
      de: "In der Mongolei gibt es mehr Pferde als Menschen.",
      hr: "Mongolija ima više konja nego ljudi.",
    },
    word: { key: "horse", en: "horse", de: "Pferd", hr: "konj" },
  },
  "Japan": {
    name: { en: "Japan", de: "Japan", hr: "Japan" },
    capital: { en: "Tokyo", de: "Tokio", hr: "Tokio" },
    fact: {
      en: "Japan is made up of 14,000 islands.",
      de: "Japan besteht aus 14.000 Inseln.",
      hr: "Japan se sastoji od 14.000 otoka.",
    },
    word: { key: "cherry blossom", en: "cherry blossom", de: "Kirschblüte", hr: "trešnjin cvijet" },
  },
  "South Korea": {
    name: { en: "South Korea", de: "Südkorea", hr: "Južna Koreja" },
    capital: { en: "Seoul", de: "Seoul", hr: "Seul" },
    fact: {
      en: "South Korea invented instant ramen noodles.",
      de: "Südkorea hat Instant-Ramen erfunden.",
      hr: "Južna Koreja izmislila je instant ramen rezance.",
    },
    word: { key: "rice", en: "rice", de: "Reis", hr: "riža" },
  },
  "Thailand": {
    name: { en: "Thailand", de: "Thailand", hr: "Tajland" },
    capital: { en: "Bangkok", de: "Bangkok", hr: "Bangkok" },
    fact: {
      en: "Thailand means 'land of the free.'",
      de: "Thailand bedeutet 'Land der Freien'.",
      hr: "Tajland znači 'zemlja slobodnih'.",
    },
    word: { key: "temple", en: "temple", de: "Tempel", hr: "hram" },
  },
  "Vietnam": {
    name: { en: "Vietnam", de: "Vietnam", hr: "Vijetnam" },
    capital: { en: "Hanoi", de: "Hanoi", hr: "Hanoi" },
    fact: {
      en: "Vietnam grows some of the world's best coffee.",
      de: "Vietnam baut einige der besten Kaffees der Welt an.",
      hr: "Vijetnam uzgaja neke od najboljih kava na svijetu.",
    },
    word: { key: "boat", en: "boat", de: "Boot", hr: "brod" },
  },
  "Indonesia": {
    name: { en: "Indonesia", de: "Indonesien", hr: "Indonezija" },
    capital: { en: "Jakarta", de: "Jakarta", hr: "Jakarta" },
    fact: {
      en: "Indonesia has more volcanoes than any other country.",
      de: "Indonesien hat die meisten Vulkane der Welt.",
      hr: "Indonezija ima najviše vulkana od svih zemalja.",
    },
    word: { key: "volcano", en: "volcano", de: "Vulkan", hr: "vulkan" },
  },
  "Australia": {
    name: { en: "Australia", de: "Australien", hr: "Australija" },
    capital: { en: "Canberra", de: "Canberra", hr: "Canberra" },
    fact: {
      en: "Australia has more kangaroos than people.",
      de: "In Australien gibt es mehr Kängurus als Menschen.",
      hr: "Australija ima više klokana nego ljudi.",
    },
    word: { key: "kangaroo", en: "kangaroo", de: "Känguru", hr: "klokan" },
  },
  "New Zealand": {
    name: { en: "New Zealand", de: "Neuseeland", hr: "Novi Zeland" },
    capital: { en: "Wellington", de: "Wellington", hr: "Wellington" },
    fact: {
      en: "New Zealand has no native land snakes at all.",
      de: "In Neuseeland gibt es keine einheimischen Landschlangen.",
      hr: "Novi Zeland nema nijednu autohtonu kopnenu zmiju.",
    },
    word: { key: "sheep", en: "sheep", de: "Schaf", hr: "ovca" },
  },
  "Canada": {
    name: { en: "Canada", de: "Kanada", hr: "Kanada" },
    capital: { en: "Ottawa", de: "Ottawa", hr: "Ottawa" },
    fact: {
      en: "Canada has more lakes than the rest of the world combined.",
      de: "Kanada hat mehr Seen als der Rest der Welt zusammen.",
      hr: "Kanada ima više jezera od ostatka svijeta zajedno.",
    },
    word: { key: "maple", en: "maple", de: "Ahorn", hr: "javor" },
  },
  "United States of America": {
    name: { en: "United States", de: "Vereinigte Staaten", hr: "Sjedinjene Američke Države" },
    capital: { en: "Washington, D.C.", de: "Washington, D.C.", hr: "Washington, D.C." },
    fact: {
      en: "The US has 63 national parks to explore.",
      de: "Die USA haben 63 Nationalparks zum Entdecken.",
      hr: "SAD ima 63 nacionalna parka za istraživanje.",
    },
    word: { key: "eagle", en: "eagle", de: "Adler", hr: "orao" },
  },
  "Mexico": {
    name: { en: "Mexico", de: "Mexiko", hr: "Meksiko" },
    capital: { en: "Mexico City", de: "Mexiko-Stadt", hr: "Ciudad de México" },
    fact: {
      en: "Mexico introduced chocolate to the world.",
      de: "Mexiko brachte der Welt die Schokolade.",
      hr: "Meksiko je svijetu donio čokoladu.",
    },
    word: { key: "cactus", en: "cactus", de: "Kaktus", hr: "kaktus" },
  },
  "Brazil": {
    name: { en: "Brazil", de: "Brasilien", hr: "Brazil" },
    capital: { en: "Brasília", de: "Brasília", hr: "Brasília" },
    fact: {
      en: "The Amazon rainforest is mostly in Brazil.",
      de: "Der Amazonas-Regenwald liegt größtenteils in Brasilien.",
      hr: "Amazonska prašuma većinom se nalazi u Brazilu.",
    },
    word: { key: "jungle", en: "jungle", de: "Dschungel", hr: "džungla" },
  },
  "Argentina": {
    name: { en: "Argentina", de: "Argentinien", hr: "Argentina" },
    capital: { en: "Buenos Aires", de: "Buenos Aires", hr: "Buenos Aires" },
    fact: {
      en: "Argentina has penguins AND tropical jungles.",
      de: "Argentinien hat Pinguine UND tropische Dschungel.",
      hr: "Argentina ima i pingvine i tropske džungle.",
    },
    word: { key: "dance", en: "dance", de: "Tanz", hr: "ples" },
  },
  "Chile": {
    name: { en: "Chile", de: "Chile", hr: "Čile" },
    capital: { en: "Santiago", de: "Santiago", hr: "Santiago" },
    fact: {
      en: "Chile is the longest, skinniest country on Earth.",
      de: "Chile ist das längste und schmalste Land der Erde.",
      hr: "Čile je najdulja i najuža zemlja na svijetu.",
    },
    word: { key: "star", en: "star", de: "Stern", hr: "zvijezda" },
  },
  "Peru": {
    name: { en: "Peru", de: "Peru", hr: "Peru" },
    capital: { en: "Lima", de: "Lima", hr: "Lima" },
    fact: {
      en: "Machu Picchu is hidden high in Peru's mountains.",
      de: "Machu Picchu liegt versteckt hoch in den Bergen Perus.",
      hr: "Machu Picchu skriven je visoko u peruanskim planinama.",
    },
    word: { key: "llama", en: "llama", de: "Lama", hr: "lama" },
  },
  "Greenland": {
    name: { en: "Greenland", de: "Grönland", hr: "Grenland" },
    capital: { en: "Nuuk", de: "Nuuk", hr: "Nuuk" },
    fact: {
      en: "Greenland is the world's largest island.",
      de: "Grönland ist die größte Insel der Welt.",
      hr: "Grenland je najveći otok na svijetu.",
    },
    word: { key: "iceberg", en: "iceberg", de: "Eisberg", hr: "ledenjak" },
  },
  "Antarctica": {
    name: { en: "Antarctica", de: "Antarktis", hr: "Antarktika" },
    capital: { en: "—", de: "—", hr: "—" },
    fact: {
      en: "No one lives in Antarctica permanently — just scientists and penguins.",
      de: "Niemand lebt dauerhaft in der Antarktis — nur Forscher und Pinguine.",
      hr: "Nitko ne živi stalno na Antarktici — samo znanstvenici i pingvini.",
    },
    word: { key: "penguin", en: "penguin", de: "Pinguin", hr: "pingvin" },
  },
  "Jordan": {
    name: { en: "Jordan", de: "Jordanien", hr: "Jordan" },
    capital: { en: "Amman", de: "Amman", hr: "Aman" },
    fact: {
      en: "Jordan's rose-red city of Petra was carved right into the cliffs.",
      de: "Jordaniens rosarote Stadt Petra wurde direkt in die Felsen gehauen.",
      hr: "Jordanski ružičasti grad Petra uklesan je izravno u stijene.",
    },
    word: { key: "stone", en: "stone", de: "Stein", hr: "kamen" },
  },
  "Cambodia": {
    name: { en: "Cambodia", de: "Kambodscha", hr: "Kambodža" },
    capital: { en: "Phnom Penh", de: "Phnom Penh", hr: "Phnom Penh" },
    fact: {
      en: "Cambodia's Angkor Wat is the largest religious monument on Earth.",
      de: "Kambodschas Angkor Wat ist das größte religiöse Bauwerk der Erde.",
      hr: "Kambodžanski Angkor Wat najveći je vjerski spomenik na Zemlji.",
    },
    word: { key: "temple", en: "temple", de: "Tempel", hr: "hram" },
  },
  "Nepal": {
    name: { en: "Nepal", de: "Nepal", hr: "Nepal" },
    capital: { en: "Kathmandu", de: "Kathmandu", hr: "Katmandu" },
    fact: {
      en: "Eight of the world's ten tallest mountains are in Nepal.",
      de: "Acht der zehn höchsten Berge der Welt stehen in Nepal.",
      hr: "Osam od deset najviših planina svijeta nalaze se u Nepalu.",
    },
    word: { key: "summit", en: "summit", de: "Gipfel", hr: "vrh" },
  },
}

// Landmarks (trilingual)
export const EXPLORE_PLACES: Place[] = [
  { id: "eiffel", coord: [2.2945, 48.8584], country_key: "France",
    name: { en: "Eiffel Tower", de: "Eiffelturm", hr: "Eiffelov toranj" },
    blurb: {
      en: "An iron tower in Paris, taller than an 80-story building.",
      de: "Ein Eisenturm in Paris, höher als ein 80-stöckiges Haus.",
      hr: "Željezni toranj u Parizu, viši od zgrade s 80 katova.",
    }
  },
  { id: "pyramid", coord: [31.1342, 29.9792], country_key: "Egypt",
    name: { en: "Great Pyramid", de: "Große Pyramide", hr: "Velika piramida" },
    blurb: {
      en: "Built over 4,500 years ago from more than 2 million stones.",
      de: "Vor über 4.500 Jahren aus mehr als 2 Millionen Steinen erbaut.",
      hr: "Izgrađena prije više od 4.500 godina od preko 2 milijuna kamena.",
    }
  },
  { id: "gwall", coord: [116.5704, 40.4319], country_key: "China",
    name: { en: "Great Wall", de: "Chinesische Mauer", hr: "Kineski zid" },
    blurb: {
      en: "A wall so long it would stretch across the USA and back.",
      de: "Eine Mauer, die quer durch die USA und zurück reichen würde.",
      hr: "Zid tako dug da bi se protegao preko SAD-a i natrag.",
    }
  },
  { id: "machu", coord: [-72.5450, -13.1631], country_key: "Peru",
    name: { en: "Machu Picchu", de: "Machu Picchu", hr: "Machu Picchu" },
    blurb: {
      en: "A hidden stone city high up in the Andes mountains.",
      de: "Eine versteckte Steinstadt hoch in den Anden.",
      hr: "Skriveni kameni grad visoko u Andima.",
    }
  },
  { id: "liberty", coord: [-74.0445, 40.6892], country_key: "United States of America",
    name: { en: "Statue of Liberty", de: "Freiheitsstatue", hr: "Kip slobode" },
    blurb: {
      en: "A giant copper statue that welcomes ships to New York.",
      de: "Eine riesige Kupferstatue, die Schiffe in New York begrüßt.",
      hr: "Divovski bakreni kip koji pozdravlja brodove u New Yorku.",
    }
  },
  { id: "colosseum", coord: [12.4922, 41.8902], country_key: "Italy",
    name: { en: "Colosseum", de: "Kolosseum", hr: "Koloseum" },
    blurb: {
      en: "A 2,000-year-old arena where Romans watched games.",
      de: "Eine 2.000 Jahre alte Arena, in der die Römer Spiele sahen.",
      hr: "Arena stara 2.000 godina gdje su Rimljani gledali igre.",
    }
  },
  { id: "taj", coord: [78.0421, 27.1751], country_key: "India",
    name: { en: "Taj Mahal", de: "Taj Mahal", hr: "Taj Mahal" },
    blurb: {
      en: "A white marble palace built as a love letter.",
      de: "Ein Palast aus weißem Marmor, gebaut als Liebesbrief.",
      hr: "Palača od bijelog mramora izgrađena kao ljubavno pismo.",
    }
  },
  { id: "opera", coord: [151.2153, -33.8568], country_key: "Australia",
    name: { en: "Sydney Opera House", de: "Opernhaus Sydney", hr: "Operna kuća u Sydneyu" },
    blurb: {
      en: "Its roof looks like giant seashells by the harbor.",
      de: "Sein Dach sieht aus wie riesige Muscheln am Hafen.",
      hr: "Krov izgleda poput divovskih školjki pokraj luke.",
    }
  },
  { id: "christ", coord: [-43.2105, -22.9519], country_key: "Brazil",
    name: { en: "Christ the Redeemer", de: "Christus der Erlöser", hr: "Krist Spasitelj" },
    blurb: {
      en: "A 30-meter statue watching over Rio de Janeiro.",
      de: "Eine 30 Meter hohe Statue, die über Rio de Janeiro wacht.",
      hr: "Kip visok 30 metara koji bdije nad Rio de Janeirom.",
    }
  },
  { id: "fuji", coord: [138.7274, 35.3606], country_key: "Japan",
    name: { en: "Mount Fuji", de: "Fuji", hr: "Fuji" },
    blurb: {
      en: "A perfectly-shaped volcano, snow-capped most of the year.",
      de: "Ein perfekt geformter Vulkan, fast das ganze Jahr schneebedeckt.",
      hr: "Savršeno oblikovan vulkan, snježnog vrha veći dio godine.",
    }
  },
  { id: "stone", coord: [-1.8262, 51.1789], country_key: "United Kingdom",
    name: { en: "Stonehenge", de: "Stonehenge", hr: "Stonehenge" },
    blurb: {
      en: "Mysterious giant stones arranged in a circle.",
      de: "Geheimnisvolle Riesensteine, im Kreis angeordnet.",
      hr: "Tajanstveni golemi kamenovi posloženi u krug.",
    }
  },
  { id: "plitvice", coord: [15.5797, 44.8654], country_key: "Croatia",
    name: { en: "Plitvice Lakes", de: "Plitvicer Seen", hr: "Plitvička jezera" },
    blurb: {
      en: "Sixteen turquoise lakes connected by dozens of waterfalls.",
      de: "Sechzehn türkisfarbene Seen, verbunden durch Dutzende Wasserfälle.",
      hr: "Šesnaest tirkiznih jezera povezanih desecima slapova.",
    }
  },
  { id: "dubrovnik", coord: [18.0944, 42.6507], country_key: "Croatia",
    name: { en: "Dubrovnik Walls", de: "Stadtmauern von Dubrovnik", hr: "Dubrovačke zidine" },
    blurb: {
      en: "Massive stone walls hugging an old seaside city.",
      de: "Mächtige Steinmauern umschließen eine alte Küstenstadt.",
      hr: "Moćne kamene zidine grle stari grad uz more.",
    }
  },
  { id: "neuschwanstein", coord: [10.7498, 47.5576], country_key: "Germany",
    name: { en: "Neuschwanstein Castle", de: "Schloss Neuschwanstein", hr: "Dvorac Neuschwanstein" },
    blurb: {
      en: "A fairy-tale castle tucked into the Bavarian Alps.",
      de: "Ein Märchenschloss in den bayerischen Alpen.",
      hr: "Bajkoviti dvorac smješten u bavarskim Alpama.",
    }
  },
  { id: "petra", coord: [35.4444, 30.3285], country_key: "Jordan",
    name: { en: "Petra", de: "Petra", hr: "Petra" },
    blurb: {
      en: "A city carved straight into pink desert cliffs.",
      de: "Eine Stadt, direkt in rosafarbene Felsen gehauen.",
      hr: "Grad uklesan u ružičaste pustinjske stijene.",
    }
  },
  { id: "moai", coord: [-109.3497, -27.1127], country_key: "Chile",
    name: { en: "Moai Statues", de: "Moai-Statuen", hr: "Moai kipovi" },
    blurb: {
      en: "Giant stone heads on Easter Island, carved centuries ago.",
      de: "Riesige Steinköpfe auf der Osterinsel, vor Jahrhunderten gehauen.",
      hr: "Golemi kameni glave na Uskršnjem otoku, isklesani prije stoljeća.",
    }
  },
  { id: "angkor", coord: [103.8670, 13.4125], country_key: "Cambodia",
    name: { en: "Angkor Wat", de: "Angkor Wat", hr: "Angkor Wat" },
    blurb: {
      en: "The biggest temple on Earth, hidden in the jungle.",
      de: "Der größte Tempel der Welt, im Dschungel verborgen.",
      hr: "Najveći hram na Zemlji, skriven u džungli.",
    }
  },
  { id: "aurora", coord: [-19.0208, 64.9631], country_key: "Iceland",
    name: { en: "Northern Lights", de: "Polarlichter", hr: "Polarna svjetlost" },
    blurb: {
      en: "Green and pink ribbons dancing in the night sky.",
      de: "Grüne und rosa Bänder tanzen am Nachthimmel.",
      hr: "Zelene i ružičaste vrpce plešu noćnim nebom.",
    }
  },
  { id: "reef", coord: [145.7781, -16.2864], country_key: "Australia",
    name: { en: "Great Barrier Reef", de: "Great Barrier Reef", hr: "Veliki koraljni greben" },
    blurb: {
      en: "So huge you can see it from space. Made of coral.",
      de: "So riesig, dass man es vom Weltraum aus sieht. Aus Korallen.",
      hr: "Tako velik da se vidi iz svemira. Od koralja.",
    }
  },
  { id: "everest", coord: [86.9250, 27.9881], country_key: "Nepal",
    name: { en: "Mount Everest", de: "Mount Everest", hr: "Mount Everest" },
    blurb: {
      en: "The tallest mountain on Earth — 8,848 meters up.",
      de: "Der höchste Berg der Welt — 8.848 Meter hoch.",
      hr: "Najviša planina na Zemlji — 8.848 metara.",
    }
  },
  { id: "grand", coord: [-112.1401, 36.0544], country_key: "United States of America",
    name: { en: "Grand Canyon", de: "Grand Canyon", hr: "Grand Canyon" },
    blurb: {
      en: "A canyon a mile deep, carved by a river over millions of years.",
      de: "Eine eine Meile tiefe Schlucht, von einem Fluss geformt.",
      hr: "Kanjon dubok kilometar, koji je rijeka rezala milijunima godina.",
    }
  },
];

// Cities — kept simple, trilingual for capital-style labels handled via COUNTRIES.capital
export const MAJOR_CITIES: { coord: [number, number] }[] = [
  { coord: [-0.1276, 51.5074] }, { coord: [2.3522, 48.8566] }, { coord: [13.4050, 52.5200] },
  { coord: [12.4964, 41.9028] }, { coord: [-3.7038, 40.4168] }, { coord: [37.6173, 55.7558] },
  { coord: [28.9784, 41.0082] }, { coord: [31.2357, 30.0444] }, { coord: [3.3792, 6.5244] },
  { coord: [36.8219, -1.2921] }, { coord: [18.4241, -33.9249] }, { coord: [55.2708, 25.2048] },
  { coord: [72.8777, 19.0760] }, { coord: [77.1025, 28.7041] }, { coord: [100.5018, 13.7563] },
  { coord: [103.8198, 1.3521] }, { coord: [106.8456, -6.2088] }, { coord: [116.4074, 39.9042] },
  { coord: [121.4737, 31.2304] }, { coord: [139.6503, 35.6762] }, { coord: [126.9780, 37.5665] },
  { coord: [151.2093, -33.8688] }, { coord: [174.7633, -36.8485] }, { coord: [-118.2437, 34.0522] },
  { coord: [-99.1332, 19.4326] }, { coord: [-74.0060, 40.7128] }, { coord: [-79.3832, 43.6532] },
  { coord: [-77.0428, -12.0464] }, { coord: [-43.1729, -22.9068] }, { coord: [-58.3816, -34.6037] },
  { coord: [-21.9426, 64.1466] }, { coord: [15.9819, 45.8150] }, // Zagreb!
];
