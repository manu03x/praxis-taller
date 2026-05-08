"use client";

/**
 * ProjectGallery — Norm-style.
 *
 *   Secuencia editorial vertical. Las imágenes se apilan como en una
 *   revista impresa: alternan ancho (full bleed / contenidas), siempre
 *   alineadas a una rejilla. Sin scroll horizontal pinneado, sin GSAP.
 *
 *   Cada imagen aparece con un fade sutil (vía MaskedImage). El ritmo
 *   se construye solo por la secuencia de aspectos, no por animaciones.
 */

import MaskedImage from "@/components/animations/MaskedImage";
import type { GalleryItem } from "@/lib/projects";

function normalize(item: GalleryItem): {
  src: string;
  alt?: string;
  aspect?: string;
  caption?: string;
} {
  return typeof item === "string" ? { src: item } : item;
}

export default function ProjectGallery({
  images,
  projectTitle,
}: {
  images: GalleryItem[];
  projectTitle: string;
}) {
  return (
    <section
      aria-label={`Galería principal — ${projectTitle}`}
      className="bg-shironeri"
    >
      <div className="mx-auto max-w-[1600px] space-y-16 px-6 py-24 md:space-y-24 md:px-12 md:py-32">
        {images.map((raw, i) => {
          const img = normalize(raw);
          // Cadencia editorial: full bleed, contenida, contenida, full bleed, …
          // (4-img cycle de anchos)
          const widthCls =
            i % 4 === 0
              ? "w-full"
              : i % 4 === 1
                ? "w-full md:w-[68%]"
                : i % 4 === 2
                  ? "ml-auto w-full md:w-[58%]"
                  : "w-full md:w-[78%] md:mx-auto";
          const aspect = img.aspect ?? (i % 4 === 0 ? "16/9" : "4/5");

          return (
            <figure key={i} className={widthCls}>
              <MaskedImage
                src={img.src}
                alt={img.alt ?? `${projectTitle} — vista ${i + 1}`}
                aspect={aspect}
              />
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="font-serif text-xs text-sabi">
                  {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                {img.caption && (
                  <span className="text-[10px] uppercase tracking-eyebrow text-sabi">
                    {img.caption}
                  </span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
