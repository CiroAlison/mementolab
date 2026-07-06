import type { CategorySlug } from "./site";

export type Work = {
  id: string;
  src: string;
  category: CategorySlug;
  /** Titolo dell'opera / soggetto */
  title: string;
  /** Artista o riferimento citato, se presente */
  reference?: string;
  /** Capo su cui è realizzata */
  base: string;
  year: string;
  /** Nota breve su materiali / lavorazione */
  medium: string;
  /** Racconto breve del pezzo */
  story: string;
  instagram: string;
  featured?: boolean;
};

// Opere reali estratte dal profilo @mementolab_ (vedi DECISIONS.md).
export const works: Work[] = [
  // ——— GIUBBOTTI ———
  {
    id: "girasoli-jacket",
    src: "/gallery/jeans-01.jpg",
    category: "giubbotti",
    title: "Vaso con quindici girasoli",
    reference: "Vincent van Gogh",
    base: "Giubbotto in denim",
    year: "2024",
    medium: "Acrilico dipinto a mano sul retro",
    story:
      "Uno dei miei preferiti: i girasoli di Van Gogh portati sulla schiena di un giubbotto di jeans, tra le tele del museo che li ha ispirati.",
    instagram: "https://www.instagram.com/p/C4Xr4HeI5wt/",
    featured: true,
  },
  {
    id: "watch-me",
    src: "/gallery/giubbotti-01.jpg",
    category: "giubbotti",
    title: "Watch me",
    base: "Giubbotto vintage in pelle · taglia S",
    year: "2022",
    medium: "Dipinto a mano",
    story:
      "Un giubbotto vintage in pelle punteggiato di occhi dipinti a mano: ovunque ti giri, qualcuno ti osserva.",
    instagram: "https://www.instagram.com/p/CbQXeAcIjtw/",
    featured: true,
  },
  {
    id: "falso-specchio",
    src: "/gallery/giubbotti-02.jpg",
    category: "giubbotti",
    title: "Il falso specchio",
    reference: "René Magritte",
    base: "Giubbotto in denim",
    year: "2021",
    medium: "Lavoro su commissione",
    story:
      "Realizzato su commissione: l'occhio-cielo di Magritte che ribalta lo sguardo di chi guarda.",
    instagram: "https://www.instagram.com/p/CMfQuNWnB14/",
  },
  {
    id: "klimt-kiss",
    src: "/gallery/giubbotti-07.jpg",
    category: "giubbotti",
    title: "Il bacio",
    reference: "Gustav Klimt",
    base: "Giubbotto Levi's",
    year: "2020",
    medium: "Miniatura dipinta a mano",
    story:
      "E delle volte non è proprio un bacio: se chiudi gli occhi è un viaggio. La foglia d'oro di Klimt in miniatura.",
    instagram: "https://www.instagram.com/p/CCv9S0aqJHv/",
    featured: true,
  },
  {
    id: "dali-blu",
    src: "/gallery/giubbotti-04.jpg",
    category: "giubbotti",
    title: "Dalì blu",
    reference: "Salvador Dalí",
    base: "Giubbotto in denim · taglia M",
    year: "2024",
    medium: "Dipinto a mano · lavaggio chiaro",
    story:
      "Il surrealismo di Dalí in un blu profondo, su un denim dal lavaggio chiaro.",
    instagram: "https://www.instagram.com/p/C6oB55uIg68/",
  },
  {
    id: "urlo-munch",
    src: "/gallery/giubbotti-05.jpg",
    category: "giubbotti",
    title: "L'urlo",
    reference: "Edvard Munch",
    base: "Capo in denim Levi's",
    year: "2020",
    medium: "Dipinto a mano",
    story:
      "«E io tremavo ancora di paura e sentivo che un grande urlo, infinito, pervadeva la Natura.»",
    instagram: "https://www.instagram.com/p/CC38NpOKJ8Z/",
  },
  {
    id: "goku",
    src: "/gallery/giubbotti-06.jpg",
    category: "giubbotti",
    title: "Goku Super Saiyan",
    base: "Giacca in denim · taglia L/XL",
    year: "2024",
    medium: "Pezzo unico · dipinto a mano",
    story:
      "Quando la cultura pop diventa un pezzo unico: Goku in versione Super Saiyan su denim.",
    instagram: "https://www.instagram.com/p/C6eTRYRo_hW/",
  },
  {
    id: "amanti-magritte",
    src: "/gallery/giubbotti-08.jpg",
    category: "giubbotti",
    title: "Gli amanti",
    reference: "René Magritte",
    base: "Capo Levi's",
    year: "2020",
    medium: "Miniatura dipinta a mano",
    story:
      "«Amore è cieco e gli amanti non vedono le dolci follie che commettono.»",
    instagram: "https://www.instagram.com/p/CCyisR-qVMR/",
  },
  {
    id: "paperone-jacket",
    src: "/gallery/giubbotti-03.jpg",
    category: "giubbotti",
    title: "Zio Paperone",
    base: "Giubbotto in denim",
    year: "2025",
    medium: "Dipinto a mano",
    story: "Denim e oro: un omaggio pop al papero più ricco del mondo.",
    instagram: "https://www.instagram.com/p/DGL0eVoInYA/",
  },

  // ——— JEANS ———
  {
    id: "starry-jeans",
    src: "/gallery/jeans-02.jpg",
    category: "jeans",
    title: "Notte stellata",
    reference: "Vincent van Gogh",
    base: "Jeans",
    year: "2021",
    medium: "Dalla miniatura sulla tasca alla versione grande",
    story:
      "Avevo dipinto questa notte stellata in miniatura su una tasca; qui è finalmente diventata grande.",
    instagram: "https://www.instagram.com/p/CXi3lxWo0ee/",
    featured: true,
  },
  {
    id: "starry-tregirasoli",
    src: "/gallery/jeans-04.jpg",
    category: "jeans",
    title: "Notte stellata e Vaso con tre girasoli",
    reference: "Vincent van Gogh",
    base: "Jeans (fornito o personale)",
    year: "2021",
    medium: "Pittura acrilica · su commissione",
    story:
      "Due Van Gogh su un unico jeans. Si può partire da un capo mio o personalizzare il proprio.",
    instagram: "https://www.instagram.com/p/CODL5-HHv5K/",
  },
  {
    id: "kiss-spider",
    src: "/gallery/jeans-05.jpg",
    category: "jeans",
    title: "Kiss",
    base: "Levi's 501",
    year: "2024",
    medium: "Custom · dipinto a mano",
    story: "Un bacio e una ragnatela: cultura pop su un Levi's 501.",
    instagram: "https://www.instagram.com/p/DBHSPWToybs/",
  },
  {
    id: "frida",
    src: "/gallery/jeans-06.jpg",
    category: "jeans",
    title: "Frida Kahlo",
    reference: "Frida Kahlo",
    base: "Levi's",
    year: "2020",
    medium: "Dipinto a mano",
    story:
      "«Io ancora vedo orizzonti dove tu disegni confini.» Un ritratto di Frida su denim.",
    instagram: "https://www.instagram.com/p/CJYkpU9HWgH/",
  },
  {
    id: "starry-unique",
    src: "/gallery/jeans-09.jpg",
    category: "jeans",
    title: "Notte stellata",
    reference: "Vincent van Gogh",
    base: "Jeans vintage",
    year: "2021",
    medium: "Dipinto a mano",
    story:
      "Ho dipinto più di una notte stellata: stessa tecnica, ma ognuna diversa. È questo il bello — ogni pezzo è unico.",
    instagram: "https://www.instagram.com/p/CN-S4mwHcuz/",
  },

  // ——— SCARPE ———
  {
    id: "dsquared-starry",
    src: "/gallery/scarpe-01.jpg",
    category: "scarpe",
    title: "Notte stellata",
    reference: "Vincent van Gogh",
    base: "Dsquared2",
    year: "2022",
    medium: "Dipinto a mano su pelle",
    story:
      "La Notte stellata di Van Gogh che avvolge un paio di Dsquared2.",
    instagram: "https://www.instagram.com/p/Cfq_iqqIMtl/",
    featured: true,
  },
  {
    id: "basquiat",
    src: "/gallery/scarpe-02.jpg",
    category: "scarpe",
    title: "Basquiat",
    reference: "Jean-Michel Basquiat",
    base: "Scarpe custom",
    year: "2022",
    medium: "Dipinto a mano",
    story:
      "Basquiat è tra i miei artisti preferiti: una pittura istintiva e, per me, irriproducibile due volte allo stesso modo.",
    instagram: "https://www.instagram.com/p/CaDF15qLKgU/",
  },
  {
    id: "af1-masters",
    src: "/gallery/scarpe-03.jpg",
    category: "scarpe",
    title: "Van Gogh · Dalí · Monet",
    base: "Nike Air Force 1",
    year: "2024",
    medium: "Mix di dipinti famosi · dipinto a mano",
    story:
      "Tante ore di lavoro per un mix di capolavori su un paio di AF1, nate per una mostra.",
    instagram: "https://www.instagram.com/p/DBPGsBkx3br/",
  },
  {
    id: "af1-denim",
    src: "/gallery/scarpe-04.jpg",
    category: "scarpe",
    title: "AF1 Denim — Decon-Recon",
    base: "Nike Air Force 1",
    year: "2024",
    medium: "Decostruite e ricostruite · cucite a mano",
    story:
      "La tecnica Decon-Recon: decostruire interamente la scarpa e ricostruirla in denim, cucita a mano. Il mio materiale del cuore.",
    instagram: "https://www.instagram.com/p/DBeU1ZDoYuR/",
  },
  {
    id: "af1-denim-2",
    src: "/gallery/scarpe-05.jpg",
    category: "scarpe",
    title: "AF1 Denim — dettaglio",
    base: "Nike Air Force 1",
    year: "2024",
    medium: "Denim · cucite interamente a mano",
    story:
      "Un dettaglio del Decon-Recon in denim: ogni cucitura è fatta a mano, per rendere il pezzo inimitabile.",
    instagram: "https://www.instagram.com/p/DBeDQKIoYnp/",
  },

  // ——— ALTRO ———
  {
    id: "paperone-canvas",
    src: "/gallery/jeans-03.jpg",
    category: "altro",
    title: "Zio Paperone — tela pop",
    base: "Tela",
    year: "2024",
    medium: "Collage e acrilico su tela grande",
    story:
      "I jeans restano la mia base preferita, ma mi diverto anche con le tele. Quasi mi dispiaceva consegnarla.",
    instagram: "https://www.instagram.com/p/C2PuIIyIwik/",
    featured: true,
  },
  {
    id: "trust-luck",
    src: "/gallery/altro-03.jpg",
    category: "altro",
    title: "I trust in luck",
    base: "Mocassini",
    year: "2024",
    medium: "Dipinto a mano · cornetto e ferro di cavallo",
    story:
      "Napoli e scaramanzia: cornetto, ferro di cavallo e la scritta «I trust in luck» su un paio di mocassini.",
    instagram: "https://www.instagram.com/p/DCg3y2IoBwZ/",
  },
  {
    id: "adamo",
    src: "/gallery/giubbotti-09.jpg",
    category: "altro",
    title: "La creazione di Adamo",
    reference: "Michelangelo",
    base: "Camicia",
    year: "2021",
    medium: "Dipinto a mano · su commissione",
    story:
      "Le mani della Creazione di Adamo su una camicia: una sfida affidatami da chi si è fidato del risultato.",
    instagram: "https://www.instagram.com/p/COaWiqzHcpA/",
  },
  {
    id: "paperone-shirt",
    src: "/gallery/jeans-08.jpg",
    category: "altro",
    title: "Zio Paperone",
    base: "Camicia Levi's · taglia L",
    year: "2022",
    medium: "Dipinto a mano · lavaggio chiaro",
    story: "Zio Paperone e le sue monete su una camicia Levi's dal lavaggio chiaro.",
    instagram: "https://www.instagram.com/p/CgKFcwxIjDA/",
  },

  // ——— NUOVI PEZZI (dai contenuti Instagram) ———
  {
    id: "charizard",
    src: "/gallery/x-charizard.jpg",
    category: "scarpe",
    title: "Charizard",
    reference: "Pokémon",
    base: "Adidas Stan Smith",
    year: "2024",
    medium: "Dipinto a mano su pelle",
    story:
      "Le prime scarpe da bambino di Matteo: dipingere Charizard su una superficie così piccola è stata una bella sfida, ma il risultato ci ha resi felici entrambi.",
    instagram: "https://www.instagram.com/p/C9pAY2nIor-/",
    featured: true,
  },
  {
    id: "sangennaro",
    src: "/gallery/x-sangennaro.jpg",
    category: "altro",
    title: "San Gennaro",
    base: "Opera dipinta a mano",
    year: "2024",
    medium: "In collaborazione con Anthea Gargiulo",
    story:
      "San Gennaro e il Vesuvio: un omaggio a Napoli, nato dalla collaborazione con l'artista Anthea Gargiulo.",
    instagram: "https://www.instagram.com/p/DAGxin-ItTI/",
    featured: true,
  },
  {
    id: "af1-hand",
    src: "/gallery/x-af1-hand.jpg",
    category: "scarpe",
    title: "Air Force 1 dipinte a mano",
    base: "Nike Air Force 1",
    year: "2024",
    medium: "Interamente dipinte a mano",
    story: "Un paio di AF1 dipinte interamente a mano, dettaglio dopo dettaglio.",
    instagram: "https://www.instagram.com/p/DBReouLoHzZ/",
  },
  {
    id: "modigliani",
    src: "/gallery/x-modigliani.jpg",
    category: "jeans",
    title: "Ritratto di Lunia Czechowska",
    reference: "Amedeo Modigliani",
    base: "Jeans",
    year: "2020",
    medium: "Riproduzione speculare, dipinta a mano",
    story:
      "Riprodurre lo stesso ritratto in due prospettive speculari: prima ho accettato, poi ho avuto paura. È diventato uno dei lavori a cui tengo di più.",
    instagram: "https://www.instagram.com/p/CIqi0wbHGFP/",
  },
  {
    id: "frida-levis",
    src: "/gallery/x-frida-levis.jpg",
    category: "jeans",
    title: "Frida",
    reference: "Frida Kahlo",
    base: "Levi's",
    year: "2021",
    medium: "Tasca dipinta a mano",
    story:
      "Frida sulla tasca di un Levi's: in una sola immagine, un'esplosione d'arte.",
    instagram: "https://www.instagram.com/p/CJ1TwkunSWn/",
  },
  {
    id: "starry-sogno",
    src: "/gallery/x-starry-sogno.jpg",
    category: "jeans",
    title: "Notte stellata",
    reference: "Vincent van Gogh",
    base: "Jeans",
    year: "2021",
    medium: "Dipinto a mano",
    story:
      "«Non so nulla con certezza, ma la vista delle stelle mi fa sognare.» Un jeans amato, tornato a nuova vita.",
    instagram: "https://www.instagram.com/p/COdegnfHalh/",
  },
  {
    id: "girasoli-shorts",
    src: "/gallery/x-girasoli-giub.jpg",
    category: "jeans",
    title: "Vaso con dodici girasoli",
    reference: "Vincent van Gogh",
    base: "Shorts in denim",
    year: "2020",
    medium: "Dipinto a mano sulla tasca",
    story:
      "«Bisognerebbe fare come i girasoli: girarsi solo per ciò che conta davvero.»",
    instagram: "https://www.instagram.com/p/CDd_qYeqHwf/",
  },
  {
    id: "luffy",
    src: "/gallery/x-popmix.jpg",
    category: "giubbotti",
    title: "Luffy · Gear 5",
    reference: "One Piece",
    base: "Giubbotto in denim",
    year: "2024",
    medium: "Dipinto a mano",
    story:
      "Rufy in versione Gear 5 sulla schiena di un giubbotto di jeans: un genere nuovo, una bella sfida.",
    instagram: "https://www.instagram.com/p/C37zUHDoib5/",
  },
  {
    id: "af1-wave",
    src: "/gallery/x-af1-wave.jpg",
    category: "scarpe",
    title: "Air Force 1 · Onda",
    base: "Nike Air Force 1",
    year: "2024",
    medium: "Dipinto a mano",
    story: "Un'onda che avvolge un paio di Air Force 1, tra blu e schiuma.",
    instagram: "https://www.instagram.com/p/C9ulnE0oDnr/",
  },
];

export const featuredWorks = works.filter((w) => w.featured);

export function worksByCategory(slug: CategorySlug) {
  return works.filter((w) => w.category === slug);
}

// Immagine "in studio" (l'artista al lavoro sulla tela di Zio Paperone).
export const studioImage = "/gallery/jeans-03.jpg";
