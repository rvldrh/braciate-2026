"use client";

import { useMemo, useSyncExternalStore } from "react";

import { generateStarfield } from "../utils/generateStarfield";

const MOBILE_COUNT = 50;
const TABLET_COUNT = 75;
const DESKTOP_COUNT = 90;

function getStarCount() {
  if (window.innerWidth < 768) {
    return MOBILE_COUNT;
  }

  if (window.innerWidth < 1024) {
    return TABLET_COUNT;
  }

  return DESKTOP_COUNT;
}

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

    return generateStarfield(getStarCount());
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
