"use client";

import type { RefObject } from "react";

import { HERO_SPACING } from "../../constants/coming-soon.spacing";
import { ComingSoonLogo } from "./ComingSoonLogo";
import { ComingSoonJargon } from "./ComingSoonJargon";
import { ComingSoonTitle } from "./ComingSoonTitle";

interface ComingSoonHeroProps {
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

/**
 * NEW FILE — see coming-soon-responsive-audit.md §3/§5 Fase 3.
 *
 * The hero content cluster — Logo, Jargon, and Title — as ONE flow
 * layout, instead of three independently `top: Xdvh`-positioned
 * elements (the root cause documented in the audit §1). This is the
 * "flow layout (flex column + gap) di dalam wrapper cqw yang sama" fix
 * the audit calls for, applied with one deliberate twist:
 *
 * Logo and Jargon share the SAME slot instead of stacking one after the
 * other. Why: in the timeline (useComingSoonTimeline.tsx) they never
 * appear on screen at the same time — Jargon plays first from t=8.5s and
 * fades out over t=18.1–19.9s at the exact moment Logo fades in
 * (t=19.9s), in the same spot. If Jargon were a normal stacked flow
 * child, its box (which is up to 2 lines tall on mobile, 1 line on
 * `sm:` and up — see ComingSoonJargon.tsx) would stay reserved in the
 * layout even after it fades to `opacity: 0`, permanently pushing Title
 * further down than intended. Making Jargon an absolutely-positioned
 * overlay INSIDE a `relative` slot sized off Logo's own box means it
 * centers itself over that slot without ever affecting flow height —
 * Title flows directly after the slot regardless of whether Jargon
 * rendered 1 or 2 lines.
 *
 * Title (and, inside it, Subtitle/Year, which already correctly used
 * `mt-[1.4em]`) flows right after that slot with one proportional gap
 * token from coming-soon.spacing.ts. The whole cluster is then centered
 * as a single unit by its parent (see
 * components/layout/ComingSoonStageTop.tsx) — so there is exactly ONE
 * place in the entire component tree that decides "how far down is this
 * content", and it's the browser's own flex/flow engine measuring real
 * rendered boxes, not three independent guessed `dvh` numbers.
 */
export function ComingSoonHero({
  heroRef,
  logoRef,
  jargonRef,
  titleRef,
  dividerLeftRef,
  dividerDiamondRef,
  dividerRightRef,
  subtitleRef,
  yearRef,
}: ComingSoonHeroProps) {
  return (
    <div
      ref={heroRef}
      className="relative z-20 flex w-full flex-col items-center"
    >
      <div
        className="relative flex w-full items-center justify-center"
        style={{ height: HERO_SPACING.logoJargonSlotMinHeight }}
      >
        <ComingSoonLogo ref={logoRef} />

        <div className="absolute inset-0 flex items-center justify-center">
          <ComingSoonJargon jargonRef={jargonRef} />
        </div>
      </div>

      <div style={{ marginTop: HERO_SPACING.jargonToTitleGap }}>
        <ComingSoonTitle
          titleRef={titleRef}
          dividerLeftRef={dividerLeftRef}
          dividerDiamondRef={dividerDiamondRef}
          dividerRightRef={dividerRightRef}
          subtitleRef={subtitleRef}
          yearRef={yearRef}
        />
      </div>
    </div>
  );
}
