export const WORLD_HEIGHT_VH = {
  mobile: 200,
  tablet: 210,
  desktop: 220,
} as const;

export const STAGE_TOP_HEIGHT_VH = {
  mobile: 100,
  tablet: 110,
  desktop: 120,
} as const;

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
    finalYVh: -20,
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
 * WHY: xPercent/yPercent were relative to the element's own CSS size
 * (42vmin).  On a 1920px screen the star is 453px wide; on 1024px it
 * is 322px wide.  The same xPercent value therefore produces a
 * completely different absolute position.  Using vw/vh ensures the
 * star always lands at the SAME proportional viewport position on
 * every screen size.
 *
 * Trajectory (offsets from viewport CENTER):
 *   Frame 0 (t=0)     — hidden, at viewport center
 *   Frame 1 (t=0.2)   — barely visible, still at center
 *   Frame 2 (t=2.0)   — PIVOT: far left (star partially off-screen left)
 *   Frame 3 (t=3.8)   — sweep back to slightly right of center, slightly above
 *   Frame 4 (t=5.2)   — growing, stays in same quadrant
 *   Frame 5 (t=6.5)   — large, starts fading
 *   Frame 6 (t=8.5)   — maximum size, fully faded
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

  // Pivot selesai.
  // Mulai dari sini bintang langsung tumbuh
  // secara kontinu sampai full-screen.
  {
    time: 3.8,
    scale: 0.65,
    xVw: 2,
    yVh: -4,
    rotate: -8,
    opacity: 1,
  },

  // Final state — tidak ada checkpoint tengah lagi.
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

  // Setelah pivot, world langsung naik terus
  // sampai posisi final.
  {
    time: 8.5,
    progress: 1,
  },
] as const;
