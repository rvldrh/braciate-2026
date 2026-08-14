import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const sloop = localFont({
  src: "../fonts/sloop/Sloop Script Regular.ttf",
  variable: "--font-sloop",
  display: "swap",
});

export const theSeasons = localFont({
  src: [
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-it.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-bdit.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-the-seasons",
  display: "swap",
});
