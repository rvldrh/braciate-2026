/**
 * coming-soon.spacing.ts
 * -----------------------------------------------------------------------
 * NEW FILE (see coming-soon-responsive-audit.md §3, Fase 3).
 *
 * Single source of truth for VERTICAL SPACING inside the hero content
 * cluster (Logo / Jargon / Title / Subtitle / Year).
 *
 * Replaces the old per-element `top: Xdvh` anchors (42dvh on Logo, 48dvh
 * on Jargon, 36dvh on Title) that used to live inside
 * ComingSoonLogo.tsx / ComingSoonJargon.tsx / ComingSoonTitle.tsx. Those
 * were three INDEPENDENT coordinate systems, all measured against the
 * full viewport height — which is why the gap between them stretched or
 * shrank unpredictably every time the screen's aspect ratio changed (see
 * audit §1, "Sistem A/B/C").
 *
 * The hero cluster (components/content/ComingSoonHero.tsx) is now a
 * normal flex column, vertically centered inside the stage as ONE unit.
 * Every value below is a GAP relative to the element before it — never
 * an absolute position — and is expressed with `cqw` so it scales off
 * the SAME 520px-capped container (`HERO_MAX_WIDTH_PX`) that already
 * drives every font-size clamp() in the hero. One unit system for one
 * concern (audit §4.1).
 *
 * Title → Subtitle → Year were already doing this correctly with
 * `mt-[1.4em]` inside ComingSoonTitle.tsx (relative to the subtitle's
 * own font-size) — that pattern is left untouched and is the model the
 * rest of this file follows.
 * -----------------------------------------------------------------------
 */
export const HERO_SPACING = {
  /**
   * Logo and Jargon occupy the SAME slot (see ComingSoonHero.tsx) because
   * they never appear on screen at the same time — Jargon plays first and
   * fades out right as Logo fades in, in the same spot. This is the
   * height reserved for that shared slot while Logo is still
   * `opacity: 0` (before its own fade-in), so the layout doesn't jump
   * once it becomes visible. Matches Logo's own clamp width 1:1 since
   * the logo art is roughly square.
   */
  logoJargonSlotMinHeight: "clamp(120px, 22cqw, 420px)",

  /** Gap between the Logo/Jargon slot and the Title block below it. */
  jargonToTitleGap: "clamp(1.5rem, 6cqw, 3.5rem)",
} as const;
