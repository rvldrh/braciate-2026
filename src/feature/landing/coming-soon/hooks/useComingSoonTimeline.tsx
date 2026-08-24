"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import {
  STAGE_TOP_HEIGHT_DVH,
  getStageHeightTier,
} from "../constants/coming-soon.layout";
import {
  COMING_SOON_TIMELINE,
  STAR_KEYFRAMES,
  WORLD_TRANSLATE_KEYFRAMES,
} from "../constants/coming-soon.timeline";
import { getViewportUnits } from "../utils/viewport";

import type { ComingSoonRefs } from "../types/coming-soon.type";

export function useComingSoonTimeline(refs: ComingSoonRefs) {
  const reduceMotion = useRef(false);

  useGSAP(
    () => {
      const {
        worldRef,
        starRef,
        starInnerRef,
        bgRevealRef,
        heroRef,
        logoRef,
        titleRef,
        jargonRef,
        dividerLeftRef,
        dividerDiamondRef,
        dividerRightRef,
        subtitleRef,
        yearRef,
      } = refs;

      const world = worldRef.current;
      const starOuter = starRef.current;
      const starInner = starInnerRef.current;
      const background = bgRevealRef.current;
      const hero = heroRef.current;
      const logo = logoRef.current;
      const jargon = jargonRef.current;
      const title = titleRef.current;
      const dividerLeft = dividerLeftRef.current;
      const dividerDiamond = dividerDiamondRef.current;
      const dividerRight = dividerRightRef.current;
      const subtitle = subtitleRef.current;
      const year = yearRef.current;

      if (
        !world ||
        !starOuter ||
        !starInner ||
        !background ||
        !hero ||
        !logo ||
        !jargon ||
        !title ||
        !dividerLeft ||
        !dividerDiamond ||
        !dividerRight ||
        !subtitle ||
        !year
      ) {
        return;
      }

      const jargonText = jargon.querySelector<HTMLElement>(
        "[data-coming-soon-jargon-text]",
      );

      if (!jargonText) {
        return;
      }

      const titleText = title.querySelector<HTMLElement>(
        "[data-coming-soon-title-text]",
      );

      if (!titleText) {
        return;
      }

      const beyondText = jargon.querySelector<HTMLElement>(
        '[data-coming-soon-jargon-text="beyond"]',
      );

      const connectionText = jargon.querySelector<HTMLElement>(
        '[data-coming-soon-jargon-text="connection"]',
      );

      const mainSparkle = jargon.querySelector<HTMLElement>(
        '[data-coming-soon-jargon-sparkle="main"]',
      );

      const smallSparkle = jargon.querySelector<HTMLElement>(
        '[data-coming-soon-jargon-sparkle="small"]',
      );

      if (!beyondText || !connectionText || !mainSparkle || !smallSparkle) {
        return;
      }

      reduceMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /*
       * -----------------------------------------------------------
       * VIEWPORT UNITS — computed once at mount, from the SAME
       * measurement the CSS layout itself uses (`dvh`).
       *
       * vw = 1% of viewport width in pixels
       * vh = 1% of the *dynamic* viewport height in pixels — this is
       *      guaranteed to match `dvh` in CSS, not `window.innerHeight`.
       *
       * See utils/viewport.ts for the full rationale: `window.innerHeight`
       * and CSS `vh` can disagree on mobile Safari / in-app WebViews
       * depending on browser-chrome state, which is exactly what caused
       * the same intro to render at different positions on two iPhones
       * (or the same iPhone opened two different ways).
       *
       * These are used to convert xVw/yVh constants into pixel values
       * so GSAP animates with absolute pixel offsets that are always
       * proportional to the current viewport — identical visual result
       * on every screen size AND every browser chrome state.
       * -----------------------------------------------------------
       */
      const { vw, vh, viewportHeightPx } = getViewportUnits();

      /*
       * -----------------------------------------------------------
       * HERO CLUSTER HEIGHT — measured once at mount, straight from
       * the rendered DOM (heroRef, see components/content/ComingSoonHero.tsx).
       *
       * Replaces the old `finalYVh` (a fixed % of the FULL viewport
       * height) for the logo's "shrink and move up" animation. The logo
       * visually lives INSIDE the 520px-capped hero wrapper, not the raw
       * browser window — so its move-up distance should scale with that
       * wrapper's own rendered height, not `window.innerHeight`. See
       * `finalYFactor` in constants/coming-soon.timeline.ts for the full
       * rationale (coming-soon-responsive-audit.md §4.1, "Sistem C").
       * -----------------------------------------------------------
       */
      const heroHeightPx = hero.getBoundingClientRect().height;

      const logoFinalY = COMING_SOON_TIMELINE.logo.finalYFactor * heroHeightPx;

      const titleFinalY = logoFinalY;

      /*
       * Helper: convert a STAR_KEYFRAMES entry to GSAP pixel x/y
       * offsets from the star's CENTERED position (viewport center).
       *
       * The star div has `left: 50%, top: 50%, -translate-x-1/2, -translate-y-1/2`
       * so its visual center starts at the viewport center.
       * GSAP's `x/y` properties then shift it by these pixel amounts.
       */
      const starX = (frame: (typeof STAR_KEYFRAMES)[number]) => frame.xVw * vw;
      const starY = (frame: (typeof STAR_KEYFRAMES)[number]) => frame.yVh * vh;
      const sparkles = title.querySelectorAll<HTMLElement>(
        "[data-coming-soon-sparkle]",
      );

      /*
       * -----------------------------------------------------------
       * WORLD SCROLL — stage height calculation
       *
       * `viewportHeightPx` above already IS what `100dvh` resolves to
       * right now (see getViewportUnits()). The multipliers below come
       * from STAGE_TOP_HEIGHT_DVH in constants/coming-soon.layout.ts —
       * the same constant that documents what the Tailwind classes in
       * ComingSoonStageTop.tsx (`h-[100dvh] sm:h-[104dvh] md:h-[108dvh]
       * lg:h-[112dvh] xl:h-[116dvh] 2xl:h-[120dvh]`) must be kept in
       * sync with. `getStageHeightTier()` is the SAME breakpoint
       * resolver used everywhere else in this feature (see
       * hooks/useBreakpoint.ts for the mobile/tablet/desktop variant
       * used by the starfield) — one source of truth instead of a
       * hardcoded `768`/`1024` check duplicated in this file.
       * -----------------------------------------------------------
       */
      const getStageTopHeight = () => {
        const tier = getStageHeightTier(window.innerWidth);
        return viewportHeightPx * (STAGE_TOP_HEIGHT_DVH[tier] / 100);
      };

      const initialWorldY = -getStageTopHeight();

      /*
       * -----------------------------------------------------------
       * INITIAL STATE
       * -----------------------------------------------------------
       */

      gsap.set(world, {
        y: initialWorldY,
        force3D: true,
      });

      /*
       * Star initial state:
       *   xPercent: -50 / yPercent: -50  — explicitly set GSAP centering
       *     to match the CSS -translate-x-1/2 / -translate-y-1/2.
       *     This ensures GSAP's internal model starts with xPercent=-50
       *     regardless of how it reads the existing CSS transform.
       *   x / y  — viewport-relative pixel offset from center (Frame 0).
       */
      gsap.set(starOuter, {
        opacity: 0,
        scale: STAR_KEYFRAMES[0].scale,
        xPercent: -50,
        yPercent: -50,
        x: starX(STAR_KEYFRAMES[0]),
        y: starY(STAR_KEYFRAMES[0]),
        rotate: STAR_KEYFRAMES[0].rotate,
        force3D: true,
      });

      gsap.set(starInner, {
        rotate: 0,
        force3D: true,
      });

      gsap.set(jargon, {
        opacity: 0,
      });

      gsap.set([beyondText, connectionText], {
        opacity: 0,
        x: -14,
        filter: "blur(18px)",
        clipPath: "inset(0 100% 0 0)",
        force3D: true,
      });

      gsap.set([mainSparkle, smallSparkle].filter(Boolean), {
        opacity: 0,
        scale: 0.2,
        x: 0,
      });

      gsap.set(logo, {
        opacity: 0,
        scale: 0.6,
        y: 0,
        force3D: true,
      });

      gsap.set(title, {
        opacity: 0,
        scale: 1,
        y: 12,
        filter: "blur(18px)",
        force3D: true,
      });

      gsap.set(dividerDiamond, {
        opacity: 0,
        scale: 0,
      });

      gsap.set([dividerLeft, dividerRight], {
        scaleX: 0,
      });

      gsap.set([subtitle, year], {
        opacity: 0,
        y: 8,
      });

      /*
       * -----------------------------------------------------------
       * REDUCED MOTION — skip all animations
       * -----------------------------------------------------------
       */
      if (reduceMotion.current) {
        gsap.set(world, { y: 0 });
        gsap.set(starOuter, { opacity: 0 });
        gsap.set(background, { yPercent: 0 });
        gsap.set(logo, {
          opacity: 1,
          scale: COMING_SOON_TIMELINE.logo.finalScale,
          y: logoFinalY,
        });
        gsap.set(title, { opacity: 1, scale: 1 });
        gsap.set(dividerDiamond, { opacity: 1, scale: 1 });
        gsap.set([dividerLeft, dividerRight], { scaleX: 1 });
        gsap.set([subtitle, year], { opacity: 1, y: 0 });
        return;
      }

      /*
       * -----------------------------------------------------------
       * MASTER TIMELINE
       * -----------------------------------------------------------
       */

      const timeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
          force3D: true,
        },
      });

      /*
       * -------------------------------------------------------
       * STAR — OUTER WRAPPER (position, scale, opacity, tilt)
       *
       * All position values use `x` / `y` in PIXELS computed from
       * viewport units (xVw * vw, yVh * vh).  This replaces the old
       * `xPercent / yPercent` approach which was relative to element
       * size and produced wildly different absolute positions on
       * different screen sizes.
       *
       * xPercent: -50 / yPercent: -50 are SET ONCE in initial state
       * above and never touched again — they provide the CSS-level
       * centering offset so the star's visual center starts at the
       * viewport center.  GSAP then shifts from there using x/y.
       *
       * Segment ease rationale:
       *   Seg 0→1  (t=0→0.2)    none       — invisible launch
       *   Seg 1→2  (t=0.2→2.0)  power3.out — fast pivot to left corner
       *   Seg 2→3  (t=2.0→3.8)  power2.inOut — sweep back toward center
       *   Seg 3→4  (t=3.8→5.2)  sine.inOut — slow hang at center
       *   Seg 4→5  (t=5.2→6.5)  power2.in  — accelerating growth
       *   Seg 5→6  (t=6.5→8.5)  power2.in  — fade out while expanding
       * -------------------------------------------------------
       */

      // Seg 0 → 1
      timeline.to(
        starOuter,
        {
          x: starX(STAR_KEYFRAMES[1]),
          y: starY(STAR_KEYFRAMES[1]),
          scale: STAR_KEYFRAMES[1].scale,
          rotate: STAR_KEYFRAMES[1].rotate,
          opacity: STAR_KEYFRAMES[1].opacity,
          duration: STAR_KEYFRAMES[1].time - STAR_KEYFRAMES[0].time,
          ease: "none",
        },
        STAR_KEYFRAMES[0].time,
      );

      // Seg 1 → 2: fast pivot to left side
      timeline.to(
        starOuter,
        {
          x: starX(STAR_KEYFRAMES[2]),
          y: starY(STAR_KEYFRAMES[2]),
          scale: STAR_KEYFRAMES[2].scale,
          rotate: STAR_KEYFRAMES[2].rotate,
          opacity: STAR_KEYFRAMES[2].opacity,
          duration: STAR_KEYFRAMES[2].time - STAR_KEYFRAMES[1].time,
          ease: "power3.out",
        },
        STAR_KEYFRAMES[1].time,
      );

      // Seg 2 → 3: arc from left toward center
      timeline.to(
        starOuter,
        {
          x: starX(STAR_KEYFRAMES[3]),
          y: starY(STAR_KEYFRAMES[3]),
          scale: STAR_KEYFRAMES[3].scale,
          rotate: STAR_KEYFRAMES[3].rotate,
          opacity: STAR_KEYFRAMES[3].opacity,
          duration: STAR_KEYFRAMES[3].time - STAR_KEYFRAMES[2].time,
          ease: "power2.inOut",
        },
        STAR_KEYFRAMES[2].time,
      );

      // Seg 3 → FINAL
      // Setelah pivot selesai, bintang langsung membesar
      // secara kontinu sampai full-screen.
      timeline.to(
        starOuter,
        {
          x: starX(STAR_KEYFRAMES[4]),
          y: starY(STAR_KEYFRAMES[4]),
          scale: STAR_KEYFRAMES[4].scale,
          rotate: STAR_KEYFRAMES[4].rotate,
          opacity: STAR_KEYFRAMES[4].opacity,
          duration: STAR_KEYFRAMES[4].time - STAR_KEYFRAMES[3].time,
          ease: "power2.in",
        },
        STAR_KEYFRAMES[3].time,
      );

      /*
       * -------------------------------------------------------
       * STAR — INNER WRAPPER (continuous spin only)
       * -------------------------------------------------------
       */
      timeline.to(
        starInner,
        {
          rotate: "+=360",
          duration: COMING_SOON_TIMELINE.shootingStarRotation.duration,
          repeat: COMING_SOON_TIMELINE.shootingStarRotation.repeat,
          ease: "none",
        },
        COMING_SOON_TIMELINE.shootingStarRotation.start,
      );

      /*
       * -------------------------------------------------------
       * WORLD CAMERA — TIME-REMAPPED SEGMENTS
       *
       * 5 segments with different ease per segment, driven by
       * WORLD_TRANSLATE_KEYFRAMES (indices 0–5).
       *
       *   t=0→0.2   : 0%→2%   (almost still — bintang baru muncul)
       *   t=0.2→2.0 : 2%→8%   (very slow — pivot drama)
       *   t=2.0→3.8 : 8%→38%  (fast sweep — world catches up)
       *   t=3.8→5.2 : 38%→68% (steady climb)
       *   t=5.2→6.5 : 68%→100% (accelerating finish — world fully revealed)
       * -------------------------------------------------------
       */

      // Seg 0→1 (t=0→0.2)
      timeline.to(
        world,
        {
          y: initialWorldY * (1 - WORLD_TRANSLATE_KEYFRAMES[1].progress),
          duration:
            WORLD_TRANSLATE_KEYFRAMES[1].time -
            WORLD_TRANSLATE_KEYFRAMES[0].time,
          ease: "none",
        },
        WORLD_TRANSLATE_KEYFRAMES[0].time,
      );

      // Seg 1→2 (t=0.2→2.0): very slow — star pivot takes center stage
      timeline.to(
        world,
        {
          y: initialWorldY * (1 - WORLD_TRANSLATE_KEYFRAMES[2].progress),
          duration:
            WORLD_TRANSLATE_KEYFRAMES[2].time -
            WORLD_TRANSLATE_KEYFRAMES[1].time,
          ease: "power1.in",
        },
        WORLD_TRANSLATE_KEYFRAMES[1].time,
      );

      // Seg 2→3 (t=2.0→3.8): fast — world catches up as star sweeps back
      timeline.to(
        world,
        {
          y: initialWorldY * (1 - WORLD_TRANSLATE_KEYFRAMES[3].progress),
          duration:
            WORLD_TRANSLATE_KEYFRAMES[3].time -
            WORLD_TRANSLATE_KEYFRAMES[2].time,
          ease: "power3.out",
        },
        WORLD_TRANSLATE_KEYFRAMES[2].time,
      );

      // Seg 3→4 (t=3.8→5.2): steady climb
      timeline.to(
        world,
        {
          y: initialWorldY * (1 - WORLD_TRANSLATE_KEYFRAMES[4].progress),
          duration:
            WORLD_TRANSLATE_KEYFRAMES[4].time -
            WORLD_TRANSLATE_KEYFRAMES[3].time,
          ease: "power2.inOut",
        },
        WORLD_TRANSLATE_KEYFRAMES[3].time,
      );

      /*
       * -------------------------------------------------------
       * JARGON — TWO-PART ELEGANT REVEAL
       * -------------------------------------------------------
       */

      timeline.set(
        jargon,
        {
          opacity: 1,
        },
        8.45,
      );

      /*
       * -------------------------------------------------------
       * BEYOND APPRECIATION
       * -------------------------------------------------------
       */

      timeline.fromTo(
        beyondText,
        {
          opacity: 0,
          x: -8,
          filter: "blur(5px)",
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0% 0 0)",
          duration: 3.6,
          ease: "power1.out",
        },
        8.5,
      );

      /*
       * Sparkle mengikuti reveal pertama
       */
      if (mainSparkle) {
        timeline.fromTo(
          mainSparkle,
          {
            opacity: 0,
            x: -12,
            scale: 0.2,
          },
          {
            opacity: 0.9,
            x: 14,
            scale: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          9.0,
        );

        timeline.to(
          mainSparkle,
          {
            x: 150,
            opacity: 0,
            scale: 0.25,
            duration: 2.2,
            ease: "power1.out",
          },
          9.8,
        );
      }

      /*
       * Hold Beyond Appreciation
       */
      timeline.to(
        beyondText,
        {
          opacity: 1,
          duration: 1.2,
        },
        12.1,
      );

      /*
       * -------------------------------------------------------
       * BUILDING CONNECTION
       *
       * Ada sedikit delay setelah bagian pertama selesai.
       * -------------------------------------------------------
       */

      timeline.fromTo(
        connectionText,
        {
          opacity: 0,
          x: -6,
          filter: "blur(5px)",
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          clipPath: "inset(0 0% 0 0)",
          duration: 3.6,
          ease: "power1.out",
        },
        13.0,
      );

      /*
       * Sparkle kedua
       */
      if (smallSparkle) {
        timeline.fromTo(
          smallSparkle,
          {
            opacity: 0,
            x: -10,
            scale: 0.2,
          },
          {
            opacity: 0.8,
            x: 16,
            scale: 1,
            duration: 1,
            ease: "sine.inOut",
          },
          13.5,
        );

        timeline.to(
          smallSparkle,
          {
            x: 180,
            opacity: 0,
            scale: 0.25,
            duration: 2.2,
            ease: "power1.out",
          },
          14.2,
        );
      }

      /*
       * Hold kedua jargon
       */
      timeline.to(
        connectionText,
        {
          opacity: 1,
          duration: 1.5,
        },
        16.6,
      );

      /*
       * -------------------------------------------------------
       * JARGON FADE OUT
       * -------------------------------------------------------
       */

      timeline.to(
        jargon,
        {
          opacity: 0,
          filter: "blur(10px)",
          y: -4,
          duration: 1.8,
          ease: "power1.inOut",
        },
        18.1,
      );

      /*
       * -------------------------------------------------------
       * LOGO FADE IN (simultaneous with star fade-out at t=6.5)
       * -------------------------------------------------------
       */
      timeline.to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: COMING_SOON_TIMELINE.logo.fadeInDuration,
          ease: "back.out(1.4)",
        },
        COMING_SOON_TIMELINE.logo.fadeInStart,
      );

      /*
       * -------------------------------------------------------
       * LOGO SHRINK + MOVE UP
       *
       * `logoFinalY` is computed once above from the hero cluster's own
       * rendered height (`heroHeightPx * finalYFactor`) — a consistent
       * proportional offset on every screen size, unlike the old
       * viewport-`vh`-based value which varied with the FULL window's
       * aspect ratio instead of the hero content's actual size.
       * -------------------------------------------------------
       */
      timeline.to(
        logo,
        {
          scale: COMING_SOON_TIMELINE.logo.finalScale,
          y: logoFinalY,
          duration: COMING_SOON_TIMELINE.logo.moveDuration,
          ease: "power2.inOut",
        },
        COMING_SOON_TIMELINE.logo.moveStart,
      );

      timeline.to(
        title,
        {
          y: titleFinalY,
          duration: COMING_SOON_TIMELINE.logo.moveDuration,
          ease: "power2.inOut",
        },
        COMING_SOON_TIMELINE.logo.moveStart,
      );

      /*
       * -------------------------------------------------------
       * TITLE — ELEGANT FLOATING REVEAL
       * -------------------------------------------------------
       */

      timeline.fromTo(
        title,
        {
          opacity: 0,
          y: 12,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.6,
          ease: "power2.out",
        },
        COMING_SOON_TIMELINE.title.start,
      );
      timeline.to(
        titleText,
        {
          y: -6,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        COMING_SOON_TIMELINE.title.start + 2.6,
      );

      /*
       * -------------------------------------------------------
       * SUBTLE SPARKLES
       *
       * Sparkle muncul bergantian setelah title mulai terlihat.
       * Tidak mengubah layout karena semuanya absolute.
       * -------------------------------------------------------
       */
      sparkles.forEach((sparkle, index) => {
        const start = COMING_SOON_TIMELINE.title.start + 0.9 + index * 0.22;

        timeline.fromTo(
          sparkle,
          {
            opacity: 0,
            scale: 0.2,
          },
          {
            opacity: 0.8,
            scale: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          start,
        );

        timeline.to(
          sparkle,
          {
            opacity: 0,
            scale: 0.35,
            duration: 1,
            ease: "power1.out",
          },
          start + 0.45,
        );
      });

      /*
       * -------------------------------------------------------
       * DIVIDER
       * -------------------------------------------------------
       */
      timeline.to(
        dividerDiamond,
        {
          opacity: 1,
          scale: 1,
          duration: COMING_SOON_TIMELINE.divider.diamondDuration,
          ease: "back.out(1.5)",
        },
        COMING_SOON_TIMELINE.divider.start,
      );

      timeline.to(
        [dividerLeft, dividerRight],
        {
          scaleX: 1,
          duration: COMING_SOON_TIMELINE.divider.lineDuration,
          ease: "power2.out",
        },
        COMING_SOON_TIMELINE.divider.start,
      );

      /*
       * -------------------------------------------------------
       * SUBTITLE
       * -------------------------------------------------------
       */
      timeline.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: COMING_SOON_TIMELINE.subtitle.duration,
          ease: "power2.out",
        },
        COMING_SOON_TIMELINE.subtitle.start,
      );

      /*
       * -------------------------------------------------------
       * YEAR
       * -------------------------------------------------------
       */
      timeline.to(
        year,
        {
          opacity: 1,
          y: 0,
          duration: COMING_SOON_TIMELINE.year.duration,
          ease: "power2.out",
        },
        COMING_SOON_TIMELINE.year.start,
      );

      return () => {
        timeline.kill();
      };
    },
    {
      dependencies: [],
    },
  );
}
