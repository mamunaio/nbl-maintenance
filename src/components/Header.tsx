"use client";

import React from "react";

interface HeaderProps {
  reducedMotion: boolean;
  onToggleMotion: () => void;
}

export default function Header({ reducedMotion, onToggleMotion }: HeaderProps) {
  return (
    <header className="relative z-30 w-full border-b border-white/60 bg-white/70 backdrop-blur-xl px-5 sm:px-10 lg:px-16 py-4 shadow-[0_4px_24px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Authentic Net Bangla Brand Identity in Crisp Full Color */}
        <div className="flex items-center gap-3.5">
          <div className="p-1 rounded-lg bg-slate-50 border border-slate-200/80 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/netbangla-logo.svg"
              alt="Net Bangla Limited"
              className="h-7 sm:h-8 w-auto object-contain hover:opacity-95 transition-opacity"
              onError={(e) => {
                e.currentTarget.src = "/netbangla-logo.png";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wide text-slate-900 leading-tight">
              Net Bangla Limited
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-medium">
              Enterprise Digital Infrastructure
            </span>
          </div>
        </div>

        {/* Status indicator & Motion switch in English */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-blue-200 bg-blue-50/80 text-blue-800 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase">
              Scheduled Maintenance
            </span>
            <span className="text-[11px] text-blue-600/80 border-l border-blue-200 pl-2">
              HTTP 503
            </span>
          </div>

          <button
            onClick={onToggleMotion}
            className="hidden sm:inline-block px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition text-xs text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer"
            title="Toggle motion preferences"
          >
            {reducedMotion ? "Motion: Reduced" : "Motion: Standard"}
          </button>
        </div>

      </div>
    </header>
  );
}