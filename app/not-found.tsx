import Link from "next/link";
import Container from "@/components/ui/Container";
import KanjiAccent from "@/components/ui/KanjiAccent";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-32">
      <Container size="narrow" className="text-center">
        <div className="flex justify-center">
          <KanjiAccent
            char="無"
            label="mu — vacío"
            className="text-6xl tracking-widest"
            vertical={false}
          />
        </div>
        <p className="mt-12 text-xs uppercase tracking-eyebrow text-sabi">
          Error · 404
        </p>
        <h1 className="mt-6 font-serif text-5xl font-light leading-tight md:text-7xl">
          Esta página no existe.
        </h1>
        <p className="mt-8 text-base text-sumi/80">
          O todavía no la hemos construido — Praxis trabaja despacio.
        </p>
        <div className="mt-16">
          <Link
            href="/"
            className="nav-link text-xs uppercase tracking-eyebrow text-sumi"
          >
            ← Volver al inicio
          </Link>
        </div>
      </Container>
    </section>
  );
}
