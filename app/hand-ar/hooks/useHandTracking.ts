import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker, DrawingUtils, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Fish, BlackHole } from "../types";
import { checkGestures } from "../utils/gestures";
import { updateFishes, updateBlackHole } from "../utils/physics";
import { drawFish, drawBlackHole } from "../utils/draw";

export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const fishesRef = useRef<Fish[]>([]);
  const blackHoleRef = useRef<BlackHole | null>(null);
  const lastPinchRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const videoNode = videoRef.current;
    let isMounted = true;
    let handLandmarker: HandLandmarker;
    let animationFrameId: number;

    const initializeMediaPipe = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2 // Kita butuh 2 tangan untuk membuat kotak
      });

      if (isMounted) {
        setIsReady(true);
        startCamera();
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }
        });
        if (videoNode && isMounted) {
          videoNode.srcObject = stream;
          videoNode.addEventListener("loadeddata", predictWebcam);
        }
      } catch (err) {
        console.error("Gagal akses kamera:", err);
      }
    };

    const predictWebcam = () => {
      if (!handLandmarker || !videoNode || !canvasRef.current) return;

      const video = videoNode;
      const canvas = canvasRef.current;

      const startTimeMs = performance.now();
      let results: HandLandmarkerResult | null = null;

      try {
        results = handLandmarker.detectForVideo(video, startTimeMs);
      } catch (error) {
        console.warn("Detection skipped for frame:", error);
      }

      if (!results) {
        animationFrameId = requestAnimationFrame(predictWebcam);
        return;
      }

      const canvasCtx = canvas.getContext("2d");
      if (canvasCtx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        const handCenters: { x: number, y: number }[] = [];
        const now = Date.now();

        if (results.landmarks && results.landmarks.length > 0) {
          const drawingUtils = new DrawingUtils(canvasCtx);
          for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
            drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
            if (landmarks && landmarks.length > 9) {
              handCenters.push({
                x: landmarks[9].x * canvas.width,
                y: landmarks[9].y * canvas.height
              });
            }
          }

          const primaryHand = results.landmarks[0];
          if (primaryHand && primaryHand.length > 9) {

            // Deteksi Gestur (di-extract ke utils)
            const { isPinch, isPointing, thumbTip, indexTip } = checkGestures(
              primaryHand, 
              canvas.width, 
              canvas.height, 
              fishesRef.current.length, 
              !!blackHoleRef.current?.activated
            );

            // Logika Gestur Jimpitan -> Menelurkan Ikan
            if (isPinch && now - lastPinchRef.current > 500) {
              fishesRef.current.push({
                x: thumbTip.x * canvas.width,
                y: thumbTip.y * canvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                hue: Math.floor(Math.random() * 360)
              });

              if (fishesRef.current.length > 20) {
                fishesRef.current.shift();
              }
              lastPinchRef.current = now;
            }

            // Logika Gestur Telunjuk -> Spawn Black Hole (Charging Mechanic)
            if (isPointing) {
              if (!blackHoleRef.current) {
                blackHoleRef.current = {
                  x: indexTip.x * canvas.width,
                  y: indexTip.y * canvas.height,
                  createdAt: now,
                  radius: 5,
                  activated: false
                };
              } else if (!blackHoleRef.current.activated) {
                // Terus ikuti ujung jari saat sedang "mengumpulkan energi"
                blackHoleRef.current.x = indexTip.x * canvas.width;
                blackHoleRef.current.y = indexTip.y * canvas.height;
              }
            } else {
              // Jika jari berhenti menunjuk sebelum penuh/aktif, batalkan panggilannya (anti-sensitif)
              if (blackHoleRef.current && !blackHoleRef.current.activated) {
                blackHoleRef.current = null;
              }
            }
          }
        }

        // Update Fisika & Batas (Movement Logic)
        updateFishes(fishesRef.current, handCenters, blackHoleRef.current, canvas.width, canvas.height);
        
        // Update Black Hole (Scale Logic)
        if (blackHoleRef.current) {
          updateBlackHole(blackHoleRef.current, now);
        }

        // --- Proses Rendering Canvas Objek Neon ---
        for (const fish of fishesRef.current) {
          drawFish(canvasCtx, fish);
        }

        if (blackHoleRef.current) {
          drawBlackHole(canvasCtx, blackHoleRef.current, now);
          
          if (blackHoleRef.current.activated && fishesRef.current.length === 0) {
            blackHoleRef.current = null;
          }
        }
      }

      // Perbarui label jumlah Ikan
      if (infoRef.current) {
        infoRef.current.innerText = `🐟 Ikan Neon: ${fishesRef.current.length} / 20`;
      }

      animationFrameId = requestAnimationFrame(predictWebcam);
    };

    initializeMediaPipe();

    return () => {
      isMounted = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handLandmarker) handLandmarker.close();
      
      // Keamanan/Privasi: Matikan lampu dan putus paksa koneksi webcam saat user pindah page
      if (videoNode && videoNode.srcObject) {
         const stream = videoNode.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
         videoNode.srcObject = null;
      }
    };
  }, []);

  return { videoRef, canvasRef, containerRef, infoRef, isReady };
}
