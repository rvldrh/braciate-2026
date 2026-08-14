"use client";

import Image from "next/image";
import { forwardRef } from "react";

export const ComingSoonBackgroundReveal = forwardRef<HTMLDivElement, object>(
  function ComingSoonBackgroundReveal(_, ref) {
    return (
      <div
        ref={ref}
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/background/background.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-900/35 to-blue-900/75" />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-900/80 to-transparent" />
      </div>
    );
  },
);
