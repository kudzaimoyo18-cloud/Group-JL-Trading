"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Segmented FR / EN switch that keeps the visitor on the same page. */
export function LanguageToggle({
  locale,
  tone = "light",
}: {
  locale: Locale;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) => {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border p-0.5",
        tone === "dark" ? "border-white/20" : "border-border",
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={hrefFor(l)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : tone === "dark"
                  ? "text-surface-dark-foreground/70 hover:text-surface-dark-foreground"
                  : "text-muted-foreground hover:text-primary",
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
