"use client";

import Image from "next/image";

interface ComingSoonShootingStarProps {
  outerRef: React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Shooting star — FIXED relative to viewport.
 *
 * PERUBAHAN PERFORMA:
 * - `priority` dihapus. Gambar ini bukan elemen LCP (kecil, tersembunyi
 *   opacity:0 di awal) — cuma background.webp yang butuh priority.
 * - `filter: drop-shadow` diturunkan radiusnya jauh (36px/12px -> 14px/6px).
 *   Elemen ini di-scale sampai 8x DAN dirotasi kontinu DAN diblur —
 *   kombinasi ini paling berat untuk Safari/Firefox karena area yang
 *   harus di-repaint blur membesar tiap frame mengikuti scale.
 *   Kalau glow masih terasa kurang tebal secara visual, lebih baik
 *   bake glow itu LANGSUNG ke dalam file star.svg (edit di Figma/Illustrator)
 *   daripada naikkan radius filter runtime lagi.
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
            "drop-shadow(0 0 14px rgba(253,250,240,0.9)) drop-shadow(0 0 6px rgba(255,230,100,0.6))",
        }}
      >
        <Image
          src="/images/logo/star.svg"
          alt=""
          fill
          sizes="50vmin"
          className="object-contain"
        />
      </div>
    </div>
  );
}
