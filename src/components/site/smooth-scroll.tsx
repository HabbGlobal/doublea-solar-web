"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis Smooth Scroll — dezent, performant, respektiert reduced-motion.
 * Touch-Geräte behalten natives Scrollverhalten (Lenis hijackt Touch nicht).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      wheelMultiplier: 1,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
