"use client";

import type { RefObject } from "react";

import { ComingSoonStageBottom } from "./ComingSoonStageBottom";
import { ComingSoonStageTop } from "./ComingSoonStageTop";

interface ComingSoonWorldProps {
  worldRef: RefObject<HTMLDivElement | null>;
  bgRevealRef: RefObject<HTMLDivElement | null>;
  heroRef: RefObject<HTMLDivElement | null>;
  logoRef: RefObject<HTMLDivElement | null>;
  jargonRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  dividerLeftRef: RefObject<HTMLDivElement | null>;
  dividerDiamondRef: RefObject<HTMLDivElement | null>;
  dividerRightRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  yearRef: RefObject<HTMLParagraphElement | null>;
}

export function ComingSoonWorld({
  worldRef,
  bgRevealRef,
  heroRef,
  logoRef,
  jargonRef,
  titleRef,
  dividerLeftRef,
  dividerDiamondRef,
  dividerRightRef,
  subtitleRef,
  yearRef,
}: ComingSoonWorldProps) {
  return (
    // Heights must match WORLD_HEIGHT_DVH in constants/coming-soon.layout.ts.
    // Extended to 6 breakpoint steps (was 3), mirroring ComingSoonStageTop.tsx
    // — see Fase 4 in the audit.
    <div
      ref={worldRef}
      className="absolute inset-x-0 top-0 flex h-[250dvh] flex-col will-change-transform sm:h-[204dvh] md:h-[208dvh] lg:h-[212dvh] xl:h-[216dvh] 2xl:h-[220dvh]"
    >
      <ComingSoonStageTop
        bgRevealRef={bgRevealRef}
        heroRef={heroRef}
        logoRef={logoRef}
        jargonRef={jargonRef}
        titleRef={titleRef}
        dividerLeftRef={dividerLeftRef}
        dividerDiamondRef={dividerDiamondRef}
        dividerRightRef={dividerRightRef}
        subtitleRef={subtitleRef}
        yearRef={yearRef}
      />

      <ComingSoonStageBottom />
    </div>
  );
}
