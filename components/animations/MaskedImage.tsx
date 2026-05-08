"use client";

/**
 * MaskedImage — fade sutil al entrar al viewport.
 *
 *   Versión Norm: ya no hay cortina shoji deslizándose. La imagen aparece
 *   con opacity 0→1 + scale 1.04→1 en 1.4s. Es casi imperceptible — solo
 *   le resta dureza al "pop in" del lazy load.
 *
 *   Mantiene la API original para que las páginas no se rompan: aspect,
 *   from, duration, delay siguen aceptados aunque algunos ya no se usan.
 */

import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Aspect ratio del contenedor — ej: "4/5", "16/9", "1/1" */
  aspect?: string;
  /** Aceptado por compatibilidad con la API anterior; ya no afecta */
  from?: "left" | "right" | "top" | "bottom";
  /** Duración del fade (ms) */
  duration?: number;
  /** Delay antes del fade (ms) */
  delay?: number;
  className?: string;
  /** Modo de disparo */
  trigger?: "viewport" | "immediate";
  /** Se ejecuta solo una vez */
  once?: boolean;
};

export default function MaskedImage({
  src,
  alt,
  aspect = "16/9",
  duration = 1400,
  delay = 0,
  className,
  trigger = "viewport",
  once = true,
  fill,
  width,
  height,
  sizes,
  priority,
  ...rest
}: Props) {
  const motionProps =
    trigger === "viewport"
      ? {
          initial: { opacity: 0, scale: 1.04 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once, amount: 0.2 },
        }
      : {
          initial: { opacity: 0, scale: 1.04 },
          animate: { opacity: 1, scale: 1 },
        };

  return (
    <div
      className={clsx("relative overflow-hidden bg-washi", className)}
      style={{ aspectRatio: aspect }}
    >
      <motion.div
        className="absolute inset-0"
        {...motionProps}
        transition={{ duration: duration / 1000, ease, delay: delay / 1000 }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill ?? !(width || height)}
          width={width}
          height={height}
          sizes={sizes ?? "(min-width: 1024px) 80vw, 100vw"}
          quality={92}
          priority={priority}
          className="object-cover"
          {...rest}
        />
      </motion.div>
    </div>
  );
}
