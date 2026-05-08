"use client";

/**
 * Nav — isla flotante minimal.
 *
 * Versión limpia (post-glass):
 *   • Fondo shironeri al 95% con backdrop-blur muy sutil (solo para que el
 *     texto siga siendo legible si pasa por encima de imágenes).
 *   • Borde stone-200 1px — el separador canónico del sitio aparece también
 *     definiendo el contorno de la isla.
 *   • Sombra muy contenida — apenas separa la isla del fondo.
 *   • Logo sin texto: solo el sello de Praxis.
 *
 * Desktop (md+): un solo pill central
 *   [logo]  ·  [items + píldora deslizante]  ·  [Conversar]  ·  [静]
 *
 * Mobile (<md): dos islas separadas
 *   ←  [logo]                                   [≡ menu]  →
 */

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const items: { label: string; href: string; kanji: string }[] = [
  { label: "Proyectos", href: "/proyectos", kanji: "物件" },
  { label: "Filosofía", href: "/filosofia", kanji: "哲学" },
  { label: "Contacto", href: "/contacto", kanji: "連絡" },
];

// Estilo único del pill — limpio, una sola declaración.
const islandClass =
  "rounded-full border border-stone-200 bg-shironeri/95 backdrop-blur-sm";
const islandShadow: React.CSSProperties = {
  boxShadow: "0 4px 16px -8px rgba(26,26,26,0.08)",
};

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra el menú móvil al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bloquea scroll cuando el menú está abierto
  useEffect(() => {
    const lenis = (window as unknown as {
      __lenis?: { stop: () => void; start: () => void };
    }).__lenis;
    if (open) {
      document.documentElement.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  // Cierra con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeIdx = items.findIndex((i) =>
    i.href === "/" ? pathname === "/" : pathname?.startsWith(i.href),
  );
  const displayIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;

  return (
    <>
      {/* ─────────── DESKTOP (md+) ─────────── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden justify-center px-3 pt-6 md:flex">
        <motion.nav
          aria-label="Principal"
          animate={{
            paddingLeft: scrolled ? 6 : 8,
            paddingRight: scrolled ? 6 : 8,
            paddingTop: scrolled ? 4 : 6,
            paddingBottom: scrolled ? 4 : 6,
          }}
          transition={{ duration: 0.6, ease }}
          className={`pointer-events-auto flex items-center gap-2 ${islandClass}`}
          style={islandShadow}
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Logo (solo el sello) */}
          <Link
            href="/"
            aria-label="Praxis Taller — inicio"
            className="group flex h-9 w-9 items-center justify-center rounded-full"
          >
            <Image
              src="/logo/praxis-mark.jpg"
              alt="Praxis Taller"
              width={36}
              height={36}
              className="h-5 w-5 object-contain mix-blend-multiply transition-transform duration-700 ease-praxis group-hover:rotate-180"
              priority
            />
          </Link>

          <span aria-hidden className="h-5 w-px bg-stone-200" />

          {/* Items con píldora deslizante */}
          <ul className="relative flex items-center">
            {items.map((item, i) => {
              const isActive = activeIdx === i;
              const isLit = displayIdx === i;
              return (
                <li key={item.href} className="relative">
                  {isLit && (
                    <motion.span
                      layoutId="nav-pill-desktop"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-sumi"
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 32,
                        mass: 0.7,
                      }}
                    />
                  )}
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoveredIdx(i)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "relative z-10 block px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-500 ease-praxis",
                      isLit ? "text-shironeri" : "text-sumi",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <span aria-hidden className="h-5 w-px bg-stone-200" />

          {/* CTA */}
          <Link
            href="/contacto"
            className="group flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-wider text-sumi transition-colors duration-500 ease-praxis hover:bg-sumi hover:text-shironeri"
          >
            <span>Conversar</span>
            <span
              aria-hidden
              className="inline-block h-px w-3 bg-current transition-all duration-500 ease-praxis group-hover:w-6"
            />
          </Link>

          {/* Kanji decorativo */}
          <span
            aria-hidden
            className="ml-1 font-jp text-[10px] tracking-widest text-sabi/60"
          >
            静
          </span>
        </motion.nav>
      </header>

      {/* ─────────── MOBILE (<md) ─────────── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 pt-4 md:hidden">
        {/* Logo island */}
        <Link
          href="/"
          aria-label="Praxis Taller — inicio"
          onClick={() => setOpen(false)}
          className={`pointer-events-auto grid h-11 w-11 place-items-center ${islandClass}`}
          style={islandShadow}
        >
          <Image
            src="/logo/praxis-mark.jpg"
            alt="Praxis Taller"
            width={28}
            height={28}
            className="h-5 w-5 object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Menu button island */}
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={`pointer-events-auto relative grid h-11 w-11 place-items-center ${islandClass}`}
          style={islandShadow}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
        >
          {/* Las dos rayas que se vuelven X */}
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
            transition={{ duration: 0.45, ease }}
            className="absolute h-px w-4 bg-sumi"
            style={{ originX: 0.5, originY: 0.5 }}
          />
          <motion.span
            aria-hidden
            animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
            transition={{ duration: 0.45, ease }}
            className="absolute h-px w-4 bg-sumi"
            style={{ originX: 0.5, originY: 0.5 }}
          />
        </motion.button>
      </header>

      {/* ─────────── MOBILE OVERLAY ─────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-shironeri md:hidden"
          >
            {/* Línea vertical decorativa */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 1.0, ease, delay: 0.3 }}
              className="pointer-events-none absolute left-6 top-0 h-full w-px origin-top bg-stone-200"
            />

            <nav
              aria-label="Menú"
              className="flex flex-1 flex-col justify-center px-6 pt-24"
            >
              <ul>
                {items.map((item, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      transition={{
                        duration: 0.7,
                        ease,
                        delay: 0.35 + i * 0.08,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between border-t border-stone-200 py-7"
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-baseline gap-5">
                          <span className="font-serif text-sm text-sabi">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={[
                              "font-serif text-[2.5rem] font-light leading-none tracking-tight transition-colors duration-500",
                              isActive ? "text-aka" : "text-sumi",
                            ].join(" ")}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span className="font-jp text-xs tracking-widest text-sabi">
                          {item.kanji}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
                <li className="border-t border-stone-200" />
              </ul>
            </nav>

            {/* Pie del overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="px-6 pb-10"
            >
              <div className="border-t border-stone-200 pt-8">
                <div className="flex items-center justify-between">
                  <a
                    href="https://www.instagram.com/praxis.taller/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-eyebrow text-sumi"
                  >
                    @praxis.taller
                  </a>
                  <a
                    href="mailto:hola@praxistaller.com"
                    className="text-xs uppercase tracking-eyebrow text-sumi"
                  >
                    hola@praxistaller.com
                  </a>
                </div>
                <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-eyebrow text-sabi">
                  <span>Praxis · Taller — 2026</span>
                  <span className="font-jp text-sm tracking-widest">
                    静 · 間 · 寂
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
