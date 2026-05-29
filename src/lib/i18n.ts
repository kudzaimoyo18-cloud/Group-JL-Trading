export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Company contact details — single source of truth, reused across the app. */
export const company = {
  legalName: "JL Results Transport FZCO",
  brand: "Group JL Trading",
  group: "Groupe JL Consulting",
  phones: ["+971 52 670 0690", "+971 58 616 4158"],
  // E.164 digits only, used for tel: and wa.me links
  whatsapp: "971526700690",
  emails: ["contact@jlgrouptrading.com", "jlresulttransportfzco@jltradinggroup.com"],
  address: {
    line1: "IFZA Properties, DSO-IFZA",
    line2: "Dubai Silicon Oasis, Dubai, UAE",
  },
  kinshasa: "Kinshasa, DR Congo",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://group-jl-trading.vercel.app",
};
