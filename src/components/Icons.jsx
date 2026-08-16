import React from 'react';

// Brand Logo Component with Dress Hanger Icon, Calligraphy 'Nepal', Serif 'Fashion', and Tagline
export const BrandLogo = ({ className = "h-14", light = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dress on Hanger Emblem */}
      <div className="relative w-11 h-14 flex-shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
          {/* Hanger Hook */}
          <path
            d="M 50 15 C 44 15 42 22 47 26 C 52 30 50 35 50 38"
            fill="none"
            stroke={light ? "#FCE4EC" : "#D81B60"}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Hanger Shoulder Bar */}
          <path
            d="M 30 40 L 50 35 L 70 40"
            fill="none"
            stroke={light ? "#FFFFFF" : "#0B192C"}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Dress Bodice (Pink) */}
          <path
            d="M 35 40 Q 50 48 65 40 L 58 60 Q 50 63 42 60 Z"
            fill="#E91E63"
          />
          {/* Waist Band / Accent (Dark Navy) */}
          <path
            d="M 42 60 Q 50 63 58 60 L 59 66 Q 50 69 41 66 Z"
            fill="#0B192C"
          />
          {/* Flowing Skirt Drape (Pink & White layers) */}
          <path
            d="M 41 66 Q 50 69 59 66 L 76 108 Q 50 102 24 108 Z"
            fill="#D81B60"
          />
          <path
            d="M 46 68 Q 50 70 54 68 L 62 105 Q 50 102 38 105 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Text Stack */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className="font-script text-3xl sm:text-4xl text-[#D81B60] tracking-wide -mb-1 transform -rotate-2">
            Nepal
          </span>
          <span className={`font-serif font-extrabold text-2xl sm:text-3xl tracking-tight ${light ? 'text-white' : 'text-[#0B192C]'}`}>
            Fashion
          </span>
          <span className="bg-[#D81B60] text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ml-0.5 shadow-sm">
            KTM
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1 text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase">
          <span className="h-[1px] w-3 bg-[#D4AF37]/70"></span>
          <span className={light ? 'text-slate-300' : 'text-slate-600'}>STYLE THAT SPEAKS YOU</span>
          <span className="text-[#D81B60] text-xs">♡</span>
          <span className="h-[1px] w-3 bg-[#D4AF37]/70"></span>
        </div>
      </div>
    </div>
  );
};

// Ornate Golden Section Heading Flourish
export const OrnateDivider = ({ children, light = false }) => {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <svg className="w-12 sm:w-16 h-4 text-[#C5A059]" viewBox="0 0 100 24" fill="currentColor">
        <path d="M0 12 Q 25 18, 50 12 T 90 12 M 75 8 C 82 4, 88 4, 95 12 C 88 20, 82 20, 75 16 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="95" cy="12" r="3" fill="currentColor" />
      </svg>
      <div className="flex items-center gap-1.5">{children}</div>
      <svg className="w-12 sm:w-16 h-4 text-[#C5A059] transform rotate-180" viewBox="0 0 100 24" fill="currentColor">
        <path d="M0 12 Q 25 18, 50 12 T 90 12 M 75 8 C 82 4, 88 4, 95 12 C 88 20, 82 20, 75 16 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="95" cy="12" r="3" fill="currentColor" />
      </svg>
    </div>
  );
};

