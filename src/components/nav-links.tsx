"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1" aria-label="Primary">
      {items.map((item) => {
        const active =
          item.href === pathname ||
          (item.href.split("/").length > 2 && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-lg px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            {item.label}
            {active ? (
              <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent" />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
