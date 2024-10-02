import React, { useState, useEffect, useCallback } from 'react';
import './Blob.css';
interface BlobProps {
  containerSize: number;
  size: number;
  maxRadius: number;
  initialVelocity: { x: number; y: number };
  backgroundColor?: string;
}

const Blob: React.FC<BlobProps> = ({ 
  containerSize, 
  size, 
  maxRadius, 
  initialVelocity,
  backgroundColor = '#ffffff' 
}) => {
  const [position, setPosition] = useState({ x: containerSize / 2, y: containerSize / 2 });
  const [velocity, setVelocity] = useState(initialVelocity);

  const animate = useCallback(() => {
    const centerX = containerSize / 2;
    const centerY = containerSize / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)
    );

    // Slow down as it gets further from the center
    const speed = Math.max(0.1, 1 - (distanceFromCenter / maxRadius));

    let newX = position.x + velocity.x * speed;
    let newY = position.y + velocity.y * speed;

    // Change direction if reaching the max radius
    if (distanceFromCenter >= maxRadius) {
      const angle = Math.atan2(newY - centerY, newX - centerX);
      newX = centerX + Math.cos(angle) * maxRadius;
      newY = centerY + Math.sin(angle) * maxRadius;
      setVelocity(prevVelocity => ({
        x: -prevVelocity.x + (Math.random() - 0.5),
        y: -prevVelocity.y + (Math.random() - 0.5),
      }));
    }

    setPosition({ x: newX, y: newY });
  }, [position, velocity, containerSize, maxRadius]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [animate]);

  return (
    <div
      className="blob"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor,
        borderRadius: '50%',
        position: 'absolute',
        left: `${position.x - size / 2}px`,
        top: `${position.y - size / 2}px`,
        transition: 'left 0.1s, top 0.1s',
      }}
    />
  );
};

export default Blob;
