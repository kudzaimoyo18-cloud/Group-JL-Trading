import * as React from "react";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldStyles, "h-auto min-h-32 py-3 leading-relaxed", className)}
      {...props}
    />
  );
});
