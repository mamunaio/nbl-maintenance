"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MaintenanceCardProps {
  reducedMotion: boolean;
}

interface MaintenanceMessage {
  lang: "en" | "bn";
  badge: string;
  subBadge: string;
  categoryTag: string;
  headline: string;
  description: string;
  footerBrand: string;
  footerStatus: string;
  footerMantra: string;
  readingNotice: string;
}

const MESSAGES: MaintenanceMessage[] = [
  // 1st Text: English (First to display as requested)
  {
    lang: "en",
    badge: "SCHEDULED MAINTENANCE",
    subBadge: "Next-Gen 2.0 • HTTP 503",
    categoryTag: "Net Bangla System Upgrade • Real-Time Status",
    headline: "Sorry for the temporary inconvenience.",
    description: "The site is currently down for scheduled maintenance. We appreciate your patience and will be back shortly.",
    footerBrand: "Net Bangla Limited",
    footerStatus: "All systems & cloud data fully secure",
    footerMantra: "Technology. Talent. Transformation.",
    readingNotice: "Paused for 7 seconds to read",
  },
  // 2nd Text: Bengali (Second to display with 7-second delay)
  {
    lang: "bn",
    badge: "সিস্টেম মেইনটেন্যান্স",
    subBadge: "নেক্সট-জেন ২.০ • সিস্টেম আপগ্রেড",
    categoryTag: "নেট বাংলা সিস্টেম রিলোড • লাইভ আপডেট",
    headline: "সাময়িক অসুবিধার জন্য দুঃখিত।",
    description: "সিস্টেম মেইনটেন্যান্সের কাজ চলায় সাময়িকভাবে সাইটটি বন্ধ রয়েছে। আপনাদের ধৈর্যের জন্য আন্তরিক ধন্যবাদ। খুব শিগগিরই আমরা ফিরে আসছি।",
    footerBrand: "নেট বাংলা লিমিটেড",
    footerStatus: "সকল সিস্টেম ও ক্লাউড ডেটা সম্পূর্ণ নিরাপদ",
    footerMantra: "প্রযুক্তি। মেধা। রূপান্তর।",
    readingNotice: "পড়ার সুবিধার্থে ৭ সেকেন্ড স্থির থাকবে",
  },
];

// Grapheme-safe text splitter for flawless multi-language rendering
function splitGraphemes(text: string, lang: "en" | "bn"): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(lang, { granularity: "grapheme" });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return Array.from(text);
}

