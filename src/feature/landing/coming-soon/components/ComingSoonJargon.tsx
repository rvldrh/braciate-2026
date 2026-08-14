"use client";

import type { RefObject } from "react";

interface ComingSoonJargonProps {
  jargonRef: RefObject<HTMLDivElement | null>;
}

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
      className=" absolute left-1/2 top-[44vh] z-40 -translate-x-1/2 -translate-y-1/2 overflow-visible text-center opacity-0 will-change-transform"
    >
      <div className="flex items-center gap-4">
        <div
          data-coming-soon-jargon-line="beyond"
          className="relative overflow-hidden whitespace-nowrap"
        >
          <p
            data-coming-soon-jargon-text="beyond"
            className="font-the-seasons text-[clamp(1rem,2.4vw,2.5rem)] font-semibold tracking-[0.12em] text-yellow-50 will-change-transform"
            style={textStyle}
          >
            Beyond Appreciation
          </p>
        </div>

        <div
          data-coming-soon-jargon-line="connection"
          className="relative mt-2 overflow-hidden whitespace-nowrap"
        >
          <p
            data-coming-soon-jargon-text="connection"
            className="font-the-seasons text-[clamp(1rem,2.4vw,2.5rem)] font-semibold tracking-[0.12em] text-yellow-50 will-change-transform"
            style={textStyle}
          >
            Building Connection
          </p>
        </div>
      </div>

      <span
        data-coming-soon-jargon-sparkle="main"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[25%] z-10 size-1.5 -translate-y-1/2 rounded-full bg-yellow-100 opacity-0 shadow-[0_0_8px_rgba(255,235,170,0.95)] md:size-2"
      />

      <span
        data-coming-soon-jargon-sparkle="small"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[72%] size-1 rounded-full bg-yellow-200 opacity-0 shadow-[0_0_7px_rgba(255,225,140,0.9)]"
      />
    </div>
  );
}
