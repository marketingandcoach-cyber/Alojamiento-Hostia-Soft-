import React from "react";

interface HostiaSoftLogoProps {
  className?: string;
  glow?: boolean;
}

export function HostiaSoftLogo({ className = "w-16 h-16", glow = true }: HostiaSoftLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className} transition-transform duration-300 hover:scale-105 group`}>
      {/* Outer pulsing glow backfield */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-fuchsia-500/10 to-amber-500/10 blur-xl rounded-full pointer-events-none group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10 select-none animate-fadeIn"
      >
        <defs>
          {/* Left Wing Gradient (Electric Neon Blue & Cyan) */}
          <linearGradient id="left-wing-grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" /> {/* cyan-400 */}
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />  {/* cyan-500 */}
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" /> {/* blue-600 */}
          </linearGradient>

          {/* Right Wing Gradient (Sunset Purple & Orange & Fuchsia) */}
          <linearGradient id="right-wing-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.95" />  {/* fuchsia-500 */}
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.85" /> {/* purple-500 */}
            <stop offset="80%" stopColor="#f97316" stopOpacity="0.75" /> {/* orange-500 */}
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.25" /> {/* yellow-400 */}
          </linearGradient>

          {/* Central H Metallic Gradient */}
          <linearGradient id="metallic-h-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cbd5e1" /> {/* slate-300 */}
            <stop offset="80%" stopColor="#475569" /> {/* slate-600 */}
            <stop offset="100%" stopColor="#0f172a" /> {/* slate-900 */}
          </linearGradient>

          {/* Laser central vertical flare beam */}
          <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
          </linearGradient>

          {/* Background orbit ring gradient */}
          <linearGradient id="ring-glow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
          </linearGradient>

          {/* Filters for glowing neon effect */}
          <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="fuchsia-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="center-sunflare" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Background Halo/Orbit ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="34" 
          stroke="url(#ring-glow-grad)" 
          strokeWidth="1.2" 
          fill="none" 
          opacity="0.5" 
          className="animate-pulse"
        />

        {/* 2. Cybernetic / Heroic Wings */}
        
        {/* LEFT WING - Neon cyan-blue - feathers extending upwards/leftwards */}
        <g filter="url(#cyan-glow)">
          {/* Upper feather */}
          <path 
            d="M 33,32 C 23,24 12,18 8,26 C 6,30 11,38 21,44 C 25,46 30,48 33,48 Z" 
            fill="url(#left-wing-grad)" 
            className="transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-0.5"
          />
          {/* Middle feather */}
          <path 
            d="M 33,42 C 18,36 8,30 5,39 C 3,42 8,50 17,55 C 22,57 28,57 33,56 Z" 
            fill="url(#left-wing-grad)" 
            className="transition-transform duration-500 group-hover:-translate-x-1.5"
          />
          {/* Lower-middle feather */}
          <path 
            d="M 33,52 C 17,49 7,45 4,53 C 3,55 10,61 19,64 C 24,66 29,64 33,63 Z" 
            fill="url(#left-wing-grad)" 
            className="transition-transform duration-500 group-hover:-translate-x-1"
          />
          {/* Bottom feather */}
          <path 
            d="M 33,62 C 21,64 12,61 10,68 C 9,70 15,72 23,73 C 27,73 31,70 33,69 Z" 
            fill="url(#left-wing-grad)" 
            className="transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
          />
        </g>

        {/* RIGHT WING - Purple/magenta/gold - feathers extending/pointing rightwards */}
        <g filter="url(#fuchsia-glow)">
          {/* Upper feather */}
          <path 
            d="M 67,32 C 77,24 88,18 92,26 C 94,30 89,38 79,44 C 75,46 70,48 67,48 Z" 
            fill="url(#right-wing-grad)" 
            className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
          />
          {/* Middle feather */}
          <path 
            d="M 67,42 C 82,36 92,30 95,39 C 97,42 92,50 83,55 C 78,57 72,57 67,56 Z" 
            fill="url(#right-wing-grad)" 
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          />
          {/* Lower-middle feather */}
          <path 
            d="M 67,52 C 83,49 93,45 96,53 C 97,55 90,61 81,64 C 76,66 71,64 67,63 Z" 
            fill="url(#right-wing-grad)" 
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
          {/* Bottom feather */}
          <path 
            d="M 67,62 C 79,64 88,61 90,68 C 91,70 85,72 77,73 C 73,73 69,70 67,69 Z" 
            fill="url(#right-wing-grad)" 
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </g>

        {/* 3. Central Energy Sunrise Flare at the base */}
        <circle 
          cx="50" 
          cy="75" 
          r="8" 
          fill="#fef08a" 
          filter="url(#center-sunflare)" 
          opacity="0.8" 
        />
        <circle 
          cx="50" 
          cy="75" 
          r="4" 
          fill="#ffffff" 
        />

        {/* 4. Central Majestic Metallic 3D-styled H (Left and Right pillars with central splits) */}
        {/* Left Column of H */}
        <path 
          d="M 33,22 L 44,22 L 44,45 L 48,46 L 48,54 L 44,55 L 44,77 L 33,77 L 37,50 Z" 
          fill="url(#metallic-h-grad)" 
          stroke="#475569" 
          strokeWidth="0.4"
        />

        {/* Right Column of H */}
        <path 
          d="M 67,23 L 56,23 L 56,45 L 52,46 L 52,54 L 56,55 L 56,77 L 67,77 L 63,50 Z" 
          fill="url(#metallic-h-grad)" 
          stroke="#475569" 
          strokeWidth="0.4"
        />

        {/* 5. Central Vertical Laser Splitting Flare Beam */}
        <line 
          x1="50" 
          y1="5" 
          x2="50" 
          y2="95" 
          stroke="url(#beam-grad)" 
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// Complete Full Branding Logo matching the ChatGPT screen
export function HostiaSoftFullLogo({ 
  className = "w-full max-w-lg", 
  glow = true 
}: { 
  className?: string; 
  glow?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
      {/* 1. Grand wing logo */}
      <HostiaSoftLogo className="w-48 h-48 sm:w-56 sm:h-56" glow={glow} />
      
      {/* 2. Text "HOSTIA" (bold wide white) and "SOFT" (fuchsia-to-orange gradient) */}
      <div className="flex items-center justify-center mt-6">
        <h2 className="text-4xl sm:text-5xl font-black tracking-[0.14em] text-white uppercase font-sans">
          HOSTIA
          <span className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 bg-clip-text text-transparent ml-2 font-medium">
            SOFT
          </span>
        </h2>
      </div>

      {/* 3. Slogan: SOFTWARES DEMOCRÁTICOS PARA CAMBIAR EL MUNDO */}
      <p className="text-[10px] sm:text-xs text-slate-300/90 font-mono tracking-[0.2em] uppercase mt-2.5">
        Softwares democráticos para cambiar el mundo
      </p>

      {/* 4. Mini Quad Pillars/Grid with circular glows as requested in ChatGPT mockup */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-xl mt-8 pt-6 border-t border-slate-900/40">
        
        {/* Pill 1 - EN LINEA */}
        <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 px-4 py-3 rounded-2xl relative min-h-[64px] transition-all hover:bg-slate-900/50 hover:border-cyan-500/30 group">
          <div className="w-7 h-7 rounded-full bg-cyan-950/40 border border-cyan-555/20 flex items-center justify-center mb-1 text-cyan-400 group-hover:scale-105 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5">
              <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.92-3.5-4-3.5a5.5 5.5 0 0 0-5.5 5.5c0 .35.03.68.08 1A3.5 3.5 0 0 0 6.5 19z" />
            </svg>
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">En Línea</span>
        </div>

        {/* Pill 2 - PODEROSO */}
        <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 px-4 py-3 rounded-2xl relative min-h-[64px] transition-all hover:bg-slate-900/50 hover:border-fuchsia-500/30 group">
          <div className="w-7 h-7 rounded-full bg-fuchsia-950/40 border border-fuchsia-555/20 flex items-center justify-center mb-1 text-fuchsia-400 group-hover:scale-105 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Poderoso</span>
        </div>

        {/* Pill 3 - CREATIVO */}
        <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 px-4 py-3 rounded-2xl relative min-h-[64px] transition-all hover:bg-slate-900/50 hover:border-pink-500/30 group">
          <div className="w-7 h-7 rounded-full bg-pink-950/40 border border-pink-555/20 flex items-center justify-center mb-1 text-pink-400 group-hover:scale-105 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19H12V22Z" />
              <circle cx="7.5" cy="10.5" r="1.5" />
              <circle cx="11.5" cy="7.5" r="1.5" />
              <circle cx="16.5" cy="9.5" r="1.5" />
              <circle cx="15.5" cy="14.5" r="1.5" />
            </svg>
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Creativo</span>
        </div>

        {/* Pill 4 - PARA TODOS */}
        <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-900 px-4 py-3 rounded-2xl relative min-h-[64px] transition-all hover:bg-slate-900/50 hover:border-orange-500/30 group">
          <div className="w-7 h-7 rounded-full bg-orange-950/40 border border-orange-555/20 flex items-center justify-center mb-1 text-orange-400 group-hover:scale-105 transition-all">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Para Todos</span>
        </div>

      </div>

      {/* 5. Slogan final lower banner: SOFTWARES DEMOCRÁTICOS PARA CAMBIAR EL MUNDO */}
      <div className="flex items-center gap-3 w-full max-w-lg mt-8 opacity-85 select-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-slate-800"></div>
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] font-sans text-center text-slate-200">
          Softwares democráticos para cambiar el mundo
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-orange-500/40 to-slate-800"></div>
      </div>
    </div>
  );
}
