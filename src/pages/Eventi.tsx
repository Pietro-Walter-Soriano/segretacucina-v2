import { useEffect } from "react";
import { Nav, Footer, Pill, Titolo, Reveal, ParallaxCircle, PH } from "../components/ui";

const eventi = [
  { titolo: "Tramonti & DJ set", testo: "Quando il sole cala, parte la musica: aperitivi sul prato e dj sotto le stelle.", img: PH("1507525428034-b723cf961d3e"), rot: "-3deg", bg: "bg-giallo" },
  { titolo: "Serate in famiglia", testo: "Giochi, fuochi, storie attorno alle tende. Per grandi e piccoli.", img: PH("1519046904884-53103b34b206"), rot: "2.5deg", bg: "bg-azzurro" },
  { titolo: "Cene sulla spiaggia", testo: "Tavolate di legno, piedi nella sabbia e il mare davanti.", img: PH("1559339352-11d035aa65de"), rot: "-2deg", bg: "bg-giallo" },
];

export default function Eventi() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-bianco text-blu-scuro overflow-x-hidden font-sans">
      <Nav />
      <section className="relative bg-azzurro py-16 text-center overflow-hidden">
        <Reveal>
          <Titolo className="text-6xl md:text-8xl" parole={[{ t: "Eventi", c: "text-giallo" }]} />
          <p className="font-hand text-2xl md:text-3xl text-bianco mt-3">L'estate a SeGreta, sera dopo sera.</p>
        </Reveal>
      </section>
      <section className="relative bg-bianco py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {eventi.map((e, i) => (
            <Reveal key={e.titolo}>
              <div className={`${e.bg} doodle-border border-4 border-blu-scuro shadow-[6px_8px_0_rgba(74,51,32,0.9)] p-6 md:p-10 flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}>
                <div className="shrink-0">
                  <ParallaxCircle src={e.img} alt={e.titolo} rot={e.rot} className="w-44 h-44 md:w-60 md:h-60" />
                </div>
                <div className={`text-center ${i % 2 ? "md:text-right" : "md:text-left"}`}>
                  <h3 className="font-display text-5xl md:text-6xl text-blu-scuro">{e.titolo}</h3>
                  <p className="font-hand text-2xl md:text-3xl mt-3 max-w-lg text-blu-scuro">{e.testo}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12"><Pill color="corallo" to="/prenota">Prenota un tavolo</Pill></div>
      </section>
      <Footer />
    </div>
  );
}
