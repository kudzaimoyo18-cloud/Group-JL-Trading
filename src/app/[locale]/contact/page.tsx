import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { isLocale, company } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/booking-form";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "fr");
  return {
    title: dict.contact.hero.eyebrow,
    description: dict.contact.hero.subtitle,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const { contact } = dict;

  const infoItems: {
    icon: ReactNode;
    label: string;
    lines: { text: string; href?: string }[];
  }[] = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: contact.info.phoneLabel,
      lines: company.phones.map((p) => ({ text: p, href: `tel:${p.replace(/\s/g, "")}` })),
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: contact.info.emailLabel,
      lines: company.emails.map((e) => ({ text: e, href: `mailto:${e}` })),
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: contact.info.addressLabel,
      lines: [{ text: `${company.address.line1}, ${company.address.line2}` }],
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: contact.info.hoursLabel,
      lines: [{ text: contact.info.hours }],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        subtitle={contact.hero.subtitle}
      />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:py-24">
        <Reveal className="flex flex-col gap-6">
          {infoItems.map((it) => (
            <div key={it.label} className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                {it.icon}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {it.label}
                </p>
                <div className="mt-1 flex flex-col">
                  {it.lines.map((l) =>
                    l.href ? (
                      <a
                        key={l.text}
                        href={l.href}
                        className="text-lg text-foreground transition-colors hover:text-accent-foreground"
                      >
                        {l.text}
                      </a>
                    ) : (
                      <span key={l.text} className="text-lg text-foreground">
                        {l.text}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="mt-2 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Map — Dubai Silicon Oasis"
              src="https://www.google.com/maps?q=IFZA%20Dubai%20Silicon%20Oasis&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <BookingForm dict={contact.form} />
        </Reveal>
      </section>
    </>
  );
}
