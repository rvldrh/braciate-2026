import type { StarParticle } from "../types/coming-soon.type";

export function generateStarfield(count: number): StarParticle[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `coming-soon-star-${index}`,

    top: Math.random() * 100,

    left: Math.random() * 100,

    size: 2 + Math.random() * 2,

    opacity: 0.15 + Math.random() * 0.85,

    duration: 1.5 + Math.random() * 2.5,

    delay: Math.random() * 3,

    floatDuration: 6 + Math.random() * 4,

    floatDistance: 12 + Math.random() * 14,
    horizontalDistance: 2 + Math.random() * 5,
  }));
}
