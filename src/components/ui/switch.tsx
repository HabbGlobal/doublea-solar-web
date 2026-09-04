"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

/**
 * Soft Solar: eingelassene Schiene (kleiner Innenschatten), eingeschaltet im
 * Gold-Verlauf; weisser Knopf mit kleinem Schatten.
 */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full bg-background shadow-[inset_3px_3px_6px_var(--neu-dark),inset_-3px_-3px_6px_var(--neu-light)] transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-[3px] aria-invalid:ring-destructive/60 data-[size=default]:h-7 data-[size=default]:w-12 data-[size=sm]:h-5 data-[size=sm]:w-9 data-checked:bg-[linear-gradient(135deg,#ddb955,#b8912a)] data-checked:shadow-[inset_2px_2px_4px_rgba(110,85,16,0.35)] data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-white shadow-[2px_2px_5px_rgba(18,18,18,0.25)] ring-0 transition-transform group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-3.5 group-data-[size=default]/switch:data-unchecked:translate-x-1 group-data-[size=default]/switch:data-checked:translate-x-6 group-data-[size=sm]/switch:data-unchecked:translate-x-[3px] group-data-[size=sm]/switch:data-checked:translate-x-[19px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
