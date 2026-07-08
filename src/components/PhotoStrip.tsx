/**
 * Carosello a scorrimento (marquee) di foto in stile polaroid.
 * Scorre in continuo in modo fluido e si mette in pausa al passaggio del mouse.
 */
export default function PhotoStrip({ photos }: { photos: { src: string; alt: string }[] }) {
  const items = [...photos, ...photos]; // duplicato per loop senza stacchi
  return (
    <div className="marquee w-full py-2">
      <div className="marquee-track gap-6 px-3">
        {items.map((p, i) => (
          <figure
            key={i}
            className="shrink-0 bg-bianco p-2 pb-5 rounded-md border border-blu-scuro/10 shadow-[4px_6px_0_rgba(74,51,32,0.35)]"
            style={{ rotate: i % 2 ? "-2.5deg" : "2.5deg" }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="w-[240px] h-[180px] md:w-[300px] md:h-[220px] object-cover rounded-sm"
            />
            <figcaption className="font-hand text-center text-xl mt-2 text-blu-scuro">{p.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
