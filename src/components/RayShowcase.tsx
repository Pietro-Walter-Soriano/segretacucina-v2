import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Foto grande circolare al centro con raggi di sole dietro che si MUOVONO col
 * mouse (rotazione + parallasse 3D della foto), stile sezione "POKE BAR".
 * Un secondo strato di raggi ruota lentamente da solo, così c'è vita anche
 * senza mouse / su mobile.
 */
export default function RayShowcase({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });

  const rayRotate = useTransform(sx, [-1, 1], [-28, 28]);
  const tiltY = useTransform(sx, [-1, 1], [-13, 13]);
  const tiltX = useTransform(sy, [-1, 1], [11, -11]);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative flex items-center justify-center w-[330px] h-[330px] md:w-[480px] md:h-[480px]"
      style={{ perspective: 1000 }}
    >
      {/* raggi reattivi al mouse */}
      <motion.div style={{ rotate: rayRotate }} className="rays absolute w-[190%] h-[190%] opacity-85" />
      {/* raggi che ruotano lenti da soli (vita anche senza mouse) */}
      <motion.div
        className="rays-2 absolute w-[190%] h-[190%] opacity-45"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, ease: "linear", repeat: Infinity }}
      />
      {/* pois */}
      <div className="dots text-bianco/30 absolute w-[150%] h-[150%] rounded-full" />

      {/* foto con parallasse 3D */}
      <motion.div
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative z-10 w-[66%] h-[66%] rounded-full overflow-hidden border-8 border-bianco shadow-[6px_10px_0_rgba(74,51,32,0.9)]"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
    </div>
  );
}
