import React from 'react';
import Blob from './Blob';
import './Metaballs.css';

interface MetaballsProps {
  size?: number;
  blobSize?: number;
  maxRadius?: number;
  blobCount?: number;
}

const Metaballs: React.FC<MetaballsProps> = ({ 
  size = 300, 
  blobSize = 50, 
  maxRadius = 100,
  blobCount = 2
}) => {
  const generateRandomVelocity = () => {
    const speed = 1;
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    };
  };

  return (
    <div className='metaballs-container'
    style={ { backgroundColor: '#efefef' } }        >
    
      <div className="metaballs"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#3d3d3d'
        }}
      >
        {Array.from({ length: blobCount }).map((_, index) => (
          <Blob 
            key={index}
            containerSize={size}
            size={blobSize}
            maxRadius={maxRadius}
            initialVelocity={generateRandomVelocity()}
          />
        ))}
      </div>
    </div>
  );
};

export default Metaballs;
