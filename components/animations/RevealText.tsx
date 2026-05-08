"use client";

/**
 * RevealText
 * — Texto que aparece palabra por palabra (o letra por letra).
 *   stagger 30-50ms, opacity 0→1 + y 24→0, ease-praxis.
 *   Se dispara al cargar (immediate) o al entrar al viewport (whileInView).
 */

import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

type Mode = "words" | "letters";

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger / 1000 },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function RevealText({
  text,
  mode = "words",
  stagger = 50,
  delay = 0,
  className,
  trigger = "viewport",
  once = true,
}: {
  text: string;
  mode?: Mode;
  stagger?: number;
  delay?: number;
  className?: string;
  trigger?: "viewport" | "immediate";
  once?: boolean;
}) {
  const tokens = mode === "words" ? text.split(/(\s+)/) : Array.from(text);

  const motionProps =
    trigger === "viewport"
      ? {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once, amount: 0.4 },
        }
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
        };

  return (
    <motion.span
      className={clsx("inline-block", className)}
      custom={stagger}
      variants={containerVariants}
      transition={{ delay: delay / 1000 }}
      {...motionProps}
    >
      {tokens.map((tk, i) => {
        const isSpace = /^\s+$/.test(tk);
        if (isSpace) return <span key={i}>{tk}</span>;
        return (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            variants={childVariants}
            style={{ willChange: "transform, opacity" }}
          >
            {tk}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
