import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Historische Prop — es gibt nur noch eine Logo-Fassung. */
  variant?: "navy" | "light";
  /** Historische Prop — die Wortmarke ist Teil der Bilddatei. */
  iconOnly?: boolean;
  /** Im Header oberhalb des Falzes mit Priorität laden. */
  priority?: boolean;
};

/**
 * Markenzeichen DoubleA Solar Solutions (Logo 2026): Originaldatei mit
 * transparentem Hintergrund, Seitenverhältnis 2.93:1. Höhe über className
 * steuern (Standard 44px).
 */
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <span
      className={cn("inline-flex h-11 items-center", className)}
      aria-label="DoubleA Solar Solutions"
    >
      <Image
        src="/logo-2026.png"
        alt="DoubleA Solar Solutions"
        width={1200}
        height={410}
        priority={priority}
        className="h-full w-auto"
      />
    </span>
  );
}
