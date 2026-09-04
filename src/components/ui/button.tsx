import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Soft Solar: Buttons sind weich erhaben und werden beim Drücken eingelassen.
 * default = Gold (Hauptaktion), secondary/outline = erhaben in Grundfarbe,
 * ghost = ohne Schatten, destructive = rot, link = Text mit Gold-Unterstrich.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-2xl text-[15px] font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-150 outline-none select-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] aria-invalid:ring-destructive/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#ddb955,#b8912a)] text-[#121212] shadow-[var(--neu-raise-sm)] hover:-translate-y-px active:translate-y-0 active:shadow-[var(--neu-inset)] aria-expanded:shadow-[var(--neu-inset)]",
        outline:
          "bg-background text-foreground shadow-[var(--neu-raise-sm)] hover:-translate-y-px active:translate-y-0 active:shadow-[var(--neu-inset)] aria-expanded:shadow-[var(--neu-inset)]",
        secondary:
          "bg-background text-foreground shadow-[var(--neu-raise-sm)] hover:-translate-y-px active:translate-y-0 active:shadow-[var(--neu-inset)] aria-expanded:shadow-[var(--neu-inset)]",
        ghost:
          "text-foreground hover:bg-muted/70 aria-expanded:bg-muted/70",
        destructive:
          "bg-destructive/10 text-destructive shadow-[var(--neu-raise-sm)] hover:bg-destructive/20 active:shadow-[var(--neu-inset)] focus-visible:ring-destructive/40",
        link: "text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 hover:text-[color:var(--solar-gold-dark)]",
      },
      size: {
        default:
          "min-h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "min-h-9 gap-1.5 rounded-xl px-3 text-xs has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-10 gap-1.5 rounded-xl px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-12 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-11",
        "icon-xs":
          "size-9 rounded-xl [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-10 rounded-xl",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
