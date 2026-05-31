import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook, Linkedin } from "@/components/social-icons";
import { Logo } from "@/components/logo";
import { company, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getNavItems } from "@/lib/nav";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const items = getNavItems(locale, dict.nav);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(44rem 26rem at 88% -10%, oklch(0.58 0.19 256 / 0.30), transparent 60%), radial-gradient(38rem 26rem at 5% 110%, oklch(0.80 0.12 205 / 0.22), transparent 60%)",
        }}
      />
      <div className="relative container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo locale={locale} tone="dark" />
          <p className="mt-5 text-surface-dark-foreground/75">{dict.footer.tagline}</p>
          <p className="mt-4 text-sm text-surface-dark-foreground/55">
            {dict.footer.groupNote}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-surface-dark-foreground/60">
            {dict.footer.quickLinks}
          </h3>
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-surface-dark-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-surface-dark-foreground/60">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-4 text-surface-dark-foreground/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="flex flex-col">
                {company.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-accent">
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <a href={`mailto:${company.emails[0]}`} className="break-all hover:text-accent">
                {company.emails[0]}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                {company.address.line1}
                <br />
                {company.address.line2}
              </span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Instagram, href: company.socials.instagram, label: "Instagram" },
              { Icon: Facebook, href: company.socials.facebook, label: "Facebook" },
              { Icon: Linkedin, href: company.socials.linkedin, label: "LinkedIn" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-surface-dark-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-surface-dark-foreground/55 sm:flex-row">
          <p>
            © {year} {company.legalName}. {dict.footer.rights}
          </p>
          <p>Dubai, UAE · {company.kinshasa}</p>
        </div>
      </div>
    </footer>
  );
}
