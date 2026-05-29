import type { MetadataRoute } from "next";
import { locales, company } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/services", "/contact"];
  const now = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${company.siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${company.siteUrl}/${l}${path}`]),
        ),
      },
    })),
  );
}
