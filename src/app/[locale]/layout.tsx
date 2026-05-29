import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sora, Hanken_Grotesk } from "next/font/google";
import "../globals.css";
import { locales, isLocale, company } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getNavItems } from "@/lib/nav";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Variable fonts via next/font/google — self-hosted at build, no runtime calls.
// The "latin" subset covers all French accents (U+00C0–00FF), so FR + EN render.
const display = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  const title = isFr
    ? "Group JL Trading — Transport & logistique à Dubaï"
    : "Group JL Trading — Transport & logistics in Dubai";
  const description = isFr
    ? "JL Results Transport FZCO : transferts de personnes et transport de colis à travers les Émirats. Fiable, sécurisé, disponible 24/7."
    : "JL Results Transport FZCO: passenger transfers and parcel transport across the Emirates. Reliable, secure, available 24/7.";

  return {
    metadataBase: new URL(company.siteUrl),
    title: { default: title, template: `%s · Group JL Trading` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Group JL Trading",
      locale: isFr ? "fr_FR" : "en_US",
      title,
      description,
      url: `${company.siteUrl}/${locale}`,
    },
    twitter: { card: "summary_large_image", title, description },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const items = getNavItems(locale, dict.nav);

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader
          locale={locale}
          items={items}
          bookLabel={dict.nav.book}
          menuLabel={dict.common.menu}
          closeLabel={dict.common.close}
        />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}

/** LocalBusiness structured data for SEO. */
function JsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: company.legalName,
    alternateName: company.brand,
    url: `${company.siteUrl}/${locale}`,
    telephone: company.phones[0],
    email: company.emails[0],
    parentOrganization: { "@type": "Organization", name: company.group },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["AE", "CD"],
    openingHours: "Mo-Su 00:00-23:59",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
