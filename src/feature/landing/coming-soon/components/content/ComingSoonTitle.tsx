"use client";

import type { RefObject } from "react";

interface ComingSoonTitleProps {
  titleRef: RefObject<HTMLDivElement | null>;
  dividerLeftRef: RefObject<HTMLDivElement | null>;
  dividerDiamondRef: RefObject<HTMLDivElement | null>;
  dividerRightRef: RefObject<HTMLDivElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  yearRef: RefObject<HTMLParagraphElement | null>;
}

/**
 * PERUBAHAN PERFORMA:
 * filter: blur(18px) dihapus dari reveal state. Blur-to-sharp pada elemen
 * yang juga di-scale itu mahal untuk repaint (apalagi berdekatan dengan
 * 5 elemen sparkle yang punya box-shadow glow sendiri-sendiri).
 * Diganti transform: scale(0.92) — reveal-nya jadi scale+opacity murni
 * (GSAP animasikan scale 0.92 -> 1 + opacity 0 -> 1), efek "muncul"-nya
 * tetap terasa tapi jauh lebih murah untuk browser manapun.
 *
 * RESPONSIVE FIX (was: PERUBAHAN LAYOUT):
 * This block used to be `position: absolute; top: 36dvh; left: 50%;
 * -translate-x-1/2` — its own independent coordinate system from Logo
 * (42dvh) and Jargon (48dvh), see coming-soon-responsive-audit.md §1. It
 * is now a plain flow child (`relative`, no `top`/`left`), positioned by
 * its parent (ComingSoonHero.tsx) with a single proportional gap token
 * (`HERO_SPACING.jargonToTitleGap`) instead of a guessed `dvh` value —
 * same fix, extended outward from where it already worked.
 *
 * Subtitle (+ tahun) tetap dirender DI DALAM komponen ini, tepat setelah
 * divider, sebagai flow child biasa (`mt-[...]`) — pola ini SUDAH BENAR
 * sejak awal dan tidak diubah; ini justru yang jadi contoh untuk
 * perbaikan di atas.
 *
 * Kenapa flow (bukan tabel breakpoint `top-[46dvh] sm:... md:... lg:...`)
 * lebih baik: tabel breakpoint lama itu mencoba MENEBAK seberapa besar
 * kotak judul (h1) akan tumbuh di layar lebar (font judul memang sengaja
 * membesar mengikuti `cqw` lewat clamp()), lalu menaruh subtitle di
 * titik yang "kira-kira" cukup di bawahnya untuk tiap breakpoint. Dengan
 * subtitle mengalir langsung di bawah divider, jaraknya OTOMATIS selalu
 * tepat menempel di bawah divider — di layar manapun — karena browser
 * sendiri yang menghitung tinggi kotak judul saat itu, bukan kita
 * menebaknya.
 */
