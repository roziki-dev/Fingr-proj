"use client";

import Link from "next/link";
import { Orbitron } from "next/font/google";
import { FloatingInfo } from "./FloatingInfo";
import { useHandTracking } from "../hooks/useHandTracking";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function HandARScanner() {
  const { videoRef, canvasRef, containerRef, infoRef, isReady } = useHandTracking();

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-50" ref={containerRef}>
      {!isReady && <p className="absolute z-10 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading AI Model...</p>}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover -scale-x-100"
      ></video>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-[4] pointer-events-none -scale-x-100"
      ></canvas>

      {/* Back Button (Tombol Kembali) */}
      {isReady && (
        <Link 
          href="/"
          className={`absolute top-4 left-4 md:top-[30px] md:left-[30px] z-10 bg-black/65 border border-red-500 md:border-2 rounded-lg md:rounded-xl px-3 py-2 md:px-6 md:py-3 text-red-500 font-bold md:font-black text-xs sm:text-sm md:text-lg tracking-[1px] uppercase backdrop-blur-sm shadow-[0_0_10px_rgba(255,0,0,0.6),inset_0_0_5px_rgba(255,0,0,0.4)] md:shadow-[0_0_20px_rgba(255,0,0,0.6),inset_0_0_10px_rgba(255,0,0,0.4)] [text-shadow:0_0_4px_#ff0000] md:[text-shadow:0_0_8px_#ff0000,0_0_15px_#ff0000] hover:bg-red-500/20 active:scale-95 transition-all ${orbitron.className}`}
        >
          &lt; ABORT
        </Link>
      )}

      {/* Extracted Floating UI Component */}
      <FloatingInfo infoRef={infoRef} isReady={isReady} />
    </main>
  );
}
