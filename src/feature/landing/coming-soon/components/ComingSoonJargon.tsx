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
      className=" absolute left-1/2 top-[44vh] z-40 w-[calc(100%-2rem)] max-w-fit -translate-x-1/2 -translate-y-1/2 overflow-visible text-center opacity-0 will-change-transform"
    >
      <div
        className="flexflex-colitems-centergap-1.5sm:flex-rowsm:gap-4"
      >
        <div
          data-coming-soon-jargon-line="beyond"
          className="relativemax-w-fulloverflow-hiddenwhitespace-nowrap"
        >
          <p
            data-coming-soon-jargon-text="beyond"
            className="font-the-seasonstext-[clamp(0.82rem,3.8vw,2.5rem)]font-semiboldleading-tighttracking-[0.06em]text-yellow-50will-change-transformsm:text-[clamp(1rem,2.4vw,2.5rem)]sm:tracking-[0.12em]
            "
            style={textStyle}
          >
            Beyond Appreciation
          </p>
        </div>

        <div
          data-coming-soon-jargon-line="connection"
          className="relativemax-w-fulloverflow-hiddenwhitespace-nowrapsm:mt-2
          "
        >
          <p
            data-coming-soon-jargon-text="connection"
            className="font-the-seasonstext-[clamp(0.82rem,3.8vw,2.5rem)]font-semiboldleading-tighttracking-[0.06em]text-yellow-50will-change-transformsm:text-[clamp(1rem,2.4vw,2.5rem)]sm:tracking-[0.12em]
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
        className="pointer-events-noneabsoluteleft-0top-[25%]z-10size-1.5-translate-y-1/2rounded-fullbg-yellow-100opacity-0shadow-[0_0_8px_rgba(255,235,170,0.95)]md:size-2
        "
      />

      <span
        data-coming-soon-jargon-sparkle="small"
        aria-hidden="true"
        className="pointer-events-noneabsoluteleft-0top-[72%]size-1rounded-fullbg-yellow-200opacity-0shadow-[0_0_7px_rgba(255,225,140,0.9)]
        "
      />
    </div>
  );
}