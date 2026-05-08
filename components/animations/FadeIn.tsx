"use client";

/**
 * FadeIn — wrapper de fade-up al entrar al viewport.
 *
 *   Sustituye RevealText cuando lo que quieres es UN bloque que aparezca
 *   suavemente, sin la animación palabra-por-palabra. Norm-style.
 *
 *   Uso:
 *     <FadeIn delay={200}>
 *       <p>Texto del manifiesto…</p>
 *     </FadeIn>
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  y = 12,
  className,
  amount = 0.25,
  once = true,
}: {
  children: ReactNode;
  /** Delay (ms) */
  delay?: number;
  /** Duración (ms) */
  duration?: number;
  /** Distancia inicial en Y (px) */
  y?: number;
  className?: string;
  /** % visible para disparar */
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: duration / 1000, ease, delay: delay / 1000 }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}
