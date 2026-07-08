import { useEffect } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Nav, Footer, Pill, Titolo, Reveal } from "../components/ui";

export default function Prenota() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="bg-bianco text-blu-scuro overflow-x-hidden font-sans min-h-screen flex flex-col">
      <Nav />
      <section className="relative bg-giallo py-20 flex-1 overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <Titolo className="text-6xl md:text-8xl" parole={[{ t: "Prenota", c: "text-corallo" }]} />
            <p className="font-hand text-2xl md:text-3xl mt-4">Tavolo, lettino o serata: scrivici o chiama, ti aspettiamo!</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-4 items-stretch max-w-xl mx-auto">
              <div className="bg-bianco border-4 border-blu-scuro rounded-3xl px-6 py-4 flex items-center gap-3 shadow-[4px_5px_0_rgba(74,51,32,0.9)]">
                <Phone className="text-azzurro-dark shrink-0" />
                <span className="font-hand text-xl">+39 083 456 7890</span>
              </div>
              <div className="bg-bianco border-4 border-blu-scuro rounded-3xl px-6 py-4 flex items-center gap-3 shadow-[4px_5px_0_rgba(74,51,32,0.9)]">
                <MapPin className="text-corallo shrink-0" />
                <span className="font-hand text-xl text-left">Panoramica U. Paternostro 16, Bisceglie (BT)</span>
              </div>
              <div className="bg-bianco border-4 border-blu-scuro rounded-3xl px-6 py-4 flex items-center gap-3 shadow-[4px_5px_0_rgba(74,51,32,0.9)]">
                <Clock className="text-giallo-dark shrink-0" />
                <span className="font-hand text-xl">Tutti i giorni, 9:00 – 24:00</span>
              </div>
            </div>
            <div className="mt-9">
              <Pill color="corallo" href="tel:+390834567890">Chiama ora</Pill>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}
