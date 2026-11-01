# Net Bangla Limited — Next-Gen Maintenance Experience

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

A bespoke, ultra-premium scheduled maintenance web experience crafted for **Net Bangla Limited**. Engineered with mathematical 3D WebGL particle physics, translucent frosted glassmorphism, bilingual typewriter pacing, and high-performance React 19 architecture.

---

## 🏛️ Core Features

- **Single Master Glass Card (`MaintenanceCardDeck`):**
  - **Bilingual Dual-Loop Typewriter:** Natural character-by-character typing alternating between English (1st) and Bengali (2nd).
  - **7-Second Pacing Window:** Exact 7,000ms reading pause between languages for comfortable user comprehension.
  - **Pause-on-Hover:** Automatically pauses typing and countdown delays indefinitely when the user points to the card.
  - **Interactive 3D Mouse Tilt:** Real-time physical tilt (`rotateX`, `rotateY`) and dynamic specular glare following cursor coordinates.
  - **Instant Manual Switcher:** Top-bar language toggle (`EN` / `বাংলা`) for on-demand language switching.

- **Next-Gen 3D WebGL Architecture (`ThreeBackground`):**
  - Topographic sine-wave data grid responding smoothly to camera physics.
  - Floating faceted holographic quantum core with dual concentric gyroscopic gimbal rings.
  - Prismatic satellite nodes interconnected with streaming laser photon trails.
  - High-performance, low-power GPU loop with resource disposal on unmount.

- **Architectural 7-Day Countdown Timer (`CountdownTimer`):**
  - Positioned elegantly below the card with frosted acrylic slabs.
  - Live ticking countdown rendered in Bengali numerals (`০`, `১`, `২`, `৩`...) with bilingual unit labels (`দিন`, `ঘণ্টা`, `মিনিট`, `সেকেন্ড`).
  - Interactive hover lift effect (`hover:-translate-y-2.5`) with metallic sapphire highlight.

- **Translucent Frosted Glassmorphism:**
  - Multi-layered acrylic backdrop filters (`backdrop-blur-2xl`, `bg-white/75`, `inset_0_1px_2px_white`) applied across Navbar, Card, Countdown, and Footer.
  - The 3D animation remains subtly visible through every interface slab.

- **Enterprise Typography:**
  - **Bengali:** `Noto Sans Bengali` (Google's crisp, modern, corporate Bengali typeface).
  - **English:** `Inter` (The silicon valley standard for digital SaaS).
  - **Monospace/Ledger:** `JetBrains Mono` for system telemetry and status indicators.

- **Accessibility & Motion Safety:**
  - Built-in `Standard` vs `Reduced Motion` toggle in the header.
  - Full keyboard accessibility and grapheme-safe text segmentation (`Intl.Segmenter`) preventing Bengali diacritic clipping.

---

## 📂 Project Structure

```text
nbl-maintenance/
├── public/
│   ├── netbangla-logo.svg       # Vector brand logo
│   ├── netbangla-logo.png       # High-res raster brand mark
│   └── netbangla-logo.jpg       # Fallback raster asset
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system variables & custom scrollbar
│   │   ├── layout.tsx           # Global font imports & SEO metadata
│   │   └── page.tsx             # Master page assembling Header, Card, Timer, Footer
│   └── components/
│       ├── CountdownTimer.tsx   # 7-day frosted glass countdown slabs
│       ├── Footer.tsx           # Institutional glass footer
│       ├── Header.tsx           # Frosted glass navbar with motion toggle
│       ├── MaintenanceCardDeck.tsx # 3D single card with 7s bilingual typewriter
│       └── ThreeBackground.tsx  # Three.js WebGL procedural sine-grid
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS plugin pipeline
├── tailwind.config.ts           # Tailwind theme extensions & font tokens
└── tsconfig.json                # Strict TypeScript configuration
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js:** v18.18.0 or later (v20+ recommended)
- **npm** / **pnpm** / **yarn**

### 1. Installation
```bash
git clone https://github.com/mamunaio/nbl-maintenance.git
cd nbl-maintenance
npm install
```

### 2. Development Mode
Run the development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Compile static pages and verify zero-error production optimization:
```bash
npm run build
npm run start
```

---

## 🚀 Deployment

### Vercel (Recommended)
This repository is optimized for zero-configuration deployment on Vercel:
1. Import repository `mamunaio/nbl-maintenance` into Vercel.
2. Framework Preset will auto-detect as **Next.js**.
3. Deploy!

### Docker / Self-Hosted Node.js
```bash
npm run build
PORT=3000 npm run start
```

---

## 🏢 Brand & Corporate Verification

- **Company:** Net Bangla Limited
- **Membership:** Bangladesh Association of Contact Center & Outsourcing (BACCO Member #2018.0062)
- **Corporate Mantra:** *Technology. Talent. Transformation.*
- **System Classification:** Tier-1 Enterprise Scheduled Maintenance Mode (HTTP 503 Ready)

---

## 📄 License
Proprietary & Confidential — © Net Bangla Limited. All rights reserved.
