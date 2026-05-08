import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import HorizontalLine from "@/components/ui/HorizontalLine";
import MaskedImage from "@/components/animations/MaskedImage";

export const metadata: Metadata = {
  title: "Filosofía",
  description: "Cómo Praxis Taller piensa la arquitectura.",
};

const principios = [
  {
    kanji: "間",
    title: "Ma — el espacio vacío",
    body: "Lo que no está en la casa pesa tanto como lo que sí está. El espacio vacío no es un descanso entre las cosas: es la habitación donde sucede el tiempo.",
  },
  {
    kanji: "簡素",
    title: "Kanso — simplicidad",
    body: "Eliminamos lo que no responde a una pregunta clara. Si una decisión no puede defenderse en una sola frase, probablemente sobra.",
  },
  {
    kanji: "渋い",
    title: "Shibui — belleza discreta",
    body: "La elegancia no se anuncia. Se descubre con el tiempo, en una junta bien resuelta, en una sombra que cae donde debe, en una textura que envejece sin quejarse.",
  },
  {
    kanji: "侘寂",
    title: "Wabi-sabi — la huella del tiempo",
    body: "Diseñamos para que el paso del tiempo mejore la casa, no para que la deteriore. La pátina no es defecto: es completitud.",
  },
];

export default function FilosofiaPage() {
  return (
    <>
      {/* HEADER */}
      <section className="relative pb-20 pt-40 md:pb-32 md:pt-48">
        <Container size="wide">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 md:col-span-9">
              <Eyebrow num="哲学">Filosofía</Eyebrow>
              <h1 className="mt-6 font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">
                Diseñar <span className="text-sabi">es quitar.</span>
              </h1>
            </div>
          </div>
        </Container>
      </section>

      {/* MANIFIESTO LARGO */}
      <section className="py-20 md:py-32">
        <Container size="narrow">
          <div className="space-y-6 font-serif text-lg font-light leading-[1.65] text-sumi md:text-xl">
            <p>
              Praxis Taller nace de una convicción simple: la arquitectura
              residencial mexicana ha aprendido a construir bien — pero ha
              olvidado cómo construir despacio.
            </p>
            <p>
              Trabajamos con presupuestos serios, materiales nobles y plazos
              que respetan al oficio. Cada proyecto pasa por un proceso de
              maceración: lo bocetamos, lo dejamos reposar, lo cuestionamos,
              lo simplificamos. Lo que entregamos al cliente es lo que
              sobrevivió a esa lentitud.
            </p>
            <p>
              No tenemos un estilo. Tenemos una manera de mirar. Nuestros
              proyectos en valle, en bosque, en costa o en ciudad responden
              a sus geografías sin imponer una firma. Lo único que se repite
              es la atención.
            </p>
          </div>

          <HorizontalLine className="mt-12 w-16" />
        </Container>
      </section>

      {/* PRINCIPIOS — grid de 4 con kanjis */}
      <section className="bg-washi py-32 md:py-48">
        <Container size="wide">
          <Eyebrow num="原則" className="mb-16">
            Cuatro principios
          </Eyebrow>
          <div className="grid grid-cols-1 gap-x-12 gap-y-20 md:grid-cols-2 md:gap-y-32">
            {principios.map((p, i) => (
              <div key={i} className="border-t border-stone-200 pt-12">
                <div className="flex items-start justify-between">
                  <p className="font-serif text-sm text-sabi">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="font-jp text-3xl text-sumi">
                    {p.kanji}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-2xl font-light leading-tight md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sumi/80">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CIERRE — imagen lateral con cita */}
      <section className="py-32 md:py-56">
        <Container size="wide">
          <div className="grid grid-cols-12 items-center gap-8 md:gap-16">
            <div className="col-span-12 md:col-span-6">
              <MaskedImage
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
                alt="Patio interior con lámina de agua"
                aspect="4/5"
              />
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <blockquote className="border-l-2 border-aka/60 pl-8 md:pl-12">
                <p className="font-serif text-2xl font-light italic leading-snug md:text-4xl">
                  "Una casa terminada no es una casa que ya no cambia. Es una
                  casa preparada para envejecer bien."
                </p>
                <footer className="mt-8 text-xs uppercase tracking-eyebrow text-sabi">
                  Praxis Taller, 2024
                </footer>
              </blockquote>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
