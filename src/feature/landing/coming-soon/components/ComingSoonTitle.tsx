"use client";

import type { RefObject } from "react";

interface ComingSoonTitleProps {
  titleRef: RefObject<HTMLDivElement | null>;
  dividerLeftRef: RefObject<HTMLDivElement | null>;
  dividerDiamondRef: RefObject<HTMLDivElement | null>;
  dividerRightRef: RefObject<HTMLDivElement | null>;
}

export function ComingSoonTitle({
  titleRef,
  dividerLeftRef,
  dividerDiamondRef,
  dividerRightRef,
}: ComingSoonTitleProps) {
  return (
    <div
      ref={titleRef}
      className="absolute left-1/2 z-30 flex -translate-x-1/2 flex-col items-center will-change-transform"
      style={{
        top: "44vh",
        opacity: 0,
        filter: "blur(18px)",
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
        className="whitespace-nowrap text-center leading-none will-change-transform"
        style={{
          fontSize: "clamp(2rem, 6vw, 7rem)",
        }}
      >
        <span
          className="font-sloop text-yellow-300"
          style={{
            fontSize: "clamp(3rem, 9vw, 10.5rem)",
          }}
        >
          C
        </span>

        <span className="ml-[0.15em] font-the-seasons text-yellow-100">
          oming
        </span>

        <span
          className="font-sloop text-yellow-300"
          style={{
            fontSize: "clamp(3rem, 9vw, 10.5rem)",
          }}
        >
          S
        </span>

        <span className="ml-[0.15em] font-the-seasons text-yellow-100">
          oon
        </span>
      </h1>

      <div className="mt-[0.5em] flex w-full items-center justify-center gap-[0.8vw]">
        <div
          ref={dividerLeftRef}
          className="origin-right bg-yellow-300/80"
          style={{
            height: "2px",
            width: "clamp(3rem, 10vw, 16rem)",
          }}
        />

        <div
          ref={dividerDiamondRef}
          className="relative shrink-0"
          style={{
            width: "clamp(14px, 1.3vw, 22px)",
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
          className="origin-left bg-yellow-300/80"
          style={{
            height: "2px",
            width: "clamp(3rem, 10vw, 16rem)",
          }}
        />
      </div>
    </div>
  );
}
