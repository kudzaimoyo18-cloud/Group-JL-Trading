import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-bold text-accent/50">404</p>
      <h1 className="mt-4 text-3xl">Page introuvable · Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Cette page n&apos;existe pas ou a été déplacée. — This page doesn&apos;t
        exist or has moved.
      </p>
      <Button href="/fr" className="mt-8">
        Retour à l&apos;accueil · Back home
      </Button>
      <Link href="/en" className="mt-4 text-sm text-muted-foreground underline">
        English
      </Link>
    </section>
  );
}
