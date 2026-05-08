"use client";

/**
 * NextProject
 * — Bloque grande fullscreen con la imagen del siguiente proyecto, su nombre
 *   en Shippori gigante, e indicador "siguiente →" con animación al hover.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NextProject({ next }: { next: Project }) {
  return (
    <Link
      href={`/proyectos/${next.slug}`}
      className="group relative block h-screen overflow-hidden bg-sumi"
      aria-label={`Siguiente proyecto: ${next.title}`}
      data-cursor="Siguiente →"
    >
      <Image
        src={next.hero}
        alt=""
        fill
        sizes="100vw"
        quality={92}
        className="object-cover opacity-70 transition-all duration-1500 ease-praxis group-hover:scale-[1.04] group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sumi/40 via-transparent to-sumi/60" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 text-shironeri md:px-16 md:py-20">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-eyebrow text-shironeri/70">
            Siguiente proyecto
          </span>
          {next.kanji && (
            <span className="font-jp text-xl text-shironeri/70">
              {next.kanji}
            </span>
          )}
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        >
          <h2 className="font-serif text-6xl font-light leading-[0.95] tracking-tight md:text-9xl">
            {next.title}
          </h2>
          <div className="mt-8 flex items-center gap-6">
            <span className="text-xs uppercase tracking-eyebrow text-shironeri/70">
              {next.location} · {next.year}
            </span>
            <span
              aria-hidden
              className="inline-block h-px w-16 bg-shironeri/60 transition-all duration-700 ease-praxis group-hover:w-32"
            />
            <span className="text-xs uppercase tracking-eyebrow">
              Continuar →
            </span>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}
