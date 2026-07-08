import { useEffect } from "react";
import { Nav, Footer, Pill, Titolo, Reveal, ParallaxCircle, aree, galleryPhotos } from "../components/ui";
import PhotoStrip from "../components/PhotoStrip";

export default function Info() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-bianco text-blu-scuro overflow-x-hidden font-sans">
      <Nav />

      <section className="relative bg-giallo overflow-hidden py-20">
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
          </Reveal>
          <div className="flex justify-center">
            <ParallaxCircle src="/sunset.jpg" alt="Tramonto a SeGreta" rot="3deg" className="w-64 h-64 md:w-80 md:h-80" />
          </div>
        </div>
      </section>

      <section className="relative bg-bianco py-20">
        <Reveal>
          <Titolo className="text-5xl md:text-7xl text-center mb-12" parole={[{ t: "Cosa trovi", c: "text-corallo" }]} />
        </Reveal>
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {aree.map((a, i) => (
            <Reveal key={a.id}>
              <div className={`${a.bg} doodle-border border-4 border-blu-scuro shadow-[6px_8px_0_rgba(74,51,32,0.9)] p-6 md:p-10 flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}>
                <div className="shrink-0">
                  <ParallaxCircle src={a.img} alt={a.titolo} rot={a.rot} className="w-44 h-44 md:w-60 md:h-60" />
                </div>
                <div className={`text-center ${i % 2 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-display text-5xl md:text-6xl text-blu-scuro">{a.titolo}</h3>
                  <p className="font-hand text-2xl md:text-3xl mt-3 max-w-lg text-blu-scuro">{a.testo}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative wood-summer py-20 border-y-8 border-giallo overflow-hidden">
        <Reveal className="relative z-10 text-center mb-10 px-4">
          <Titolo className="text-5xl md:text-7xl" parole={[{ t: "I nostri momenti", c: "text-blu-scuro" }]} />
        </Reveal>
        <div className="relative z-10"><PhotoStrip photos={galleryPhotos} /></div>
      </section>

      <div className="bg-azzurro py-12 text-center">
        <Pill color="giallo" to="/prenota">Prenota ora</Pill>
      </div>
      <Footer />
    </div>
  );
}
