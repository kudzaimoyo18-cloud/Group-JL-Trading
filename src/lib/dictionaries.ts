import "server-only";
import type { Locale } from "./i18n";

const dictionaries = {
  fr: () => import("@/dictionaries/fr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

/** Shape of a loaded dictionary, derived from the source JSON. */
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
