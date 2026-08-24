/**
 * coming-soon.timeline.ts
 * -----------------------------------------------------------------------
 * Split out of the old `coming-soon.constant.ts` (see
 * coming-soon-responsive-audit.md §2 & §3). This file holds ONLY GSAP
 * animation TIMING — durations, delays, keyframes. No layout/responsive
 * constants live here; those moved to `coming-soon.layout.ts` and
 * `coming-soon.spacing.ts`.
 * -----------------------------------------------------------------------
 */

export const COMING_SOON_TIMELINE = {
  star: {
    start: 0,
    pivotEnd: 2.0,
    growthEnd: 6.5,
    fadeEnd: 8.5,
  },

  world: {
    start: 0,
    pivotProgress: 0.15,
    growthEnd: 6.5,
    growthProgress: 0.95,
    end: 8.5,
  },

  background: {
    start: 8.5,
    duration: 1,
  },

  logo: {
    fadeInStart: 19.9,
    fadeInDuration: 1.8,

    moveStart: 21.7,
    moveDuration: 0.9,

    finalScale: 0.35,

    /**
     * REPLACES the old `finalYVh: -20` (a fixed viewport-height percentage).
     *
     * `finalYVh` moved the logo up by a fixed fraction of the FULL
     * viewport height — a value with no relationship to the 520px-capped
     * hero wrapper the logo actually lives in (audit §4.1, "Sistem C").
     * On a tall phone that translated to a huge jump; on a short/wide
     * desktop window it barely moved.
     *
     * `finalYFactor` is instead a fraction of the HERO CLUSTER's own
     * rendered height (`heroRef.getBoundingClientRect().height`,
     * measured once at mount in useComingSoonTimeline.tsx) — so the logo
     * always travels the same proportional distance relative to the
     * content it's actually part of, on every screen size.
     */
    finalYFactor: -0.3,
  },

  title: {
    start: 22.6,
    duration: 2.6,
  },

  divider: {
    start: 25.4,
    diamondDuration: 0.2,
    lineDuration: 0.5,
  },

  subtitle: {
    start: 25.85,
    duration: 0.7,
  },

  year: {
    start: 26.45,
    duration: 0.6,
  },

  shootingStarRotation: {
    start: 0,
    duration: 3.0,
    repeat: 2,
  },
} as const;

/**
 * STAR_KEYFRAMES — viewport-relative positioning
 *
 * Deliberately kept in `vw`/`vh` of the FULL viewport (not the 520px
 * hero wrapper): the shooting star is a full-bleed cinematic effect that
 * scales up to 8x and eventually fills the screen — it is not part of
 * the hero content cluster and should keep tracking the real window
 * size. This is different from the Logo's `finalYFactor` above, which
 * DOES need to move with the audit's fix because the logo visually lives
 * inside the capped hero wrapper.
 *
 * xVw / yVh are offsets FROM THE VIEWPORT CENTER expressed as
 * percentage of viewport WIDTH and HEIGHT respectively.
 *
 *   xVw: -47  →  star center moves 47% of viewport WIDTH to the LEFT of center
 *   yVh:   3  →  star center moves 3% of viewport HEIGHT BELOW center
 *
 * In the hook these are converted to pixel values:
 *   x = xVw * (window.innerWidth  / 100)
 *   y = yVh * (window.innerHeight / 100)
 *
 * Trajectory (offsets from viewport CENTER):
 *   Frame 0 (t=0)     — hidden, at viewport center
 *   Frame 1 (t=0.2)   — barely visible, still at center
 *   Frame 2 (t=2.0)   — PIVOT: far left (star partially off-screen left)
 *   Frame 3 (t=3.8)   — sweep back to slightly right of center, slightly above
 *   Frame 4 (t=8.5)   — maximum size, fully faded
 */
export const STAR_KEYFRAMES = [
  {
    time: 0,
    scale: 0.06,
    xVw: 100,
    yVh: 100,
    rotate: -5,
    opacity: 0,
  },

  {
    time: 0.2,
    scale: 0.08,
    xVw: 100,
    yVh: 100,
    rotate: -2,
    opacity: 0.05,
  },

  {
    time: 2.0,
    scale: 0.22,
    xVw: -47,
    yVh: 3,
    rotate: -2,
    opacity: 1,
  },
  {
    time: 3.8,
    scale: 0.65,
    xVw: 2,
    yVh: -4,
    rotate: -8,
    opacity: 1,
  },
  {
    time: 8.5,
    scale: 8,
    xVw: 2,
    yVh: -6,
    rotate: 5,
    opacity: 0,
  },
] as const;

export const WORLD_TRANSLATE_KEYFRAMES = [
  {
    time: 0,
    progress: 0,
  },

  {
    time: 0.2,
    progress: 0.02,
  },

  {
    time: 2.7,
    progress: 0.12,
  },

  {
    time: 3.8,
    progress: 0.38,
  },

  {
    time: 8.5,
    progress: 1,
  },
] as const;
