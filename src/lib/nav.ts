import type { Locale } from "./i18n";
import type { Dictionary } from "./dictionaries";

export type NavItem = { href: string; label: string };

/** Build locale-prefixed nav items from a dictionary. */
export function getNavItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/services`, label: nav.services },
    { href: `/${locale}/contact`, label: nav.contact },
  ];
}
