"use client";

import { useRef } from "react";

import { ComingSoonWorld } from "../components/ComingSoonWorld";
import { ComingSoonShootingStar } from "../components/ComingSoonShootingStar";

import { useComingSoonTimeline } from "../hooks/useComingSoonTimeline";

export function ComingSoonContainer() {
  const worldRef = useRef<HTMLDivElement>(null);

  const shootingStarRef = useRef<HTMLDivElement>(null);
  const shootingStarInnerRef = useRef<HTMLDivElement>(null);

  const backgroundRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const dividerLeftRef = useRef<HTMLDivElement>(null);
  const dividerDiamondRef = useRef<HTMLDivElement>(null);
  const dividerRightRef = useRef<HTMLDivElement>(null);

  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const jargonRef = useRef<HTMLDivElement>(null);

  useComingSoonTimeline({
    worldRef,
    starRef: shootingStarRef,
    starInnerRef: shootingStarInnerRef,
    bgRevealRef: backgroundRef,
    logoRef,
    jargonRef,
    titleRef,
    dividerLeftRef,
    dividerDiamondRef,
    dividerRightRef,
    subtitleRef,
    yearRef,
  });

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-blue-900">
      <ComingSoonWorld
        worldRef={worldRef}
        bgRevealRef={backgroundRef}
        logoRef={logoRef}
        jargonRef={jargonRef}
        titleRef={titleRef}
        dividerLeftRef={dividerLeftRef}
        dividerDiamondRef={dividerDiamondRef}
        dividerRightRef={dividerRightRef}
        subtitleRef={subtitleRef}
        yearRef={yearRef}
      />

      <ComingSoonShootingStar
        outerRef={shootingStarRef}
        innerRef={shootingStarInnerRef}
      />
    </main>
  );
}
