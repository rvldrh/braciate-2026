"use client";

import type { RefObject } from "react";

import { ComingSoonBackgroundReveal } from "./ComingSoonBackgroundReveal";
import { ComingSoonStarfield } from "./ComingSoonStarfield";
import { ComingSoonLogo } from "./ComingSoonLogo";
import { ComingSoonJargon } from "./ComingSoonJargon";
import { ComingSoonTitle } from "./ComingSoonTitle";
import { ComingSoonSubtitle } from "./ComingSoonSubtitle";

interface ComingSoonStageTopProps {
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

export function ComingSoonStageTop({
  bgRevealRef,
  logoRef,
  jargonRef,
  titleRef,
  dividerLeftRef,
  dividerDiamondRef,
  dividerRightRef,
  subtitleRef,
  yearRef,
}: ComingSoonStageTopProps) {
  return (
    // Heights must match STAGE_TOP_HEIGHT_DVH in constants/coming-soon.constant.ts.
    // Using `dvh` (not `vh`) so this tracks the REAL visible viewport on
    // mobile Safari / in-app browsers instead of the toolbar-inflated one.
    <section className="relative h-[100dvh] w-full shrink-0 overflow-hidden md:h-[110dvh] lg:h-[120dvh]">
      <ComingSoonBackgroundReveal ref={bgRevealRef} />

      <ComingSoonStarfield />

      <div className="absolute inset-0 z-20">
        <ComingSoonLogo ref={logoRef} />

        <ComingSoonJargon jargonRef={jargonRef} />

        <ComingSoonTitle
          titleRef={titleRef}
          dividerLeftRef={dividerLeftRef}
          dividerDiamondRef={dividerDiamondRef}
          dividerRightRef={dividerRightRef}
        />

        <ComingSoonSubtitle subtitleRef={subtitleRef} yearRef={yearRef} />
      </div>
    </section>
  );
}
