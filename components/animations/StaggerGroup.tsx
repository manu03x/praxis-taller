"use client";

/**
 * StaggerGroup
 * — Wrapper para children que aparecen con stagger.
 *   Cada hijo aparece con opacity 0→1 + y 28→0 con stagger configurable.
 *   Útil para grids de proyectos, listas de specs, datos.
 */

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger / 1000 },
  }),
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

export function StaggerGroup({
  children,
  stagger = 80,
  className,
  once = true,
}: {
  children: ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={clsx(className)}
      custom={stagger}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={clsx(className)} variants={childVariants}>
      {children}
    </motion.div>
  );
}

export default StaggerGroup;
