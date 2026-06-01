import { cn } from "@/lib/utils";
import { glowBg, tones, type Tone } from "@/lib/tones";

/**
 * Decorative coloured glow layer sitting behind section content.
 * Accepts a brand tone (electric | cyan | teal | indigo) plus optional preset
 * variants for special spots (hero, dark surfaces).
 */
type Variant = Tone | "hero" | "dark";

const PRESETS: Record<"hero" | "dark", string> = {
  // Bright hero wash — electric top-right, cyan bottom-left
  hero: `radial-gradient(55rem 38rem at 85% -8%, ${tones.electric.main.replace(")", " / 0.30)")}, transparent 60%), radial-gradient(48rem 36rem at -8% 12%, ${tones.cyan.main.replace(")", " / 0.32)")}, transparent 58%)`,
  // Coloured glows for navy CTA / footer surfaces
  dark: `radial-gradient(42rem 26rem at 80% 120%, ${tones.electric.main.replace(")", " / 0.40)")}, transparent 60%), radial-gradient(36rem 24rem at 12% -10%, ${tones.cyan.main.replace(")", " / 0.30)")}, transparent 60%)`,
};

export function Glow({
  variant = "electric",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const bg =
    variant === "hero" || variant === "dark"
      ? PRESETS[variant]
      : glowBg(variant);
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{ background: bg }}
    />
  );
}
