import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Loader de proyectos en /content/proyectos/*.mdx
 * — Frontmatter define toda la metadata estructurada.
 * — El cuerpo (markdown) es la narrativa de concepto.
 *
 * Para añadir un proyecto: crear un nuevo .mdx siguiendo el shape de
 * abajo. La página /proyectos/[slug] lo recoge automáticamente.
 */

export type GalleryItem =
  | string
  | { src: string; alt?: string; caption?: string; aspect?: string };

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  location: string;
  year: number;
  typology: string;
  area: number; // m²
  hero: string;
  heroAlt?: string;
  excerpt: string;
  quote?: string;
  gallery: GalleryItem[];
  detailBlocks?: { image: string; title: string; body: string; align?: "left" | "right" }[];
  specs?: { label: string; value: string }[];
  finalGallery?: GalleryItem[];
  order: number;
  kanji?: string; // kanji decorativo asociado al proyecto
};

export type Project = ProjectFrontmatter & {
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "proyectos");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    return { ...(data as ProjectFrontmatter), body: content.trim() };
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

/** Devuelve el siguiente proyecto en orden (cíclico). */
export function getNextProject(slug: string): Project | null {
  const all = getAllProjects();
  if (all.length === 0) return null;
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length];
}
