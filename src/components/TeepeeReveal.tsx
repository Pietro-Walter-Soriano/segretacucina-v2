import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Pill } from "./ui";

/* Pali in legno che escono dalla cima della tenda */
function Poles() {
  return (
    <svg
      viewBox="0 0 200 130"
      preserveAspectRatio="xMidYMin meet"
      className="absolute left-1/2 -translate-x-1/2 top-0 w-40 md:w-52 h-[16vh]"
      aria-hidden="true"
    >
      <g stroke="#7a4a23" strokeWidth="6" strokeLinecap="round">
        <line x1="100" y1="130" x2="64" y2="8" />
        <line x1="100" y1="130" x2="86" y2="2" />
        <line x1="100" y1="130" x2="114" y2="2" />
        <line x1="100" y1="130" x2="136" y2="8" />
      </g>
    </svg>
  );
}

/**
 * Tenda indiana (teepee) chiusa all'avvio: scrollando i due lembi si aprono e
 * svelano il lido illustrato con i bottoni. Effetto guidato dallo scroll.
 */
export default function TeepeeReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const leftX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-106%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], ["0%", "106%"]);
  const lidoScale = useTransform(scrollYProgress, [0, 0.7], [1.15, 1]);
  const contentOp = useTransform(scrollYProgress, [0.46, 0.72], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.46, 0.72], [30, 0]);
  const hintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const polesOp = useTransform(scrollYProgress, [0.25, 0.6], [1, 0]);

  // silhouette del teepee: punta al centro (50% 5%), pendii verso i lati
  const leftClip = "polygon(50% 5%, 0% 18%, 0% 100%, 50% 100%)";
  const rightClip = "polygon(50% 5%, 100% 18%, 100% 100%, 50% 100%)";

  return (
    <section ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-azzurro">
        {/* Lido illustrato (dietro la tenda) */}
        <motion.img
          src="/sfondo-segreta.jpg"
          alt="Il lido SeGreta"
          style={{ scale: lidoScale }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Contenuto svelato */}
        <motion.div
          style={{ opacity: contentOp, y: contentY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <p className="font-hand text-2xl md:text-3xl bg-bianco/90 px-6 py-2 rounded-2xl border-2 border-blu-scuro shadow-[2px_3px_0_rgba(74,51,32,0.7)]">
            Benvenuti a SeGreta 🌅
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Pill color="giallo" href="#contatti">Prenotazione</Pill>
            <Pill color="azzurro" href="#food">Menù</Pill>
            <Pill color="corallo" href="#eventi">Eventi</Pill>
          </div>
        </motion.div>

        {/* Pali in cima */}
        <motion.div style={{ opacity: polesOp }} className="absolute inset-x-0 top-0 pointer-events-none">
          <Poles />
        </motion.div>

        {/* Lembo sinistro */}
        <motion.div style={{ x: leftX, clipPath: leftClip }} className="teepee-flap">
          <div className="teepee-flap-dots" />
          <div className="teepee-lacing" style={{ right: 0 }} />
        </motion.div>
        {/* Lembo destro */}
        <motion.div style={{ x: rightX, clipPath: rightClip }} className="teepee-flap">
          <div className="teepee-flap-dots" />
          <div className="teepee-lacing" style={{ left: 0 }} />
        </motion.div>

        {/* Hint */}
        <motion.div
          style={{ opacity: hintOp }}
          className="absolute bottom-10 inset-x-0 text-center text-bianco font-hand text-2xl pointer-events-none drop-shadow-[2px_2px_0_rgba(0,0,0,0.45)]"
        >
          scorri per aprire la tenda ⤓
        </motion.div>
      </div>
    </section>
  );
}
