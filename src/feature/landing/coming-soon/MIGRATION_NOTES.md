# Coming Soon — Responsive Remake, Migration Notes

Ini ringkasan konkret dari apa yang berubah, mengikuti rencana di
`coming-soon-responsive-audit.md` (Fase 1–4). Semua 15 file asli
diperhitungkan; 9 dipindah tanpa perubahan logic, 6 direfactor.

## Struktur folder baru

```
features/coming-soon/
├── components/
│   ├── layout/    ComingSoonContainer, ComingSoonWorld, ComingSoonStageTop, ComingSoonStageBottom
│   ├── scene/      ComingSoonBackgroundReveal, ComingSoonStarfield, ComingSoonShootingStar
│   └── content/    ComingSoonLogo, ComingSoonJargon, ComingSoonTitle, ComingSoonHero (BARU)
├── constants/
│   ├── coming-soon.layout.ts     (breakpoints, HERO_MAX_WIDTH_PX, stage/world heights)
│   ├── coming-soon.spacing.ts    BARU (gap tokens, gantikan top:Xdvh)
│   └── coming-soon.timeline.ts   (murni timing GSAP)
├── hooks/
│   ├── useComingSoonTimeline.tsx
│   ├── useBreakpoint.ts          BARU (satu sumber breakpoint 768/1024)
│   └── useViewportUnits.ts       BARU (bungkus React dari viewport.ts)
├── utils/         viewport.ts, generateStarfield.ts (tidak diubah)
└── types/          coming-soon.type.ts (+heroRef)
```

## Root cause yang diperbaiki

Tiga sistem koordinat independen (posisi `dvh`, ukuran `cqw`, dan GSAP
`vh`/`vw` penuh) dulu mengukur hal yang sama dengan basis berbeda. Fix-nya:

1. **Logo, Jargon, dan Title sekarang satu flow layout**
   (`ComingSoonHero.tsx`, BARU), bukan tiga elemen `position: absolute;
   top: 42dvh/48dvh/36dvh` independen. Seluruh cluster di-center sebagai
   satu unit oleh parennya (`ComingSoonStageTop.tsx`), jadi jaraknya
   otomatis proporsional di semua breakpoint — termasuk celah
   756–831px yang disebut eksplisit di audit.

2. **Logo dan Jargon berbagi satu slot** (bukan ditumpuk berurutan).
   Alasannya bukan sembarangan: di timeline, Jargon selesai fade-out
   tepat saat Logo mulai fade-in di posisi yang sama (~t=18.1–19.9s) —
   keduanya tidak pernah terlihat bersamaan. Kalau ditumpuk sebagai flow
   biasa, box Jargon (yang 2 baris di mobile, 1 baris di ≥640px) akan
   tetap makan ruang kosong setelah opacity:0, mendorong Title turun
   permanen. Jargon di-absolutely-position di dalam slot `relative` yang
   ukurannya mengikuti Logo — jadi tidak pernah mempengaruhi flow height.

3. **Posisi akhir logo (GSAP) sekarang dihitung dari tinggi hero
   cluster yang sesungguhnya** (`heroRef.getBoundingClientRect().height
   * finalYFactor`), bukan dari `vh` viewport penuh (`finalYVh` lama).
   Lihat komentar di `coming-soon.timeline.ts`.

4. **Shooting star SENGAJA tetap pakai `vw`/`vh` viewport penuh** —
   ini efek sinematik full-bleed yang harus mengikuti layar
   sesungguhnya, bukan bagian dari hero cluster 520px. Ini satu
   penyimpangan sadar dari rekomendasi audit yang menyebut "semua
   posisi GSAP" — didokumentasikan langsung di kode.

5. **`STAGE_TOP_HEIGHT_DVH`/`WORLD_HEIGHT_DVH` diperluas dari 3 titik
   (mobile/tablet/desktop) jadi 6** (mengikuti breakpoint Tailwind
   sm/md/lg/xl/2xl), dan `WORLD_HEIGHT_DVH` sekarang DITURUNKAN dari
   `STAGE_TOP_HEIGHT_DVH` (+100) alih-alih jadi dua object hardcoded
   terpisah yang bisa drift.

6. **Breakpoint 768/1024 sekarang satu sumber** (`getBreakpointTier()`
   di `hooks/useBreakpoint.ts`), dipakai oleh `ComingSoonStarfield.tsx`
   dan `useComingSoonTimeline.tsx` — dulu di-hardcode ulang di kedua
   file.

## Yang HARUS kalian lakukan setelah drop-in

- **Update semua import path** yang menunjuk ke lokasi file lama
  (`../constants/coming-soon.constant` dll sudah diupdate di dalam
  paket ini, tapi kalau ada file LAIN di codebase kalian — misalnya
  halaman route yang mengimpor `ComingSoonContainer` — path-nya
  sekarang `features/coming-soon/components/layout/ComingSoonContainer`).
- Cek `globals.css` — kelas `.star-twinkle` yang dipakai
  `ComingSoonStarfield.tsx` tidak ada di file yang diupload, pastikan
  masih ada di project kalian (tidak disentuh di sini).
- Sesuaikan `HERO_SPACING.jargonToTitleGap` dan `finalYFactor` (di
  `coming-soon.timeline.ts`) dengan mata — ini titik awal yang masuk
  akal secara proporsi, tapi "terasa pas" itu keputusan visual, bukan
  sesuatu yang bisa saya tebak tanpa lihat hasil render langsung.
- Jalankan Fase 0/5 di audit (screenshot matrix + `getBoundingClientRect`
  regression) sebelum ship — struktur sudah dibenahi, tapi angka-angka
  spacing baru (`HERO_SPACING`, `finalYFactor`) tetap perlu QA visual di
  device asli, terutama breakpoint 640px (transisi Jargon `flex-col` →
  `sm:flex-row`) dan ultrawide (3440px+).
