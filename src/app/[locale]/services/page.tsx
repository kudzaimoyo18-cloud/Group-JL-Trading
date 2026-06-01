import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plane, Package, Route } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "fr");
  return {
    title: dict.services.hero.eyebrow,
    description: dict.services.hero.subtitle,
    alternates: { canonical: `/${locale}/services` },
  };
}

const icons = [
  <Plane key="0" className="h-6 w-6" />,
  <Package key="1" className="h-6 w-6" />,
  <Route key="2" className="h-6 w-6" />,
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { services, common } = dict;

  return (
    <>
      <PageHero
        eyebrow={services.hero.eyebrow}
        title={services.hero.title}
        subtitle={services.hero.subtitle}
        tone="teal"
      />

      {/* Service detail cards */}
      <section className="container-page py-20 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <ServiceCard
                icon={icons[i]}
                title={s.title}
                desc={s.desc}
                features={s.features}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-muted py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow={services.process.eyebrow}
            title={services.process.title}
            align="center"
            tone="teal"
          />
          <ol className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {services.process.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.1} className="relative">
                <span className="font-display text-5xl font-bold text-accent/40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={services.cta.title}
        subtitle={services.cta.subtitle}
        buttonLabel={services.cta.button}
        whatsappLabel={common.whatsapp}
      />
    </>
  );
}
