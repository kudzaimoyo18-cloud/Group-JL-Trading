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
        "inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-foreground",
        className,
      )}
    >
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </span>
  );
}
