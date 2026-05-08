import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import HorizontalLine from "@/components/ui/HorizontalLine";
import Hero from "@/components/sections/Hero";
import FadeIn from "@/components/animations/FadeIn";
import MaskedImage from "@/components/animations/MaskedImage";

export default function HomePage() {
  const projects = getAllProjects();
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      {/*
        Imagen elegida deliberadamente atmosférica/oscura para que el título
        en shironeri (blanco hueso) tenga contraste sostenido. Cambiar
        imageSrc no requiere tocar nada más — Hero ya tiene velo gradiente.
      */}
      <Hero
        title="Habitar el silencio."
        subtitle="Praxis Taller diseña, vende y acompaña proyectos arquitectónicos donde el espacio vacío y la materia tienen el mismo peso."
        imageSrc="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=92"
        imageAlt="Espacio arquitectónico atmosférico — fragmento de muro y luz"
        kanji="静"
        kanjiLabel="Sei — quietud"
        theme="dark"
      />

      {/* ─────────── STATEMENT DE MARCA ─────────── */}
      <section className="py-24 md:py-32">
        <Container size="narrow">
          <Eyebrow num="01">Manifiesto</Eyebrow>
          <FadeIn className="mt-10">
            <p className="font-serif text-2xl font-light leading-[1.45] text-sumi md:text-4xl">
              No vendemos casas. Vendemos el tiempo que tomará habitarlas, la luz
              que cambia con las estaciones, el silencio que solo aparece cuando
              la materia está bien puesta.
            </p>
          </FadeIn>
          <HorizontalLine className="mt-12 w-16" />
        </Container>
      </section>

      {/* ─────────── PROYECTOS DESTACADOS ─────────── */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="mb-12 grid grid-cols-12 items-end gap-8 md:mb-20">
            <div className="col-span-12 md:col-span-8">
              <Eyebrow num="02">Selección</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl font-light leading-tight tracking-tight md:text-5xl">
                Proyectos recientes
              </h2>
            </div>
            <div className="col-span-12 md:col-span-2 md:col-start-11">
              <Link
                href="/proyectos"
                className="nav-link text-[10px] uppercase tracking-eyebrow text-sumi"
              >
                Ver todos →
              </Link>
            </div>
          </div>

          {/* Grid limpio 3-cols. Sin offsets, sin tetris. */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3 md:gap-y-20">
            {featured.map((p, i) => (
              <article key={p.slug}>
                <Link href={`/proyectos/${p.slug}`} className="group block">
                  <MaskedImage src={p.hero} alt={p.heroAlt ?? p.title} aspect="4/5" />
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-xs text-sabi">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-lg font-light tracking-tight md:text-xl">
                        {p.title}
                      </h3>
                    </div>
                    {p.kanji && (
                      <span className="font-jp text-sm text-sabi/60">
                        {p.kanji}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-eyebrow text-sabi">
                    {p.location} · {p.year}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────── FILOSOFÍA CORTA + IMAGEN LATERAL ─────────── */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <div className="grid grid-cols-12 items-center gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-6 md:col-start-1">
              <MaskedImage
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=90"
                alt="Detalle arquitectónico de un patio interior"
                aspect="4/5"
              />
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <Eyebrow num="03">Filosofía</Eyebrow>
              <h2 className="mt-6 font-serif text-3xl font-light leading-tight tracking-tight md:text-5xl">
                Diseñar es quitar.
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-sumi/80">
                Cada proyecto comienza con una pregunta sencilla: ¿qué se puede
                eliminar sin que la casa pierda su razón de ser? Lo que queda,
                después de mucho quitar, es Praxis.
              </p>
              <Link
                href="/filosofia"
                className="nav-link mt-10 inline-block text-[10px] uppercase tracking-eyebrow text-sumi"
              >
                Leer más →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
