import type { RefObject } from "react";

export interface ComingSoonRefs {
  worldRef: RefObject<HTMLDivElement | null>;
  starRef: RefObject<HTMLDivElement | null>;
  starInnerRef: RefObject<HTMLDivElement | null>;
  bgRevealRef: RefObject<HTMLDivElement | null>;
  /**
   * NEW — the hero content cluster wrapper (Logo + Jargon slot + Title),
   * see components/content/ComingSoonHero.tsx. Its rendered height is
   * measured once at mount so the logo's "shrink and move up" animation
   * can be computed as a proportion of the ACTUAL hero content, instead
   * of a fixed viewport-height percentage — see `finalYFactor` in
   * constants/coming-soon.timeline.ts.
   */
  heroRef: RefObject<HTMLDivElement | null>;
  logoRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  jargonRef: RefObject<HTMLDivElement | null>;
  dividerLeftRef: RefObject<HTMLDivElement | null>;
  dividerDiamondRef: RefObject<HTMLDivElement | null>;
  dividerRightRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  yearRef: RefObject<HTMLParagraphElement | null>;
}

export interface StarParticle {
  horizontalDistance: number;
  floatDistance: number;
  id: string;
  top: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  floatDuration: number;
}
