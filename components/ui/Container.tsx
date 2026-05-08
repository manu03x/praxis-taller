import type { ReactNode, JSX } from "react";
import clsx from "clsx";

/**
 * Container
 * — Ancho máximo y padding consistente. La columna respira con generosidad.
 *   max-w-[1600px] (no 7xl) porque queremos heroes muy amplios.
 *
 *   Nota: en React 19 el namespace global `JSX` se eliminó. Hay que importarlo
 *   explícitamente desde "react" para usar `JSX.IntrinsicElements`.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: "narrow" | "default" | "wide";
}) {
  const max =
    size === "narrow"
      ? "max-w-[860px]"
      : size === "wide"
        ? "max-w-[1600px]"
        : "max-w-[1280px]";

  return (
    <Tag
      className={clsx(
        "mx-auto w-full px-6 md:px-12",
        max,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
