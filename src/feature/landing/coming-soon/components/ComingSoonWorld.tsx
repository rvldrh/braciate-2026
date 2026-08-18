"use client";

import type { RefObject } from "react";

import { ComingSoonStageBottom } from "./ComingSoonStageBottom";
import { ComingSoonStageTop } from "./ComingSoonStageTop";

interface ComingSoonWorldProps {
  worldRef: RefObject<HTMLDivElement | null>;
  bgRevealRef: RefObject<HTMLDivElement | null>;
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
    // Heights must match WORLD_HEIGHT_DVH in constants/coming-soon.constant.ts.
    <div
      ref={worldRef}
      className="absolute inset-x-0 top-0 flex h-[200dvh] flex-col will-change-transform md:h-[210dvh] lg:h-[220dvh]"
    >
      <ComingSoonStageTop
        bgRevealRef={bgRevealRef}
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
