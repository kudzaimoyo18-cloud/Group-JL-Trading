import { notFound } from "next/navigation";
import {
  Plane,
  Package,
  Route,
  ShieldCheck,
  Clock,
  Lock,
  Navigation,
  SlidersHorizontal,
} from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { ScrollIntro } from "@/components/scroll-intro";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { Gallery } from "@/components/gallery";
import { Glow } from "@/components/glow";
import { CtaBand } from "@/components/cta-band";

const serviceIcons = [
  <Plane key="0" className="h-6 w-6" />,
  <Package key="1" className="h-6 w-6" />,
  <Route key="2" className="h-6 w-6" />,
];

const whyIcons = [
  <ShieldCheck key="0" className="h-6 w-6" />,
  <Clock key="1" className="h-6 w-6" />,
  <Lock key="2" className="h-6 w-6" />,
  <Navigation key="3" className="h-6 w-6" />,
  <SlidersHorizontal key="4" className="h-6 w-6" />,
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { home, services, common } = dict;

  return (
    <>
      <ScrollIntro dict={home.intro} />
      <Hero locale={locale} dict={home.hero} stats={home.stats} />

      {/* Services preview */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <Glow variant="electric" />
        <div className="container-page">
        <SectionHeading
          eyebrow={home.servicesIntro.eyebrow}
          title={home.servicesIntro.title}
          subtitle={home.servicesIntro.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <ServiceCard
                icon={serviceIcons[i]}
                title={s.title}
                desc={s.desc}
                href={`/${locale}/services`}
                linkLabel={common.discover}
              />
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-muted py-20 lg:py-24">
        <Glow variant="cyan" />
        <div className="relative container-page">
          <SectionHeading
            eyebrow={home.why.eyebrow}
            title={home.why.title}
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {home.why.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.06} className="flex gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.58 0.19 256), oklch(0.80 0.12 205))",
                  }}
                >
                  {whyIcons[i]}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{it.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{it.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery
        eyebrow={home.gallery.eyebrow}
        title={home.gallery.title}
        subtitle={home.gallery.subtitle}
      />

      {/* Partners */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <Glow variant="mixed" />
        <div className="container-page">
        <SectionHeading
          eyebrow={home.partners.eyebrow}
          title={home.partners.title}
          subtitle={home.partners.subtitle}
          align="center"
        />
        <Reveal
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          delay={0.1}
        >
          {["Aurora", "Meridian", "Cedar & Co", "Northwind", "Atlas Cargo"].map(
            (name) => (
              <div
                key={name}
                className="flex h-20 items-center justify-center rounded-2xl border border-border bg-card font-display text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:border-electric/40 hover:text-primary"
              >
                {name}
              </div>
            ),
          )}
        </Reveal>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={home.cta.title}
        subtitle={home.cta.subtitle}
        buttonLabel={home.cta.button}
        whatsappLabel={common.whatsapp}
      />
    </>
  );
}
