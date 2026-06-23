import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pill } from "./ui";

const FRAME_COUNT = 407;
const GATE = 191; // ultimo frame del clip1 (arrivo al cancello)
const LAST = FRAME_COUNT - 1;
const RUNWAY = GATE * 16; // px di scroll per l'avvicinamento
const frameSrc = (i: number) => `/journey/f_${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Hero "scroll journey":
 *  - canvas FISSO a tutto schermo (niente pin: nessuno "sgancio"/striscia marrone)
 *  - uno spacer dà la distanza di scroll dell'avvicinamento (clip1, fino al cancello)
 *  - al cancello compare "Entra" -> auto-play del clip2 fino al finale
 *  - finale: "Benvenuti" + bottoni (Prenota/Eventi/Info -> pagine)
 */
export default function ScrollJourneyHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enterFn = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [atGate, setAtGate] = useState(false);
  const [phase, setPhase] = useState<"approach" | "entering" | "arrived">("approach");
  const [spacer, setSpacer] = useState(RUNWAY + 900);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let current = 0;
    let target = 0;
    let entered = false;
    let raf = 0;

    const isReady = (im?: HTMLImageElement) => !!(im && im.complete && im.naturalWidth);
    const draw = (idx: number) => {
      let i = Math.max(0, Math.min(LAST, Math.round(idx)));
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
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      draw(current);
    };

    // ---- preload sequenziale a finestra ----
    const CONCURRENCY = 10;
    let loaded = 0, nextToLoad = 0;
    const loadNext = () => {
      if (nextToLoad >= FRAME_COUNT) return;
      const i = nextToLoad++;
      const im = new Image();
      images[i] = im;
      const done = () => {
        loaded++;
        if (i === 0) fit();
        if (loaded === Math.min(30, FRAME_COUNT)) setReady(true);
        draw(current);
        loadNext();
      };
      im.onload = done;
      im.onerror = done;
      im.src = frameSrc(i);
    };
    for (let c = 0; c < CONCURRENCY; c++) loadNext();

    // ---- loop di rendering (lerp = scrub morbido) ----
    const tick = () => {
      if (!entered) {
        current += (target - current) * 0.16;
        draw(current);
        setAtGate(target >= GATE - 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      if (entered) return;
      const p = Math.min(1, Math.max(0, window.scrollY / RUNWAY));
      target = p * GATE;
    };
    const onResize = () => { setSpacer(RUNWAY + window.innerHeight); fit(); };
    setSpacer(RUNWAY + window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ---- "Entra": auto-play del clip2 ----
    enterFn.current = () => {
      if (entered) return;
      entered = true;
      setAtGate(false);
      setPhase("entering");
      document.body.style.overflow = "hidden";
      const av = { f: current };
      gsap.to(av, {
        f: LAST,
        duration: 2.8,
        ease: "power1.inOut",
        onUpdate: () => { current = av.f; draw(current); },
        onComplete: () => { current = LAST; draw(LAST); setPhase("arrived"); },
      });
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden bg-blu-scuro">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

        <img src="/logo.png" alt="SeGreta" className="absolute top-4 left-4 z-20 h-12 w-auto drop-shadow" />

        {phase === "approach" && !atGate && ready && (
          <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
            <div className="h-5 w-5 rotate-45 border-b-4 border-r-4 border-bianco/90" />
          </div>
        )}

        {phase === "approach" && atGate && (
          <div className="absolute inset-0 z-10 flex items-end justify-center pb-24">
            <button onClick={() => enterFn.current()} className="appearance-none border-0 bg-transparent p-0">
              <span className="inline-block font-hand text-3xl px-12 py-3 rounded-full border-4 border-blu-scuro bg-giallo text-blu-scuro shadow-[3px_5px_0_rgba(74,51,32,0.9)] transition-transform hover:scale-105 active:scale-95">
                Entra
              </span>
            </button>
          </div>
        )}

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

        {!ready && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-blu-scuro">
            <span className="font-hand text-2xl text-giallo">carico il lido…</span>
          </div>
        )}
      </div>

      {/* spacer: dà la distanza di scroll dell'avvicinamento */}
      <div aria-hidden style={{ height: spacer }} />
    </>
  );
}
