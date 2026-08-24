"use client";

import type { RefObject } from "react";

interface ComingSoonJargonProps {
  jargonRef: RefObject<HTMLDivElement | null>;
}

/**
 * RESPONSIVE FIX: this used to be `position: absolute; top: 48dvh` with
 * its own `-translate-x-1/2 -translate-y-1/2` centering — an independent
 * coordinate system from Logo (42dvh) and Title (36dvh). It is now
 * centered by its parent slot in ComingSoonHero.tsx (`absolute inset-0
 * flex items-center justify-center`), which is itself sized off Logo's
 * own box — so Jargon (which can be 1 or 2 lines depending on the
 * `sm:flex-row` breakpoint below) never has to guess its own vertical
 * position; it just fills the slot it's handed. `relative` here (instead
 * of the old `absolute`) is what makes this div a valid containing block
 * for its own absolutely-positioned sparkle children below.
 */
export function ComingSoonJargon({ jargonRef }: ComingSoonJargonProps) {
  const textStyle = {
    textShadow:
      "0 0 5px rgba(255, 225, 150, 0.3), 0 0 14px rgba(255, 205, 80, 0.18)",
    opacity: 0,
    filter: "blur(5px)",
    transform: "translateX(-10px)",
    clipPath: "inset(0 100% 0 0)",
  };

  return (
    <div
      ref={jargonRef}
      className="
  relative
  z-40
  w-full
  max-w-full
  overflow-visible
  text-center
  opacity-0
  will-change-transform
  sm:w-max
  sm:max-w-none
"
    >
      <div className=" flex flex-col items-center gap-1.5 sm:flex-row sm:gap-4">
        <div
          data-coming-soon-jargon-line="beyond"
          className="relative max-w-full overflow-hidden whitespace-nowrap sm:shrink-0 sm:max-w-none"
        >
          <p
            data-coming-soon-jargon-text="beyond"
            className="
    font-the-seasons
    text-[clamp(0.82rem,8cqw,1.5rem)]
    font-semibold
    leading-tight
    tracking-[0.06em]
    text-yellow-50
    will-change-transform
    sm:text-[clamp(1rem,60cqw,2rem)]
    sm:tracking-[0.12em]
  "
            style={textStyle}
          >
            Beyond Appreciation
          </p>
        </div>

        <div
          data-coming-soon-jargon-line="connection"
          className="relative max-w-full overflow-hidden whitespace-nowrap sm:shrink-0 sm:max-w-none"
        >
          <p
            data-coming-soon-jargon-text="connection"
            className="
   font-the-seasons
    text-[clamp(0.82rem,8cqw,1.5rem)]
    font-semibold
    leading-tight
    tracking-[0.06em]
    text-yellow-50
    will-change-transform
    sm:text-[clamp(1rem,60cqw,2rem)]
    sm:tracking-[0.12em]
  "
            style={textStyle}
          >
            Building Connection
          </p>
        </div>
      </div>

      <span
        data-coming-soon-jargon-sparkle="main"
        aria-hidden="true"
        className=" pointer-events-none absolute left-0 top-[25%] z-10 size-1.5 -translate-y-1/2 rounded-full bg-yellow-100 opacity-0 shadow-[0_0_8px_rgba(255,235,170,0.95)] md:size-2
        "
      />

      <span
        data-coming-soon-jargon-sparkle="small"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[72%] size-1 rounded-full bg-yellow-200 opacity-0 shadow-[0_0_7px_rgba(255,225,140,0.9)]"
      />
    </div>
  );
}
