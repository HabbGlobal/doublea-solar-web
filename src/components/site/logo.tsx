import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "navy" | "light";
};

export function Logo({ className, variant = "navy" }: LogoProps) {
  const stroke = variant === "navy" ? "var(--solar-navy)" : "#f8faf7";
  const accent = "var(--solar-gold)";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="size-7"
        fill="none"
      >
        <path
          d="M5 24 L13 6 L19 6 L11 24 Z"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M14 24 L22 6 L28 6 L20 24 Z"
          stroke={stroke}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="22.5" cy="9" r="2.2" fill={accent} />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[15px]">DoubleA</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
          Solar Solutions
        </span>
      </span>
    </span>
  );
}
