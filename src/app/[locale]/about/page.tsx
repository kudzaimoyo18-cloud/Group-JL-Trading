import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Target, Eye, Building2, MapPin, Handshake, ShieldCheck, Users, Quote } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "fr");
  return {
    title: dict.about.hero.eyebrow,
    description: dict.about.hero.subtitle,
    alternates: { canonical: `/${locale}/about` },
  };
}

const valueIcons = [
  <Handshake key="0" className="h-6 w-6" />,
  <ShieldCheck key="1" className="h-6 w-6" />,
  <Users key="2" className="h-6 w-6" />,
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { about, home, common } = dict;

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        subtitle={about.hero.subtitle}
      />

      {/* Story + offices */}
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">{about.story.title}</h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground">
            {about.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {about.offices.title}
          </h3>
          {about.offices.items.map((o) => (
            <Card key={o.city} className="p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  {o.role === about.offices.items[0].role ? (
                    <Building2 className="h-5 w-5" />
                  ) : (
                    <MapPin className="h-5 w-5" />
                  )}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-primary">
                    {o.city}
                  </p>
                  <p className="text-sm font-medium text-accent-foreground">{o.role}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{o.address}</p>
                </div>
              </div>
            </Card>
          ))}
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-20 lg:py-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { icon: <Target className="h-6 w-6" />, ...about.mission },
            { icon: <Eye className="h-6 w-6" />, ...about.vision },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1}>
              <Card className="h-full bg-card">
                <CardContent className="p-8">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-primary text-primary-foreground">
                    {b.icon}
                  </span>
                  <h3 className="mt-6 text-2xl">{b.title}</h3>
                  <p className="mt-3 text-lg text-muted-foreground">{b.text}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading title={about.values.title} align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {about.values.items.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <Card className="h-full p-7 text-center">
                <span className="mx-auto grid h-13 w-13 place-items-center rounded-2xl bg-accent/15 text-accent-foreground">
                  {valueIcons[i]}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="bg-surface-dark py-20 lg:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src="/images/founder.jpeg"
                alt={about.founder.name}
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-2xl border border-white/10 bg-card px-5 py-3 shadow-lg">
              <p className="font-display text-base font-semibold text-primary">
                {about.founder.name}
              </p>
              <p className="text-sm text-muted-foreground">{about.founder.role}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {about.founder.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl text-surface-dark-foreground sm:text-4xl">
              {about.founder.title}
            </h2>
            <Quote className="mt-6 h-8 w-8 text-accent" />
            <blockquote className="mt-3 text-xl font-medium leading-relaxed text-surface-dark-foreground">
              {about.founder.quote}
            </blockquote>
            <p className="mt-6 text-surface-dark-foreground/75">{about.founder.bio}</p>
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
