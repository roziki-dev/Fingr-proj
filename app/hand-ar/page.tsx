"use client";

import dynamic from "next/dynamic";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });


const HandARScanner = dynamic(() => import("./components/HandARScanner"), {
  ssr: false, // Sangat vital: mencegah error "navigator/window is not defined" di server Next.js
  loading: () => (
    <div className={`fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center z-50 ${orbitron.className}`}>
      <div className="w-[60vw] max-w-sm h-1.5 bg-[#00f3ff]/20 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-[#00f3ff] animate-pulse w-1/3 rounded-full shadow-[0_0_10px_#00f3ff]"></div>
      </div>
      <div className="text-[#00f3ff] text-xl md:text-2xl font-black uppercase tracking-widest animate-pulse [text-shadow:0_0_10px_#00f3ff,0_0_20px_#00f3ff]">
        Initializing Cybernetics...
      </div>
    </div>
  ),
});

export default function HandARPage() {
  return <HandARScanner />;
}
