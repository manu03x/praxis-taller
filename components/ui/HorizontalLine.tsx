import clsx from "clsx";

/**
 * HorizontalLine — separador 1px stone-200.
 * Elemento gráfico recurrente. Discreto pero presente.
 */
export default function HorizontalLine({
  className,
  full = false,
}: {
  className?: string;
  full?: boolean;
}) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={clsx(
        "h-px bg-stone-200",
        full ? "w-full" : "w-12",
        className,
      )}
    />
  );
}
