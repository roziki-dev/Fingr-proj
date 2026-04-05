import { Fish, BlackHole } from '../types';

export function updateFishes(fishes: Fish[], handCenters: {x: number, y: number}[], blackHole: BlackHole | null, canvasWidth: number, canvasHeight: number) {
  for (let i = fishes.length - 1; i >= 0; i--) {
    const fish = fishes[i];

    let isSucked = false;
    if (blackHole?.activated) {
      const dx = blackHole.x - fish.x;
      const dy = blackHole.y - fish.y;
      const dist = Math.hypot(dx, dy);

      if (dist < blackHole.radius) {
        fishes.splice(i, 1);
        continue;
      } else {
        fish.vx += (dx / dist) * 2;
        fish.vy += (dy / dist) * 2;
        isSucked = true;
      }
    }

    if (!isSucked) {
      if (handCenters && handCenters.length > 0) {
        let minFdist = Infinity;
        let fdx = 0;
        let fdy = 0;
        
        // Cari tangan terdekat
        for (const hc of handCenters) {
          const tempDx = hc.x - fish.x;
          const tempDy = hc.y - fish.y;
          const tempDist = Math.hypot(tempDx, tempDy);
          if (tempDist < minFdist) {
             minFdist = tempDist;
             fdx = tempDx;
             fdy = tempDy;
          }
        }

        if (minFdist > 80) {
          fish.vx += (fdx / minFdist) * 0.4;
          fish.vy += (fdy / minFdist) * 0.4;
        } else {
          fish.vx += (fdy / minFdist) * 0.4;
          fish.vy -= (fdx / minFdist) * 0.4;
        }
      } else {
        if (Math.random() < 0.05) {
          fish.vx += (Math.random() - 0.5) * 2;
          fish.vy += (Math.random() - 0.5) * 2;
        }
      }

      for (let j = 0; j < fishes.length; j++) {
        if (i === j) continue;
        const other = fishes[j];
        const ddx = fish.x - other.x;
        const ddy = fish.y - other.y;
        const ddist = Math.hypot(ddx, ddy);
        if (ddist > 0 && ddist < 40) {
          fish.vx += (ddx / ddist) * 0.8;
          fish.vy += (ddy / ddist) * 0.8;
        }
      }
    }

    const speed = Math.hypot(fish.vx, fish.vy);
    if (speed > 8) {
      fish.vx = (fish.vx / speed) * 8;
      fish.vy = (fish.vy / speed) * 8;
    }

    fish.vx *= 0.98;
    fish.vy *= 0.98;
    fish.x += fish.vx;
    fish.y += fish.vy;

    if (fish.x < 0) { fish.x = 0; fish.vx *= -1; }
    if (fish.x > canvasWidth) { fish.x = canvasWidth; fish.vx *= -1; }
    if (fish.y < 0) { fish.y = 0; fish.vy *= -1; }
    if (fish.y > canvasHeight) { fish.y = canvasHeight; fish.vy *= -1; }

    const targetAngle = Math.atan2(fish.vy, fish.vx);
    if (fish.angle === undefined) {
      fish.angle = targetAngle;
    } else {
      let angleDiff = targetAngle - fish.angle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      fish.angle += angleDiff * 0.15;
    }
  }
}

export function updateBlackHole(blackHole: BlackHole, now: number) {
  const elapsed = now - blackHole.createdAt;
  
  // Radius membesar (charging up) secara linear hingga 60px dalam 2 detik
  if (!blackHole.activated) {
    blackHole.radius = 5 + (elapsed / 2000) * 55;
  }

  if (elapsed > 2000) {
    blackHole.activated = true;
    blackHole.radius = 60;
  }
}
