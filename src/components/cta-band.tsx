import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import type { Locale } from "@/lib/i18n";

export function CtaBand({
  locale,
  title,
  subtitle,
  buttonLabel,
  whatsappLabel,
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  buttonLabel: string;
  whatsappLabel: string;
}) {
  return (
    <section className="container-page py-20 lg:py-24">
      <Reveal className="relative overflow-hidden rounded-3xl bg-surface-dark px-8 py-14 text-center sm:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40rem 24rem at 80% 120%, oklch(0.81 0.142 78 / 0.22), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl text-surface-dark-foreground sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-surface-dark-foreground/75">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={`/${locale}/contact`} variant="accent" size="lg">
              {buttonLabel}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <WhatsAppButton label={whatsappLabel} variant="darkOutline" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
