export interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  angle?: number;
}

export interface BlackHole {
  x: number;
  y: number;
  createdAt: number;
  radius: number;
  activated: boolean;
}
