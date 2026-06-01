"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin, Navigation, Package, Plane, Clock } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

type HeroDict = {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type Stat = { value: string; label: string };

export function Hero({
  locale,
  dict,
  stats,
}: {
  locale: Locale;
  dict: HeroDict;
  stats: Stat[];
}) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const item = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <section className="relative overflow-hidden">
      {/* photographic backdrop */}
      <Image
        src="/images/hero-bg.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* navy scrim so foreground text stays readable over the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.155 0.025 260 / 0.86) 0%, oklch(0.155 0.025 260 / 0.74) 45%, oklch(0.155 0.025 260 / 0.92) 100%), radial-gradient(60rem 40rem at 85% -10%, oklch(0.72 0.16 256 / 0.38), transparent 60%), radial-gradient(50rem 40rem at -10% 10%, oklch(0.82 0.12 205 / 0.34), transparent 55%)",
        }}
      />

      <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <motion.div {...item(0)}>
            <Eyebrow>{dict.badge}</Eyebrow>
          </motion.div>

          <motion.h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl"
            {...item(0.08)}
          >
            {dict.title}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
            {...item(0.16)}
          >
            {dict.subtitle}
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" {...item(0.24)}>
            <Button href={`/${locale}/contact`} variant="accent" size="lg">
              {dict.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={`/${locale}/services`} variant="outline" size="lg">
              {dict.ctaSecondary}
            </Button>
          </motion.div>

          <motion.dl
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
            {...item(0.32)}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-bold text-primary">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <TrackingCard />
        </motion.div>
      </div>
    </section>
  );
}

/** Decorative real-time tracking mock — reinforces the "suivi en temps réel" USP. */
function TrackingCard() {
  return (
    <div className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-xl shadow-primary/5">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          En route
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> ETA 14:25
        </span>
      </div>

      <div className="mt-6 space-y-5">
        <Stop icon={<Package className="h-4 w-4" />} title="Dubai Silicon Oasis" sub="Pickup · 13:40" done />
        <div className="ml-[0.6875rem] h-8 border-l-2 border-dashed border-border" />
        <Stop icon={<Plane className="h-4 w-4" />} title="DXB — Terminal 3" sub="Transit · 14:05" active />
        <div className="ml-[0.6875rem] h-8 border-l-2 border-dashed border-border" />
        <Stop icon={<MapPin className="h-4 w-4" />} title="Downtown Dubai" sub="Drop-off · 14:25" />
      </div>

      {/* floating accent chip */}
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-lg sm:flex">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Navigation className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="font-display text-lg font-bold text-primary">100%</p>
          <p className="text-xs text-muted-foreground">Suivi live</p>
        </div>
      </div>
    </div>
  );
}

function Stop({
  icon,
  title,
  sub,
  active,
  done,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={
          "grid h-6 w-6 shrink-0 place-items-center rounded-full " +
          (active
            ? "bg-accent text-accent-foreground"
            : done
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground")
        }
      >
        {icon}
      </span>
      <div className="leading-tight">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}
