"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { cn } from "@/lib/utils";

export function MobileNav({
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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when navigating, and lock scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="grid h-11 w-11 place-items-center rounded-xl border border-border text-primary transition-colors hover:bg-muted"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-primary/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col bg-card p-6 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between">
                <LanguageToggle locale={locale} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={closeLabel}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-border text-primary transition-colors hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {items.map((item, i) => {
                  const active =
                    item.href === pathname ||
                    (item.href.split("/").length > 2 &&
                      pathname.startsWith(item.href));
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                          active
                            ? "bg-muted text-primary"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6">
                <Button href={`/${locale}/contact`} variant="accent" size="lg" className="w-full">
                  {bookLabel}
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