export default function MaintenanceCardDeck({ reducedMotion }: MaintenanceCardProps) {
  // Index 0 = English (1st), Index 1 = Bengali (2nd)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "reading" | "deleting" | "idle">("typing");

  const [headlineLength, setHeadlineLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);

  // Synchronous refs to prevent React timer batching race conditions
  const hIndexRef = useRef(0);
  const dIndexRef = useRef(0);

  const [isHovered, setIsHovered] = useState(false);

  // 3D Perspective Mouse Tilt & Glare State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const currentMessage = MESSAGES[currentIndex];
  const headlineGraphemes = splitGraphemes(currentMessage.headline, currentMessage.lang);
  const descriptionGraphemes = splitGraphemes(currentMessage.description, currentMessage.lang);

  // Synchronized Typewriter Machine with 7-Second Reading Delay
  useEffect(() => {
    if (phase === "typing") {
      // Natural human typing cadence (42ms interval)
      const timer = setInterval(() => {
        const maxH = headlineGraphemes.length;
        const maxD = descriptionGraphemes.length;

        if (hIndexRef.current < maxH) {
          hIndexRef.current += 1;
          setHeadlineLength(hIndexRef.current);
        }

        if (dIndexRef.current < maxD) {
          dIndexRef.current += 1;
          setDescriptionLength(dIndexRef.current);
        }

        if (hIndexRef.current >= maxH && dIndexRef.current >= maxD) {
          clearInterval(timer);
          setPhase("reading");
        }
      }, 42);

      return () => clearInterval(timer);
    }

    if (phase === "reading") {
      // Exactly 7 seconds time delay (7000ms) between English and Bengali
      // Paused indefinitely if user is hovering their mouse over the card
      if (!isHovered) {
        const readingTimer = setTimeout(() => {
          setPhase("deleting");
        }, 7000); // 7 seconds delay
        return () => clearTimeout(readingTimer);
      }
    }

    if (phase === "deleting") {
      // Smooth, deliberate reverse backspacing (18ms)
      const timer = setInterval(() => {
        if (hIndexRef.current > 0) {
          hIndexRef.current -= 1;
          setHeadlineLength(hIndexRef.current);
        }

        if (dIndexRef.current > 0) {
          dIndexRef.current = Math.max(0, dIndexRef.current - 1);
          setDescriptionLength(dIndexRef.current);
        }

        if (hIndexRef.current === 0 && dIndexRef.current === 0) {
          clearInterval(timer);
          setPhase("idle");
        }
      }, 18);

      return () => clearInterval(timer);
    }

    if (phase === "idle") {
      // 1-second calm breath before alternating to next language
      const idleTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
        hIndexRef.current = 0;
        dIndexRef.current = 0;
        setHeadlineLength(0);
        setDescriptionLength(0);
        setPhase("typing");
      }, 1000);

      return () => clearTimeout(idleTimer);
    }
  }, [phase, currentIndex, headlineGraphemes.length, descriptionGraphemes.length, isHovered]);

  // Manual language toggle (if user wants to click EN / বাংলা directly)
  const handleToggleLanguage = (idx: number) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
    const targetH = splitGraphemes(MESSAGES[idx].headline, MESSAGES[idx].lang).length;
    const targetD = splitGraphemes(MESSAGES[idx].description, MESSAGES[idx].lang).length;
    hIndexRef.current = targetH;
    dIndexRef.current = targetD;
    setHeadlineLength(targetH);
    setDescriptionLength(targetD);
    setPhase("reading");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 1.8;
    const rotY = ((x - centerX) / centerX) * 1.8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const displayedHeadline = headlineGraphemes.slice(0, headlineLength).join("");
  const displayedDescription = descriptionGraphemes.slice(0, descriptionLength).join("");

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Top Header Status Bar - Frosted Glassmorphism with Language Switcher */}
      <div className="w-full flex items-center justify-between border-b border-white/60 bg-white/40 backdrop-blur-md px-4 py-2.5 rounded-2xl mb-5 sm:mb-6 text-xs sm:text-sm text-slate-600 shadow-[0_4px_20px_rgba(15,23,42,0.02)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-slate-900 font-bold tracking-wide">
            {currentMessage.categoryTag}
          </span>
        </div>
        
        {/* Language Indicator & Live Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm p-1 rounded-lg border border-white/80 shadow-xs">
            <button
              onClick={() => handleToggleLanguage(0)}
              className={`px-2.5 py-0.5 text-xs font-bold rounded transition-all cursor-pointer ${
                currentIndex === 0
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => handleToggleLanguage(1)}
              className={`px-2.5 py-0.5 text-xs font-bold rounded transition-all cursor-pointer ${
                currentIndex === 1
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
              title="বাংলা"
            >
              বাংলা
            </button>
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px] sm:text-xs font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>LIVE UPDATE</span>
          </div>
        </div>
      </div>

      {/* 3D Perspective Master Card with Translucent Frosted Glassmorphism & Mouse Hover Lift */}
      <div
        className="relative w-full perspective-stage select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={
            reducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: isHovered ? 1.008 : 1,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  transition: {
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }
          }
          className="relative w-full rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/80 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.09),0_0_0_1px_rgba(255,255,255,0.9),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_40px_90px_-15px_rgba(37,99,235,0.16),0_0_0_1px_rgba(59,130,246,0.3),inset_0_1px_2px_rgba(255,255,255,1)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden transition-shadow duration-500"
        >
          {/* Top Sapphire & Indigo Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

          {/* Dynamic Specular Soft Glare Layer Tracking Mouse */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 480px at ${glarePos.x}% ${glarePos.y}%, rgba(37,99,235,0.08), transparent 70%)`,
              opacity: glarePos.opacity,
            }}
          />

          {/* Frosted inner gradient for crystalline depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 pointer-events-none" />

          {/* Top Ledger: Brand & Badge */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-100/80 pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs">
                {currentMessage.badge}
              </span>
              <span className="hidden sm:inline h-4 w-px bg-slate-200"></span>
              <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-slate-500 tracking-wide font-mono">
                {currentMessage.subBadge}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-blue-700 font-display font-bold tracking-wide">
                Net Bangla Limited
              </span>
            </div>
          </div>

          {/* Center Editorial Statement with 7-Second Alternating Typewriter */}
          <div className="relative z-10 my-auto py-5 sm:py-7">
            
            {/* Primary Headline with Cursor */}
            <h2
              className={`font-extrabold text-2xl sm:text-4xl lg:text-[2.85rem] text-slate-900 tracking-normal min-h-[3.2em] sm:min-h-[2.8em] flex flex-col justify-start ${
                currentMessage.lang === "bn" ? "font-bengali leading-[1.6]" : "font-display leading-[1.35]"
              }`}
            >
              <span>
                {displayedHeadline}
                <span
                  className={`inline-block w-[3px] h-[0.85em] ml-2 bg-blue-600 align-baseline transition-opacity duration-150 ${
                    phase === "reading" ? "animate-pulse opacity-75" : "opacity-100 animate-pulse"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* Explanatory Subtitle */}
            <div className="mt-4 sm:mt-6 min-h-[3.5em] sm:min-h-[2.8em]">
              <p
                className={`text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl font-normal block ${
                  currentMessage.lang === "bn" ? "font-bengali leading-[1.7]" : "font-sans leading-relaxed"
                }`}
              >
                {displayedDescription}
              </p>
            </div>

            {/* 7-Second Reading Indicator */}
            {phase === "reading" && (
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-blue-600 animate-fadeIn">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                <span>
                  {isHovered ? (
                    currentMessage.lang === "bn" ? "মাউস রাখায় লেখাটি স্থির রয়েছে" : "Paused while mouse hovered"
                  ) : (
                    currentMessage.readingNotice
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Bottom Ledger: Verification & Coordinates */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100/80 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse"></span>
              <span className="text-slate-900 font-bold">
                {currentMessage.footerBrand}
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="text-slate-600 hidden sm:inline font-medium">
                {currentMessage.footerStatus}
              </span>
            </div>
            <div className="text-blue-700 font-bold tracking-wider">
              {currentMessage.footerMantra}
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
