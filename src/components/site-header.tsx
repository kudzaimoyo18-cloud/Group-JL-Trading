"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";
import { Logo } from "@/components/logo";
import { NavLinks } from "@/components/nav-links";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({
  locale,
  items,
  bookLabel,
  menuLabel,
  closeLabel,
}: {
  locale: Locale;
  items: NavItem[];
  bookLabel: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo locale={locale} />

        <div className="hidden items-center gap-2 lg:flex">
          <NavLinks items={items} />
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle locale={locale} />
          <Button href={`/${locale}/contact`} variant="accent" size="sm">
            {bookLabel}
          </Button>
        </div>

        <MobileNav
          locale={locale}
          items={items}
          bookLabel={bookLabel}
          menuLabel={menuLabel}
          closeLabel={closeLabel}
        />
      </div>
    </header>
  );
}
