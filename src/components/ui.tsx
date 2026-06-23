import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ---- Dati ---- */
export const PH = (id: string, w = 700) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const galleryPhotos = [
  { src: PH("1519046904884-53103b34b206"), alt: "Spiaggia" },
  { src: PH("1534351590666-13e3e96b5017"), alt: "Cocktail" },
  { src: PH("1507525428034-b723cf961d3e"), alt: "Tramonto" },
  { src: PH("1559339352-11d035aa65de"), alt: "Food" },
  { src: PH("1563245372-f21724e3856d"), alt: "Relax" },
];

export const aree = [
  {
    id: "food",
    titolo: "Food & Drink",
    testo: "Sapore di mare, street food e cocktail fatti come a casa. Niente di finto, solo cose buone.",
    img: PH("1559339352-11d035aa65de"),
    cta: "Il menù",
    bg: "bg-giallo",
    rot: "-3deg",
  },
  {
    id: "spiaggia",
    titolo: "Spiaggia & Lido",
    testo: "Ombra, lettini e il rumore del mare. Un posto semplice dove staccare davvero la spina.",
    img: PH("1519046904884-53103b34b206"),
    cta: "Prenota un lettino",
    bg: "bg-azzurro",
    rot: "2.5deg",
  },
  {
    id: "eventi",
    titolo: "Tramonti & Eventi",
    testo: "Quando cala il sole arriva la musica. Aperitivi sul prato e serate sotto le stelle.",
    img: PH("1507525428034-b723cf961d3e"),
    cta: "Gli eventi",
    bg: "bg-giallo",
    rot: "-2deg",
  },
];

/* ---- Bottone a pillola (ancora interna alla pagina) ---- */
type PillColor = "giallo" | "azzurro" | "corallo" | "bianco";
const pillStyles: Record<PillColor, string> = {
  giallo: "bg-giallo text-blu-scuro",
  azzurro: "bg-azzurro text-bianco",
  corallo: "bg-corallo text-bianco",
  bianco: "bg-bianco text-blu-scuro",
};

const MotionLink = motion(Link);

export function Pill({
  children,
  color = "giallo",
  href,
  to,
}: {
  children: React.ReactNode;
  color?: PillColor;
  href?: string;
  to?: string;
}) {
  const cls = `inline-block font-hand text-2xl px-7 py-2.5 rounded-full border-4 border-blu-scuro shadow-[3px_4px_0_rgba(74,51,32,0.9)] ${pillStyles[color]}`;
  const anim = {
    whileHover: { scale: 1.06, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
    className: cls,
  };
  if (to) return <MotionLink to={to} {...anim}>{children}</MotionLink>;
  return <motion.a href={href || "#"} {...anim}>{children}</motion.a>;
}

/* ---- Titolo marker multicolore ---- */
export function Titolo({ parole, className = "" }: { parole: { t: string; c: string }[]; className?: string }) {
  return (
    <h2 className={`font-display leading-[0.95] ${className}`}>
      {parole.map((p, i) => (
        <span key={i} className={`${p.c} block`} style={{ rotate: i % 2 ? "-1.5deg" : "1deg" }}>
          {p.t}
        </span>
      ))}
    </h2>
  );
}

/* ---- Reveal allo scroll ---- */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ type: "spring", stiffness: 95, damping: 17, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Foto circolare con parallasse morbida + zoom hover ---- */
export function ParallaxCircle({
  src,
  alt,
  className = "",
  rot = "0deg",
}: {
  src: string;
  alt: string;
  className?: string;
  rot?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [34, -34]);
  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: rot }}
      className={`rounded-full overflow-hidden border-8 border-bianco shadow-[6px_8px_0_rgba(74,51,32,0.9)] ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      />
    </motion.div>
  );
}

/* ---- Nav delle pagine (logo torna alla home/journey) ---- */
export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bianco/95 border-b-4 border-blu-scuro">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="SeGreta" className="h-12 w-auto" />
          <span className="font-display text-3xl text-azzurro-dark">SeGreta</span>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <Pill color="bianco" to="/info">Info</Pill>
          <Pill color="azzurro" to="/eventi">Eventi</Pill>
          <Pill color="giallo" to="/prenota">Prenota</Pill>
        </div>
      </div>
    </nav>
  );
}

/* ---- Footer condiviso ---- */
export function Footer() {
  return (
    <footer className="wood-summer text-blu-scuro py-10 text-center border-t-8 border-giallo">
      <div className="flex items-center justify-center gap-2 mb-3">
        <img src="/logo.png" alt="SeGreta" className="h-10 w-auto" />
        <span className="font-display text-2xl text-blu-scuro">SeGreta</span>
      </div>
      <p className="font-hand text-lg text-blu-scuro/80">
        SeGreta Cucina &amp; Lido — l'anima di campagna della tua estate al mare 🌾🌊
      </p>
    </footer>
  );
}
