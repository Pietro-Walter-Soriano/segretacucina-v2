import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Pill } from "./ui";

const FRAME_COUNT = 407;
const GATE = 191; // ultimo frame del clip1 (cancello)
const LAST = FRAME_COUNT - 1;
const RUNWAY = GATE * 16;
const frameSrc = (i: number) => `/journey/f_${String(i + 1).padStart(3, "0")}.webp`;

const hasEntered = () => {
  try { return sessionStorage.getItem("seg_entered") === "1"; } catch { return false; }
};

/**
 * Hero scroll-journey:
 *  - canvas FISSO a tutto schermo + spacer per lo scroll dell'avvicinamento
 *  - al cancello "Entra" -> (attende il caricamento del clip2) -> auto-play fino al finale
 *  - finale: "Benvenuti" + bottoni verso le pagine
 *  - se l'utente è GIÀ entrato (ritorno da una pagina), si parte direttamente dal
 *    finale (ultimo frame del clip2), senza rifare il viaggio.
 */
export default function ScrollJourneyHero() {
  const enteredInit = hasEntered();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enterFn = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [atGate, setAtGate] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [phase, setPhase] = useState<"approach" | "entering" | "arrived">(enteredInit ? "arrived" : "approach");
  const [spacer, setSpacer] = useState(enteredInit ? 0 : RUNWAY + 900);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let current = enteredInit ? LAST : 0;
    let target = current;
    let entered = enteredInit;
    let loadedCount = 0;
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
      if (!cw || !ch) return;
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
    requestAnimationFrame(fit);

    // ordine di preload: se si rientra, prima l'ultimo frame (finale subito); poi clip2; poi clip1
    const order: number[] = [];
    if (enteredInit) {
      order.push(LAST);
      for (let i = GATE; i < LAST; i++) order.push(i);
      for (let i = 0; i < GATE; i++) order.push(i);
    } else {
      for (let i = 0; i < FRAME_COUNT; i++) order.push(i);
    }
    let oi = 0;
    const loadNext = () => {
      if (oi >= order.length) return;
      const i = order[oi++];
      const im = new Image();
      images[i] = im;
      const done = () => {
        loadedCount++;
        if (!canvas.width) fit();
        if (enteredInit) { if (isReady(images[LAST])) setReady(true); }
        else if (loadedCount >= Math.min(30, FRAME_COUNT)) setReady(true);
        draw(current);
        loadNext();
      };
      im.onload = done;
      im.onerror = done;
      im.src = frameSrc(i);
    };
    for (let c = 0; c < 10; c++) loadNext();

    const onResizeBase = () => fit();
    window.addEventListener("resize", onResizeBase);

    // ===== modalità "già entrato": solo finale statico =====
    if (entered) {
      return () => { window.removeEventListener("resize", onResizeBase); };
    }

    // ===== modalità journey (avvicinamento) =====
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

    const startAutoplay = () => {
      entered = true;
      setAtGate(false);
      setWaiting(false);
      setPhase("entering");
      document.body.style.overflow = "hidden";
      const av = { f: current };
      gsap.to(av, {
        f: LAST,
        duration: 2.8,
        ease: "power1.inOut",
        onUpdate: () => { current = av.f; draw(current); },
        onComplete: () => {
          current = LAST; draw(LAST); setPhase("arrived");
          try { sessionStorage.setItem("seg_entered", "1"); } catch { /* noop */ }
        },
      });
    };

    enterFn.current = () => {
      if (entered) return;
      // auto-play fluido: assicura che TUTTI i frame del clip2 siano caricati
      if (loadedCount >= FRAME_COUNT) { startAutoplay(); return; }
      setWaiting(true);
      const w = window.setInterval(() => {
        if (loadedCount >= FRAME_COUNT) { window.clearInterval(w); startAutoplay(); }
      }, 80);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onResizeBase);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden bg-blu-scuro">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

        <img src="/logo.png" alt="SeGreta" className="absolute top-4 left-4 z-20 h-12 w-auto drop-shadow" />

        {phase === "approach" && !atGate && ready && !waiting && (
          <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
            <div className="h-5 w-5 rotate-45 border-b-4 border-r-4 border-bianco/90" />
          </div>
        )}

        {phase === "approach" && atGate && !waiting && (
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
            {/* insegna di legno che cala dall'alto e dondola */}
            <motion.div
              className="absolute left-1/2 top-2 z-10 -translate-x-1/2"
              initial={{ y: -380, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 8, delay: 0.15 }}
            >
              <motion.div
                style={{ transformOrigin: "50% 4px" }}
                animate={{ rotate: [-2.6, 2.6, -2.6] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              >
                <svg viewBox="0 0 200 58" className="mx-auto block w-44 h-12" aria-hidden="true">
                  <circle cx="100" cy="6" r="5" fill="#5c3d22" />
                  <path d="M100 8 L46 54 M100 8 L154 54" stroke="#7a4a23" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
                <div className="legno-sign doodle-border -mt-2 px-8 py-3 md:px-10 md:py-4">
                  <span className="font-display text-5xl md:text-7xl text-bianco drop-shadow-[2px_3px_0_rgba(0,0,0,0.45)]">
                    Benvenuti!
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-[14%] z-10 flex flex-wrap items-center justify-center gap-4 px-4">
              <Pill color="corallo" to="/prenota">Prenota</Pill>
              <Pill color="azzurro" to="/eventi">Eventi</Pill>
              <Pill color="bianco" to="/info">Info</Pill>
            </div>
          </>
        )}

        {(!ready || waiting) && (
          <div className="absolute inset-0 z-30 grid place-items-center bg-blu-scuro">
            <span className="font-hand text-2xl text-giallo">{waiting ? "si entra…" : "carico il lido…"}</span>
          </div>
        )}
      </div>

      {phase === "approach" && <div aria-hidden style={{ height: spacer }} />}
    </>
  );
}
