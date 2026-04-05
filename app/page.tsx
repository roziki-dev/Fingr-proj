"use client";

import Link from "next/link";
import { Orbitron } from "next/font/google";
import { useEffect, useState } from "react";

// Inject font TRON
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalisasi nilai kordinat tetikus dari -1.0 hingga 1.0 (pusat layar)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden ${orbitron.className}`}>
      
      {/* TRON Infinite Perspective Grid Floor (dengan efek 3D ikuti kursor) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-end justify-center overflow-hidden">
        <div 
          className="w-[300vw] h-[150vh] border-b-2 border-[#00f3ff] bg-bottom shadow-[0_0_50px_#00f3ff]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 243, 255, 0.5) 2px, transparent 2px)',
            backgroundSize: '60px 60px',
            // Rotasi kemiringan X dan Y dimanipulasi berdasarkan kordinat kursor normalisasi (diperhalus)
            transform: `perspective(600px) rotateX(${70 - mousePos.y * 3}deg) rotateY(${mousePos.x * 5}deg) rotateZ(${mousePos.x * -2}deg) translateY(200px) translateZ(-150px)`,
            transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}
        ></div>
      </div>

      <div 
        className="z-10 text-center flex flex-col items-center gap-10 md:gap-16 mt-[0vh] md:mt-[-10vh]"
        style={{
          // Efek Parallax diperhalus dan dijinakkan
          transform: `translateX(${mousePos.x * -15}px) translateY(${mousePos.y * -15}px)`,
          transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        <div className="flex flex-col gap-2 md:gap-3">
          <h1 
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-widest [text-shadow:0_0_10px_#00f3ff,0_0_20px_#00f3ff,0_0_40px_#00f3ff,0_0_80px_rgba(0,243,255,0.6)] [-webkit-text-stroke:1px_#00f3ff] md:[-webkit-text-stroke:2px_#00f3ff]"
          >
            FINGR
          </h1>
          <p 
            className="text-[#00f3ff] text-sm sm:text-lg md:text-2xl tracking-[0.2em] md:tracking-[0.4em] font-medium pt-1 md:pt-2 [text-shadow:0_0_10px_#00f3ff,0_0_20px_#00f3ff]" 
          >
            HAND-AR INTERFACE
          </p>
        </div>

        {/* Global CSS Injector for RGB Neon Hover Effect */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes rgbNeonPulse {
            0% { 
              box-shadow: 0 0 20px #ff0055, inset 0 0 15px #ff0055; 
              border-color: #ff0055; 
              color: #ff0055; 
              text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055; 
            }
            33% { 
              box-shadow: 0 0 20px #00ff00, inset 0 0 15px #00ff00; 
              border-color: #00ff00; 
              color: #00ff00; 
              text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; 
            }
            66% { 
              box-shadow: 0 0 20px #0055ff, inset 0 0 15px #0055ff; 
              border-color: #0055ff; 
              color: #0055ff; 
              text-shadow: 0 0 10px #0055ff, 0 0 20px #0055ff; 
            }
            100% { 
              box-shadow: 0 0 20px #ff0055, inset 0 0 15px #ff0055; 
              border-color: #ff0055; 
              color: #ff0055; 
              text-shadow: 0 0 10px #ff0055, 0 0 20px #ff0055; 
            }
          }
          
          .tron-btn {
            background-color: rgba(0, 10, 15, 0.85);
            border: 3px solid #00f3ff;
            color: #00f3ff;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.8), inset 0 0 15px rgba(0, 243, 255, 0.4);
            text-shadow: 0 0 10px #00f3ff, 0 0 20px #00f3ff;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            backdrop-filter: blur(8px);
          }
          
          .tron-btn:hover {
            animation: rgbNeonPulse 2.5s linear infinite;
            transform: scale(1.1) translateY(-5px);
            background-color: rgba(20, 20, 20, 0.95);
            letter-spacing: 0.15em;
          }
        `}} />

        <Link
          href="/hand-ar"
          className="tron-btn rounded-lg md:rounded-xl px-8 py-4 md:px-12 md:py-5 text-xl md:text-2xl font-black uppercase tracking-widest cursor-pointer"
        >
          INITIALIZE
        </Link>
      </div>
    </div>
  );
}
