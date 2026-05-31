import { cn } from "@/lib/utils";

/** Small uppercase label that introduces a section. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-electric",
        className,
      )}
    >
      <span
        className="h-0.5 w-6 rounded-full"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, oklch(0.58 0.19 256), oklch(0.80 0.12 205))",
        }}
      />
      {children}
    </span>
  );
}
