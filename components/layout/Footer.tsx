"use client";

/**
 * Footer — solo lo esencial. Líneas finas, sin redes gigantes.
 */

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-stone-200 bg-shironeri">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 gap-8 px-6 py-16 md:px-12 md:py-24">
        <div className="col-span-12 md:col-span-6">
          <p className="font-serif text-3xl font-light leading-tight md:text-5xl">
            Construir con silencio.
            <span className="block text-sabi">Habitar con tiempo.</span>
          </p>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-sabi">
            Praxis Taller diseña, vende y acompaña proyectos arquitectónicos
            donde el espacio vacío y la materia tienen el mismo peso.
          </p>
        </div>

        <div className="col-span-6 md:col-span-3 md:col-start-8">
          <p className="text-xs uppercase tracking-eyebrow text-sabi">Visita</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link href="/proyectos" className="nav-link">Proyectos</Link>
            </li>
            <li>
              <Link href="/filosofia" className="nav-link">Filosofía</Link>
            </li>
            <li>
              <Link href="/contacto" className="nav-link">Contacto</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <p className="text-xs uppercase tracking-eyebrow text-sabi">Estudio</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a
                href="https://www.instagram.com/praxis.taller/"
                target="_blank"
                rel="noreferrer"
                className="nav-link"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:hola@praxistaller.com"
                className="nav-link"
              >
                hola@praxistaller.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-200">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 md:px-12">
          <p className="text-xs uppercase tracking-eyebrow text-sabi">
            © {year} · Praxis Taller
          </p>
          <p className="font-jp text-xs tracking-widest text-sabi">
            静 · 間 · 寂
          </p>
        </div>
      </div>
    </footer>
  );
}
