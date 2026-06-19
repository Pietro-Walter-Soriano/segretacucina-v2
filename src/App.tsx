import { motion } from "motion/react";
import { MapPin, Phone, Menu as MenuIcon } from "lucide-react";
import Stack from "./components/Stack";
import { Sun, Umbrella, Cloud, Fish, Star, Squiggle, Wave } from "./components/Doodles";

/* Foto segnaposto — sostituire con foto reali del lido */
const PH = (id: string, w = 600) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const galleryPhotos = [
  { src: PH("1519046904884-53103b34b206"), alt: "Spiaggia" },
  { src: PH("1534351590666-13e3e96b5017"), alt: "Cocktail" },
  { src: PH("1507525428034-b723cf961d3e"), alt: "Tramonto" },
  { src: PH("1559339352-11d035aa65de"), alt: "Food" },
  { src: PH("1563245372-f21724e3856d"), alt: "Relax" },
];

const aree = [
  {
    titolo: "Food & Drink",
    testo: "Sapore di mare, street food e cocktail fatti come a casa. Niente di finto, solo cose buone.",
    img: PH("1559339352-11d035aa65de"),
    cta: "Il menu",
    bg: "bg-giallo",
    rot: "-3deg",
  },
  {
    titolo: "Spiaggia & Lido",
    testo: "Ombra, lettini e il rumore del mare. Un posto semplice dove staccare davvero la spina.",
    img: PH("1519046904884-53103b34b206"),
    cta: "Prenota un lettino",
    bg: "bg-azzurro",
    rot: "2.5deg",
  },
  {
    titolo: "Tramonti & Eventi",
    testo: "Quando cala il sole arriva la musica. Aperitivi sul prato e serate sotto le stelle.",
    img: PH("1507525428034-b723cf961d3e"),
    cta: "Gli eventi",
    bg: "bg-giallo",
    rot: "-2deg",
  },
];

function Pill({
  children,
  color = "giallo",
  href = "#",
}: {
  children: React.ReactNode;
  color?: "giallo" | "azzurro" | "corallo" | "bianco";
  href?: string;
}) {
  const styles: Record<string, string> = {
    giallo: "bg-giallo text-blu-scuro",
    azzurro: "bg-azzurro text-bianco",
    corallo: "bg-corallo text-bianco",
    bianco: "bg-bianco text-blu-scuro",
  };
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.08, rotate: -2 }}
      whileTap={{ scale: 0.94, rotate: 2 }}
      className={`inline-block font-hand text-2xl px-7 py-2.5 rounded-full border-4 border-blu-scuro shadow-[3px_4px_0_rgba(74,51,32,0.9)] ${styles[color]}`}
    >
      {children}
    </motion.a>
  );
}

/* Titolo "marker" multicolore (una parola/riga per colore) */
function Titolo({ parole, className = "" }: { parole: { t: string; c: string }[]; className?: string }) {
  return (
    <h2 className={`font-display leading-[0.95] ${className}`}>
      {parole.map((p, i) => (
        <span key={i} className={`${p.c} block`} style={{ rotate: i % 2 ? "-1.5deg" : "1deg" }}>
          {p.t}
        </span>
      ))}
    </h2>
  );
}

