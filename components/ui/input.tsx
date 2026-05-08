import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border border-sky-300 bg-sky-50/95 px-2.5 py-1 text-base text-sky-950 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-accent)_18%,white)] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sky-700/65 focus-visible:border-sky-500 focus-visible:ring-3 focus-visible:ring-sky-300/65 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-sky-100/70 disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
