"use client";

import React, { useState } from "react";
import ThreeBackground from "@/components/ThreeBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import MaintenanceCardDeck from "@/components/MaintenanceCardDeck";

export default function MaintenancePage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#F8FAFC] font-bengali">
      
      {/* Interactive 3D Three.js Fluid Kinetic Sculpture */}
      {!reducedMotion && <ThreeBackground />}

      {/* Subtle Architectural Light Grid Texture */}
      <div className="fixed inset-0 bg-light-grid pointer-events-none z-0" aria-hidden="true" />

      {/* Header in English */}
      <Header
        reducedMotion={reducedMotion}
        onToggleMotion={() => setReducedMotion((prev) => !prev)}
      />

      {/* Main Experience Hero - Centered, Spacious & Balanced */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto w-full">
        
        {/* Oversized Master Card with Top System Reload Status & Smooth Typewriter */}
        <MaintenanceCardDeck reducedMotion={reducedMotion} />

        {/* Large Countdown Timer - Positioned below the card as requested */}
        <CountdownTimer />

      </main>

      {/* Institutional Footer in English */}
      <Footer />

    </div>
  );
}