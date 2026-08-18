/**
 * viewport.ts
 * -----------------------------------------------------------------------
 * ROOT CAUSE this file fixes:
 *
 * The old timeline read `window.innerHeight` once at mount to convert
 * `vh`-based keyframe constants (STAR_KEYFRAMES, logo.finalYVh, dst) into
 * pixels. Meanwhile the actual page layout was sized with CSS `vh`
 * (`h-[100vh]`, `top-[42vh]`, ...).
 *
 * On mobile browsers — especially in-app WebViews like WhatsApp's browser
 * (see the "WA Business" address bar in one of the two screenshots) vs.
 * real Safari — the space reserved for browser/app chrome is different,
 * and `window.innerHeight` does not always agree with what `vh` resolves
 * to in CSS at that exact moment. Two visually different toolbars =
 * two different numbers = two different animations, even on the same
 * device model.
 *
 * THE FIX: stop trusting `window.innerHeight` and stop using plain `vh`
 * in CSS. Everything — CSS layout AND GSAP math — now derives its pixel
 * value from `100dvh`, and from the exact SAME measurement technique, so
 * there is only one source of truth and it is physically impossible for
 * JS and CSS to disagree.
 *
 * `measureDvhPixel()` does this by asking the browser directly: it drops
 * a hidden probe element sized with `height: 100dvh` into the DOM and
 * reads its real rendered pixel height. Whatever the browser chrome is
 * doing at that instant, this number is guaranteed to match what every
 * `dvh`-based class in the CSS resolves to, because it's the same CSS
 * engine computing both.
 * -----------------------------------------------------------------------
 */

/** Measures exactly what `100dvh` resolves to, in pixels, right now. */
export function measureDvhPixel(): number {
  if (typeof document === "undefined") return 0;

  const probe = document.createElement("div");
  probe.style.position = "fixed";
  probe.style.top = "0";
  probe.style.left = "0";
  probe.style.height = "100dvh";
  probe.style.width = "0";
  probe.style.margin = "0";
  probe.style.padding = "0";
  probe.style.border = "0";
  probe.style.pointerEvents = "none";
  probe.style.visibility = "hidden";
  probe.setAttribute("aria-hidden", "true");

  document.body.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);

  // Fallback safety net only — should never trigger in a real browser.
  return height || window.innerHeight;
}

export interface ViewportUnits {
  /** 1% of viewport width, in pixels. */
  vw: number;
  /** 1% of the *dynamic* viewport height, in pixels — matches CSS `dvh`. */
  vh: number;
  /** Full dynamic viewport height, in pixels (== 100 * vh). */
  viewportHeightPx: number;
  /** Full viewport width, in pixels. */
  viewportWidthPx: number;
}

/**
 * Single entry point for any pixel math that needs to match `dvh`-based
 * CSS. Call this ONCE right before building the intro timeline — this is
 * a one-shot entrance animation, not something that needs to react to
 * the toolbar changing mid-flight, so a single accurate reading at start
 * is exactly what we want (re-measuring mid-timeline would fight GSAP's
 * own tween values).
 */
export function getViewportUnits(): ViewportUnits {
  const viewportHeightPx = measureDvhPixel();
  const viewportWidthPx = window.innerWidth;

  return {
    vw: viewportWidthPx / 100,
    vh: viewportHeightPx / 100,
    viewportHeightPx,
    viewportWidthPx,
  };
}
