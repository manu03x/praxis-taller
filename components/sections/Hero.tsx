"use client";

/**
 * Hero — fullscreen, modo oscuro/cinematográfico.
 *
 *   Foto atmosférica con un velo sumi en degradé de arriba a abajo (más
 *   intenso en la mitad inferior, donde vive el título). Texto en
 *   shironeri sobre la foto. Kanji vertical decorativo en la esquina,
 *   indicador de scroll abajo al centro.
 *
 *   Acepta `theme` por si necesitas el modo claro en otra ruta. Default:
 *   "dark" porque es lo que mejor sostiene la fotografía arquitectónica.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import KanjiAccent from "@/components/ui/KanjiAccent";

const ease = [0.22, 1, 0.36, 1] as const;

type Theme = "dark" | "light";

export default function Hero({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  kanji = "静",
  kanjiLabel = "Quietud",
  theme = "dark",
}: {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  kanji?: string;
  kanjiLabel?: string;
  theme?: Theme;
}) {
  const dark = theme === "dark";
  const words = title.split(" ");

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-sumi">
      {/* Foto */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.0, ease, delay: 0.2 }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          quality={92}
          priority
          className="object-cover"
        />

        {/* Velo en gradiente — fuerte abajo donde vive el título.
            En light sigue siendo un velo shironeri suave. */}
        {dark ? (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,26,26,0.35) 0%, rgba(26,26,26,0.15) 38%, rgba(26,26,26,0.55) 78%, rgba(26,26,26,0.78) 100%)",
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-shironeri/30 via-transparent to-shironeri/50" />
        )}
      </motion.div>

      {/* Kanji vertical en la esquina */}
      <div className="absolute right-6 top-32 hidden md:right-12 md:top-40 md:block">
        <KanjiAccent
          char={kanji}
          label={kanjiLabel}
          className={`text-3xl tracking-widest ${
            dark ? "text-shironeri/55" : "text-sabi/70"
          }`}
        />
      </div>

      {/* Título */}
      <div className="relative z-10 flex h-full items-end pb-32 md:pb-40">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
          <h1
            className={`font-serif text-6xl font-light leading-[0.95] tracking-tight md:text-[10rem] ${
              dark ? "text-shironeri" : "text-sumi"
            }`}
            style={{
              // Texto blanco con sombra muy sutil para legibilidad sobre cualquier zona de la foto
              textShadow: dark
                ? "0 1px 32px rgba(26,26,26,0.45), 0 0 1px rgba(26,26,26,0.25)"
                : "none",
            }}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1.1,
                  ease,
                  delay: 0.6 + i * 0.08,
                }}
                className="mr-[0.25em] inline-block overflow-hidden align-baseline"
                style={{ display: "inline-block" }}
              >
                <span className="inline-block">{w}</span>
              </motion.span>
            ))}
          </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease, delay: 1.4 }}
              className={`mt-8 max-w-md text-sm leading-relaxed ${
                dark ? "text-shironeri/85" : "text-sumi/70"
              }`}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span
          className={`text-[10px] uppercase tracking-eyebrow ${
            dark ? "text-shironeri/60" : "text-sumi/60"
          }`}
        >
          Scroll
        </span>
        <span
          className={`block h-12 w-px origin-top animate-scroll-pulse ${
            dark ? "bg-shironeri/60" : "bg-sumi/60"
          }`}
        />
      </motion.div>
    </section>
  );
}
