"use client";

import { Orbitron } from "next/font/google";
import { RefObject } from "react";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

interface FloatingInfoProps {
  infoRef: RefObject<HTMLDivElement | null>;
  isReady: boolean;
}

export function FloatingInfo({ infoRef, isReady }: FloatingInfoProps) {
  if (!isReady) return null;

  return (
    <div 
      ref={infoRef}
      className={`${orbitron.className} absolute top-4 right-4 md:top-[30px] md:right-[30px] z-10 bg-black/65 border border-[#00f3ff] md:border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-6 md:py-3 text-[#00f3ff] font-bold md:font-black text-xs sm:text-sm md:text-lg tracking-[1px] uppercase pointer-events-none backdrop-blur-sm shadow-[0_0_10px_rgba(0,243,255,0.6),inset_0_0_5px_rgba(0,243,255,0.4)] md:shadow-[0_0_20px_rgba(0,243,255,0.6),inset_0_0_10px_rgba(0,243,255,0.4)] [text-shadow:0_0_4px_#00f3ff] md:[text-shadow:0_0_8px_#00f3ff,0_0_15px_#00f3ff]`}
    >
      🐟 Ikan Neon: 0 / 20
    </div>
  );
}
