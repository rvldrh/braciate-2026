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
    <div className="absolute left-1/2 z-40 flex -translate-x-1/2 flex-col items-center whitespace-nowrap text-center font-the-seasons tracking-widest top-[46dvh] sm:top-[48dvh] md:top-[50dvh] lg:top-[60dvh]">
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
        className="mt-2 text-xs font-medium text-yellow-100 sm:text-sm md:text-base lg:text-xl xl:text-2xl"
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
