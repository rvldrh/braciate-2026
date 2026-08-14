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
    <section className="relative h-[100vh] w-full shrink-0 overflow-hidden md:h-[110vh] lg:h-[120vh]">
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
