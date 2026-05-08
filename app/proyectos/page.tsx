import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import HorizontalLine from "@/components/ui/HorizontalLine";
import ProjectGrid from "@/components/sections/ProjectGrid";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Catálogo de proyectos arquitectónicos de Praxis Taller.",
};

export default function ProyectosPage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Header de listado */}
      <section className="relative pb-20 pt-40 md:pb-32 md:pt-48">
        <Container size="wide">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 md:col-span-7">
              <Eyebrow num="物件">Proyectos</Eyebrow>
              <h1 className="mt-6 font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
                Casas que se construyen
                <span className="block text-sabi">con tiempo.</span>
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <HorizontalLine className="mb-6 w-16" />
              <p className="max-w-sm text-[13px] leading-relaxed text-sabi">
                Cada proyecto responde a una geografía, un cliente y un
                silencio particular. No buscamos un estilo Praxis — buscamos
                la respuesta correcta.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid de proyectos */}
      <section className="pb-24 md:pb-40">
        <Container size="wide">
          <ProjectGrid projects={projects} />
        </Container>
      </section>
    </>
  );
}
