import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pill } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 407;
const GATE = 191; // ultimo frame del clip1 (arrivo al cancello)
const LAST = FRAME_COUNT - 1;
const frameSrc = (i: number) => `/journey/f_${String(i + 1).padStart(3, "0")}.jpg`;

/**
 * Journey:
 *  - fase APPROACH: scroll che scrubba il clip1 fino al cancello (nessun testo)
 *  - al cancello compare il pulsante "Entra"
 *  - click su "Entra": fase ENTERING -> auto-play del clip2 fino al finale
 *  - fase ARRIVED: compare "Benvenuti" + i bottoni (Prenota/Eventi/Info -> pagine)
 */
export default function ScrollJourneyHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enterFn = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [atGate, setAtGate] = useState(false);
  const [phase, setPhase] = useState<"approach" | "entering" | "arrived">("approach");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let current = 0;

    const isReady = (im?: HTMLImageElement) => !!(im && im.complete && im.naturalWidth);
    const draw = (idx: number) => {
      let i = Math.max(0, Math.min(LAST, idx | 0));
      if (!isReady(images[i])) {
        let j = i;
        while (j >= 0 && !isReady(images[j])) j--;
        if (j < 0) { j = i; while (j < FRAME_COUNT && !isReady(images[j])) j++; }
        if (!isReady(images[j])) return;
        i = j;
      }
      const im = images[i];
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    const fit = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      draw(current);
    };

    // caricamento sequenziale a finestra
    const CONCURRENCY = 6;
    let loaded = 0, nextToLoad = 0;
    const loadNext = () => {
      if (nextToLoad >= FRAME_COUNT) return;
      const i = nextToLoad++;
      const im = new Image();
      images[i] = im;
      const done = () => {
        loaded++;
        if (i === 0) fit();
        if (loaded === Math.min(14, FRAME_COUNT)) setReady(true);
        if (loaded >= FRAME_COUNT) ScrollTrigger.refresh();
        draw(current);
        loadNext();
      };
      im.onload = done;
      im.onerror = done;
      im.src = frameSrc(i);
    };
    for (let c = 0; c < CONCURRENCY; c++) loadNext();
    window.addEventListener("resize", fit);

    const proxy = { f: 0 };
    const RUNWAY = GATE * 15; // scroll per arrivare al cancello

    const gctx = gsap.context(() => {
      gsap.to(proxy, {
        f: GATE,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=" + RUNWAY,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            current = proxy.f;
            draw(current);
            setAtGate(self.progress > 0.96);
          },
        },
      });
    }, heroRef);

    // funzione "Entra": auto-play del clip2 fino al finale
    enterFn.current = () => {
      setAtGate(false);
      setPhase("entering");
      document.body.style.overflow = "hidden"; // blocca lo scroll durante l'entrata
      gsap.to(proxy, {
        f: LAST,
        duration: 2.8,
        ease: "power1.inOut",
        onUpdate: () => { current = proxy.f; draw(current); },
        onComplete: () => setPhase("arrived"),
      });
    };

    return () => {
      window.removeEventListener("resize", fit);
      document.body.style.overflow = "";
      gctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-blu-scuro">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* logo brand (solo immagine) */}
      <img src="/logo.png" alt="SeGreta" className="absolute top-4 left-4 z-20 h-12 w-auto drop-shadow" />

      {/* cue di scroll iniziale (chevron, nessun testo) */}
      {phase === "approach" && !atGate && ready && (
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <div className="h-5 w-5 rotate-45 border-b-4 border-r-4 border-bianco/90" />
        </div>
      )}

      {/* pulsante ENTRA al cancello */}
      {phase === "approach" && atGate && (
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-24">
          <button onClick={() => enterFn.current()} className="appearance-none bg-transparent border-0 p-0">
            <span className="inline-block font-hand text-3xl px-12 py-3 rounded-full border-4 border-blu-scuro bg-giallo text-blu-scuro shadow-[3px_5px_0_rgba(74,51,32,0.9)] transition-transform hover:scale-105 active:scale-95">
              Entra
            </span>
          </button>
        </div>
      )}

      {/* FINALE: Benvenuti + bottoni alle pagine */}
      {phase === "arrived" && (
        <>
          <div className="absolute left-1/2 top-[12%] z-10 -translate-x-1/2 text-center font-display text-7xl md:text-8xl text-giallo drop-shadow-[3px_4px_0_rgba(0,0,0,0.6)]">
            Benvenuti!
          </div>
          <div className="absolute inset-x-0 bottom-[14%] z-10 flex flex-wrap items-center justify-center gap-4 px-4">
            <Pill color="corallo" to="/prenota">Prenota</Pill>
            <Pill color="azzurro" to="/eventi">Eventi</Pill>
            <Pill color="bianco" to="/info">Info</Pill>
          </div>
        </>
      )}

      {/* LOADER */}
      {!ready && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-blu-scuro">
          <span className="font-hand text-2xl text-giallo">carico il lido…</span>
        </div>
      )}
    </section>
  );
}
