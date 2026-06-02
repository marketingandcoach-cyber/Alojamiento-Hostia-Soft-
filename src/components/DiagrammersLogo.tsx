import React from "react";

interface DiagrammersLogoProps {
  className?: string;
  glow?: boolean;
}

export function DiagrammersLogo({ className = "w-6 h-6", glow = false }: DiagrammersLogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full pointer-events-none"></div>
      )}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-amber-500 fill-current relative z-10 select-none" 
        style={{ fill: 'currentColor' }}
      >
        {/* 1. Styled Loop of the Serif "D" */}
        <path d="M43 20 H55 C70 20 83 31 83 50 C 83 69 70 80 55 80 H30 Q30 77 34 77 H54 C67 77 78 68 78 50 C 78 32 67 23 54 23 H43 Z" />
        
        {/* 2. Top serif spur accent on the horizontal stem */}
        <path d="M30 20 H49 V23 H30 Z" />
        
        {/* 3. Left Leaf (Outermost Page - Flipping) */}
        <path d="M18 36 V62 C18 71 23 76 34 76 H52 V73 H34 C26 73 21 69 21 62 V36 Z" />
        
        {/* 4. Middle Leaf (Second Page - Flipping) */}
        <path d="M23 28 V64 C23 73 28 77 39 77 H54 V74 H39 C31 74 26 70 26 64 V28 Z" />
        
        {/* 5. Right Leaf (Inner Page - Flipping) */}
        <path d="M28 20 V66 C28 75 33 78 44 78 H56 V75 H44 C36 75 31 72 31 66 V20 Z" />
        
        {/* 6. Sharp bottom support line under page curves matching classical letter base */}
        <path d="M29 80 H52 V82 H29 Z" />
      </svg>
    </div>
  );
}

// Complete Full Logo with text underneath matching the user uploaded logo image
export function DiagrammersFullLogo({ 
  className = "w-48 h-48", 
  textColor = "text-amber-500", 
  glow = false 
}: { 
  className?: string; 
  textColor?: string;
  glow?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 text-center ${className}`}>
      {/* Dynamic graphic emblem based on the uploaded image */}
      <DiagrammersLogo className="w-2/3 h-2/3 max-h-[160px]" glow={glow} />
      
      {/* Primary Brand Text "DIAGRAMMERS" inside Space Grotesk elegant serif-style tracking out */}
      <h2 
        className={`text-xl sm:text-2xl font-extrabold uppercase mt-3 tracking-[0.15em] select-none ${textColor}`}
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        DIAGRAMMERS
      </h2>

      {/* Decorative horizontal lines with subtext " — BOOK FORMATTER — " */}
      <div className="flex items-center gap-3 w-full max-w-[220px] mt-1.5 opacity-90 select-none">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/60"></div>
        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] font-mono whitespace-nowrap text-amber-500/90">
          BOOK FORMATTER
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/60"></div>
      </div>
    </div>
  );
}
