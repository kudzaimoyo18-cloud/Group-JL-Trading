import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/i18n";

/** Deep-links to WhatsApp with a pre-filled message. No backend needed. */
export function WhatsAppButton({
  label,
  message,
  variant = "primary",
  size = "lg",
  className,
}: {
  label: string;
  message?: string;
  variant?: "primary" | "accent" | "outline" | "darkOutline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const href = `https://wa.me/${company.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <Button
      href={href}
      external
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </Button>
  );
}
