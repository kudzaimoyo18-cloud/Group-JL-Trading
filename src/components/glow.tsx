import { cn } from "@/lib/utils";

type GlowVariant = "hero" | "electric" | "cyan" | "mixed" | "dark";

/**
 * Decorative coloured glow layer (cool palette: electric blue + cyan).
 * Pure CSS radial gradients, pointer-events-none, sits behind content.
 */
const variants: Record<GlowVariant, string> = {
  // bright hero wash — electric top-right, cyan bottom-left
  hero:
    "radial-gradient(55rem 38rem at 85% -8%, oklch(0.58 0.19 256 / 0.30), transparent 60%), radial-gradient(48rem 36rem at -8% 12%, oklch(0.80 0.12 205 / 0.32), transparent 58%)",
  electric:
    "radial-gradient(46rem 30rem at 90% 0%, oklch(0.58 0.19 256 / 0.16), transparent 62%), radial-gradient(40rem 30rem at 5% 100%, oklch(0.72 0.13 250 / 0.14), transparent 60%)",
  cyan:
    "radial-gradient(46rem 30rem at 10% -10%, oklch(0.80 0.12 205 / 0.20), transparent 62%), radial-gradient(40rem 30rem at 95% 110%, oklch(0.58 0.19 256 / 0.14), transparent 60%)",
  mixed:
    "radial-gradient(40rem 28rem at 50% -20%, oklch(0.72 0.13 250 / 0.18), transparent 60%), radial-gradient(38rem 30rem at 100% 100%, oklch(0.80 0.12 205 / 0.18), transparent 58%)",
  // for dark navy surfaces (CTA / footer)
  dark:
    "radial-gradient(42rem 26rem at 80% 120%, oklch(0.58 0.19 256 / 0.40), transparent 60%), radial-gradient(36rem 24rem at 12% -10%, oklch(0.80 0.12 205 / 0.30), transparent 60%)",
};

export function Glow({
  variant = "electric",
  className,
}: {
  variant?: GlowVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{ background: variants[variant] }}
    />
  );
}