export function ComingSoonTitle({
  titleRef,
  dividerLeftRef,
  dividerDiamondRef,
  dividerRightRef,
  subtitleRef,
  yearRef,
}: ComingSoonTitleProps) {
  return (
    <div
      ref={titleRef}
      className="
        relative
        z-30
        flex
        flex-col
        items-center
        will-change-transform
    "
      style={{
        opacity: 0,
        transform: "scale(0.92)",
        transformOrigin: "center center",
      }}
    >
      <span
        data-coming-soon-sparkle
        aria-hidden="true"
        className="pointer-events-none absolute -left-5 top-[35%] h-1 w-1 rounded-full bg-yellow-100 opacity-0 shadow-[0_0_8px_rgba(255,240,180,0.9)] md:-left-8 md:h-1.5 md:w-1.5"
      />

      <span
        data-coming-soon-sparkle
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[18%] h-1 w-1 rounded-full bg-yellow-200 opacity-0 shadow-[0_0_9px_rgba(255,225,140,0.95)] md:right-1 md:h-1.5 md:w-1.5"
      />

      <span
        data-coming-soon-sparkle
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 top-[72%] h-1 w-1 rounded-full bg-yellow-100 opacity-0 shadow-[0_0_8px_rgba(255,240,180,0.9)] md:-right-9 md:h-1.5 md:w-1.5"
      />

      <span
        data-coming-soon-sparkle
        aria-hidden="true"
        className="pointer-events-none absolute left-[27%] -top-4 h-1 w-1 rounded-full bg-yellow-100 opacity-0 shadow-[0_0_8px_rgba(255,240,180,0.9)] md:-top-5"
      />

      <span
        data-coming-soon-sparkle
        aria-hidden="true"
        className="pointer-events-none absolute right-[25%] -top-5 h-1 w-1 rounded-full bg-yellow-200 opacity-0 shadow-[0_0_9px_rgba(255,225,140,0.95)] md:-top-7"
      />

      <h1
        data-coming-soon-title-text
        className="
    whitespace-nowrap
    text-center
    leading-none
    will-change-transform
    text-[clamp(2rem,12cqw,4rem)]
    lg:text-[clamp(3rem,8cqw,8rem)]
  "
      >
        <span
          className="
    font-sloop
    text-yellow-300
    text-[clamp(2.5rem,14cqw,5rem)]
    lg:text-[clamp(4rem,19cqw,10.5rem)]
  "
        >
          C
        </span>

        <span className="ml-[0.15em] font-the-seasons text-yellow-100 lg:text-[clamp(3rem,15cqw,8rem)]">
          oming
        </span>

        <span
          className="
    font-sloop
    text-yellow-300
    text-[clamp(2.5rem,14cqw,5rem)]
    lg:text-[clamp(4rem,19cqw,10.5rem)]
  "
        >
          S
        </span>

        <span className="ml-[0.15em] font-the-seasons text-yellow-100 lg:text-[clamp(3rem,15cqw,8rem)]">
          oon
        </span>
      </h1>
      <div className="mt-[0.5em] flex w-full items-center justify-center gap-[0.8cqw]">
        <div
          ref={dividerLeftRef}
          className="
    origin-right
    bg-yellow-300/80
    w-[clamp(2rem,30cqw,5rem)]
    sm:w-[clamp(3rem,75cqw,16rem)]
  "
          style={{
            height: "2px",
            width: "clamp(2.5rem, 40cqw, 8rem)",
          }}
        />

        <div
          ref={dividerDiamondRef}
          className="
    relative
    shrink-0
    w-[clamp(10px,30cqw,16px)]
    sm:w-[clamp(14px,66.3cqw,22px)]
  "
          style={{
            aspectRatio: "1 / 1",
          }}
        >
          <div
            className="absolute inset-0 bg-yellow-300"
            style={{
              clipPath:
                "polygon(50% 0%, 58% 40%, 100% 50%, 58% 60%, 50% 100%, 42% 60%, 0% 50%, 42% 40%)",
            }}
          />
        </div>

        <div
          ref={dividerRightRef}
          className="
    origin-left
    bg-yellow-300/80
    w-[clamp(2rem,30cqw,5rem)]
    sm:w-[clamp(3rem,75cqw,16rem)]
  "
          style={{
            height: "2px",
            width: "clamp(2.5rem, 40cqw, 8rem)",
          }}
        />
      </div>

      {/*
        Subtitle + tahun — flow child, jarak ke divider di atas dikontrol
        `mt-[...]` (relatif ke tinggi baris subtitle sendiri via `em`),
        BUKAN posisi absolute independen. Ini yang membuatnya otomatis
        proporsional di semua breakpoint tanpa tabel dvh manual — sudah
        benar sejak awal, tidak diubah.
      */}
      <div className="mt-[1.4em] flex flex-col items-center whitespace-nowrap text-center font-the-seasons tracking-widest">
        <p
          ref={subtitleRef}
          className="
    text-yellow-100
    text-[clamp(0.65rem,28cqw,1rem)]
    lg:text-[clamp(0.75rem,45cqw,1.25rem)]
  "
          style={{
            letterSpacing: "0.15em",
            opacity: 0,
          }}
        >
          Brawijaya Festival Appreciate
        </p>

        <p
          ref={yearRef}
          className="
    mt-2
    font-medium
    text-yellow-100
    text-[clamp(0.65rem,28cqw,1rem)]
    lg:text-[clamp(0.75rem,45cqw,1.25rem)]
  "
          style={{
            letterSpacing: "0.15em",
            opacity: 0,
          }}
        >
          2026
        </p>
      </div>
    </div>
  );
}
