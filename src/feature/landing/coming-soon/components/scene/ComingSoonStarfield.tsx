"use client";

import { useMemo, useSyncExternalStore } from "react";

import { getBreakpointTier } from "../../hooks/useBreakpoint";
import { generateStarfield } from "../../utils/generateStarfield";

const STAR_COUNT_BY_TIER = {
  mobile: 50,
  tablet: 75,
  desktop: 90,
} as const;

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * Starfield ambient — 100% CSS-driven (@keyframes star-twinkle di globals.css).
 * Sengaja TIDAK pakai GSAP di sini: dengan 2 instance komponen ini aktif
 * bersamaan (StageBottom + StageTop) x ~90 titik, versi GSAP lama
 * menghasilkan ratusan tween infinite-loop berjalan di main thread —
 * penyebab utama lag/crash di browser selain Chrome.
 * CSS animation dijalankan browser di compositor thread, jauh lebih murah.
 *
 * Star count is computed ONCE at mount (not reactively on resize) — same
 * behavior as before, just now reading the mobile/tablet/desktop split
 * from the shared `getBreakpointTier()` instead of a second hardcoded
 * `768`/`1024` check (see coming-soon-responsive-audit.md §2).
 */
export function ComingSoonStarfield() {
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const stars = useMemo(() => {
    if (!isClient) {
      return [];
    }

    const tier = getBreakpointTier(window.innerWidth);
    return generateStarfield(STAR_COUNT_BY_TIER[tier]);
  }, [isClient]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star-twinkle absolute rounded-full bg-yellow-50"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--star-duration": `${star.duration}s`,
              "--star-delay": `${star.delay}s`,
              "--star-min-opacity": 0.15,
              "--star-max-opacity": star.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
