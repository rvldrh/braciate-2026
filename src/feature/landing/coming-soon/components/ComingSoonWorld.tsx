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
    <div
      ref={worldRef}
      className="absolute inset-x-0 top-0 flex h-[200vh] flex-col will-change-transform md:h-[210vh] lg:h-[220vh]"
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
