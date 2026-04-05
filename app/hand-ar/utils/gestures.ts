export function checkGestures(
  primaryHand: any[], 
  canvasWidth: number, 
  canvasHeight: number, 
  fishesCount: number, 
  isBlackHoleActive: boolean
) {
  const thumbTip = primaryHand[4];
  const indexTip = primaryHand[8];
  
  const dx = (thumbTip.x - indexTip.x) * canvasWidth;
  const dy = (thumbTip.y - indexTip.y) * canvasHeight;
  const pinchDist = Math.hypot(dx, dy);
  
  const isPinch = pinchDist < 40 && !isBlackHoleActive;

  const getDistToWrist = (idx: number) => Math.hypot((primaryHand[idx].x - primaryHand[0].x), (primaryHand[idx].y - primaryHand[0].y));
  
  const isIndexUp = getDistToWrist(8) > getDistToWrist(6); 
  const isMiddleDown = getDistToWrist(12) < getDistToWrist(10); 
  const isRingDown = getDistToWrist(16) < getDistToWrist(14); 
  const isPinkyDown = getDistToWrist(20) < getDistToWrist(18); 

  const isPointing = isIndexUp && isMiddleDown && isRingDown && isPinkyDown && fishesCount >= 20;

  return { isPinch, isPointing, thumbTip, indexTip };
}
