import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { tones, type Tone } from "@/lib/tones";

/** Compact intro header used by interior pages (About, Services, Contact). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "electric",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(48rem 28rem at 90% -20%, ${t.main.replace(")", " / 0.24)")}, transparent 60%),
            radial-gradient(40rem 28rem at -10% 0%, ${t.soft.replace(")", " / 0.26)")}, transparent 55%)
          `,
        }}
      />
      <div className="container-page py-16 lg:py-24">
        <Reveal className="max-w-3xl">
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem]">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
