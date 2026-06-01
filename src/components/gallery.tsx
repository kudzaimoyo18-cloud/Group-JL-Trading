import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Glow } from "@/components/glow";
import type { Tone } from "@/lib/tones";

const shots = [
  { src: "/images/showcase-1.jpeg", className: "sm:col-span-2 aspect-[4/3]" },
  { src: "/images/showcase-3.jpeg", className: "aspect-[3/4] sm:row-span-2" },
  { src: "/images/showcase-2.jpeg", className: "sm:col-span-2 aspect-[16/9]" },
];

export function Gallery({
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
  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <Glow variant={tone} />
      <div className="container-page">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" tone={tone} />
      <Reveal
        className="mx-auto mt-12 grid max-w-5xl auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-3"
        delay={0.05}
      >
        {shots.map((s) => (
          <div
            key={s.src}
            className={`group relative overflow-hidden rounded-2xl border border-border bg-muted ${s.className}`}
          >
            <Image
              src={s.src}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </Reveal>
      </div>
    </section>
  );
}
