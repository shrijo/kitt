import React, { useRef, useEffect } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface MetaballsProps {
  size: number;
  blobCount: number;
  maxRadius: number;
  blobSize: number;
  speed: number;
  minSpeed: number;
  isDarkMode: boolean;
  opacity: number;
}

const Metaballs: React.FC<MetaballsProps> = ({ size, blobCount, maxRadius, blobSize, speed, minSpeed, isDarkMode, opacity }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blobs: Blob[] = [];
    const center = size / 2;

    for (let i = 0; i < blobCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (maxRadius - blobSize - 10);
      const velocityAngle = Math.random() * Math.PI * 2;
      const velocityMagnitude = minSpeed + Math.random() * (speed - minSpeed);
      blobs.push({
        x: center + Math.cos(angle) * distance,
        y: center + Math.sin(angle) * distance,
        vx: Math.cos(velocityAngle) * velocityMagnitude,
        vy: Math.sin(velocityAngle) * velocityMagnitude,
        radius: blobSize,
      });
    }

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    const animate = () => {
      for (let i = 0; i < data.length; i += 4) {
        data[i] = isDarkMode ? 0 : 255;     // R
        data[i + 1] = isDarkMode ? 0 : 255; // G
        data[i + 2] = isDarkMode ? 0 : 255; // B
        data[i + 3] = 0; // A
      }

      blobs.forEach((blob) => {
        const dx = blob.x - center;
        const dy = blob.y - center;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Slow down as approaching the edge
        const slowdownRadius = maxRadius - blob.radius - 20;
        let speedFactor = 1;
        if (distance > slowdownRadius) {
          speedFactor = 1 - (distance - slowdownRadius) / 20;
          speedFactor = Math.max(speedFactor, 0.1);
        }

        // Update position
        blob.x += blob.vx * speedFactor;
        blob.y += blob.vy * speedFactor;

        // Check if blob is outside the boundary
        const newDx = blob.x - center;
        const newDy = blob.y - center;
        const newDistance = Math.sqrt(newDx * newDx + newDy * newDy);

        if (newDistance > maxRadius - blob.radius) {
          // Calculate the angle of collision
          const collisionAngle = Math.atan2(newDy, newDx);

          // Place the blob back inside the boundary
          blob.x = center + Math.cos(collisionAngle) * (maxRadius - blob.radius - 1);
          blob.y = center + Math.sin(collisionAngle) * (maxRadius - blob.radius - 1);

          // Calculate the dot product of velocity and normal
          const dotProduct = blob.vx * Math.cos(collisionAngle) + blob.vy * Math.sin(collisionAngle);

          // Reflect the velocity
          blob.vx -= 2 * dotProduct * Math.cos(collisionAngle);
          blob.vy -= 2 * dotProduct * Math.sin(collisionAngle);

          // Add some randomness to the new velocity
          blob.vx += (Math.random() - 0.5) * speed * 0.2;
          blob.vy += (Math.random() - 0.5) * speed * 0.2;

          // Ensure minimum speed
          const newSpeed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
          if (newSpeed < minSpeed) {
            const scaleFactor = minSpeed / newSpeed;
            blob.vx *= scaleFactor;
            blob.vy *= scaleFactor;
          }
        }
      });

      // Render metaballs
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          let sum = 0;
          for (const blob of blobs) {
            const dx = x - blob.x;
            const dy = y - blob.y;
            const distSq = dx * dx + dy * dy;
            sum += blob.radius * blob.radius / distSq;
          }
          const index = (y * size + x) * 4;
          const threshold = 1;
          if (sum > threshold) {
            const gradientFactor = y / size;
            const alphaOpacity = isDarkMode
              ? 0.2 + gradientFactor * 0.7
              : 0.8 - gradientFactor * 0.7;
            data[index] = isDarkMode ? 255 : 0;     // R
            data[index + 1] = isDarkMode ? 255 : 0; // G
            data[index + 2] = isDarkMode ? 255 : 0; // B
            data[index + 3] = Math.round(alphaOpacity * opacity * 255);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
  }, [size, blobCount, maxRadius, blobSize, speed, minSpeed, isDarkMode, opacity]);

  return <canvas ref={canvasRef} width={size} height={size} className='metaballs'/>;
};

export default Metaballs;