export interface StarfieldItem {
  id: string;
  top: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

/**
 * Generate posisi & timing acak untuk starfield.
 * Dipakai bareng CSS keyframe `.star-twinkle` di globals.css —
 * TIDAK ada lagi GSAP tween per-elemen (lihat ComingSoonStarfield.tsx).
 */
export function generateStarfield(count: number): StarfieldItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `star-${index}`,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1, // 1px - 3px
    opacity: Math.random() * 0.7 + 0.3, // 0.3 - 1
    duration: Math.random() * 2.5 + 1.5, // 1.5s - 4s
    delay: Math.random() * 3, // 0s - 3s
  }));
}