export default function App() {
  return (
    <div className="bg-bianco text-blu-scuro overflow-x-hidden font-sans">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 bg-bianco/95 border-b-4 border-blu-scuro">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SeGreta" className="h-12 w-auto" />
            <span className="font-display text-3xl text-azzurro-dark">SeGreta</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Pill color="bianco" href="#aree">Le aree</Pill>
            <Pill color="azzurro" href="#momenti">Momenti</Pill>
            <Pill color="giallo" href="#contatti">Prenota</Pill>
          </div>
          <button className="md:hidden bg-giallo border-4 border-blu-scuro rounded-full p-2" aria-label="Menu">
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="relative w-full">
        <div className="relative">
          <img src="/sfondo-segreta.jpg" alt="SeGreta disegno" className="w-full h-[78vh] object-cover" />
          <Sun className="absolute top-6 left-6 w-16 h-16 text-bianco float-anim drop-shadow" />
          <Cloud className="absolute top-10 right-10 w-24 h-16 text-bianco/90 float-anim" />
          <Umbrella className="absolute bottom-32 left-10 w-16 h-16 text-corallo float-anim hidden md:block" />

          {/* L'illustrazione contiene già il titolo "2 giugno SeGreta riapre":
              niente titolo sovrapposto, solo sottotitolo + CTA in basso. */}
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-10 md:pb-14">
            <p className="font-hand text-2xl md:text-3xl bg-bianco/90 px-5 py-1.5 rounded-2xl border-2 border-blu-scuro shadow-[2px_3px_0_rgba(74,51,32,0.7)]">
              Il lido di campagna, sul mare 🌅
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-5">
              <Pill color="giallo" href="#aree">Scopri il lido</Pill>
              <Pill color="corallo" href="#contatti">Prenota un lettino</Pill>
            </div>
          </div>
        </div>
        <svg className="block w-full h-12 md:h-20 -mt-1 fill-giallo" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,112.5,108.5,116,162.77,109.83,217.18,103.53,263.34,67.23,321.39,56.44Z" />
        </svg>
      </header>

      {/* ===== INTRO (sunburst) ===== */}
      <section className="relative bg-giallo sunburst overflow-hidden py-20">
        <Star className="absolute top-8 right-12 w-14 h-14 text-corallo float-anim" />
        <Fish className="absolute bottom-10 left-8 w-24 h-14 text-azzurro-dark float-anim hidden md:block" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Titolo
              className="text-6xl md:text-7xl"
              parole={[
                { t: "Lontano", c: "text-azzurro-dark" },
                { t: "dal mondo", c: "text-corallo" },
                { t: "commerciale", c: "text-blu-scuro" },
              ]}
            />
            <p className="font-hand text-2xl md:text-3xl mt-6 max-w-md">
              Tavoli di legno della nonna, prato verde, i piedi nella sabbia. A SeGreta si rallenta:
              niente luci finte, solo natura, mare e gente che ride.
            </p>
            <div className="mt-7">
              <Pill color="azzurro" href="#momenti">Guarda i momenti</Pill>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-bianco shadow-[6px_8px_0_rgba(74,51,32,0.9)] rotate-3">
              <img src="/sunset.jpg" alt="Tramonto a SeGreta" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
            <Squiggle className="absolute -bottom-4 -left-2 w-32 h-8 text-azzurro-dark" />
          </div>
        </div>
      </section>

      {/* ===== MOMENTI (Stack su legno) ===== */}
      <section id="momenti" className="relative wood-texture py-20 border-y-8 border-giallo">
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative z-10 text-center mb-10 px-4">
          <Titolo className="text-6xl md:text-7xl" parole={[{ t: "I nostri momenti", c: "text-bianco" }]} />
          <p className="font-hand text-2xl text-giallo mt-2">trascina le foto 📸</p>
        </div>
        <div className="relative z-10 flex justify-center pb-4">
          <div className="w-[320px] h-[250px] md:w-[440px] md:h-[330px]">
            <Stack
              randomRotation
              sensitivity={150}
              sendToBackOnClick
              cards={galleryPhotos.map((p) => (
                <img key={p.alt} src={p.src} alt={p.alt} className="card-image" />
              ))}
            />
          </div>
        </div>
      </section>

      {/* ===== LE AREE ===== */}
      <section id="aree" className="relative bg-bianco dots text-azzurro/10 py-20">
        <div className="relative max-w-6xl mx-auto px-6">
          <Titolo className="text-6xl md:text-7xl text-center mb-14" parole={[{ t: "Esplora SeGreta", c: "text-corallo" }]} />
          <div className="space-y-12">
            {aree.map((a, i) => (
              <motion.div
                key={a.titolo}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 90, damping: 14 }}
                className={`${a.bg} doodle-border border-4 border-blu-scuro shadow-[6px_8px_0_rgba(74,51,32,0.9)] p-6 md:p-10 flex flex-col ${
                  i % 2 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8`}
              >
                <div className="shrink-0">
                  <div
                    className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-8 border-bianco shadow-lg"
                    style={{ rotate: a.rot }}
                  >
                    <img src={a.img} alt={a.titolo} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className={`text-center ${i % 2 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-display text-5xl md:text-6xl text-blu-scuro">{a.titolo}</h3>
                  <p className="font-hand text-2xl md:text-3xl mt-3 max-w-lg text-blu-scuro">{a.testo}</p>
                  <div className="mt-5">
                    <Pill color="bianco">{a.cta}</Pill>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTATTI / CTA ===== */}
      <section id="contatti" className="relative bg-azzurro sunburst overflow-hidden py-20">
        <Sun className="absolute top-8 left-10 w-16 h-16 text-giallo float-anim" />
        <Wave className="absolute bottom-10 right-8 w-40 h-12 text-bianco float-anim" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Titolo
            className="text-6xl md:text-8xl"
            parole={[
              { t: "Ti aspettiamo", c: "text-bianco" },
              { t: "a SeGreta!", c: "text-giallo" },
            ]}
          />
          <div className="flex flex-col md:flex-row gap-5 justify-center mt-10">
            <div className="bg-bianco border-4 border-blu-scuro rounded-3xl px-6 py-4 flex items-center gap-3 shadow-[4px_5px_0_rgba(74,51,32,0.9)]">
              <MapPin className="text-corallo shrink-0" />
              <span className="font-hand text-xl text-left">Panoramica U. Paternostro 16, Bisceglie (BT)</span>
            </div>
            <div className="bg-bianco border-4 border-blu-scuro rounded-3xl px-6 py-4 flex items-center gap-3 shadow-[4px_5px_0_rgba(74,51,32,0.9)]">
              <Phone className="text-azzurro-dark shrink-0" />
              <span className="font-hand text-xl">+39 083 456 7890</span>
            </div>
          </div>
          <div className="mt-9">
            <Pill color="corallo">Prenota ora</Pill>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="wood-texture text-bianco py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <img src="/logo.png" alt="SeGreta" className="h-10 w-auto" />
          <span className="font-display text-2xl">SeGreta</span>
        </div>
        <p className="font-hand text-lg text-sabbia">
          SeGreta Cucina &amp; Lido — l'anima di campagna della tua estate al mare 🌾🌊
        </p>
      </footer>
    </div>
  );
}
