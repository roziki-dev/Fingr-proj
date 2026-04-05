"use client";

import { FloatingInfo } from "./components/FloatingInfo";
import { useHandTracking } from "./hooks/useHandTracking";

export default function HandTracker() {
  const { videoRef, canvasRef, containerRef, infoRef, isReady } = useHandTracking();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-50" ref={containerRef}>
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

      {/* Extracted Floating UI Component */}
      <FloatingInfo infoRef={infoRef} isReady={isReady} />
    </div>
  );
}
