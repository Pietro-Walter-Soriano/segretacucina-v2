import React from "react";

/**
 * Doodle disegnati a mano (stile bambino) usati come decorazioni sparse.
 * Il colore si controlla con la classe `text-*` (usano currentColor).
 */
type DoodleProps = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Sun = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <circle cx="50" cy="50" r="20" {...common} />
    <path {...common} d="M50 8 V20 M50 80 V92 M8 50 H20 M80 50 H92 M21 21 L29 29 M71 71 L79 79 M79 21 L71 29 M29 71 L21 79" />
  </svg>
);

export const Wave = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 120 40" className={className} aria-hidden="true">
    <path {...common} d="M5 25 q12 -20 24 0 t24 0 t24 0 t24 0" />
  </svg>
);

export const Umbrella = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path {...common} d="M50 18 C24 18 12 40 12 48 C26 40 30 48 50 48 C70 48 74 40 88 48 C88 40 76 18 50 18 Z" />
    <path {...common} d="M50 48 V86 M50 86 q10 2 10 -6" />
  </svg>
);

export const Fish = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
    <path {...common} d="M15 35 C35 8 80 8 95 35 C80 62 35 62 15 35 Z" />
    <path {...common} d="M95 35 L115 18 V52 Z" />
    <circle cx="38" cy="30" r="3.5" fill="currentColor" stroke="none" />
  </svg>
);

export const Star = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <path {...common} d="M50 12 L61 38 L89 40 L67 58 L75 86 L50 70 L25 86 L33 58 L11 40 L39 38 Z" />
  </svg>
);

export const Squiggle = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 120 30" className={className} aria-hidden="true">
    <path {...common} d="M5 15 q15 -18 30 0 t30 0 t30 0" />
  </svg>
);

export const Cloud = ({ className = "" }: DoodleProps) => (
  <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
    <path {...common} d="M25 55 C8 55 8 35 26 35 C28 18 55 18 58 33 C75 25 92 38 82 52 C98 52 98 55 92 55 Z" />
  </svg>
);
