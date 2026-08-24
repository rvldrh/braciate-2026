"use client";

import { useEffect, useState } from "react";

import { BREAKPOINTS } from "../constants/coming-soon.layout";

export type BreakpointTier = "mobile" | "tablet" | "desktop";

/**
 * Pure function version — usable outside React (inside the GSAP hook,
 * inside a `useMemo`, etc) without paying for a subscription you don't
 * need. `useBreakpoint()` below is the reactive React wrapper around
 * this same function.
 *
 * This is the ONE place `768`/`1024` are compared against
 * `window.innerWidth`. Previously this comparison was duplicated
 * (identically) in ComingSoonStarfield.tsx AND useComingSoonTimeline.tsx
 * — see coming-soon-responsive-audit.md §2, "duplikasi sumber
 * kebenaran".
 */
export function getBreakpointTier(width: number): BreakpointTier {
  if (width < BREAKPOINTS.tablet) return "mobile";
  if (width < BREAKPOINTS.desktop) return "tablet";
  return "desktop";
}

/**
 * Reactive React hook — re-renders on resize/orientation change. Use
 * this in components; use `getBreakpointTier()` directly in one-shot
 * imperative code (e.g. inside a GSAP `useGSAP` callback) where you
 * don't want a re-render subscription.
 */
export function useBreakpoint(): BreakpointTier {
  const [tier, setTier] = useState<BreakpointTier>(() =>
    typeof window === "undefined" ? "mobile" : getBreakpointTier(window.innerWidth),
  );

  useEffect(() => {
    const onResize = () => setTier(getBreakpointTier(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tier;
}
