"use client";

/**
 * SmoothScroll
 * — Lenis con lerp 0.08. Esto es lo que da al sitio su sensación contemplativa.
 *   Si lo remueves, el sitio deja de sentirse Praxis.
 */

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Exponemos a window para que GSAP ScrollTrigger pueda acoplarse
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    // Respeto a reduced motion: detenemos lenis
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) lenis.stop();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
