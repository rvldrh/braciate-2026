"use client";

import type { RefObject } from "react";

interface ComingSoonSubtitleProps {
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  yearRef: RefObject<HTMLParagraphElement | null>;
}

export function ComingSoonSubtitle({
  subtitleRef,
  yearRef,
}: ComingSoonSubtitleProps) {
  return (
    <div className="absolute left-1/2 z-40 flex -translate-x-1/2 flex-col items-center text-center font-the-seasons tracking-widest whitespace-nowrap top-[62vh] md:top-[64vh] lg:top-[66vh]">
      <p
        ref={subtitleRef}
        className="text-xs text-yellow-100 sm:text-sm md:text-base lg:text-xl xl:text-2xl"
        style={{
          letterSpacing: "0.15em",
          opacity: 0,
        }}
      >
        Brawijaya Festival Appreciate
      </p>

      <p
        ref={yearRef}
        className="text-xs mt-2 font-medium text-yellow-100 sm:text-sm md:text-base lg:text-xl xl:text-2xl"
        style={{
          letterSpacing: "0.15em",
          opacity: 0,
        }}
      >
        2026
      </p>
    </div>
  );
}
