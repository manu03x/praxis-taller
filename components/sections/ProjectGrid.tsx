"use client";

/**
 * ProjectGrid — Norm-style.
 *
 *   Grid limpio de 2 columnas (1 en mobile). Sin offsets verticales,
 *   sin asimetrías forzadas. Cada card respira igual que la siguiente.
 *
 *   Cada card: imagen 4:5, número + nombre + ubicación abajo en una sola
 *   fila editorial. Hover: zoom muy ligero (1.02) en 1.6s — apenas notable.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

const ease = [0.22, 1, 0.36, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      transition={{ staggerChildren: 0.06 }}
      className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24"
    >
      {projects.map((p, idx) => {
        const num = String(idx + 1).padStart(2, "0");

        return (
          <motion.article key={p.slug} variants={cardVariants}>
            <Link href={`/proyectos/${p.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-washi">
                <Image
                  src={p.hero}
                  alt={p.heroAlt ?? p.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  quality={90}
                  className="object-cover transition-transform duration-1500 ease-praxis group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-xs text-sabi">{num}</span>
                  <h3 className="font-serif text-xl font-light tracking-tight md:text-2xl">
                    {p.title}
                  </h3>
                </div>
                <p className="text-[10px] uppercase tracking-eyebrow text-sabi">
                  {p.location}
                  <span className="mx-2 text-sabi/40">·</span>
                  {p.year}
                </p>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </motion.div>
  );
}
