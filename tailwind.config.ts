import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Praxis Taller — japonés minimalista
        sumi: "#1a1a1a", // tinta sumi — texto principal
        shironeri: "#f5f3ee", // blanco hueso — fondo principal
        washi: "#ebe7df", // papel washi — fondos secundarios
        sabi: "#8a7e6d", // marrón tierra apagado
        ai: "#1c2841", // índigo profundo — acento
        aka: "#8b1a1a", // rojo bermellón — acento (uso muy escaso)
        stone: {
          200: "#e7e5e0",
        },
      },
      fontFamily: {
        // Variables CSS expuestas por next/font
        // serif: Fraunces (variable, display)
        // sans:  Hanken Grotesk (variable, body/UI)
        // jp:    Shippori Mincho (kanji)
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui"],
        jp: ["var(--font-shippori)", "var(--font-fraunces)", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.3em",
        wider: "0.15em",
      },
      transitionTimingFunction: {
        // Curva suave usada en todo el sitio
        praxis: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "1200": "1200ms",
        "1500": "1500ms",
      },
      keyframes: {
        "scroll-pulse": {
          "0%, 100%": { transform: "scaleY(0.3)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "ink-spread": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
      },
      animation: {
        "scroll-pulse": "scroll-pulse 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "ink-spread": "ink-spread 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
