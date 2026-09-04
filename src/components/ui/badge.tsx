import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Soft Solar: runde Pille, Standard in sanftem Gold (bg-accent) mit dunklem Goldtext. */
const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border-0 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:ring-[3px] aria-invalid:ring-destructive/60 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-accent text-[#6E5510] [a]:hover:bg-[#e9dcb0]",
        secondary:
          "bg-background text-foreground shadow-[var(--neu-raise-sm)] [a]:hover:-translate-y-px",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "bg-background text-muted-foreground shadow-[var(--neu-raise-sm)] [a]:hover:text-foreground",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-foreground underline decoration-[color:var(--solar-gold)] decoration-2 underline-offset-4 hover:text-[color:var(--solar-gold-dark)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
