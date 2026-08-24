/**
 * coming-soon.layout.ts
 * -----------------------------------------------------------------------
 * Split out of the old `coming-soon.constant.ts` (see
 * coming-soon-responsive-audit.md §2 & §3). This file holds ONLY
 * structural / responsive constants — breakpoints, the hero width cap,
 * and stage/world heights. Animation TIMING (durations, keyframes) lives
 * in `coming-soon.timeline.ts` instead; the two concerns don't belong in
 * the same file, and mixing them was making the layout constants hard to
 * find in a 200-line file mostly full of GSAP numbers.
 * -----------------------------------------------------------------------
 */

/**
 * Single source of truth for the mobile/tablet/desktop split used for
 * DISCRETE decisions (star count, which `getStageHeightTier` bucket a
 * viewport falls into below, etc).
 *
 * Previously this was `768`/`1024` hardcoded independently in
 * `ComingSoonStarfield.tsx` AND `useComingSoonTimeline.tsx` — two sources
 * of truth that could silently drift apart. Both now read from here via
 * `useBreakpoint()` / `getBreakpointTier()` in `hooks/useBreakpoint.ts`.
 */
export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const;

/**
 * ROOT CAUSE of "desktop looks huge/spread out compared to mobile":
 *
 * Title/Logo/Jargon/divider all used to size themselves with `vw` inside
 * `clamp()` (e.g. `clamp(2rem, 6vw, 7rem)`). `vw` is 1% of the REAL
 * BROWSER WINDOW width — on a 1920px-wide desktop window that is
 * ~19.2px per vw unit, so these elements kept growing almost all the way
 * to their max clamp cap. On a ~390px phone they were stuck at the clamp
 * MINIMUM instead. Two completely different rendering regimes for one
 * "responsive" component.
 *
 * THE FIX: the whole intro-text cluster (Logo, Jargon, Title, divider,
 * Subtitle) lives inside a capped-width wrapper with
 * `container-type: inline-size` (see components/layout/ComingSoonStageTop.tsx),
 * and every one of those elements sizes itself with `cqw` (1% of THAT
 * wrapper's width) instead of `vw` (1% of the real window width).
 *
 * Below this cap, `cqw` behaves exactly like `vw` (the wrapper is
 * `width: 100%`, so its width tracks the viewport 1:1) — mobile
 * rendering is unaffected. Above this cap, the wrapper's width simply
 * stops growing, so every element's `cqw`-based size flatlines too — a
 * 1024px window and a 2560px window render pixel-identical.
 */
export const HERO_MAX_WIDTH_PX = 520;

/**
 * Stage/world heights, in multiples of `dvh`.
 *
 * Extended from 3 discrete steps (mobile/tablet/desktop) to 6, matching
 * Tailwind's own breakpoint scale (sm/md/lg/xl/2xl) — see audit §4.1 &
 * Fase 4. More interpolation points means smaller jumps between steps,
 * which is the closest a pure-Tailwind class list can get to a truly
 * fluid height (Tailwind's JIT needs literal class names at build time,
 * so it can't read this object directly — see the sync note below).
 *
 * `WORLD_HEIGHT_DVH` is DERIVED from `STAGE_TOP_HEIGHT_DVH` (+100, the
 * fixed height of the bottom starfield-only stage) instead of being a
 * second hardcoded object. The old two-object setup
 * (`WORLD_HEIGHT_DVH` / `STAGE_TOP_HEIGHT_DVH` as two independent
 * literals) could silently drift out of sync — this guarantees they
 * can't.
 *
 * SYNC NOTE: these numbers still have to be mirrored as literal Tailwind
 * classes in `components/layout/ComingSoonStageTop.tsx` and
 * `ComingSoonWorld.tsx`. Every literal class there has a comment
 * pointing back to this object — if you change a number here, grep for
 * `STAGE_TOP_HEIGHT_DVH` to find both places that must be updated
 * together. (A Tailwind plugin that generates these classes from this
 * object would remove this manual step entirely — worth doing if this
 * drifts again.)
 */
export const STAGE_TOP_HEIGHT_DVH = {
  mobile: 100, // < 640px
  sm: 104, // >= 640px
  md: 108, // >= 768px
  lg: 112, // >= 1024px
  xl: 116, // >= 1280px
  "2xl": 140, // >= 1536px
} as const;

export type StageHeightTier = keyof typeof STAGE_TOP_HEIGHT_DVH;

export const WORLD_HEIGHT_DVH: Record<StageHeightTier, number> =
  Object.fromEntries(
    Object.entries(STAGE_TOP_HEIGHT_DVH).map(([tier, value]) => [
      tier,
      value + 100,
    ]),
  ) as Record<StageHeightTier, number>;

/**
 * Resolve which `STAGE_TOP_HEIGHT_DVH` / `WORLD_HEIGHT_DVH` bucket a raw
 * pixel width falls into. Mirrors Tailwind's default breakpoints exactly
 * so this always agrees with the literal `sm:`/`md:`/... classes in the
 * layout components.
 */
export function getStageHeightTier(width: number): StageHeightTier {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "mobile";
}
