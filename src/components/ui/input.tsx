import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/**
 * Soft Solar: eingelassenes Feld (weicher Innenschatten), keine Rahmenlinie.
 * Fokus als Goldring mit Abstand zur Grundfläche.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-2xl border-0 bg-background px-4 py-2 text-base text-foreground shadow-[var(--neu-inset)] transition-[box-shadow] duration-150 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/60 aria-invalid:ring-offset-2 aria-invalid:ring-offset-background md:text-[15px]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
