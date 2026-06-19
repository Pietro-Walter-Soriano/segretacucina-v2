import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Pill } from "./ui";

/* Frangia/smerlo disegnato a mano in fondo alla tenda */
function Fringe() {
  return (
    <svg
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      className="absolute -bottom-px left-0 w-full h-5 fill-[#bf492f]"
      aria-hidden="true"
    >
      <path d="M0 0 H120 V4 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 q-5 9 -10 0 Z" />
    </svg>
  );
}

/**
 * Due tende (disegnate a mano) chiuse all'avvio: scrollando si aprono e svelano
 * il lido illustrato con i bottoni. Effetto guidato dallo scroll (sticky).
 */
export default function CurtainReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const leftX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-102%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], ["0%", "102%"]);
  // leggera parallasse del lido mentre si apre
  const lidoScale = useTransform(scrollYProgress, [0, 0.7], [1.15, 1]);
  const contentOp = useTransform(scrollYProgress, [0.42, 0.72], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.42, 0.72], [30, 0]);
  const hintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Lido illustrato (dietro le tende) */}
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
            <Pill color="giallo" to="/esplora#momenti">Gallery</Pill>
            <Pill color="azzurro" to="/esplora#info">Info</Pill>
            <Pill color="corallo" to="/esplora#contatti">Contatti</Pill>
          </div>
        </motion.div>

        {/* Tenda sinistra */}
        <motion.div style={{ x: leftX }} className="curtain curtain-left absolute left-0 top-0 h-full w-1/2">
          <Fringe />
        </motion.div>
        {/* Tenda destra */}
        <motion.div style={{ x: rightX }} className="curtain curtain-right absolute right-0 top-0 h-full w-1/2">
          <Fringe />
        </motion.div>

        {/* Hint iniziale */}
        <motion.div
          style={{ opacity: hintOp }}
          className="absolute bottom-10 left-0 right-0 text-center text-bianco font-hand text-2xl pointer-events-none drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]"
        >
          scorri per aprire le tende ⤓
        </motion.div>
      </div>
    </section>
  );
}
