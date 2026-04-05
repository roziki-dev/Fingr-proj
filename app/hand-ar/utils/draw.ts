import { Fish, BlackHole } from '../types';

export function drawFish(canvasCtx: CanvasRenderingContext2D, fish: Fish) {
  canvasCtx.save();
  canvasCtx.translate(fish.x, fish.y);
  canvasCtx.rotate(fish.angle || 0);

  const baseColor = `hsl(${fish.hue}, 100%, 50%)`;
  const glowColor = `hsl(${fish.hue}, 100%, 70%)`;

  canvasCtx.shadowBlur = 20;
  canvasCtx.shadowColor = glowColor;
  canvasCtx.fillStyle = `hsl(${fish.hue}, 100%, 15%)`;
  canvasCtx.strokeStyle = baseColor;
  canvasCtx.lineJoin = "round";
  canvasCtx.lineWidth = 3;

  // Menggambar badan utama ikan (seperti ellipse)
  canvasCtx.beginPath();
  canvasCtx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
  canvasCtx.fill();
  canvasCtx.stroke();

  // Menggambar sirip/ekor segitiga di belakang badan
  canvasCtx.beginPath();
  canvasCtx.moveTo(-13, 0); 
  canvasCtx.lineTo(-28, -10); 
  canvasCtx.lineTo(-28, 10); 
  canvasCtx.closePath();
  canvasCtx.fill();
  canvasCtx.stroke();

  // Cahaya dalam neon (tambahkan dot di kepala untuk mata/corak)
  canvasCtx.shadowBlur = 0; 
  canvasCtx.fillStyle = '#fff';
  canvasCtx.beginPath();
  canvasCtx.arc(8, -2, 2, 0, Math.PI * 2);
  canvasCtx.fill();

  canvasCtx.restore();
}

export function drawBlackHole(canvasCtx: CanvasRenderingContext2D, bh: BlackHole, now: number) {
  canvasCtx.save();
  canvasCtx.translate(bh.x, bh.y);

  // Aura Black Hole yang berdenyut (Pulse)
  const pulse = Math.sin(now * 0.005) * 15;
  canvasCtx.shadowBlur = 40 + pulse;
  
  if (!bh.activated) {
    // FASE CHARGING: Tampilkan loading bar (indikator tahan jari persentase ~ 2 detik)
    const progress = Math.max(0, Math.min(1, (bh.radius - 5) / 55)); // Normalisasi 0.0 s.d 1.0
    
    canvasCtx.shadowColor = '#00f3ff';
    
    // Lingkaran pusat transparan menandakan pengumpulan energi
    canvasCtx.fillStyle = `rgba(0, 243, 255, ${progress * 0.4})`; 
    canvasCtx.beginPath();
    canvasCtx.arc(0, 0, bh.radius * 0.8, 0, Math.PI * 2);
    canvasCtx.fill();
    
    // Cincin loading berputar (Progres 0% hingga 100%)
    canvasCtx.strokeStyle = '#00f3ff';
    canvasCtx.lineCap = "round";
    canvasCtx.lineWidth = 6;
    
    canvasCtx.beginPath();
    // Mulai dari atas (atas = -PI/2) dan buat busur mengikuti angka progress
    canvasCtx.arc(0, 0, 50, Math.PI * -0.5, (Math.PI * -0.5) + (Math.PI * 2 * progress));
    canvasCtx.stroke();
    
  } else {
    // FASE AKTIF: Hitam pekat, menyedot segala hal
    canvasCtx.shadowColor = '#bb00ff';
    canvasCtx.fillStyle = '#000000';
    
    canvasCtx.beginPath();
    canvasCtx.arc(0, 0, bh.radius, 0, Math.PI * 2);
    canvasCtx.fill();

    // Lingkaran Piringan Spiral (Accretion disk) saat aktif menarik
    canvasCtx.shadowBlur = 10;
    canvasCtx.strokeStyle = 'rgba(187, 0, 255, 0.8)';
    canvasCtx.lineWidth = 4;
    canvasCtx.beginPath();
    canvasCtx.ellipse(0, 0, bh.radius * 1.8, bh.radius * 0.6, now * 0.003, 0, Math.PI * 2);
    canvasCtx.stroke();
  }

  canvasCtx.restore();
}
