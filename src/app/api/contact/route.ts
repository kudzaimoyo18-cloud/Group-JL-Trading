import { NextResponse } from "next/server";
import { company } from "@/lib/i18n";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !isEmail(email) || !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No key configured (e.g. preview before setup): accept the lead but flag it
  // as not emailed. The WhatsApp button remains the always-on channel.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — lead received but not emailed:",
      { name, email, service: body.service },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: process.env.CONTACT_FROM ?? "Group JL Trading <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? company.emails[0],
      replyTo: email,
      subject: `Nouvelle demande — ${body.service ?? "Contact"} (${name})`,
      text: [
        `Nom: ${name}`,
        `Email: ${email}`,
        `Téléphone: ${body.phone ?? "-"}`,
        `Service: ${body.service ?? "-"}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
