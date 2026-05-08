"use client";

/**
 * PlanoSVG
 * — Plano arquitectónico minimalista en SVG.
 *   Líneas finas que se "dibujan" al entrar al viewport mediante
 *   stroke-dasharray + stroke-dashoffset animados con CSS.
 *
 *   Es un plano genérico (placeholder editable). Para usar planos reales,
 *   reemplazar este componente o pasar un SVG por prop.
 */

import { useEffect, useRef } from "react";

export default function PlanoSVG() {
  const wrapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          // Animar pathLength de cada path (stroke-dashoffset desde 1 a 0)
          const paths = el.querySelectorAll<SVGGeometryElement>(
            "path, line, rect, polyline, circle",
          );
          paths.forEach((p) => {
            try {
              const length = p.getTotalLength();
              p.style.strokeDasharray = String(length);
              p.style.strokeDashoffset = "0";
              p.style.transition =
                "stroke-dashoffset 1800ms cubic-bezier(0.22,1,0.36,1)";
            } catch {
              // SVG fallback (rect/circle a veces no soportan getTotalLength en navegadores viejos)
            }
          });
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);

    // Inicializa todos los paths con dashoffset = length (invisibles al inicio)
    const paths = el.querySelectorAll<SVGGeometryElement>(
      "path, line, rect, polyline, circle",
    );
    paths.forEach((p) => {
      try {
        const length = p.getTotalLength();
        p.style.strokeDasharray = String(length);
        p.style.strokeDashoffset = String(length);
      } catch {}
    });

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={wrapRef}
      className="plan-svg w-full"
      viewBox="0 0 1200 700"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="square"
      strokeLinejoin="miter"
      role="img"
      aria-label="Plano arquitectónico"
    >
      {/* Marco exterior */}
      <rect x="80" y="80" width="1040" height="540" />

      {/* Patio central */}
      <rect x="500" y="240" width="200" height="220" />

      {/* Divisiones interiores */}
      <line x1="500" y1="80" x2="500" y2="240" />
      <line x1="700" y1="80" x2="700" y2="240" />
      <line x1="500" y1="460" x2="500" y2="620" />
      <line x1="700" y1="460" x2="700" y2="620" />
      <line x1="80" y1="240" x2="500" y2="240" />
      <line x1="80" y1="460" x2="500" y2="460" />
      <line x1="700" y1="240" x2="1120" y2="240" />
      <line x1="700" y1="460" x2="1120" y2="460" />

      {/* Habitaciones — subdivisiones */}
      <line x1="280" y1="80" x2="280" y2="240" />
      <line x1="380" y1="240" x2="380" y2="460" />
      <line x1="900" y1="80" x2="900" y2="240" />
      <line x1="850" y1="460" x2="850" y2="620" />

      {/* Indicaciones de puerta — pequeños arcos */}
      <path d="M 280 240 Q 290 230 300 240" />
      <path d="M 700 460 Q 710 470 700 480" />
      <path d="M 500 80 Q 510 90 500 100" />

      {/* Mobiliario sutil — solo líneas */}
      <rect x="120" y="320" width="100" height="40" />
      <rect x="940" y="500" width="120" height="40" />
      <rect x="540" y="280" width="40" height="60" />
      <line x1="120" y1="540" x2="220" y2="540" />
      <line x1="120" y1="560" x2="220" y2="560" />

      {/* Norte */}
      <g transform="translate(1080, 120)">
        <line x1="0" y1="0" x2="0" y2="-30" />
        <polyline points="-5,-22 0,-30 5,-22" />
        <text
          x="0"
          y="14"
          textAnchor="middle"
          fontSize="9"
          fill="currentColor"
          stroke="none"
          letterSpacing="2"
          fontFamily="var(--font-inter)"
        >
          N
        </text>
      </g>

      {/* Escala */}
      <g transform="translate(120, 660)">
        <line x1="0" y1="0" x2="100" y2="0" />
        <line x1="0" y1="-3" x2="0" y2="3" />
        <line x1="50" y1="-3" x2="50" y2="3" />
        <line x1="100" y1="-3" x2="100" y2="3" />
        <text
          x="0"
          y="-8"
          fontSize="8"
          fill="currentColor"
          stroke="none"
          letterSpacing="2"
          fontFamily="var(--font-inter)"
        >
          0     5m
        </text>
      </g>
    </svg>
  );
}
