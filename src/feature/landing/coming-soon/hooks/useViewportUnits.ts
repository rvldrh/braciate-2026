"use client";

import { useEffect, useState } from "react";

import { getViewportUnits, type ViewportUnits } from "../utils/viewport";

const EMPTY_UNITS: ViewportUnits = {
  vw: 0,
  vh: 0,
  viewportHeightPx: 0,
  viewportWidthPx: 0,
};

/**
 * Reactive React wrapper around `viewport.ts`'s `getViewportUnits()`.
 *
 * NOTE: `useComingSoonTimeline.tsx` intentionally does NOT use this hook
 * — it calls `getViewportUnits()` directly, once, at mount, exactly as
 * documented in `viewport.ts` ("this is a one-shot entrance animation...
 * re-measuring mid-timeline would fight GSAP's own tween values"). This
 * hook exists for any FUTURE consumer that genuinely needs to react to
 * resize/orientation changes (e.g. a persistent UI element, not a
 * one-shot intro), so that consumer doesn't have to re-invent the
 * resize/orientation subscription.
 */
export function useViewportUnits(): ViewportUnits {
  const [units, setUnits] = useState<ViewportUnits>(() =>
    typeof window === "undefined" ? EMPTY_UNITS : getViewportUnits(),
  );

  useEffect(() => {
    const measure = () => setUnits(getViewportUnits());
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  return units;
}
