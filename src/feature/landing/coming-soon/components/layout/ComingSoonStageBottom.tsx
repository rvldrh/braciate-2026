"use client";

import { ComingSoonStarfield } from "../scene/ComingSoonStarfield";

export function ComingSoonStageBottom() {
  return (
    // `h-dvh` (Tailwind's built-in dynamic-viewport-height utility) instead
    // of `h-screen` (== 100vh) — see ComingSoonStageTop.tsx for why.
    <section className="relative h-dvh w-full shrink-0 overflow-hidden bg-blue-900">
      <ComingSoonStarfield />
    </section>
  );
}
