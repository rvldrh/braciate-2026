"use client";

import type { RefObject } from "react";

import { HERO_MAX_WIDTH_PX } from "../../constants/coming-soon.layout";
import { ComingSoonBackgroundReveal } from "../scene/ComingSoonBackgroundReveal";
import { ComingSoonStarfield } from "../scene/ComingSoonStarfield";
import { ComingSoonHero } from "../content/ComingSoonHero";

interface ComingSoonStageTopProps {
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

export function ComingSoonStageTop({
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
}: ComingSoonStageTopProps) {
  return (
    // Heights must match STAGE_TOP_HEIGHT_DVH in constants/coming-soon.layout.ts.
    // Using `dvh` (not `vh`) so this tracks the REAL visible viewport on
    // mobile Safari / in-app browsers instead of the toolbar-inflated one.
    // Extended to 6 breakpoint steps (was 3) — see Fase 4 in the audit.
    <section className="relative h-[100dvh] w-full shrink-0 overflow-hidden sm:h-[104dvh] md:h-[108dvh] lg:h-[112dvh] xl:h-[116dvh] 2xl:h-[120dvh]">
      <ComingSoonBackgroundReveal ref={bgRevealRef} />

      <ComingSoonStarfield />

      {/*
        Wrapper ini yang menahan hero cluster (Logo/Jargon/Title) supaya
        lebar efektifnya TIDAK PERNAH melebihi HERO_MAX_WIDTH_PX, dan
        menjadikannya "container" untuk unit `cqw` yang dipakai di dalam
        ketiganya — lihat komentar HERO_MAX_WIDTH_PX di
        constants/coming-soon.layout.ts.

        `inset-0` + `mx-auto` (instead of the old `left-1/2
        -translate-x-1/2` trick) also gives the cluster the section's
        FULL height to work with, so `items-center justify-center` can
        vertically center the whole hero as ONE unit. This is the fix
        that replaces the old per-element `top: Xdvh` anchors on Logo,
        Jargon, and Title — see ComingSoonHero.tsx.
      */}
      <div
        className="
    absolute
    inset-0
    mx-auto
    flex
    items-center
    justify-center
    px-4
    lg:px-8
  "
        style={{
          width: "100%",
          maxWidth: `${HERO_MAX_WIDTH_PX}px`,
          containerType: "inline-size",
        }}
      >
        <ComingSoonHero
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
      </div>
    </section>
  );
}
