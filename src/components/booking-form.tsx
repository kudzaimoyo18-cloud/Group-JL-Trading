"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input, fieldStyles } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export function BookingForm({ dict }: { dict: Dictionary["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: dict.serviceOptions[0],
    message: "",
  });

  const set = (k: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const whatsappHref = () => {
    const text = `${dict.name}: ${values.name}\n${dict.phone}: ${values.phone}\n${dict.service}: ${values.service}\n${dict.message}: ${values.message}`;
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setValues({ name: "", email: "", phone: "", service: dict.serviceOptions[0], message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/20 text-accent-foreground">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl">{dict.successTitle}</h3>
        <p className="mt-2 text-muted-foreground">{dict.successMsg}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">{dict.name}</Label>
          <Input id="name" required value={values.name} onChange={set("name")} placeholder={dict.namePlaceholder} autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="email">{dict.email}</Label>
          <Input id="email" type="email" required value={values.email} onChange={set("email")} placeholder={dict.emailPlaceholder} autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="phone">{dict.phone}</Label>
          <Input id="phone" type="tel" value={values.phone} onChange={set("phone")} placeholder={dict.phonePlaceholder} autoComplete="tel" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="service">{dict.service}</Label>
          <select id="service" value={values.service} onChange={set("service")} className={fieldStyles}>
            {dict.serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">{dict.message}</Label>
          <Textarea id="message" required value={values.message} onChange={set("message")} placeholder={dict.messagePlaceholder} />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          {dict.errorMsg}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="accent" size="lg" disabled={status === "sending"} className="sm:flex-1">
          <Send className="h-5 w-5" />
          {status === "sending" ? dict.sending : dict.submit}
        </Button>
        <span className="text-center text-sm text-muted-foreground sm:px-1">{dict.or}</span>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 font-medium text-foreground transition-colors hover:bg-muted sm:flex-1"
        >
          <MessageCircle className="h-5 w-5 text-accent-foreground" />
          {dict.whatsappButton}
        </a>
      </div>
    </form>
  );
}
