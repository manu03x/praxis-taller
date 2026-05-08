import clsx from "clsx";

/**
 * KanjiAccent
 * — Kanji decorativo vertical. Se usa con muchísima moderación.
 *   Tamaño chico, color sabi (no sumi), alineación vertical opcional.
 *   Default: 静 (sei — quietud).
 */
export default function KanjiAccent({
  char = "静",
  vertical = true,
  className,
  label,
}: {
  /** Kanji a mostrar — máximo 2 caracteres */
  char?: string;
  /** Escritura vertical (writing-mode vertical-rl) */
  vertical?: boolean;
  className?: string;
  /** Label visualmente oculto para lectores de pantalla */
  label?: string;
}) {
  return (
    <span
      className={clsx(
        "font-jp text-sabi/70",
        vertical && "[writing-mode:vertical-rl]",
        className,
      )}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      {char}
    </span>
  );
}
