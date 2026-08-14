"use client";

import Image from "next/image";
import { forwardRef } from "react";

export const ComingSoonLogo = forwardRef<HTMLDivElement>(
  function ComingSoonLogo(_, ref) {
    return (
      <div
        ref={ref}
        className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          top: "50vh",
          width: "clamp(120px, 22vw, 420px)",
          opacity: 0,
        }}
      >
        <Image
          src="/images/logo/logo-coming-soon.svg"
          alt="Braciate 2026"
          width={560}
          height={560}
          priority
          className="h-auto w-full object-contain"
        />
      </div>
    );
  },
);
