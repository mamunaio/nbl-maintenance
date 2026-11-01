"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-white/60 bg-white/70 backdrop-blur-xl px-5 sm:px-10 lg:px-16 py-8 font-sans shadow-[0_-4px_24px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        
        {/* Brand Mantra & Copyright in English */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="text-slate-700 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Net Bangla Limited. All rights reserved.
          </span>
          <span className="hidden sm:inline text-slate-300">&bull;</span>
          <span className="font-display tracking-wider text-slate-800 font-semibold">
            &ldquo;Technology. Talent. Transformation.&rdquo;
          </span>
        </div>

        {/* Institutional Contact Coordinates in English */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono">
          <a
            href="mailto:info@netbanglaltd.com"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            info@netbanglaltd.com
          </a>
          <span className="text-slate-300">&bull;</span>
          <a
            href="tel:+8801970711632"
            className="text-slate-600 hover:text-blue-600 transition-colors"
          >
            +880 1970 711632
          </a>
          <span className="text-slate-300 hidden sm:inline">&bull;</span>
          <span className="text-slate-500 hidden sm:inline">
            Banasree, Dhaka-1219, Bangladesh
          </span>
        </div>

      </div>
    </footer>
  );
}