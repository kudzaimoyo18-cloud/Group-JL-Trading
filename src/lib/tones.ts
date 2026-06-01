/**
 * Per-section colour tones — the single source of truth for the cool palette.
 * Each tone defines:
 *   - main / soft: oklch values used in glows + gradients
 *   - text:      eyebrow / accent text colour
 *
 * Keep it cool (electric, cyan, teal, indigo) so the brand stays unified.
 */
export type Tone = "electric" | "cyan" | "teal" | "indigo";

type ToneSpec = {
  main: string;
  soft: string;
  text: string;
};

export const tones: Record<Tone, ToneSpec> = {
  electric: {
    main: "oklch(0.58 0.19 256)",
    soft: "oklch(0.72 0.13 250)",
    text: "var(--color-electric)",
  },
  cyan: {
    main: "oklch(0.80 0.12 205)",
    soft: "oklch(0.88 0.08 200)",
    text: "var(--color-cyan)",
  },
  teal: {
    main: "oklch(0.70 0.12 195)",
    soft: "oklch(0.82 0.08 195)",
    text: "var(--color-teal)",
  },
  indigo: {
    main: "oklch(0.52 0.17 275)",
    soft: "oklch(0.68 0.13 275)",
    text: "var(--color-indigo)",
  },
};

/** A two-tone gradient used by glows and icon tiles. */
export function gradient(a: Tone, b: Tone, alphaA = 1, alphaB = 1, angle = 135) {
  const ca = withAlpha(tones[a].main, alphaA);
  const cb = withAlpha(tones[b].main, alphaB);
  return `linear-gradient(${angle}deg, ${ca}, ${cb})`;
}

/** Inject an alpha into an "oklch(L C H)" string -> "oklch(L C H / a)". */
function withAlpha(c: string, a: number) {
  if (a >= 1) return c;
  return c.replace(/oklch\(([^)]+)\)/, (_, body) => `oklch(${body} / ${a})`);
}

/** Per-tone radial glow used as a section backdrop. */
export function glowBg(tone: Tone) {
  const t = tones[tone];
  return [
    `radial-gradient(48rem 30rem at 90% -8%, ${withAlpha(t.main, 0.20)}, transparent 60%)`,
    `radial-gradient(42rem 30rem at -8% 12%, ${withAlpha(t.soft, 0.22)}, transparent 58%)`,
  ].join(", ");
}
