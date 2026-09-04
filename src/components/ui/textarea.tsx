import * as React from "react"

import { cn } from "@/lib/utils"

/** Soft Solar: eingelassenes Mehrzeilenfeld, keine Rahmenlinie. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-12 w-full rounded-2xl border-0 bg-background px-4 py-3 text-base text-foreground shadow-[var(--neu-inset)] transition-[box-shadow] duration-150 outline-none placeholder:text-muted-foreground/70 focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/60 aria-invalid:ring-offset-2 aria-invalid:ring-offset-background md:text-[15px]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