// Nepali Pagoda Temple Illustration (Vector)
export const PagodaTemple = ({ className = "w-48 h-64 opacity-20" }) => {
  return (
    <svg viewBox="0 0 200 260" className={className} fill="none" stroke="currentColor">
      {/* Pinnacle / Gajur */}
      <path d="M100 10 L100 25 M97 20 L103 20 M95 25 L105 25" strokeWidth="2" strokeLinecap="round" />
      <polygon points="100,5 98,12 102,12" fill="currentColor" />

      {/* Top Roof (5th Tier) */}
      <path d="M85 35 Q100 30 115 35 L125 45 Q100 42 75 45 Z" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      <rect x="90" y="45" width="20" height="12" strokeWidth="1.5" />

      {/* 4th Tier */}
      <path d="M70 58 Q100 52 130 58 L142 70 Q100 66 58 70 Z" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      <rect x="80" y="70" width="40" height="15" strokeWidth="1.5" />
      <line x1="90" y1="70" x2="90" y2="85" strokeWidth="1" />
      <line x1="100" y1="70" x2="100" y2="85" strokeWidth="1" />
      <line x1="110" y1="70" x2="110" y2="85" strokeWidth="1" />

      {/* 3rd Tier */}
      <path d="M55 86 Q100 80 145 86 L160 100 Q100 95 40 100 Z" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      <rect x="70" y="100" width="60" height="18" strokeWidth="1.5" />
      <line x1="80" y1="100" x2="80" y2="118" strokeWidth="1" />
      <line x1="90" y1="100" x2="90" y2="118" strokeWidth="1" />
      <line x1="100" y1="100" x2="100" y2="118" strokeWidth="1" />
      <line x1="110" y1="100" x2="110" y2="118" strokeWidth="1" />
      <line x1="120" y1="100" x2="120" y2="118" strokeWidth="1" />

      {/* 2nd Tier */}
      <path d="M38 120 Q100 112 162 120 L178 136 Q100 130 22 136 Z" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      <rect x="58" y="136" width="84" height="22" strokeWidth="1.5" />
      <line x1="72" y1="136" x2="72" y2="158" strokeWidth="1" />
      <line x1="86" y1="136" x2="86" y2="158" strokeWidth="1" />
      <line x1="100" y1="136" x2="100" y2="158" strokeWidth="1" />
      <line x1="114" y1="136" x2="114" y2="158" strokeWidth="1" />
      <line x1="128" y1="136" x2="128" y2="158" strokeWidth="1" />

      {/* Bottom Main Roof (1st Tier) */}
      <path d="M20 160 Q100 150 180 160 L196 180 Q100 172 4 180 Z" fill="currentColor" opacity="0.15" strokeWidth="1.5" />
      
      {/* Main Ground Temple Base & Columns */}
      <rect x="45" y="180" width="110" height="30" strokeWidth="1.5" />
      {/* Decorative Door Arch */}
      <path d="M85 210 L85 190 Q100 182 115 190 L115 210 Z" fill="currentColor" opacity="0.25" strokeWidth="1.5" />
      {/* Columns */}
      <line x1="60" y1="180" x2="60" y2="210" strokeWidth="1.5" />
      <line x1="72" y1="180" x2="72" y2="210" strokeWidth="1.5" />
      <line x1="128" y1="180" x2="128" y2="210" strokeWidth="1.5" />
      <line x1="140" y1="180" x2="140" y2="210" strokeWidth="1.5" />

      {/* Multi-tiered Stone Plinth Steps */}
      <rect x="35" y="210" width="130" height="10" fill="currentColor" opacity="0.1" strokeWidth="1.5" />
      <rect x="25" y="220" width="150" height="10" fill="currentColor" opacity="0.1" strokeWidth="1.5" />
      <rect x="15" y="230" width="170" height="12" fill="currentColor" opacity="0.1" strokeWidth="1.5" />
      <rect x="5" y="242" width="190" height="14" fill="currentColor" opacity="0.1" strokeWidth="1.5" />
    </svg>
  );
};

// Dress Silhouette Icon for Highlights / Why Choose Us
export const DressSilhouetteIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 3 C9 3 12 5 15 3 L 17 7 L 14 9 L 17 21 L 7 21 L 10 9 L 7 7 Z" />
    <path d="M10 9 Q 12 10.5 14 9" />
  </svg>
);

// Hanger Icon
export const WardrobeHangerIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4 C10.5 4 10 5.5 11 6.5 C12 7.5 12 8.5 12 9" />
    <path d="M4 14 L12 9 L20 14" />
    <path d="M4 14 C4 14 4 16 6 16 L18 16 C20 16 20 14 20 14" />
  </svg>
);

// Price Tag Icon
export const PriceTagIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 3 L20.5 14.5 L14.5 20.5 L3 9 L3 3 Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill={color} />
    <path d="M10 13 L13 10 M11 10 H11.01 M12 13 H12.01" />
  </svg>
);

// Diamond / Gem Icon
export const DiamondIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3 L18 3 L22 9 L12 21 L2 9 Z" />
    <path d="M2 9 L22 9" />
    <path d="M12 21 L8 9 L10 3" />
    <path d="M12 21 L16 9 L14 3" />
  </svg>
);

// Woman / Fashion Silhouette Icon
export const WomanSilhouetteIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="3" />
    <path d="M7 21 C7 15 9 11 12 11 C15 11 17 15 17 21" />
    <path d="M9 14 Q12 16 15 14" />
  </svg>
);

// Friendly Customer Service Headset Icon
export const HeadsetIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    <path d="M14 19h-4" />
  </svg>
);

// Kathmandu's Trusted Fashion Store Quality Check / Rosette Seal
export const RosetteCheckIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2 L14 4 L16.5 2.5 L17.5 5 L20.5 5 L20.5 8 L23 9.5 L22 12 L23 14.5 L20.5 16 L20.5 19 L17.5 19 L16.5 21.5 L14 20 L12 22 L10 20 L7.5 21.5 L6.5 19 L3.5 19 L3.5 16 L1 14.5 L2 12 L1 9.5 L3.5 8 L3.5 5 L6.5 5 L7.5 2.5 L10 4 Z" />
    <path d="M9.5 12 L11 13.5 L14.5 10" />
  </svg>
);
