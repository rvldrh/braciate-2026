"use client";

import Image from "next/image";
import { forwardRef } from "react";

/**
 * priority dihapus — cuma background.webp yang boleh priority (LCP).
 * Logo tetap opacity:0 di mount, jadi tidak berkontribusi ke LCP.
 *
 * RESPONSIVE FIX: this used to be `position: absolute; top: 42dvh` with
 * its own `-translate-x-1/2 -translate-y-1/2` centering — an independent
 * coordinate system from Jargon (48dvh) and Title (36dvh) that drifted
 * out of proportion on every change in screen aspect ratio (see
 * coming-soon-responsive-audit.md §1). It is now a plain flow child,
 * centered by its parent (ComingSoonHero.tsx) — position is no longer
 * this component's concern at all, only its own size is.
 */
export const ComingSoonLogo = forwardRef<HTMLDivElement>(
  function ComingSoonLogo(_, ref) {
    return (
      <div
        ref={ref}
        className="relative z-20 will-change-transform"
        style={{
          // cqw (bukan vw) — lebar mengikuti wrapper yang di-cap
          // HERO_MAX_WIDTH_PX, bukan lebar browser sesungguhnya. Lihat
          // komentar HERO_MAX_WIDTH_PX di coming-soon.layout.ts.
          width: "clamp(120px, 96cqw, 520px)",
          opacity: 0,
        }}
      >
        <Image
          src="/images/logo/logo-coming-soon.svg"
          alt="Braciate 2026"
          width={560}
          height={560}
          className="h-auto w-full object-contain"
        />
      </div>
    );
  },
);
