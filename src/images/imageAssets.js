import React, { useEffect, useState } from 'react';
import Group from './Group.png';
import Group1 from './Group-1.png';
import Group2 from './Group-2.png';
import Group3 from './Group-3.png';
import Group4 from './Group-4.png';
import Group5 from './Group-5.png';

const ImageAssets = () => {
  const imageList = [Group, Group1, Group2, Group3, Group4, Group5];
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const angleStep = (2 * Math.PI) / imageList.length;
    const centerX = 70;
    const centerY = 50;

    const newPositions = imageList.map((image, index) => {
      const angle = index * angleStep;
      const radius = 12;
      const top = `${centerY - Math.sin(angle) * radius}vh`;
      const left = `${centerX + Math.cos(angle) * radius}vw`;

      return { top, left };
    });

    setPositions(newPositions);
  }, [imageList]);

  return (
    <div className="relative mt-20 md:mt-20"> {/* Adjusted margin-top and added responsive class */}
      {imageList.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Group ${index + 1}`}
          className="absolute mt-20 md:mt-20 object-cover floating-image animate-fade animate-once"
          style={{ top: positions[index]?.top, left: positions[index]?.left }}
        />
      ))}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .floating-image {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ImageAssets;
