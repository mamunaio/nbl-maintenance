"use client";

import React, { useState, useEffect } from "react";

// Convert numbers to Bengali digits
function toBengaliNumber(num: number | string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const str = String(num).padStart(2, "0");
  return str.replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  // Target maintenance window: Exactly 7 days (আগামী ৭ দিন)
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 6,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const storedTarget = typeof window !== "undefined" ? localStorage.getItem("nb_countdown_7days_target") : null;
    let targetTime: number;

    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
      if (targetTime <= Date.now()) {
        targetTime = Date.now() + SEVEN_DAYS_MS;
        localStorage.setItem("nb_countdown_7days_target", String(targetTime));
      }
    } else {
      targetTime = Date.now() + SEVEN_DAYS_MS;
      if (typeof window !== "undefined") {
        localStorage.setItem("nb_countdown_7days_target", String(targetTime));
      }
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "দিন", enLabel: "Days", value: timeRemaining.days },
    { label: "ঘণ্টা", enLabel: "Hours", value: timeRemaining.hours },
    { label: "মিনিট", enLabel: "Minutes", value: timeRemaining.minutes },
    { label: "সেকেন্ড", enLabel: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 mb-2 sm:mb-4 font-bengali">
      {/* Header Banner with Glassmorphism & Status Pulse */}
      <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/80 bg-white/70 backdrop-blur-xl text-xs sm:text-sm text-blue-700 font-bold mb-2.5 shadow-[0_4px_16px_rgba(37,99,235,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)]">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>নতুন উন্মোচন আসছে • Next-Gen Launch</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-wide">
          আমরা ফিরছি আর মাত্র &bull; Launching In:
        </h3>
      </div>

      {/* 4 Architectural Countdown Slabs with Frosted Glassmorphism & Lift Hover Effect */}
      <div className="grid grid-cols-4 gap-3 sm:gap-5 w-full">
        {timeUnits.map((unit, idx) => (
          <div
            key={unit.enLabel}
            className="relative flex flex-col items-center justify-center p-4 sm:p-7 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_15px_35px_-8px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] overflow-hidden group hover:-translate-y-2.5 hover:bg-white/85 hover:border-blue-400 hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.22),0_0_0_1px_rgba(37,99,235,0.2),inset_0_1px_2px_rgba(255,255,255,1)] transition-all duration-300 ease-out cursor-default"
          >
            {/* Top metallic sapphire hairline reflection that brightens on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-80 group-hover:opacity-100 group-hover:h-[4px] transition-all" />

            {/* Specular soft light sheen inside the glass slab */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />

            {/* Big Ticking Number with Deep Indigo-Slate Color */}
            <div className="relative z-10 text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 font-bengali select-none drop-shadow-xs group-hover:text-blue-700 transition-colors">
              {toBengaliNumber(unit.value)}
            </div>

            {/* Bilingual Unit Labels with Vibrant Blue */}
            <div className="relative z-10 mt-1.5 sm:mt-2.5 flex items-center gap-1.5 text-xs sm:text-base font-bold text-blue-600 tracking-wider">
              <span>{unit.label}</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono font-medium hidden sm:inline">
                ({unit.enLabel})
              </span>
            </div>

            {/* Separator dots for middle columns on desktop */}
            {idx < 3 && (
              <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300 font-bold text-2xl pointer-events-none">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
