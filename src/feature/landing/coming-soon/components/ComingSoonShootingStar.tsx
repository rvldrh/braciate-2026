"use client";

import Image from "next/image";

interface ComingSoonShootingStarProps {
  /** Ref attached to the outer wrapper — receives position, scale, opacity, tilt */
  outerRef: React.RefObject<HTMLDivElement | null>;
  /** Ref attached to the inner wrapper — receives the continuous spin rotation */
  innerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Shooting star — FIXED relative to viewport.
 *
 * Positioning strategy:
 *   The div is placed at left:50% / top:50% via Tailwind.
 *   The Tailwind -translate-x-1/2 / -translate-y-1/2 classes
 *   center the element so its CENTER is exactly at (50vw, 50vh).
 *
 *   GSAP then animates `x` and `y` in pixels using viewport-relative
 *   values (xVw * vw, yVh * vh from constants), giving consistent
 *   positions on every screen size.
 *
 *   The star size (42vmin) scales with the shorter viewport dimension
 *   so it always fills the screen proportionally when it grows to
 *   maximum scale at the end of the animation.
 *
 * NOTE: Do NOT add an inline `transform` style here.
 * The Tailwind centering transform must be readable by GSAP on mount.
 */
export function ComingSoonShootingStar({
  outerRef,
  innerRef,
}: ComingSoonShootingStarProps) {
  return (
    <div
      ref={outerRef}
      className="pointer-events-none fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "42vmin",
        height: "42vmin",
        opacity: 0,
        willChange: "transform, opacity",
      }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="relative h-full w-full"
        style={{
          willChange: "transform",
          filter:
            "drop-shadow(0 0 36px rgba(253,250,240,0.95)) drop-shadow(0 0 12px rgba(255,230,100,0.7))",
        }}
      >
        <Image
          src="/images/logo/star.svg"
          alt=""
          fill
          priority
          sizes="50vmin"
          className="object-contain"
        />
      </div>
    </div>
  );
}
