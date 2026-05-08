import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import HorizontalLine from "@/components/ui/HorizontalLine";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Conversemos sobre tu proyecto. Praxis Taller.",
};

const canales = [
  { label: "Correo", value: "hola@praxistaller.com", href: "mailto:hola@praxistaller.com" },
  { label: "Instagram", value: "@praxis.taller", href: "https://www.instagram.com/praxis.taller/" },
  { label: "Estudio", value: "Av. Reforma 274, CDMX", href: undefined },
  { label: "Horario", value: "Lun — Vie · 10:00 — 18:00", href: undefined },
];

export default function ContactoPage() {
  return (
    <>
      <section className="relative pb-20 pt-40 md:pb-32 md:pt-48">
        <Container size="wide">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 md:col-span-9">
              <Eyebrow num="連絡">Contacto</Eyebrow>
              <h1 className="mt-6 font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-7xl">
                Conversemos.
              </h1>
              <p className="mt-8 max-w-xl font-serif text-lg font-light leading-relaxed text-sumi md:text-xl">
                Cada proyecto comienza con una conversación lenta. Cuéntanos
                qué quieres habitar — escribimos en español, dibujamos a mano,
                pensamos despacio.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CANALES */}
      <section className="border-y border-stone-200 py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-4">
            {canales.map((c, i) => (
              <div
                key={c.label}
                className={[
                  "py-6 md:px-8 md:py-0",
                  i > 0 ? "md:border-l md:border-stone-200" : "",
                ].join(" ")}
              >
                <p className="text-xs uppercase tracking-eyebrow text-sabi">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="nav-link mt-4 inline-block font-serif text-xl font-light text-sumi md:text-2xl"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-4 font-serif text-xl font-light text-sumi md:text-2xl">
                    {c.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FORMULARIO */}
      <section className="py-32 md:py-48">
        <Container size="narrow">
          <Eyebrow num="01">Cuéntanos tu proyecto</Eyebrow>

          <form
            className="mt-16 space-y-12"
            // Action stub — conectar a tu endpoint preferido (Resend, Formspree, etc.)
            action="https://formspree.io/f/your-form-id"
            method="POST"
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <Field name="nombre" label="Nombre" />
              <Field name="email" label="Correo" type="email" required />
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <Field name="ubicacion" label="Ubicación del proyecto" />
              <Field name="superficie" label="Superficie aproximada (m²)" type="number" />
            </div>

            <Field
              name="mensaje"
              label="Cuéntanos qué quieres habitar"
              textarea
              rows={6}
            />

            <div className="flex items-center justify-between border-t border-stone-200 pt-12">
              <p className="text-xs uppercase tracking-eyebrow text-sabi">
                Respondemos en 48h
              </p>
              <button
                type="submit"
                className="group inline-flex items-center gap-4 text-sm uppercase tracking-eyebrow text-sumi"
                data-cursor="Enviar"
              >
                <span>Enviar</span>
                <span className="inline-block h-px w-12 bg-sumi transition-all duration-700 ease-praxis group-hover:w-24" />
              </button>
            </div>
          </form>

          <div className="mt-32 flex justify-center">
            <HorizontalLine className="w-24" />
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  rows,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}) {
  const baseClass =
    "mt-4 w-full border-0 border-b border-stone-200 bg-transparent py-3 text-lg font-light text-sumi placeholder-sabi/50 outline-none transition-colors focus:border-sumi";

  return (
    <label htmlFor={name} className="block">
      <span className="text-xs uppercase tracking-eyebrow text-sabi">
        {label}
        {required && <span className="ml-1 text-aka">*</span>}
      </span>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={baseClass}
        />
      )}
    </label>
  );
}
