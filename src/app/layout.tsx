import type { Metadata } from "next";
import { Noto_Sans_Bengali, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const displayFont = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Net Bangla Limited — Scheduled Maintenance & Infrastructure Enhancement",
  description: "Net Bangla Limited enterprise and government digital infrastructure maintenance. Technology. Talent. Transformation.",
  icons: {
    icon: "/netbangla-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${bengaliFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-bengali antialiased">
        {children}
      </body>
    </html>
  );
}