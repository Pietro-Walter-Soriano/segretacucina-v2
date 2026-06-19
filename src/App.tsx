import { MapPin, Phone } from "lucide-react";
import { Nav, Footer, Pill, Titolo, Reveal, ParallaxCircle, aree, galleryPhotos } from "./components/ui";
import TeepeeReveal from "./components/TeepeeReveal";
import PhotoStrip from "./components/PhotoStrip";

export default function App() {
  return (
    <div id="top" className="bg-bianco text-blu-scuro font-sans">
      <Nav />

      {/* ===== HERO: tenda indiana che si apre ===== */}
      <TeepeeReveal />

      {/* ===== INFO ===== */}
      <section className="relative bg-giallo overflow-hidden py-24">
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
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
          </Reveal>
          <div className="flex justify-center">
            <ParallaxCircle src="/sunset.jpg" alt="Tramonto a SeGreta" rot="3deg" className="w-64 h-64 md:w-80 md:h-80" />
          </div>
        </div>
      </section>

      {/* ===== LE AREE (Menù / Spiaggia / Eventi) ===== */}
      <section className="relative bg-bianco overflow-x-hidden py-24">
        <Reveal>
          <Titolo className="text-6xl md:text-7xl text-center mb-14" parole={[{ t: "Esplora SeGreta", c: "text-corallo" }]} />
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {aree.map((a, i) => (
            <Reveal key={a.id}>
              <div
                id={a.id}
                className={`${a.bg} scroll-mt-24 doodle-border border-4 border-blu-scuro shadow-[6px_8px_0_rgba(74,51,32,0.9)] p-6 md:p-10 flex flex-col ${
                  i % 2 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8`}
              >
                <div className="shrink-0">
                  <ParallaxCircle src={a.img} alt={a.titolo} rot={a.rot} className="w-44 h-44 md:w-60 md:h-60" />
                </div>
                <div className={`text-center ${i % 2 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-display text-5xl md:text-6xl text-blu-scuro">{a.titolo}</h3>
                  <p className="font-hand text-2xl md:text-3xl mt-3 max-w-lg text-blu-scuro">{a.testo}</p>
                  <div className="mt-5">
                    <Pill color="bianco">{a.cta}</Pill>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== MOMENTI (carosello su legno estivo) ===== */}
      <section id="momenti" className="relative wood-summer scroll-mt-24 py-24 border-y-8 border-giallo overflow-hidden">
        <Reveal className="relative z-10 text-center mb-10 px-4">
          <Titolo className="text-6xl md:text-7xl" parole={[{ t: "I nostri momenti", c: "text-blu-scuro" }]} />
          <p className="font-hand text-2xl text-azzurro-dark mt-2">i nostri scatti 📸</p>
        </Reveal>
        <div className="relative z-10">
          <PhotoStrip photos={galleryPhotos} />
        </div>
      </section>

      {/* ===== CONTATTI ===== */}
      <section id="contatti" className="relative bg-azzurro scroll-mt-24 overflow-hidden py-24">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Titolo
              className="text-6xl md:text-8xl"
              parole={[
                { t: "Ti aspettiamo", c: "text-bianco" },
                { t: "a SeGreta!", c: "text-giallo" },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
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
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
