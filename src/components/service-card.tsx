import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ServiceCard({
  icon,
  title,
  desc,
  features,
  href,
  linkLabel,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features?: string[];
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-xl hover:shadow-electric/10",
        className,
      )}
    >
      {/* cool tint that blooms on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(26rem 18rem at 0% 0%, oklch(0.80 0.12 205 / 0.16), transparent 60%), radial-gradient(24rem 18rem at 100% 100%, oklch(0.58 0.19 256 / 0.14), transparent 60%)",
        }}
      />
      <span className="grid h-13 w-13 place-items-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.58 0.19 256), oklch(0.80 0.12 205))",
        }}
      >
        {icon}
      </span>

      <h3 className="mt-6 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted-foreground">{desc}</p>

      {features && features.length > 0 ? (
        <ul className="mt-6 space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[0.95rem]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
              <span className="text-foreground/90">{f}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {href && linkLabel ? (
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:text-accent-foreground"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </Card>
  );
}
