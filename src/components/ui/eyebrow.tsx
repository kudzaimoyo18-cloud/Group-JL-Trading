import { cn } from "@/lib/utils";
import { tones, type Tone } from "@/lib/tones";

/**
 * Small uppercase section label. The accent bar + text colour follow
 * a tone, so each section can carry its own cool hue.
 */
export function Eyebrow({
  children,
  tone = "electric",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]",
        className,
      )}
      style={{ color: t.text }}
    >
      <span
        className="h-0.5 w-6 rounded-full"
        aria-hidden
        style={{ background: `linear-gradient(90deg, ${t.main}, ${t.soft})` }}
      />
      {children}
    </span>
  );
}
