import React from "react";

interface AutoriaLogoProps {
  className?: string;
  glow?: boolean;
}

export function AutoriaLogo({ className = "w-6 h-6", glow = false }: AutoriaLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500/25 blur-lg rounded-full pointer-events-none opacity-70"></div>
      )}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full relative z-10 select-none"
      >
        <defs>
          <linearGradient id="autoriaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" /> {/* Amber 500 */}
            <stop offset="50%" stopColor="#f43f5e" /> {/* Rose 500 */}
            <stop offset="100%" stopColor="#6366f1" /> {/* Indigo 500 */}
          </linearGradient>
        </defs>
        
        {/* Stylized letter 'A' integrated with open/flipping book pages */}
        {/* Left leg of A (resembling a flipping book page) */}
        <path 
          d="M50 15 L25 75 Q25 78 29 78 H38 C42 78 45 75 46 71 L50 55 H50 L54 71 C55 75 58 78 62 78 H71 Q75 78 75 75 L50 15 Z" 
          fill="url(#autoriaGrad)" 
        />
        
        {/* Horizontal bar of A (shaped like an elegant open book ribbon or shelf) */}
        <path 
          d="M34 58 H66 C68 58 69 56 68 54 C63 46 57 44 50 44 C43 44 37 46 32 54 C31 56 32 58 34 58 Z" 
          fill="#ffffff" 
          opacity="0.9"
        />

        {/* Flipping Page Accent 1 */}
        <path 
          d="M50 25 L35 70 C38 72 44 72 50 68" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.4"
        />

        {/* Flipping Page Accent 2 */}
        <path 
          d="M50 25 L65 70 C62 72 56 72 50 68" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.4"
        />

        {/* Floating Sparkle / Crown of intelligence at the apex */}
        <path 
          d="M50 5 L52 11 L58 13 L52 15 L50 21 L48 15 L42 13 L48 11 Z" 
          fill="#f59e0b" 
        />
      </svg>
    </div>
  );
}

export function AutoriaFullLogo({ 
  className = "w-48 h-48", 
  textColor = "text-white", 
  glow = false 
}: { 
  className?: string; 
  textColor?: string;
  glow?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center ${className}`}>
      {/* Emblem */}
      <AutoriaLogo className="w-2/3 h-2/3 max-h-[160px]" glow={glow} />
      
      {/* Brand Text */}
      <h2 
        className={`text-2xl sm:text-3xl font-black uppercase mt-3 tracking-[0.2em] select-none ${textColor}`}
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">AUTORIA</span>
        <span className="text-white text-xs font-mono tracking-widest block mt-1 opacity-80">AI</span>
      </h2>

      {/* Slogan subtext */}
      <div className="flex items-center gap-3 w-full max-w-[280px] mt-2 opacity-90 select-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-rose-500/50 to-rose-500/80"></div>
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] font-mono whitespace-nowrap text-slate-300">
          The Publishing OS
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-indigo-500/50 to-indigo-500/80"></div>
      </div>
    </div>
  );
}
