"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { NavItem } from "@/lib/nav";

type Pos = { left: number; width: number; opacity: number };

/**
 * Sliding-pill nav: a brand-coloured cursor follows the hovered tab.
 * Active tab keeps a persistent underline so location is always clear.
 */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [pos, setPos] = useState<Pos>({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      className="relative flex w-fit items-center rounded-full border border-border bg-card/70 p-1 backdrop-blur"
      onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
    >
      {items.map((item) => {
        const active =
          item.href === pathname ||
          (item.href.split("/").length > 2 && pathname.startsWith(item.href));
        return (
          <Tab key={item.href} setPos={setPos} active={active}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="block px-4 py-2 text-[0.95rem] font-medium"
            >
              {item.label}
            </Link>
          </Tab>
        );
      })}
      <Cursor pos={pos} />
    </ul>
  );
}

function Tab({
  children,
  setPos,
  active,
}: {
  children: React.ReactNode;
  setPos: (p: Pos) => void;
  active: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPos({ width, opacity: 1, left: ref.current.offsetLeft });
      }}
      className={
        "relative z-10 block cursor-pointer transition-colors " +
        (active
          ? "text-primary [&_a]:after:absolute [&_a]:after:inset-x-4 [&_a]:after:-bottom-0 [&_a]:after:h-0.5 [&_a]:after:rounded-full [&_a]:after:bg-accent"
          : "text-muted-foreground hover:text-primary")
      }
    >
      {children}
    </li>
  );
}

function Cursor({ pos }: { pos: Pos }) {
  return (
    <motion.li
      animate={{ left: pos.left, width: pos.width, opacity: pos.opacity }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="absolute inset-y-1 z-0 rounded-full"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.58 0.19 256 / 0.16), oklch(0.80 0.12 205 / 0.16))",
      }}
    />
  );
}
