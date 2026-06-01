import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Wordmark: "JL" monogram tile + brand name.
 * Placeholder for the real LogoA01.png — swap the tile for an <Image> later.
 */
export function Logo({
  locale,
  tone = "light",
  className,
}: {
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="Group JL Trading — home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-bold tracking-tight text-primary-foreground shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5"
        aria-hidden
      >
        JL
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          Group JL Trading
        </span>
        <span className="mt-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          Results Transport
        </span>
      </span>
    </Link>
  );
}
