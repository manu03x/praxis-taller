import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Eyebrow — label uppercase tracking ancho.
 * Usar arriba de títulos para puntuar secciones sin gritar.
 */
export default function Eyebrow({
  children,
  className,
  num,
}: {
  children: ReactNode;
  className?: string;
  /** Numeración opcional ej: "01" — se renderiza monospaced antes del label */
  num?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-3 text-xs uppercase tracking-eyebrow text-sabi",
        className,
      )}
    >
      {num && <span className="font-serif text-sumi">{num}</span>}
      {num && <span aria-hidden className="h-px w-6 bg-sabi/60" />}
      {children}
    </span>
  );
}
