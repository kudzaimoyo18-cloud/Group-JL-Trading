import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const shots = [
  { src: "/images/showcase-1.jpeg", className: "sm:col-span-2 aspect-[4/3]" },
  { src: "/images/showcase-3.jpeg", className: "aspect-[3/4] sm:row-span-2" },
  { src: "/images/showcase-2.jpeg", className: "sm:col-span-2 aspect-[16/9]" },
];

export function Gallery({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="container-page py-20 lg:py-24">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />
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
    </section>
  );
}
