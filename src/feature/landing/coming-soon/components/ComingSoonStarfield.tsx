"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

import { generateStarfield } from "../utils/generateStarfield";

const MOBILE_COUNT = 60;
const TABLET_COUNT = 90;
const DESKTOP_COUNT = 110;

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

export function ComingSoonStarfield() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (stars.length === 0) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const elements = container.querySelectorAll<HTMLSpanElement>(
      "[data-coming-soon-star]",
    );

    const animations: gsap.core.Tween[] = [];

    elements.forEach((element, index) => {
      const star = stars[index];

      if (!star) {
        return;
      }

      /*
       * Gentle twinkle
       */
      const twinkle = gsap.to(element, {
        opacity: star.opacity,
        duration: star.duration,
        delay: star.delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
       * Slow floating motion
       */
      const float = gsap.to(element, {
        y: `+=${star.floatDistance}`,
        x: `+=${star.horizontalDistance}`,
        duration: star.floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      animations.push(twinkle, float);
    });

    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, [stars]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <span
          key={star.id}
          data-coming-soon-star
          className="absolute rounded-full bg-yellow-50"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}
