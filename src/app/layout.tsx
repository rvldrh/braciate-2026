import type { Metadata } from "next";
import { jakarta, inter, sloop, theSeasons } from "@/src/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Braciate",
  description: "Brawijaya Festival Appreciate 2026",
  icons: {
    icon: "/images/logo/logo-coming-soon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${sloop.variable} ${theSeasons.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
