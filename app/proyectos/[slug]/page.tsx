import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAllProjects,
  getNextProject,
  getProjectBySlug,
  type GalleryItem,
} from "@/lib/projects";

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import HorizontalLine from "@/components/ui/HorizontalLine";
import KanjiAccent from "@/components/ui/KanjiAccent";

import RevealText from "@/components/animations/RevealText";
import MaskedImage from "@/components/animations/MaskedImage";

import ProjectGallery from "@/components/sections/ProjectGallery";
import NextProject from "@/components/sections/NextProject";

import PlanoSVG from "@/components/sections/PlanoSVG";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.hero],
    },
  };
}

function normalize(item: GalleryItem) {
  return typeof item === "string" ? { src: item } : item;
}

export default async function ProyectoPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <>
      {/* ─────────── 1. Hero ─────────── */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-washi">
        <Image
          src={project.hero}
          alt={project.heroAlt ?? project.title}
          fill
          sizes="100vw"
          quality={92}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shironeri/20 via-transparent to-sumi/40" />

        {project.kanji && (
          <div className="absolute right-6 top-32 hidden md:right-12 md:top-40 md:block">
            <KanjiAccent
              char={project.kanji}
              className="text-4xl tracking-widest"
            />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-6 pb-20 md:px-12 md:pb-28">
          <div className="mx-auto w-full max-w-[1600px]">
            <Eyebrow className="text-shironeri/80">{project.typology}</Eyebrow>
            <h1 className="mt-6 font-serif text-6xl font-light leading-[0.92] tracking-tight text-shironeri md:text-[9.5rem]">
              <RevealText text={project.title} trigger="immediate" stagger={70} />
            </h1>
            <p className="mt-8 text-xs uppercase tracking-eyebrow text-shironeri/80">
              {project.location}
              <span className="mx-3 text-shironeri/40">·</span>
              {project.year}
              <span className="mx-3 text-shironeri/40">·</span>
              {project.area} m²
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 2. Datos del proyecto en grid (4 columnas con líneas verticales) ─────────── */}
      <section className="border-y border-stone-200 py-16 md:py-20">
        <Container size="wide">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { label: "Ubicación", value: project.location },
              { label: "Superficie", value: `${project.area} m²` },
              { label: "Año", value: String(project.year) },
              { label: "Tipología", value: project.typology },
            ].map((d, i) => (
              <div
                key={d.label}
                className={[
                  "px-6 py-3",
                  i > 0 ? "border-l border-stone-200" : "",
                ].join(" ")}
              >
                <p className="text-[10px] uppercase tracking-eyebrow text-sabi">
                  {d.label}
                </p>
                <p className="mt-2 font-serif text-xl font-light md:text-2xl">
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────── 3. Concepto / narrativa ─────────── */}
      <section className="py-24 md:py-32">
        <Container size="narrow">
          <Eyebrow num="01">Concepto</Eyebrow>
          <p className="mt-10 font-serif text-xl font-light leading-[1.55] text-sumi md:text-2xl">
            {project.excerpt}
          </p>

          {project.body && (
            <div className="mt-12 max-w-[60ch] space-y-5 text-[15px] leading-relaxed text-sumi/80">
              {project.body.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {project.quote && (
            <blockquote className="mt-16 max-w-[60ch]">
              <p className="font-serif text-xl font-light italic leading-snug text-sumi md:text-2xl">
                "{project.quote}"
              </p>
            </blockquote>
          )}
        </Container>
      </section>

      {/* ─────────── 4. Galería principal — scroll horizontal pinneado ─────────── */}
      <ProjectGallery
        images={project.gallery}
        projectTitle={project.title}
      />

      {/* ─────────── 5. Detalles arquitectónicos ─────────── */}
      {project.detailBlocks && project.detailBlocks.length > 0 && (
        <section className="py-24 md:py-32">
          <Container size="wide">
            <Eyebrow num="02" className="mb-16">
              Detalles
            </Eyebrow>
            <div className="space-y-24 md:space-y-32">
              {project.detailBlocks.map((block, i) => {
                // Alterna imagen-izq / imagen-der pero con la misma rejilla
                // 7+5 columnas. Sin offsets verticales — solo el orden cambia.
                const isLeft =
                  (block.align ?? (i % 2 === 0 ? "left" : "right")) === "left";

                return (
                  <div key={i} className="grid grid-cols-12 gap-8 md:gap-12">
                    <div
                      className={`col-span-12 md:col-span-7 ${
                        isLeft ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <MaskedImage
                        src={block.image}
                        alt={block.title}
                        aspect="4/3"
                      />
                    </div>
                    <div
                      className={`col-span-12 md:col-span-5 ${
                        isLeft ? "md:order-2" : "md:order-1"
                      } flex flex-col justify-center`}
                    >
                      <Eyebrow num={String(i + 1).padStart(2, "0")}>
                        {block.title}
                      </Eyebrow>
                      <p className="mt-6 max-w-md font-serif text-lg font-light leading-relaxed text-sumi md:text-xl">
                        {block.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ─────────── 6. Planos ─────────── */}
      <section className="bg-washi py-24 md:py-32">
        <Container size="wide">
          <div className="grid grid-cols-12 items-end">
            <div className="col-span-12 md:col-span-6">
              <Eyebrow num="03">Plano arquitectónico</Eyebrow>
              <p className="mt-5 max-w-md text-[13px] leading-relaxed text-sabi">
                Planta baja. Línea fina, dibujada al ingresar al viewport.
              </p>
            </div>
            <div className="col-span-12 mt-6 md:col-span-6 md:mt-0">
              <HorizontalLine className="ml-auto w-24" />
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <PlanoSVG />
          </div>
        </Container>
      </section>

      {/* ─────────── 7. Especificaciones técnicas ─────────── */}
      {project.specs && project.specs.length > 0 && (
        <section className="py-24 md:py-32">
          <Container size="default">
            <Eyebrow num="04">Especificaciones</Eyebrow>
            <dl className="mt-12">
              {project.specs.map((s) => (
                <div
                  key={s.label}
                  className="grid grid-cols-12 gap-4 border-t border-stone-200 py-4"
                >
                  <dt className="col-span-12 text-[10px] uppercase tracking-eyebrow text-sabi md:col-span-5">
                    {s.label}
                  </dt>
                  <dd className="col-span-12 font-serif text-base font-light text-sumi md:col-span-7 md:text-lg">
                    {s.value}
                  </dd>
                </div>
              ))}
              <div className="border-t border-stone-200" />
            </dl>
          </Container>
        </section>
      )}

      {/* ─────────── 8. Galería final — grid limpio ─────────── */}
      {project.finalGallery && project.finalGallery.length > 0 && (
        <section className="py-24 md:py-32">
          <Container size="wide">
            <Eyebrow num="05" className="mb-12">
              Galería · Detalles
            </Eyebrow>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {project.finalGallery.map((raw, i) => {
                const img = normalize(raw);
                return (
                  <MaskedImage
                    key={i}
                    src={img.src}
                    alt={img.alt ?? `${project.title} — detalle ${i + 1}`}
                    aspect={img.aspect ?? "4/3"}
                  />
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ─────────── 9. Siguiente proyecto ─────────── */}
      {next && next.slug !== project.slug && <NextProject next={next} />}
    </>
  );
}
